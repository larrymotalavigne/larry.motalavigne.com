import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownComponent } from 'ngx-markdown';
import { TagBadgeComponent } from '../../../../shared/components/tag-badge/tag-badge.component';
import { ContentService } from '../../../../core/services/content.service';
import { SeoService } from '../../../../core/services/seo.service';
import { Project } from '../../../../core/models/content.model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink, TranslateModule, MarkdownComponent, TagBadgeComponent],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly contentService = inject(ContentService);
  private readonly seoService = inject(SeoService);

  readonly project = signal<Project | null>(null);
  readonly markdownContent = signal<string>('');

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug')!;
        this.contentService.getProjects().subscribe(projects => {
          const found = projects.find(p => p.slug === slug);
          if (found) {
            this.project.set(found);
            this.seoService.updateTags({
              title: found.title,
              description: found.description
            });
          }
        });
        return this.contentService.getProject(slug);
      })
    ).subscribe(content => {
      const stripped = content.replace(/^---[\s\S]*?---\s*/, '');
      this.markdownContent.set(stripped);
    });
  }
}
