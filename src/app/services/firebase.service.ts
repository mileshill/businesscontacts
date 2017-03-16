import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Business } from '../business';
import { Category} from '../category';

import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseService {
  items: FirebaseListObservable<any[]>;
  businesses: FirebaseListObservable<Business[]>;
  categories: FirebaseListObservable<Category[]>;


  constructor( private _af: AngularFire ) { }


  /**
   * If category != null, filter business by category
   * Else return all business
   * 
   * @param {string} category
   * @return {FirebaseListObservable<Business[]>} FirebaseListObservable - business with category
   */
  getBusiness(category: string = null){
    if (category != null){
      this.businesses = this._af.database.list('/businesses', {
          query: {
            orderByChild: 'category',
            equalTo: category
          }
        }) as FirebaseListObservable<Business[]>
    return this.businesses;
    
    } else {
      
      this.businesses = this._af.database.list('/businesses') as
        FirebaseListObservable<Business[]>
        return this.businesses;
    }
  }// getBusiness


  /**
   * @return {FirebaseListObservable<Category[]>} FirebaseListObservable - all categories
   */
  getCategories(){
    this.categories = this._af.database.list('/categories') as
    FirebaseListObservable<Business[]>
    return this.categories;
  }

  addBusiness(newBusiness: Object){
    return this.businesses.push(newBusiness)
  }





}
