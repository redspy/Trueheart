import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { ContactUsPage } from '../pages/contact-us/contact-us'
import { ExamplePagePage } from '../pages/example-page/example-page'
import { FavoritePage } from '../pages/favorite/favorite'
import { PoemPage } from '../pages/poem/poem'
import { AuthorIntroductionPage} from '../pages/author-introduction/author-introduction'

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
      { title: '씨, 발', component: PoemPage },
      { title: '씨, 발아한다', component: ExamplePagePage },
      // { title: 'Page One', component: Page1 },
      // { title: 'Page Two', component: Page2 },
      { title: '즐겨찾기', component: FavoritePage },
      { title: '저자 소개', component: AuthorIntroductionPage },
      { title: 'Contact Us', component: ContactUsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
