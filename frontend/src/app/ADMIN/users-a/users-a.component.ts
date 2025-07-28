import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users-a.component.html',
  styleUrls: ['./users-a.component.css']
})
export class UserAComponent implements OnInit {
  users: User[] = [];
  selectedUsers: User[] = [];
  isAddModalOpen = false;
  isEditMode = false;
  userToEdit: User | null = null;
  newUser: User = this.getEmptyUser();

  constructor(private userService: UserService , private router: Router ,   private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.getUsers();
  }



  //go to user history
  viewHistory(userId: number): void {
    this.router.navigate([userId], { relativeTo: this.route });
  }


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.newUser.photo = reader.result as string;
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
    }
  }

  //  Fetch all users (Fixed response handling)
  getUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response: any) => { // Use proper response interface
        if (response.success && Array.isArray(response.data)) {
          this.users = response.data.map((user: User) => ({
            ...user,
            id: Number(user.id),
            // Convert date strings to Date objects
            createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
            updatedAt: user.updatedAt ? new Date(user.updatedAt) : new Date()
          }));
        }
      },
      (error) => console.error('Error fetching users:', error)
    );
  }

  //  Delete a user (Fixed `id` type conversion)
  deleteUser(userId: number | string, index: number): void {
    const id = Number(userId); // Convert `string` ID to `number`
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          console.log('User deleted successfully');
          this.users.splice(index, 1);
        },
        (error) => console.error('Error deleting user:', error)
      );
    }
  }

  // Check if a user is selected
  isSelected(user: User): boolean {
    return this.selectedUsers.some((selectedUser) => selectedUser.id === user.id);
  }

  //  Toggle user selection
  toggleSelection(user: User): void {
    this.isSelected(user)
      ? (this.selectedUsers = this.selectedUsers.filter((selectedUser) => selectedUser.id !== user.id))
      : this.selectedUsers.push(user);
  }

  // Select or Deselect all users
  toggleSelectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.selectedUsers = isChecked ? [...this.users] : [];
  }




  validateNumber(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }





  //  Update multiple selected users (Fixed `id` issue)
  updateSelectedUsers(): void {
    const updateObservables = this.selectedUsers
      .filter(user => user.id !== undefined)
      .map(user => {
        const userId = Number(user.id);

        // Create clean update payload
        const updatePayload: any = {
          username: user.username,
          email: user.email,
          role: user.role,
          phone: Number(user.phone) || null,
          workplace: user.workplace,
          photo: user.photo?.includes(',')
            ? user.photo.split(',')[1]
            : user.photo
        };

        // Remove fields that shouldn't be updated
        delete updatePayload.id;
        delete updatePayload.createdAt;
        delete updatePayload.updatedAt;

        return this.userService.updateUser(userId, updatePayload);
      });

    forkJoin(updateObservables).subscribe({
      next: () => {
        console.log('All users updated successfully');
        this.selectedUsers = [];
        this.getUsers();
      },
      error: (err) => {
        console.error('Update error:', err);
        if (err.error) {
          console.error('Server response:', err.error);
          alert(`Update failed: ${err.error.message || err.message}`);
        }
        this.selectedUsers = [];
        this.getUsers();
      }
    });
  }

  //  Open modal for adding a new user
  openAddModal(): void {
    this.isAddModalOpen = true;
    this.isEditMode = false;
    this.newUser = this.getEmptyUser();
  }

  //  Open modal for editing an existing user
  openEditModal(user: User): void {
    this.isAddModalOpen = true;
    this.isEditMode = true;
    this.userToEdit = { ...user };
  }

  // ✅ Close modal and reset form
  closeAddModal(): void {
    this.isAddModalOpen = false;
    this.isEditMode = false;
    this.userToEdit = null;
    this.newUser = this.getEmptyUser();
  }

  // ✅ Handle add user submission
  onAddUserSubmit(): void {
    if (this.isEditMode && this.userToEdit) {
      if (this.userToEdit.id !== undefined) {
        const userId = Number(this.userToEdit.id); // Convert `string` ID to `number`
        this.userService.updateUser(userId, this.userToEdit).subscribe(
          () => {
            console.log('User updated successfully');
            this.getUsers();
            this.closeAddModal();
          },
          (error) => console.error('Error updating user:', error)
        );
      }
    } else {
      this.userService.createUser(this.newUser).subscribe(
        () => {
          console.log('User added successfully');
          this.getUsers();
          this.closeAddModal();
        },
        (error) => console.error('Error adding user:', error)
      );
    }
  }

  // ✅ Utility function to return an empty user object
  private getEmptyUser(): User {
    return {
      username: '',
      email: '',
      password: '',
      role: 'USER',
      phone: null,  // Now matches the interface
      workplace: undefined,
      photo: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      anonymous: false,
    };
  }
}
