import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Ensure this exists
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent // Declare only AppComponent here, feature components go in their respective modules
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule // Import the AuthModule which contains Login, Register, and Forgot Password components
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
