import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { AlertService } from '../../services/alert/alert.service';
import { CONSTANTES } from '../../constants/constants';
import { ProductService } from '../../services/product/product.service';
import { ModalController } from '@ionic/angular';
import { DetailedProductComponent } from '../../components/detailed-product/detailed-product.component';
import { CartcomponetComponent } from './cartcomponet/cartcomponet.component';
import { CartService } from 'src/app/services/carts/cart.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {

  selectedCategory: number = null;

  products: any[] = [];
  categories: any[] = [];

  constructor (
    private categoriesService: CategoriasService,
    private alertService: AlertService,
    private productService: ProductService,
    private modalCtrl: ModalController,
    private cartService: CartService,
  ) {
    this.cartService.getCart().then();
  }

  async ngOnInit() {
    await this.getCategories();

  }

  async getCategories() {
    try {
      let req = await this.categoriesService.fetchCategories();
      this.categories = req.data;
      if (this.categories.length) {
        await this.selectCategory(0);
      } else {
        await this.selectCategory(-1);
      }
    } catch (error) {
      this.alertService.alertError(CONSTANTES.MESSAGES.error);
    }
  }

  async selectCategory(categoryIndex: number) {
    this.selectedCategory = categoryIndex;
    let categoryId = -1;
    if (categoryIndex > -1) {
      let category = this.categories[categoryIndex];
      categoryId = category.id;
    }
    try {
      let req = await this.productService.fetchProducts(categoryId);

      this.products = req.data.data
    } catch (error) {
      this.alertService.alertError(CONSTANTES.MESSAGES.error);
    }
  }
  async openProduct(product) {
    let modal = await this.modalCtrl.create({
      component: DetailedProductComponent,
      mode: "ios",
      cssClass: 'confirm-modal',
      showBackdrop: false,
      componentProps: {
        'producto': product
      }
    });
    await modal.present();
    modal.onDidDismiss().then((data: any) => {
      if (data.data.opencard) {
        this.onVoted();
      }

    })
  }
  async onVoted() {
    let modal = await this.modalCtrl.create({
      component: CartcomponetComponent,
      mode: "ios",
      cssClass: 'confirm-modal',
      showBackdrop: false,
      /*             componentProps: {
                      'producto': product
                  } */
    });
    await modal.present();
  }
}
