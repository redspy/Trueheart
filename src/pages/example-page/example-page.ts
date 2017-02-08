import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ExampleDetailPage } from '../../pages/example-detail/example-detail';
import data from '../../assets/data/mydata.json';

import { Content } from 'ionic-angular';
/*
  Generated class for the ExamplePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-example-page',
  templateUrl: 'example-page.html',
})
export class ExamplePagePage {

  selectedItem: any;
  items: Array<{ id: string, title: string, subtitle: string, body: string, image: string }>;
  imsages: string[];
  @ViewChild(Content) protected content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.itemAssign();
    //this.content.scrollToBottom(300);
    //let scrollContent = document.getElementById("ListContent");
    //scrollContent.scrollTo(100,0);
  }

  itemAssign() {
    this.items = [];
    this.imsages = ['assets/img/pocket-watch-2036304_1920.jpg', 'assets/img/european-eagle-owl-2010346_1280.jpg', 'assets/img/orange-1995056_1280.jpg', 'assets/img/panorama-1993645_1280.jpg'];
    for (let i = 0; i < data.poets.length; i++) {
      this.items.push({
        id: data.poets[i].id,
        title: data.poets[i].title,
        subtitle: data.poets[i].subtitle, 
        body: data.poets[i].body,
        image: this.imsages[Math.floor(Math.random() * this.imsages.length)]
      }); 
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ExampleDetailPage, {
      item: item
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
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.itemAssign();
      refresher.complete();
    }, 2000);
  }
}
