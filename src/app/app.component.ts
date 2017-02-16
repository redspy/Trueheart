import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
//import { StatusBar, Splashscreen } from 'ionic-native';//, AppAvailability, Device } from 'ionic-native';
import { FavoritePage } from '../pages/favorite/favorite'
import { PoemPage } from '../pages/poem/poem'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = PoemPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    // Left Menu Page title Name(by wonik)
    this.pages = [
      { title: '씨, 발아한다', component: PoemPage },
      { title: '책갈피', component: FavoritePage }
    ];

  }

  initializeApp() {
    /*
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    */
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
