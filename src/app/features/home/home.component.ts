import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SocialLinksComponent } from '../../shared/components/social-links/social-links.component';
import { TagBadgeComponent } from '../../shared/components/tag-badge/tag-badge.component';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate.directive';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';
import { BlogPost, Project } from '../../core/models/content.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink, TranslateModule, SocialLinksComponent,
    TagBadgeComponent, ScrollAnimateDirective, DateFormatPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly contentService = inject(ContentService);
  private readonly seoService = inject(SeoService);

  recentPosts: BlogPost[] = [];
  featuredProjects: Project[] = [];

  readonly skills = [
    { name: 'Python', icon: '🐍' },
    { name: 'Java', icon: '☕' },
    { name: 'Angular', icon: '🅰️' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Kubernetes', icon: '☸️' },
    { name: 'DevOps', icon: '🔧' }
  ];

  ngOnInit(): void {
    this.seoService.updateTags({
      title: '',
      description: 'Larry Mota--Lavigne - Senior Python Developer based in Tours, France'
    });

    this.contentService.getBlogPosts().subscribe(posts => {
      this.recentPosts = posts.slice(0, 3);
    });

    this.contentService.getProjects().subscribe(projects => {
      this.featuredProjects = projects.filter(p => p.featured).slice(0, 3);
    });
  }
}
