import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { Business } from './business';
import { Category } from './category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {
  businesses: Business[];
  categories: Category[];

  constructor(private _firebaseService: FirebaseService ){ }

  ngOnInit(){
    this._firebaseService.getBusiness()
      .subscribe(businesses => {
        this.businesses = businesses;
      });

    this._firebaseService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
      });


  }


}
