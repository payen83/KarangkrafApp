import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Network } from '@capacitor/network';
import { PushNotifications } from "@capacitor/push-notifications";
import { FCM } from "@capacitor-community/fcm";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  connected: boolean = true;
  constructor(private platform: Platform) {
    this.initApp();
  }

  async setPushNotifications(){
    await PushNotifications.requestPermissions();
    await PushNotifications.register();
    FCM.getToken()
    .then((r) => {
      alert(`Token ${r.token}`)
      console.log(`Token ${r.token}`);
  })
    .catch((err) => console.log(err));
  }

  initApp(){
    this.platform.ready().then(() => {
      this.setPushNotifications();

      Network.addListener('networkStatusChange', status => {
        console.log('Network status changed', JSON.stringify(status));
        // alert('Connection changed: ' + JSON.stringify(status));
        if(!status.connected){
          alert('No internet connection!');
          this.connected = false;
        } else {
          if(!this.connected){
            alert('Your internet connection is back!');
            this.connected = true;
          }
        }


      });
    });
  }
}
