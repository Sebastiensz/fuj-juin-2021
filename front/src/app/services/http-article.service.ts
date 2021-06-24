import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArticleService } from './article.service';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class HttpArticleService extends ArticleService {
  constructor(private http: HttpClient) {
    super();
    console.log('test');
    this.refresh();
  }
  refresh() {
    this.http.get<Article[]>('http://localhost:3000/api/articles').subscribe({
      next: (articles) => {
        console.log('articles', articles);
        this.articles = articles;
      },
      complete: () => {
        console.log('complete');
      },
      error: (err) => {
        console.error('err:', err);
      },
    });
  }

  add(article: Article) {
    super.add(article);

    this.http
      .post<void>('http://localhost:3000/api/articles', article)
      .subscribe({
        next: (articles) => {
          this.refresh();
        },
        complete: () => {
          console.log('complete');
        },
        error: (err) => {
          console.error('err:', err);
        },
      });
  }

  remove(selectedArticles: Set<Article>) {
    super.remove(selectedArticles);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: [...selectedArticles].map((a) => a.id),
    };

    this.http
      .delete<void>('http://localhost:3000/api/articles', options)
      .subscribe({
        next: () => {
          this.refresh();
        },
        complete: () => {
          console.log('complete');
        },
        error: (err) => {
          console.error('err:', err);
        },
      });
  }
}
