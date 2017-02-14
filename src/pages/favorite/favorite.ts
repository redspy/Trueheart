import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../services/dataService';
import { ConfigService } from '../../services/configService';
import { PoemPage } from '../../pages/poem/poem';
/*
  Generated class for the Favorite page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html'
})
export class FavoritePage {
  titleList: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private dataService: DataService,
              private configService: ConfigService) {
  }

  ionViewDidLoad() {
    this.titleList = [];
    for (let i=0; i<this.dataService.getMaxCount(); i++) {
      if (this.configService.getFavorite(this.dataService.getIDbyIndex(i))) {
        this.titleList.push(this.dataService.getTitlebyIndex(i));
      }
    }
  }

  selectPoem(page) {
    this.configService.setLastPosition(this.dataService.getIndexbyTitle(page));
    this.navCtrl.setRoot(PoemPage);
  }

}
