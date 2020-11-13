import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { CartService } from 'src/app/services/carts/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  countCard = 0;
  @Input() title: string;
  @Input() cars: boolean = false;
  @Output() pulsar = new EventEmitter<boolean>();
  constructor (
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private cardServices: CartService
  ) {
    this.menuCtrl.enable(true, "amsMenu")
  }

  ngOnInit() {
    this.cardServices.countProduct.subscribe((res) => {
      this.countCard = res;
    });

  }

  openProfile() {
    this.navCtrl.navigateBack("/perfil");
  }

  getTitle() {
    return this.title.toUpperCase()
  }

  openMenu() {
    this.menuCtrl.open();
  }
  showCard() {
    this.pulsar.emit(true);
  }
}
