import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';


@Injectable()
export class ConfigService {
    constructor(private localStorageService: LocalStorageService) {

    }

    getFontSize(): number {
        return this.localStorageService.get<number>('font-size');
    }

    setFontSize(size: number) {
        this.localStorageService.set('font-size', size);
    }

    setFavorite(id: string, favorite: boolean) {
        var favorites = JSON.parse(this.localStorageService.get<string>('favorites')) || {};
        favorites[id] = favorite;
        this.localStorageService.set('favorites', JSON.stringify(favorites));
    }

    getFavorite(id: string): boolean {
        var favorites = JSON.parse(this.localStorageService.get<string>('favorites')) || {};
        return favorites[id] || false;
    }

    getLastPosition(): number {
        return this.localStorageService.get<number>('LastPosition');
    }

    setLastPosition(position: number) {
        this.localStorageService.set('LastPosition', position);
    }

}