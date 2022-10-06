import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  itemDetail: any = {
    name: null, 
    serial_number: null, 
    description: null,
    category: null,
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService
    ) { 
    let item_id: any = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(item_id);

    this.itemDetail = this.storageService.getItemDetail(item_id);
    
    console.log("item detail ==> ",this.itemDetail);

  }

  ngOnInit() {
  }

}
