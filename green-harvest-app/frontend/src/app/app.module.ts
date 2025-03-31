import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AuthenticationModule } from './authentication/authentication.module';
import { SharedModule } from './shared/shared.module';
import { AuthRoutingModule } from './authentication/auth-routing.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthenticationModule,
    SharedModule,
    RouterOutlet,
    BrowserModule,
    CommonModule,
    AuthRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
