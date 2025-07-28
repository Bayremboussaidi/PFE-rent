import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog/blog.service';  // Adjust path as needed
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsAComponent implements OnInit {
  blog: any = null;  // Blog details
  loading: boolean = true;
  hasChanges: boolean = false;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const blogId = +this.route.snapshot.paramMap.get('id')!;  // Get blog ID from route parameter
    this.getBlogDetails(blogId);
  }

  getBlogDetails(id: number): void {
    this.blogService.getBlogWithComments(id).subscribe(
      (data: any) => {
        this.blog = data;
        this.loading = false;
      },
      (error: any) => {
        console.error('Error fetching blog details:', error);
        this.loading = false;
      }
    );
  }

  // Method to handle any changes to input fields (if needed)
  onChange(): void {
    this.hasChanges = true;
  }

  // Method to update the blog (you can implement this method to update the blog data)
  updateBlog(): void {
    if (this.hasChanges && this.blog) {
      this.blogService.updateBlog(this.blog.id, this.blog).subscribe(
        (updatedBlog) => {
          console.log('Blog updated successfully:', updatedBlog);
          this.blog = updatedBlog; // Update local blog data with the updated blog from the backend
          this.hasChanges = false;
        },
        (error) => {
          console.error('Error updating blog:', error);
        }
      );
    }
  }
}
