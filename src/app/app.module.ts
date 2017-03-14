import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Firebase
import { AngularFireModule } from 'angularfire2';

// Components
import { AppComponent } from './app.component';

// Styinling; Foundation 6


// Firebase config
export const firebaseConfig = {
  apiKey: "AIzaSyD-Ii3gI1wWh8JqGaq0IcTk9iPT4KPN1kY",
  authDomain: "businesscontacts-7870d.firebaseapp.com",
  databaseURL: "https://businesscontacts-7870d.firebaseio.com",
  storageBucket: "businesscontacts-7870d.appspot.com",
  messagingSenderId: "932974638403"
};



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
