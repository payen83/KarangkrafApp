import { Component, ViewChild } from '@angular/core';
import { Network } from '@capacitor/network';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  barcodeText: any;
  showContent: boolean = true;
  constructor(private apiService: ApiService) {

  }

  // ionViewWillEnter(){
  //   let data: any = this.apiService.getBarcode();
  //   this.barcodeText = data;
  //   alert(data);
  //   // if(data){
  //   //   this.barcodeText = data;
  //   //   // this.apiService.setBarcode(null);
  //   // }
  // }

  // ionModalWillPresent(){
  //   this.scanBarcode();
  // }

  // onWillDismiss(event: any){

  // }

  cancel(){
    this.showContent = true;
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }

  async checkNetwork(){
    const status = await Network.getStatus();
    alert('Network Status: ' + JSON.stringify(status));
  }

  async scanBarcode(){
    this.showContent = false;
    await BarcodeScanner.checkPermission({ force: true });
    
    BarcodeScanner.hideBackground();

    document.querySelector('body').classList.add('scanner-active');

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
    
    document.querySelector('body').classList.remove('scanner-active');
    
    this.showContent = true;
    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
      this.barcodeText = result.content;
      // this.modal.dismiss();
    } else {
      alert('Invalid barcode. Please try again');
    }

  }


}
