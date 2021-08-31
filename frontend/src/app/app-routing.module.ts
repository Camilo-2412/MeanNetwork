import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { ListPostComponent } from './post/list-post/list-post.component';
import { SavePostComponent } from './post/save-post/save-post.component';

import { AuthGuard } from "./guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch : 'full',
  },
  {
    path: 'signUp',
    component: RegisterComponent,
  },
  {
    path: 'savePost',
    component: SavePostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listPost',
    component: ListPostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
