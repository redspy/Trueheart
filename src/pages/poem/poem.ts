import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, AlertController } from 'ionic-angular';
import data from '../../assets/data/mydata.json';
import { ConfigService } from '../../services/configService';
/*
  Generated class for the Poem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-poem',
  templateUrl: 'poem.html'
})
export class PoemPage {
  @ViewChild(Slides) slides: Slides;
  items: Array<{ id: string, title: string, body: string, image: string }>;
  images: string[];
  menuTitle: string;
  footerShow: boolean;
  fontSizeString: any;
  fontSize: any;
  favorite: boolean;
  viewLoaded: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private configService: ConfigService) {
    this.images = ['assets/img/pocket-watch-2036304_1920.jpg',
      'assets/img/european-eagle-owl-2010346_1280.jpg',
      'assets/img/orange-1995056_1280.jpg',
      'assets/img/white-tailed-eagle-2015098_640.jpg',
      'assets/img/skyscraper-1893201_640.jpg',
      'assets/img/sunrise-1756274_640.jpg',
      'assets/img/bullion-1744773_640.jpg',
      'assets/img/theater-1713816_640.jpg',
      'assets/img/sun-1654458_640.jpg',
      'assets/img/ring-1692713_640.jpg',
      'assets/img/wallpaper-1492818_640.jpg',
      'assets/img/children-1639420_640.jpg',
      'assets/img/background-1524540_640.jpg',
      'assets/img/clock-1516967_640.png',
      'assets/img/piano-keys-1090984_640.jpg',
      'assets/img/clock-1392328_640.jpg',
      'assets/img/flame-1363003_640.jpg',
      'assets/img/snail-83672_640.jpg',
      'assets/img/abstract-1231889_640.jpg',
      'assets/img/fractal-1128622_640.jpg',
      'assets/img/landscape-982178_640.jpg',
      'assets/img/glass-1206584_640.jpg',
      'assets/img/tree-51358_640.png',
      'assets/img/panorama-1993645_1280.jpg'];

    this.itemAssign();
    if (configService.getLastPosition() != 0) {
      this.alectContinue();
    }
    this.fontSize = configService.getFontSize();
    this.fontSizeString = this.fontSize + 'rem';
    this.menuTitle = this.items[0].title;
    this.footerShow = false;
    //this.favorite = configService.getFavorite(this.slides.getActiveIndex().toString());
    this.favorite = false;
    this.viewLoaded = false;
  }

  alectContinue() {
    let alert = this.alertCtrl.create({
      title: '성현의 말씀',
      message: '이전에 보던 페이지로 갈까요?',
      buttons: [
        {
          text: '싫어',
          role: 'cancel',
          handler: () => {
            // this.slides.slideTo(0, 2000, false);
          }
        },
        {
          text: '가자',
          handler: () => {
            this.slides.slideTo(this.configService.getLastPosition(), this.configService.getLastPosition() * 20, false);
            let currentIndex = this.slides.getActiveIndex();
            this.menuTitle = this.items[currentIndex].title;
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PoemPage');
  }

  ngAfterViewInit() {
    // this.slides.slideTo(30, 2000, false);
  }
  ngAfterContentChecked() {
    this.viewLoaded = true;
  }

  itemAssign() {
    this.items = [];

    for (let i = 0; i < data.poems.length; i++) {
      this.items.push({
        id: data.poems[i].id,
        title: data.poems[i].title,
        body: data.poems[i].body,
        image: this.images[Math.floor(Math.random() * this.images.length)]
      });
    }
  }
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    this.menuTitle = this.items[currentIndex].title;
    this.configService.setLastPosition(currentIndex);
    this.favorite = this.configService.getFavorite(this.slides.getActiveIndex().toString());
    console.log("Current index is", currentIndex);
  }
  changeFontSize(option: string) {
    if (option == 'up') {
      this.fontSize = this.fontSize + 0.1;
    } else {
      if (this.fontSize > 1.0) {
        this.fontSize = this.fontSize - 0.1;
      }
    }
    this.fontSizeString = this.fontSize + 'rem';

    this.configService.setFontSize(this.fontSize);
    console.log(this.fontSize);
  }
  
  tapEvent(e) {
    if (this.viewLoaded) {
      this.footerShow = !this.footerShow;
      this.favorite = this.configService.getFavorite(this.slides.getActiveIndex().toString());
    }
  }

  toggleFavorite() {
    this.favorite = !this.favorite;
    this.configService.setFavorite(this.items[this.slides.getActiveIndex()].id, this.favorite);
  }
}
