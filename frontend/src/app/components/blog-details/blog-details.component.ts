import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog/blog.service';
import { UserloginService } from '../../services/user_login/userlogin.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  blogId: number | null = null;
  blog: any;
  allBlogs: any[] = []; // To hold all the blogs
  otherBlogs: any[] = []; // To hold blogs excluding the selected one

  review: {
    username: string;
    email: string;
    commentText: string;
  } = {
    username: '',
    email: '',
    commentText: ''
  };

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private userLoginService: UserloginService
  ) {}

  ngOnInit(): void {
    this.loadUserData();

    // Fetch all blogs and filter the selected one
    this.blogService.getAllBlogs().subscribe((data) => {
      this.allBlogs = data;

      // Subscribe to the route params to get the blogId dynamically
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.blogId = +id; // Convert the id to a number

          // Fetch the blog by ID dynamically from the backend
          this.blogService.getBlogById(this.blogId).subscribe((data) => {
            this.blog = data; // Assign the response to blog
          });

          // Filter out the selected blog from all blogs to display in the sidebar
          this.otherBlogs = this.allBlogs.filter(blog => blog.id !== this.blogId);
        }
      });
    });
  }


  private loadUserData(): void {
    const currentUser = this.userLoginService.getCurrentUser();
    if (currentUser) {
      this.review.username = [currentUser.firstName, currentUser.lastName].filter(Boolean).join(' ');
      this.review.email = currentUser.email || '';
    }
  }

  submitComment(): void {

    if (!this.isLoggedIn) {
      Swal.fire({
        icon: 'error',
        title: 'Not Logged In',
        text: 'You must be logged in to submit a comment.'
      });
      return;
    }


    if (!this.review.commentText) return;

    const commentPayload = {
      fullName: this.review.username,
      email: this.review.email,
      content: this.review.commentText
    };

    // Send the comment to the backend using the service
    if (this.blogId) {
      this.blogService.addCommentToBlog(this.blogId, commentPayload).subscribe(
        (response) => {
          console.log('Comment added successfully:', response);
          this.blog.comments.push(response); // Add the new comment to the displayed list
          this.review.commentText = ''; // Clear the comment input field
        },
        (error) => {
          console.error('Error submitting comment:', error);
        }
      );
    }
  }






  get isLoggedIn(): boolean {
    return this.userLoginService.isLoggedIn();
  }

}
