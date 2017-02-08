import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { LocalStorageModule } from 'angular-2-local-storage';
 import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { ExamplePagePage } from '../pages/example-page/example-page';
import { ExampleDetailPage } from '../pages/example-detail/example-detail';
import { ConfigService } from '../services/configService';
import { FavoritePage } from '../pages/favorite/favorite'


@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    ContactUsPage,
    ExamplePagePage,
    ExampleDetailPage,
    FavoritePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    LocalStorageModule.withConfig({
      prefix: 'trueheart',
      storageType: 'localStorage'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    ContactUsPage,
    ExamplePagePage,
    ExampleDetailPage,
    FavoritePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ConfigService]
})
export class AppModule {}
