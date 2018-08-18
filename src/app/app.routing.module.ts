import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'calendar',
    loadChildren: './modules/calendar/calendar.module#CalendarModule'
  }, {
    path: '**',
    redirectTo: '/calendar',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
