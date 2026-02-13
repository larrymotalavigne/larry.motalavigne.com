import { Injectable, signal, effect, PLATFORM_ID, inject, DOCUMENT } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { TranslateService } from '@ngx-translate/core';

export type Lang = 'fr' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly translate = inject(TranslateService);
  private readonly storageKey = 'pref-lang';

  readonly currentLang = signal<Lang>(this.getInitialLang());

  constructor() {
    this.translate.setDefaultLang('fr');
    this.translate.addLangs(['fr', 'en']);

    effect(() => {
      const lang = this.currentLang();
      this.translate.use(lang);
      this.document.documentElement.setAttribute('lang', lang);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.storageKey, lang);
      }
    });
  }

  toggle(): void {
    this.currentLang.update(l => l === 'fr' ? 'en' : 'fr');
  }

  setLang(lang: Lang): void {
    this.currentLang.set(lang);
  }

  private getInitialLang(): Lang {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.storageKey) as Lang | null;
      if (stored) return stored;
      const browserLang = navigator.language.substring(0, 2);
      if (browserLang === 'en') return 'en';
    }
    return 'fr';
  }
}
