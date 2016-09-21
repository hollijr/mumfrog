import { Injectable } from '@angular/core';

import { Art } from './art';
import { COOKIES } from './mock-cookies';

@Injectable ()

export class ArtworkService {

  getArtworks():Promise<Art[]> {
    return Promise.resolve(COOKIES);  // append all data together
  }

  getCookies():Promise<Art[]> {
    return Promise.resolve(COOKIES);
  }
  getCookiesSlowly():Promise<Art[]> {
    return new Promise<Art[]>(resolve =>
      setTimeout(resolve, 2000)) // delay 2 seconds
      .then(this.getCookies);
  }

  getArtwork(id:number):Promise<Art> {
    let sid = id.toString();
    if ( sid.charAt(0) === '1') {  // Cookie
      return this.getCookies()
                .then(cookies => cookies.find(cookie => cookie.id === id));
    }
    return this.getCookies()
                .then(cookies => cookies.find(cookie => cookie.id === id));
  }
}