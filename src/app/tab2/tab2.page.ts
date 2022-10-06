import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  itemList: Array<any>;
  @ViewChild(IonModal) modal: IonModal;
  item: any;
  constructor(
    private apiService: ApiService,
    private storageService: StorageService
    ) {
    this.itemList = [];
    this.resetData();
  }

  ngOnInit(){
    this.apiService.httpGet('/get-all-inventory')
    .then((response: any) => {
      // console.log("data received ==> ", response);
      this.itemList = response.feedData;
      this.storageService.setItemList(this.itemList);
    }).catch((err: any) => { console.log(err) })
  }

  cancel(){
    this.resetData();
    this.modal.dismiss(null);
  }

  resetData(){
    this.item = { 
      name: null,
      serial_number: null,
      description: null,
      category: null
    }
  }

  confirm(){
    if (this.item.name && this.item.description && this.item.serial_number && this.item.serial_number) {
      this.modal.dismiss(this.item);
    } else {
      alert('Please enter all data');
    }
  }

  onWillDismiss(event: any){
    console.log(event);
    const data: any = event.detail.data;
    let payload: any = {
      user_id: 9,
      token: '0c8edd1587d43606e35f53eebdb62d1ca9ef7282c409c0071b63bd95c019431d',
      name: data.name,
      category: data.category,
      description: data.description,
      serial_number: data.serial_number
    }

    this.apiService.httpPost('/create-inventory', payload)
    .then((response: any) => {
      console.log("Successful! ==> ", response);
      this.itemList.push(this.item);
      this.resetData();
    }).catch((err: any) => { console.log(err) })

  }


}
