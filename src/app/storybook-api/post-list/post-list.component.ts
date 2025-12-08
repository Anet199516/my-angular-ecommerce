import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-post-list',
  template: `
    <h2>Posts</h2>
    @if (loading) {
      <p>Loading posts...</p>
    }

    @if (error) {
      <p style="color: red;">Error: {{ error }}</p>
    }

    @if (posts.length) {
      <ul>
        @for (post of posts; track post.id) {
          <li>
            <strong>{{ post.title }}</strong>: {{ post.body }}
          </li>
        }
      </ul>
    }
  `,
  standalone: true,
  imports: [CommonModule, HttpClientModule],
})
export class PostListComponent implements OnInit {
  public posts: Post[] = [];
  public loading = true;
  public error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Post[]>('jsonplaceholder.typicode.com').subscribe({
      next: (data) => {
        this.posts = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Something went wrong';
        this.loading = false;
      }
    });
  }
}
