import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TagBadgeComponent } from '../../shared/components/tag-badge/tag-badge.component';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate.directive';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';
import { Project } from '../../core/models/content.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterLink, TranslateModule, TagBadgeComponent, ScrollAnimateDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  private readonly contentService = inject(ContentService);
  private readonly seoService = inject(SeoService);

  readonly projects = signal<Project[]>([]);
  readonly selectedTech = signal<string | null>(null);

  readonly allTech = computed(() => {
    const tech = new Set<string>();
    this.projects().forEach(p => p.techStack?.forEach(t => tech.add(t)));
    return Array.from(tech).sort();
  });

  readonly filteredProjects = computed(() => {
    const tech = this.selectedTech();
    if (!tech) return this.projects();
    return this.projects().filter(p => p.techStack?.includes(tech));
  });

  ngOnInit(): void {
    this.seoService.updateTags({
      title: 'Projects',
      description: 'A selection of my personal and professional projects.'
    });

    this.contentService.getProjects().subscribe(projects => {
      this.projects.set(projects);
    });
  }

  selectTech(tech: string | null): void {
    this.selectedTech.set(tech);
  }
}
