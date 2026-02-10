import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SocialLinksComponent } from '../../shared/components/social-links/social-links.component';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate.directive';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslateModule, SocialLinksComponent, ScrollAnimateDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  readonly skills = [
    { category: 'Backend', items: ['Python', 'Java', 'REST APIs', 'PostgreSQL'] },
    { category: 'Frontend', items: ['Angular', 'React', 'TypeScript', 'SCSS'] },
    { category: 'DevOps', items: ['Docker', 'Kubernetes', 'CI/CD', 'Git'] },
    { category: 'Methodologies', items: ['Agile', 'Scrum', 'TDD', 'Clean Code'] }
  ];

  ngOnInit(): void {
    this.seoService.updateTags({
      title: 'About',
      description: 'Learn more about Larry Mota--Lavigne, Senior Python Developer based in Tours, France.'
    });
  }
}
