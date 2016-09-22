import { Injectable } from '@angular/core';

import { Art } from './art';
import { ARTWORK } from './mock-artwork';


@Injectable ()

export class ArtworkService {

  getArtworks():Promise<any> {
    return Promise.resolve(ARTWORK);  // returns an array of artwork arrays
  }

  getSubset(category:number):Promise<Art[]> {
    return Promise.resolve(ARTWORK[category]);
  }

  getArtwork(id:number):Promise<Art> {
    let n = id, x = 1;
    // find first digit of id
    while (n > 1) {
      n /= 10;  
      x *= 10;
    }
    n = id % x;
    
    return this.getSubset(n-1)
                .then(subset => subset.find(art => art.id === id));
  }
}