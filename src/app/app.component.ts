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

  /**
   * @param {Business} business -  business object
   * @param {Category} category -  category object
   * @param {string} appState - extended business info if 'more'
   * @param {string} filteredCategory - user selected business category 
   */
  businesses: Business[];
  categories: Category[];
  
  appState: string;
  activeKey: string;
  filteredCategory: string;


  constructor(private _firebaseService: FirebaseService ){ }

  /**
   * Load firebase services
   */
  ngOnInit(){
    // get all business
    this._firebaseService.getBusiness()
      .subscribe(businesses => {
        this.businesses = businesses;
      });

    // get all categories
    this._firebaseService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
      });
  }// ngOnInit


  /**
   * 
   * @param {string} state - if state == 'exteded' show business info else state == 'default'
   * @param {string} key - business attribute 
   */
  changeState(state, key): void {
    console.log('changing state to: '+ state);
    if(key){
      console.log('changing key to: '+key);
      this.activeKey = key;
    }
    this.appState = state;
  }

  /**
   * 
   * @param {string} category - filter business by category 
   */
  filterCategory(category): void {
    this._firebaseService.getBusiness(category)
      .subscribe(businesses => {
        this.businesses = businesses;
      })
  }

}
