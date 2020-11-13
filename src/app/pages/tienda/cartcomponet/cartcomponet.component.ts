import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from 'src/app/services/carts/cart.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardService } from 'src/app/services/card/card.service';
import { StripeCardFormComponent } from 'src/app/components/stripe-card-form/stripe-card-form.component';
import { CreditService } from 'src/app/services/credit/credit.service';
import { Router } from '@angular/router';
import { CheckoutConfirmComponent } from '../../../components/checkout-confirm/checkout-confirm.component';

@Component({
  selector: 'app-cartcomponet',
  templateUrl: './cartcomponet.component.html',
  styleUrls: ['./cartcomponet.component.scss', "../../../styles/clinics-style.scss",
    "../../../styles/table-style.scss",
    "../../../styles/payments-style.scss",
    "../../../styles/reserve-style.scss"],
})
export class CartcomponetComponent implements OnInit {
  products: any[];
  total2 = 0;
  countCard = 0;
  cartForm: FormGroup;
  cards: any = [];
  tipoEnvio: string = 'sucursal';
  activePayment: number = null;
  typePaymentConekta = 3;
  typepayment: number = null;
  saldoE = 0;
  constructor (
    private modalCtrl: ModalController,
    private cartService: CartService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private cardservice: CardService,
    private creditService: CreditService,
    private router: Router,
  ) {
    this.cartForm = this.formBuilder.group({
      calle: ['', Validators.required],
      numExt: ['', Validators.required],
      numInt: ['', Validators.required],
      cp: ['', Validators.required],
      colonia: ['', Validators.required],
      municipio: ['', Validators.required],
    })
  }
  
  pagar() {
    let card_id = null;
    if (this.typepayment === this.typePaymentConekta) {
      card_id = this.cards[this.activePayment].id;
    }

    let params = {
      card_id,
      typepayment: this.typepayment,
    };

    console.log(params);
    console.log(this.typepayment);

    if(this.tipoEnvio == 'domicilio'){
      if(this.cartForm.invalid){
        this.alertService.alertError('rellene los campos de dircción de envío');
        return;
      }
      else{
        params={
          ...params,
          ...this.cartForm.value,
        }
      }
    }

    this.cartService.checkout(params).then(async (res) => {
      console.log(res);
      
      await this.congratsModal();
      
    }).catch((err) => {
      console.log(err);
    });
    // this.alertService.alertSuccess("El producto se cargo correctamente ");
  }

  ngOnInit() {
    this.getCartAll();
    this.cartService.countProduct.subscribe((res) => {
      this.countCard = res;
    });
    this.getCard();
    this.creditService.getSaldo().then((res) => {
      let sal = res.find((ele, index, ar) => {
        return ele.credit_id == 1
      });
      console.log(sal);
      if (typeof sal !== "undefined" && typeof sal.saldo !== "undefined") {
        this.saldoE = parseInt(sal.saldo);
      } else {
        this.saldoE = 0;
      }
      console.log(this.saldoE);
    });
  }
  async addCard() {

    let modal = await this.modalCtrl.create({
      component: StripeCardFormComponent,
      mode: "ios",
    });

    await modal.present();

    modal.onDidDismiss().then(() => { console.log("modal dismissed") })

  }
  async getCard() {
    const res = await this.cardservice.getCards();
    this.cards = res;
  }

  changeType($event) {
    this.tipoEnvio = $event.detail.value;

    this.activePayment = null;
    this.typepayment = null;

  }
  selectPayment(i: number, typepayment) {

    this.activePayment = i;
    this.typepayment = typepayment
  }
  async getCartAll() {
    let obj = this;
    let res = await this.cartService.getCart();
    console.log(res);
    this.products = res;
    obj.total2 = 0;
    this.products.forEach((element) => {
      console.log(element)
      console.log(parseFloat(element.price) * parseInt(element.pivot.cantidad));
      obj.total2 += parseFloat(element.price) * parseInt(element.pivot.cantidad);
    });
    this.mitotal(this.total2);
    //this.total = 50;
  }
  mitotal(t) {
    console.log(t);
  }
  total() {

    return this.total2;
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  add_cantidad(add, cantidad, id) {

    this.cartService.insertar({
      cantidad: parseInt(cantidad) + parseInt(add),
      product_id: id,
      no_sumar: true
    }).then((res) => {
      this.getCartAll();
      console.log(res);

    }).catch((e) => {
      console.log(e);
    });

  }

  async congratsModal() {
    let secondModal = await this.modalCtrl.create({
      component: CheckoutConfirmComponent,
      showBackdrop: false,
      cssClass: "confirm-modal",
      componentProps: {
        reservationType: 'normal'
      }
    });

    await secondModal.present();

    secondModal.onDidDismiss()
      .then(() => {
        this.getCartAll();
        this.closeModal();
        this.router.navigateByUrl('home');
      })
  }

}
