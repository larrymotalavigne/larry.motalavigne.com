import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  updateTitle(pageTitle: string): void {
    const fullTitle = pageTitle
      ? `${pageTitle} | Larry Mota--Lavigne`
      : 'Larry Mota--Lavigne - Senior Python Developer';
    this.title.setTitle(fullTitle);
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
  }

  updateDescription(description: string): void {
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:description', content: description });
  }

  updateOgImage(imageUrl: string): void {
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
  }

  updateTags(config: { title?: string; description?: string; image?: string }): void {
    if (config.title) this.updateTitle(config.title);
    if (config.description) this.updateDescription(config.description);
    if (config.image) this.updateOgImage(config.image);
  }
}
