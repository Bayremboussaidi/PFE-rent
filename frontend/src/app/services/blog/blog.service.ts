import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl = 'http://localhost:8084/api/blogs';

  constructor(private http: HttpClient) {}

  // Get all blogs from the backend
  getAllBlogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`).pipe(
      catchError(error => {
        console.error('Error fetching blogs:', error);
        throw error; // You can also return an empty array or a default fallback if needed
      })
    );
  }


  //update blog
  updateBlog(id: number, blog: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, blog).pipe(
      catchError(error => {
        console.error('Error updating blog:', error);
        throw error;
      })
    );
  }

  // Get blog by ID from the backend
  getBlogById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching blog by ID:', error);
        throw error; // Handle the error or return a default value
      })
    );
  }

  // Get blog with comments from the backend
  getBlogWithComments(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}/with-comments`).pipe(
      catchError(error => {
        console.error('Error fetching blog with comments:', error);
        throw error;
      })
    );
  }

  // Add a new blog (send to the backend)
  addBlog(blog: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, blog).pipe(
      catchError(error => {
        console.error('Error adding blog:', error);
        throw error;
      })
    );
  }

  // Delete blog by ID (send to the backend)
  deleteBlog(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting blog:', error);
        throw error;
      })
    );
  }



// Add comment to a specific blog (send to the backend)
addCommentToBlog(blogId: number, comment: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/${blogId}/comments`, comment).pipe(
    catchError(error => {
      console.error('Error adding comment to blog:', error);
      throw error;
    })
  );
}


  // Get other blogs (exclude the current blog) from the backend
  getOtherBlogs(currentBlogId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/other/${currentBlogId}`).pipe(
      catchError(error => {
        console.error('Error fetching other blogs:', error);
        throw error;
      })
    );
  }
}
