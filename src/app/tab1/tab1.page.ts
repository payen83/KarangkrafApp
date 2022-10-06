import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  staffList: Array<any>;
  person: any;
  constructor(private storageService: StorageService) {
    this.person = { name: null, staffNumber: null };

    this.staffList = [
      { name: "Ali bin Abu", staffNumber: "23987657" },
      { name: "Alex Lim", staffNumber: "8854329" },
      { name: "Kamala Muthusamy", staffNumber: "3321779" }
    ];
    // console.log(this.staffList);
  }

  async ngOnInit() {
   let data: any = await this.storageService.getDataStorage('STAFF');
   if(data){
    this.staffList = data;
   }
  }

  submitData(){
    this.staffList.push(this.person);
    this.person = { name: null, staffNumber: null };
    this.storageService.setDataStorage('STAFF', this.staffList);
  }
  
  // async setDataStorage(){
  //   try {
  //     return await this.storage.set('STAFF', JSON.stringify(this.staffList));
  //   } catch (err: any) {
  //     alert('ERROR: ' + err);
  //   }
  // }

  // async getDataStorage(){
  //   await this.storage.create();
  //   let data: any = await this.storage.get('STAFF');
  //   console.log('Data Storage ==> ', JSON.parse(data));
  //   if(data){
  //     this.staffList = JSON.parse(data);
  //   }
  // }

}
