import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { BlogPost, Project } from '../models/content.model';
import { LanguageService } from './language.service';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);
  private readonly languageService = inject(LanguageService);

  private blogIndexCache$: Observable<BlogPost[]> | null = null;
  private projectIndexCache$: Observable<Project[]> | null = null;

  getBlogPosts(): Observable<BlogPost[]> {
    if (!this.blogIndexCache$) {
      this.blogIndexCache$ = this.http.get<{ items: BlogPost[] }>('/content/blog-index.json').pipe(
        map(data => data.items),
        shareReplay(1)
      );
    }
    return this.blogIndexCache$.pipe(
      map(posts => posts
        .filter(p => p.lang === this.languageService.currentLang())
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      )
    );
  }

  getProjects(): Observable<Project[]> {
    if (!this.projectIndexCache$) {
      this.projectIndexCache$ = this.http.get<{ items: Project[] }>('/content/projects-index.json').pipe(
        map(data => data.items),
        shareReplay(1)
      );
    }
    return this.projectIndexCache$.pipe(
      map(projects => projects
        .filter(p => p.lang === this.languageService.currentLang())
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      )
    );
  }

  getBlogPost(slug: string): Observable<string> {
    const lang = this.languageService.currentLang();
    return this.http.get(`/content/blog/${lang}/${slug}.md`, { responseType: 'text' });
  }

  getProject(slug: string): Observable<string> {
    const lang = this.languageService.currentLang();
    return this.http.get(`/content/projects/${lang}/${slug}.md`, { responseType: 'text' });
  }
}
