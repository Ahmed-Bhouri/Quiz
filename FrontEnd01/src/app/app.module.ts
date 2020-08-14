import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FinishedComponent } from './finished/finished.component';
import { CheatingComponent } from './cheating/cheating.component';
import { StartquizComponent } from './startquiz/startquiz.component';
import { MainquizComponent } from './mainquiz/mainquiz.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { SkipLemitExededComponent } from './skip-lemit-exeded/skip-lemit-exeded.component';

@NgModule({
  declarations: [
    AppComponent,
    FinishedComponent,
    CheatingComponent,
    StartquizComponent,
    MainquizComponent,
    LoginComponent,
    NotfoundComponent,
    LoaderComponent,
    SkipLemitExededComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LottieModule.forRoot({ player: playerFactory }) 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



export function playerFactory() {
  return player;
}