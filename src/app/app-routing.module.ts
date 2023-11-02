import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'userdetails', component: UserDetailsComponent },
  { path: '',  component: HomeComponent},
  { path: '**',  redirectTo : '/', pathMatch : 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
