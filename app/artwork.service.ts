import { Injectable } from '@angular/core';

import { Art } from './art';
import { COOKIES } from './mock-cookies';

@Injectable ()

export class ArtWorkService {
  getCookies():Promise<Art[]> {
    return Promise.resolve(COOKIES);
  }
  getCookiesSlowly():Promise<Art[]> {
    return new Promise<Art[]>(resolve =>
      setTimeout(resolve, 2000)) // delay 2 seconds
      .then(this.getCookies);
  }
  getArtWork(id:number):Promise<Art> {
    if (id < 1000) {
      return this.getCookies()
                .then(cookies => cookies.find(cookie => cookie.id === id));
    }
    return this.getCookies()
                .then(cookies => cookies.find(cookie => cookie.id === id));
  }
}