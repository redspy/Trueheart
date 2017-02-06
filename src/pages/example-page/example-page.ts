import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
/*
  Generated class for the ExamplePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-example-page',
  templateUrl: 'example-page.html'
})
export class ExamplePagePage {
  private data: any;

  public getData() {
    this.http.get('assets/data/mydata.json')
      .map((res) => res.json())
      .subscribe(data => {
        this.data = data;
      }, (rej) => { console.error("Could not load local data", rej) });
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private http: Http) {
    this.getData();
   this.load();
   }
load() {
      if (this.data) {
          // already loaded data
          return Promise.resolve(this.data);
      }

      // don't have the data yet
      return new Promise(resolve => {
          // We're using Angular Http provider to request the data,
          // then on the response it'll map the JSON data to a parsed JS object.
          // Next we process the data and resolve the promise with the new data.
          this.http.get('assets/data/mydata.json').subscribe(res => {
              // we've got back the raw data, now generate the core schedule data
              // and save the data for later reference
              this.data = res.json();
              resolve(this.data);
              console.log(this.data);
          });
      });
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExamplePagePage');
  }
  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: '닥쳐라 허원익',
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }
}
