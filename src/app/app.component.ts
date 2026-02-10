import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ThemeService } from './core/services/theme.service';
import { LanguageService } from './core/services/language.service';
import { routeAnimations } from './core/animations/route.animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  animations: [routeAnimations],
  template: `
    <app-header />
    <main class="main-content" [@routeAnimations]="getRouteAnimationData()">
      <router-outlet #outlet="outlet" />
    </main>
    <app-footer />
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .main-content {
      flex: 1;
      position: relative;
      padding-top: 72px;
    }
  `]
})
export class AppComponent {
  private readonly themeService = inject(ThemeService);
  private readonly languageService = inject(LanguageService);

  getRouteAnimationData(): string {
    return '';
  }
}
