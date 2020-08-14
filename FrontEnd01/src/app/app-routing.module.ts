import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainquizComponent } from './mainquiz/mainquiz.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { QuizGuard } from './guards/quiz.guard';
import { LogInGuard } from './guards/log-in.guard';
import { SkipLemitExededComponent } from './skip-lemit-exeded/skip-lemit-exeded.component';
import { CheatingComponent } from './cheating/cheating.component';


const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full"},
  { path: "home", component: LoginComponent, canActivate:[LogInGuard]},
  { path: "quiz", component: MainquizComponent,canActivate:[QuizGuard], canDeactivate:[QuizGuard]},
  { path: "**", component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
