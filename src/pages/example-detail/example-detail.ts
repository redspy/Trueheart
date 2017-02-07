import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ExampleDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-example-detail',
  templateUrl: 'example-detail.html'
})
export class ExampleDetailPage {
  selectedItem: any;
  fontSize: any;
  fontSizeInteger: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.selectedItem = navParams.get('item');
    this.fontSizeInteger = 1.4;
    this.fontSize = this.fontSizeInteger + 'rem';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExampleDetailPage');
  }
  showToast(messageString: string) {
    let toast = this.toastCtrl.create({
      message: messageString,
      duration: 2000,
      position: 'bottom'
    });
    toast.present(toast);
  }

  changeFontSize(option: string) {
    if (option == 'up') {
      this.fontSizeInteger = this.fontSizeInteger + 0.1;
    } else {
      this.fontSizeInteger = this.fontSizeInteger - 0.1;
    }
    this.fontSize = this.fontSizeInteger + 'rem';
  }
}
