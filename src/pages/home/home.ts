import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { TestePage } from '../../pages/teste/teste';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  teste(){
    this.navCtrl.push(TestePage);
  }
}
