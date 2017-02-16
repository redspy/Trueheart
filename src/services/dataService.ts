import { Injectable } from '@angular/core';
import data from '../assets/data/mydata.json';

@Injectable()
export class DataService {

    constructor() {}

    getIndexbyID(id: string): number {
        return data.poems.indexOf(data.poems.find(myObj => myObj.id == id));
    }

    getIDbyIndex(index: number): string {
        return data.poems[index].id;
    }
    getTitlebyIndex(index: number): string {
        return data.poems[index].title;
    }

    getBodybyIndex(index: number): string {
        return data.poems[index].body;
    }
    getImagebyIndex(index: number): string {
        return data.poems[index].image;
    }
    getMaxCount(): number {
        return data.poems.length;
    }
    getIndexbyTitle(title: string): number {
        return data.poems.indexOf(data.poems.find(myObj => myObj.title == title));
    }
    getAlignbyIndex(index: number): string {
        return data.poems[index].align;
    }

}