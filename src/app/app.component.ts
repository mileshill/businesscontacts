import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { Business } from './business';
import { Category } from './category';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  businessForm: FormGroup;
  businesses: Business[];
  categories: Category[];
  
  appState: string;
  activeKey: string;
  filteredCategory: string;

  // vars for edit form
  activeCompany: string;
  activeCategory: string;
  activeYearsInBusiness: number;
  activeDescription: string;
  activePhone: string;
  activeEmail: string;
  activeStreetAddress: string;
  activeCity: string;
  activeState: string;
  activeZipcode: string;



  constructor(
    private _firebaseService: FirebaseService,
    private _formBuilder: FormBuilder ){}

  /**
   * Load firebase services
   */
  ngOnInit(){
    // initialize _formBuilder
    this.businessForm = this._formBuilder.group({
      company:  '',
      category: '',
      years_in_business: '',
      description: '',
      phone: '',
      email: '',
      street_address: '',
      city: '',
      state: '',
      zipcode: ''
    });


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
   * @param {string} state - 
   * @param {string} key - business attribute 
   */
  changeState(state: string, key: string = null): void {
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

  /**
   * 
   * @param form 
   */
  addBusiness(form){
    let created_at = new Date().toString();
    let newBusiness = form;
    newBusiness.created_at = created_at;

    this._firebaseService.addBusiness(newBusiness);
    this.changeState('default');
}

  /**
   * 
   * @param {object} business  
   */
  showEdit(business: Business){
    // update app state
    this.changeState('edit', business.$key);
    
    // capture values to prepopulate form
    this.activeCompany = business.company;
    this.activeCategory = business.category;
    this.activeYearsInBusiness = business.years_in_business;
    this.activeDescription = business.description;
    this.activePhone = business.phone;
    this.activeEmail = business.email;
    this.activeStreetAddress = business.street_address;
    this.activeCity = business.city;
    this.activeState = business.state;
    this.activeZipcode = business.zipcode;

    // create new instance of form with default values
    this.businessForm = this._formBuilder.group({
      company:  this.activeCompany || '',
      category: this.activeCategory || '',
      years_in_business: this.activeYearsInBusiness || '',
      description: this.activeDescription || '',
      phone: this.activePhone || '',
      email: this.activeEmail || '',
      street_address: this.activeStreetAddress || '',
      city: this.activeCity || '',
      state: this.activeState || '',
      zipcode: this.activeZipcode || ''
    });

  }


  updateBusiness(business: Business){
    // pass updated values to service
    this._firebaseService.updateBusiness(this.activeKey, this.businessForm.value);

    // return state to default
    this.changeState('default');
  }

  deleteBusiness(key:string){
    this._firebaseService.deleteBusiness(key);
  }


}
