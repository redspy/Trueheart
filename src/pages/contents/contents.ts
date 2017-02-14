import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../services/dataService';

/*
  Generated class for the Contents page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contents',
  templateUrl: 'contents.html'
})
export class ContentsPage {
  @ViewChild(Nav) nav: Nav;
  titleList: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private dataService: DataService) {
  }

  ionViewDidLoad() {
    this.titleList = [];
    for (let i=0; i<this.dataService.getMaxCount(); i++) {
      this.titleList.push(this.dataService.getTitlebyIndex(i));
    }
    console.log('ionViewDidLoad ContentsPage');
  }

  selectPoem(page) {
    this.navParams.data.currentPage = this.dataService.getIndexbyTitle(page);
    this.navParams.data.slideChanged(null);
    this.navCtrl.pop();
  }
}
