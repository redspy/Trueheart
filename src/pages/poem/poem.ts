import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, AlertController, LoadingController } from 'ionic-angular';
import { ConfigService } from '../../services/configService';
import { DataService } from '../../services/dataService';
import { ContentsPage } from '../../pages/contents/contents'
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
  previewBody: string;
  focusBody: string;
  nextBody: string;
  currentPage: number;
  maxPage: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private configService: ConfigService,
    private dataService: DataService,
    public loadingCtrl: LoadingController) {

    this.previewBody = "";
    this.focusBody = "";
    this.nextBody = "";



    this.fontSize = configService.getFontSize();
    this.fontSizeString = this.fontSize + 'rem';

    this.footerShow = false;
    //this.favorite = configService.getFavorite(this.slides.getActiveIndex().toString());
    this.favorite = false;
    this.viewLoaded = false;
    this.onChangeData = false;
    this.maxPage = dataService.getMaxCount() - 1;
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
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
      if (this.configService.getLastPosition() != 0) {
        this.currentPage = this.configService.getLastPosition();
      }
      else {
        this.currentPage = 0;
      }

      //this.itemAssign(this.currentPage);
      this.slideChanged(null);
    }, 1000);

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

    //this.menuTitle = this.items[0].title;
  }

  itemAssign(currentIndex: number) {
    let middleIndex = 0;
    if (currentIndex == 0) {
      middleIndex = 1;
    }
    else if (currentIndex == this.maxPage) {
      middleIndex = this.maxPage - 1;
    }
    else {
      middleIndex = currentIndex;
    }
    this.previewBody = this.dataService.getBodybyIndex(middleIndex - 1);
    this.focusBody = this.dataService.getBodybyIndex(middleIndex);
    this.nextBody = this.dataService.getBodybyIndex(middleIndex + 1);

    this.menuTitle = this.dataService.getTitlebyIndex(this.currentPage);
    this.favorite = this.configService.getFavorite(this.currentPage.toString());
  }

  slideChanged(e) {
    if (this.onChangeData == false) {
      this.onChangeData = true;


      if (e) {
        let currentIndex = this.slides.getActiveIndex();
        if (currentIndex == 0) {
          this.currentPage = this.currentPage - 1;
        }
        else if (currentIndex == 2) {
          this.currentPage = this.currentPage + 1;
        }
        else if (currentIndex == 1) {
          if (this.currentPage == 0) {
            this.currentPage = this.currentPage + 1;
          }
          else if (this.currentPage == this.maxPage) {
            this.currentPage = this.currentPage - 1;
          }
        }
      }

      if (this.currentPage == 0) {
        this.slides.slideTo(0, 0);
      }
      else if (this.currentPage == this.maxPage) {
        this.slides.slideTo(2, 0);
      }
      else {
        this.slides.slideTo(1, 0);
      }
      this.configService.setLastPosition(this.currentPage);

      this.itemAssign(this.currentPage);
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

  pageChange(e) {
    this.currentPage = e.value;
    this.slideChanged(null);
  }

  toggleFavorite() {
    this.favorite = !this.favorite;
    this.configService.setFavorite(this.items[this.slides.getActiveIndex()].id, this.favorite);
  }

  showContents() {
    this.navCtrl.push(ContentsPage);
  }
}
