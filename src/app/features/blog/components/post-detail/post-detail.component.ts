import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownComponent } from 'ngx-markdown';
import { TagBadgeComponent } from '../../../../shared/components/tag-badge/tag-badge.component';
import { DateFormatPipe } from '../../../../shared/pipes/date-format.pipe';
import { ReadingTimePipe } from '../../../../shared/pipes/reading-time.pipe';
import { ContentService } from '../../../../core/services/content.service';
import { SeoService } from '../../../../core/services/seo.service';
import { BlogPost } from '../../../../core/models/content.model';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    RouterLink, TranslateModule, MarkdownComponent,
    TagBadgeComponent, DateFormatPipe, ReadingTimePipe
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly contentService = inject(ContentService);
  private readonly seoService = inject(SeoService);

  readonly post = signal<BlogPost | null>(null);
  readonly markdownContent = signal<string>('');
  readonly allPosts = signal<BlogPost[]>([]);

  ngOnInit(): void {
    this.contentService.getBlogPosts().subscribe(posts => {
      this.allPosts.set(posts);
    });

    this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug')!;
        // Find the post metadata
        this.contentService.getBlogPosts().subscribe(posts => {
          const found = posts.find(p => p.slug === slug);
          if (found) {
            this.post.set(found);
            this.seoService.updateTags({
              title: found.title,
              description: found.description
            });
          }
        });
        return this.contentService.getBlogPost(slug);
      })
    ).subscribe(content => {
      // Strip front matter
      const stripped = content.replace(/^---[\s\S]*?---\s*/, '');
      this.markdownContent.set(stripped);
    });
  }

  get prevPost(): BlogPost | null {
    const posts = this.allPosts();
    const current = this.post();
    if (!current) return null;
    const idx = posts.findIndex(p => p.slug === current.slug);
    return idx < posts.length - 1 ? posts[idx + 1] : null;
  }

  get nextPost(): BlogPost | null {
    const posts = this.allPosts();
    const current = this.post();
    if (!current) return null;
    const idx = posts.findIndex(p => p.slug === current.slug);
    return idx > 0 ? posts[idx - 1] : null;
  }
}
