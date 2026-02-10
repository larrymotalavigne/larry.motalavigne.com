import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'pref-theme';

  readonly theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    effect(() => {
      const t = this.theme();
      this.document.documentElement.setAttribute('data-theme', t);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.storageKey, t);
      }
    });
  }

  toggle(): void {
    this.theme.update(t => t === 'dark' ? 'light' : 'dark');
  }

  private getInitialTheme(): Theme {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.storageKey) as Theme | null;
      if (stored) return stored;
      if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    }
    return 'dark';
  }
}
