import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';

@Pipe({
  name: 'dateFormat',
  standalone: true,
  pure: false
})
export class DateFormatPipe implements PipeTransform {
  private readonly languageService = inject(LanguageService);

  transform(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const locale = this.languageService.currentLang() === 'fr' ? 'fr-FR' : 'en-US';
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
