import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    data: { animation: 'Home' }
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/blog/blog.component').then(m => m.BlogComponent),
    data: { animation: 'Blog' }
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./features/blog/components/post-detail/post-detail.component').then(m => m.PostDetailComponent),
    data: { animation: 'PostDetail' }
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects.component').then(m => m.ProjectsComponent),
    data: { animation: 'Projects' }
  },
  {
    path: 'projects/:slug',
    loadComponent: () => import('./features/projects/components/project-detail/project-detail.component').then(m => m.ProjectDetailComponent),
    data: { animation: 'ProjectDetail' }
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
    data: { animation: 'About' }
  },
  // Redirects for old Hugo URLs
  { path: 'posts', redirectTo: 'blog', pathMatch: 'full' },
  { path: 'posts/:slug', redirectTo: 'blog/:slug' },
  // Fallback
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
