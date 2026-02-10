import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SocialLinksComponent } from '../../shared/components/social-links/social-links.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, SocialLinksComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
}
