import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag-badge',
  standalone: true,
  template: `<span class="tag">{{ tag }}</span>`,
  styles: [`
    .tag {
      display: inline-block;
      padding: 0.2rem 0.6rem;
      background-color: var(--tag-bg);
      color: var(--tag-text);
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 500;
      transition: all 0.2s ease;

      &:hover {
        opacity: 0.8;
      }
    }
  `]
})
export class TagBadgeComponent {
  @Input({ required: true }) tag!: string;
}
