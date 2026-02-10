import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TagBadgeComponent } from '../../shared/components/tag-badge/tag-badge.component';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate.directive';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';
import { BlogPost } from '../../core/models/content.model';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    RouterLink, TranslateModule, TagBadgeComponent,
    ScrollAnimateDirective, DateFormatPipe
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  private readonly contentService = inject(ContentService);
  private readonly seoService = inject(SeoService);

  readonly posts = signal<BlogPost[]>([]);
  readonly selectedTag = signal<string | null>(null);

  readonly allTags = computed(() => {
    const tags = new Set<string>();
    this.posts().forEach(p => p.tags?.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  });

  readonly filteredPosts = computed(() => {
    const tag = this.selectedTag();
    if (!tag) return this.posts();
    return this.posts().filter(p => p.tags?.includes(tag));
  });

  ngOnInit(): void {
    this.seoService.updateTags({
      title: 'Blog',
      description: 'Articles sur le developpement, la tech et plus encore.'
    });

    this.contentService.getBlogPosts().subscribe(posts => {
      this.posts.set(posts);
    });
  }

  selectTag(tag: string | null): void {
    this.selectedTag.set(tag);
  }
}
