import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Http } from '@angular/http';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private push: Push, public alertCtrl:AlertController, private http: Http) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      this.pushsetup();
      splashScreen.hide();
    });
  }

  pushsetup() {
    this.push.hasPermission().then((res: any) => {
      if (res.isEnabled) {
        
        const options: PushOptions = {
          android: {
            vibrate: true,
            topics: ['alldoctors']
          },
          ios: {
            alert: true,
            badge: true,
            sound: true,
            topics: ['alldoctors']
          },
          browser: {
           pushServiceURL: 'http://192.168.0.30/push/push.php'
          }
        };
    
        const pushObject: PushObject = this.push.init(options);

        /*pushObject.on("registration").subscribe((registration: any) => {
          var regPush = JSON.stringify({
            'id_paciente': 44,
            'push_token': registration.registrationId
          });
          this.http.post('http://admindesenv.alldoctors.com.br/public/api/push.php', regPush);
        });*/

        pushObject.on("registration").subscribe((registration: any) => {
          console.log('Registration ID: '+registration.registrationId);
        });

        pushObject.on('notification').subscribe((notification: any) => {
          console.log(JSON.stringify(notification));
          if (notification.additionalData.foreground) {
            let alert = this.alertCtrl.create({
              title: notification.title,
              message: notification.message
            });
            alert.present();
          }
        });
      }
    });
  }
}

