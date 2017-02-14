import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { LocalStorageModule } from 'angular-2-local-storage';
import { MyApp } from './app.component';
// import { ContactUsPage } from '../pages/contact-us/contact-us';
// import { ExamplePagePage } from '../pages/example-page/example-page';
// import { ExampleDetailPage } from '../pages/example-detail/example-detail';
import { ContentsPage} from '../pages/contents/contents';
import { ConfigService } from '../services/configService';
import { FavoritePage } from '../pages/favorite/favorite';
import { PoemPage } from '../pages/poem/poem';
// import { AuthorIntroductionPage} from '../pages/author-introduction/author-introduction';
import { DataService } from '../services/dataService'

@NgModule({
  declarations: [
    MyApp,
    // ContactUsPage,
    // ExamplePagePage,
    // ExampleDetailPage,
    FavoritePage,
    PoemPage,
    // AuthorIntroductionPage,
    ContentsPage
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
    // ContactUsPage,
    // ExamplePagePage,
    // ExampleDetailPage,
    FavoritePage,
    PoemPage,
    // AuthorIntroductionPage,
    ContentsPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, ConfigService, DataService]
})
export class AppModule { }
