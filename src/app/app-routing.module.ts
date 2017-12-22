import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatchdayComponent } from './matchday/matchday.component';
import { ScoretableComponent } from './scoretable/scoretable.component';
import { HomeComponent } from './home/home.component';
import { ArticlesComponent } from './articles/articles.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'matchday', component: MatchdayComponent },
  { path: 'scoretable', component: ScoretableComponent },
  { path: 'home', component: HomeComponent },
  { path: 'articles', component: ArticlesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
