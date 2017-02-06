import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {}

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
