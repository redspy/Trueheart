import { Injectable } from '@angular/core';
import data from '../assets/data/mydata.json';

@Injectable()
export class DataService {
    items: Array<{ id: string, title: string, body: string, image: string }>;
    images: string[];

    constructor() {
        this.items = [];
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
        for (let i = 0; i < data.poems.length; i++) {
            this.items.push({
                id: data.poems[i].id,
                title: data.poems[i].title,
                body: data.poems[i].body,
                image: this.images[Math.floor(Math.random() * this.images.length)]
            });
        }
        
    }

    getIndexbyID(id: string): number {
        return this.items.indexOf(this.items.find(myObj => myObj.id == id));
    }

    getIDbyIndex(index: number): string {
        return this.items[index].id;
    }
    getTitlebyIndex(index: number): string {
        return this.items[index].title;
    }

    getBodybyIndex(index: number): string {
        return this.items[index].body;
    }
    getImagebyIndex(index: number): string {
        return this.items[index].image;
    }
    getMaxCount(): number {
        return this.items.length;
    }

}