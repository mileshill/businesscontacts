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


  getBusiness(){
    this.businesses = this._af.database.list('/businesses') as
    FirebaseListObservable<Business[]>
    return this.businesses;
  }


  getCategories(){
    this.categories = this._af.database.list('/categories') as
    FirebaseListObservable<Business[]>
    return this.categories;
  }





}