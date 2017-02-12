import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, AlertController } from 'ionic-angular';
import { ConfigService } from '../../services/configService';
import { DataService } from '../../services/dataService';

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
  onChangeData: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private configService: ConfigService, private dataService: DataService) {
    this.itemAssign(0);

    if (configService.getLastPosition() != 0) {
      //this.alectContinue();
    }
    this.fontSize = configService.getFontSize();
    this.fontSizeString = this.fontSize + 'rem';
    this.menuTitle = this.items[0].title;
    this.footerShow = false;
    //this.favorite = configService.getFavorite(this.slides.getActiveIndex().toString());
    this.favorite = false;
    this.viewLoaded = false;
    this.onChangeData = false;
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
    this.slides.speed = 0;
    // this.slides.loop = true;
    // this.slides.parallax = true;
    // this.slides.paginationType = "bullets";
    // this.slides.slideTo(30, 2000, false);
  }
  ngAfterContentChecked() {
    this.viewLoaded = true;
  }

  itemAssign(currentIndex: number) {
    this.items = [];

    let middleIndex = 0;
    if (currentIndex == 0) {
      middleIndex = 1;
    }
    else if (currentIndex == this.dataService.getMaxCount()) {
      middleIndex = this.dataService.getMaxCount() - 1;
    }
    else {
      middleIndex = currentIndex;
    }
    for (let i = -1; i < 2; i++) {
      this.items.push({
        id: this.dataService.getIDbyIndex(middleIndex + i),
        title: this.dataService.getTitlebyIndex(middleIndex + i),
        body: this.dataService.getBodybyIndex(middleIndex + i),
        image: ""
      });
    }
  }
  slideChanged() {
    if (this.onChangeData == false) {
      this.onChangeData = true;
      let currentIndex = this.slides.getActiveIndex();
      this.menuTitle = this.items[currentIndex].title || "";
      this.configService.setLastPosition(this.dataService.getIndexbyID(this.items[currentIndex].id));
      this.favorite = this.configService.getFavorite(this.dataService.getIndexbyID(this.items[currentIndex].id).toString());

      if (this.dataService.getIndexbyID(this.items[currentIndex].id) == 0) {
        this.slides.slideTo(0, 0);

      }
      else if (this.dataService.getIndexbyID(this.items[currentIndex].id) == this.dataService.getMaxCount()) {
        this.slides.slideTo(2, 0);
      }
      else {
        this.slides.slideTo(1, 0);
      }

      this.itemAssign(this.dataService.getIndexbyID(this.items[currentIndex].id));
      console.log("Current index is", currentIndex);
      this.onChangeData = false;
    }

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
