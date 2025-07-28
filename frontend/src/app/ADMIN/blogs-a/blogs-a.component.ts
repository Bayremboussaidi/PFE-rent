import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { Router } from '@angular/router'; // Import Router


@Component({
  selector: 'app-blogs-a',
  templateUrl: './blogs-a.component.html',
  styleUrl: './blogs-a.component.css'
})
export class BlogsAComponent implements OnInit {

  blogs: any[] = [];

  constructor(private blogService: BlogService ,  private router: Router) {}

  ngOnInit(): void {
    this.blogService.getAllBlogs().subscribe((data) => {
      this.blogs = data; // Assign the response to blogs
    });
  }

  editBlog(blog: any): void {
    this.router.navigate(['/admin/admin-show-blogs', blog.id]);
  }



  deleteBlog(blog: any): void {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.blogService.deleteBlog(blog.id).subscribe(
        () => {
          console.log('Blog deleted successfully');
          // Remove the blog from the local list
          this.blogs = this.blogs.filter(b => b.id !== blog.id);
        },
        (error) => {
          console.error('Error deleting blog:', error);
        }
      );
    }
  }
}
