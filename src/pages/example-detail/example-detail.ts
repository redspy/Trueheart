import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ConfigService } from '../../services/configService';

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
  fontSizeString: any;
  fontSize: any;
  favorite: boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public toastCtrl: ToastController,
              private configService: ConfigService) {
    this.selectedItem = navParams.get('item');
    if (configService.getFontSize() < 1.4) {
      this.configService.setFontSize(1.4);  
    }
    this.fontSize = configService.getFontSize();
    this.fontSizeString = this.fontSize + 'rem';
    this.favorite = configService.getFavorite(this.selectedItem.id);
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

    this.favorite = !this.favorite;
    this.configService.setFavorite(this.selectedItem.id, this.favorite);
  }

  toggleFavorite() {
    let toast = this.toastCtrl.create({
      message: this.favorite ? '즐겨찾기 삭제' : '즐겨찾기 추가',
      duration: 2000,
      position: 'bottom'
    });
    toast.present(toast);
    this.favorite = !this.favorite;
    this.configService.setFavorite(this.selectedItem.id, this.favorite);
  }

  changeFontSize(option: string) {
    if (option == 'up') {
      this.fontSize = this.fontSize + 0.1;
    } else {
      if (this.fontSize > 1.4) {
        this.fontSize = this.fontSize - 0.1;
      }
    }
    this.fontSizeString = this.fontSize + 'rem';

    this.configService.setFontSize(this.fontSize);
    console.log(this.fontSize);
  }
}
