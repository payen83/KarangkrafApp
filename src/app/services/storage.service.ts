import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  itemList: any;
  constructor(private storage: Storage) { }

  setItemList(data: any){
    this.itemList = data;
  }

  getItemDetail(item_id: number){
    let itemData: any = this.itemList.find((item: any) => item.item_id == item_id );
    return itemData;
  }

  async setDataStorage(key: string, value: any){
    try {
      return await this.storage.set(key, JSON.stringify(value));
    } catch (err: any) {
      alert('ERROR: ' + err);
    }
  }

  async getDataStorage(key: any){
    await this.storage.create();
    let data: any = await this.storage.get(key);
    console.log('Data Storage ==> ', JSON.parse(data));
    return JSON.parse(data);
    // if(data){
    //   this.staffList = JSON.parse(data);
    // }
  }

}
