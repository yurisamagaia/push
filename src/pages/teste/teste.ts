import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  template:
  `<ion-header>
    <ion-navbar>
        <ion-title>
        Pagina 2
        </ion-title>
    </ion-navbar>
    </ion-header>

    <ion-content padding>
    The world is your oyster.
    <p>
        If you get lost, the <a href="http://ionicframework.com/docs/v2">docs</a> will be your guide.
    </p>
    </ion-content>`
})
export class TestePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
  }
}
