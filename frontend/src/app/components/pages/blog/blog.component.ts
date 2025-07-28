import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogData: any[] | undefined;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    // Fetch blogs dynamically from the backend
    this.blogService.getAllBlogs().subscribe((data) => {
      this.blogData = data;
    });
  }
}
