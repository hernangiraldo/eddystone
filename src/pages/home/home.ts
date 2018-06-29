import { Component } from '@angular/core';
import { iBeacon } from './../../interfaces/iBeacon'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  beacons: iBeacon[];

  startScan() {
    evothings.eddystone.startScan(
      beacon => {
        let distance = evothings.eddystone.calculateAccuracy( beacon.txPower, beacon.rssi );
        let tempBeacon: iBeacon = {
          uid: this.toHexString( beacon['nid'] ? beacon['nid'] : '' ).toUpperCase(),
          instanceID: this.toHexString( beacon['bid'] ? beacon['bid'] : '' ).toUpperCase(),
          distance: distance
        };
        if (tempBeacon.instanceID) {
          console.log(tempBeacon);
        }
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }

  toHexString(byteArray) {
    return Array.from(byteArray, (byte: any) => {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
  }

}