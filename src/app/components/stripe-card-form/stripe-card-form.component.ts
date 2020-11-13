import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { AlertService } from '../../services/alert/alert.service';
import { CONSTANTES } from '../../constants/constants';
import { StripeService } from '../../services/stripe/stripe.service';
import { AppSettings } from 'src/app/app.settings';

declare var Conekta: any;

function cantidad(num: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {

    const forbidden = ((control.value + '').length === num);

    return forbidden ? null : { cantidad: { value: control.value } };
  };
}
function rand(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {

    const forbidden = ((control.value + '').length >= min && (control.value + '').length <= max);

    return forbidden ? null : { rand: { value: control.value } };
  };
}

@Component({
  selector: 'app-stripe-card-form',
  templateUrl: './stripe-card-form.component.html',
  styleUrls: ['./stripe-card-form.component.scss'],
})
export class StripeCardFormComponent implements OnInit {
  tokenCardLaser: string;
  tokenCardNutry: string;
  storeCardForm: FormGroup;

  onSubmit: boolean = false;
  recargar = false;
  brand: string;
  errorHandler = function (err) {
    /* err keys: object, type, message, message_to_purchaser, param, code */
    console.log(err);
  };
  constructor (
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private stripeService: StripeService
  ) {
    this.storeCardForm = this.formBuilder.group({
      number: ['', [Validators.required]],
      exp_year: ['', [Validators.required, cantidad(4)]],
      exp_month: ['', [Validators.required, cantidad(2)]],
      cvc: ['', [Validators.required, rand(3, 4)]],
      name: ['', [Validators.required]]
    });

  }
  formatecard = (match, p1, p2, p3, p4, p5, offest, string, grups) => {
    console.log("-------------------------");
    console.log(match);
    console.log(p1);
    console.log(p2);
    console.log(p3);
    console.log(p4);
    console.log(p5);
    console.log(offest);
    console.log(string);
    console.log(grups);
    return p4;
  }
  ngOnInit() {
    this.storeCardForm.get("exp_year").valueChanges.subscribe(val => {
      const v = (val + '').replace(/\D/g, '');
      this.storeCardForm.get('exp_year').patchValue(v, { emitEvent: false });
    });
    this.storeCardForm.get("exp_month").valueChanges.subscribe(val => {
      const v = (val + '').replace(/\D/g, '');
      this.storeCardForm.get('exp_month').patchValue(v, { emitEvent: false });
    });

    this.storeCardForm.get("number").valueChanges.subscribe(val => {
      const v = (val + '').replace(/\D/g, '');
      this.brand = Conekta.card.getBrand(v);
      const expre = /(\d{4})/g

      this.storeCardForm.get('number').patchValue(v.replace(expre, '$1-').replace(/-$/g, ''), { emitEvent: false });
    });
    this.storeCardForm.get("cvc").valueChanges.subscribe(val => {
      const v = (val + '').replace(/\D/g, '');
      this.storeCardForm.get('cvc').patchValue(v, { emitEvent: false });
    });



  }

  closeModal() {
    this.modalCtrl.dismiss({ recargar: this.recargar })
  }

  async addCard() {


    if (this.storeCardForm.invalid) {
      this.alertService.alertError(CONSTANTES.MESSAGES.campos);
      return
    }
    this.onSubmit = true;
    const Er = this.stripeService.errorCard.subscribe((er: any) => {
      this.alertService.alertError(er);
      Er.unsubscribe();
      sub1.unsubscribe();
      sub2.unsubscribe();
      this.onSubmit = false;

    });
    const sub1 = this.stripeService.laserToken.subscribe(async (res: string) => {
      sub1.unsubscribe();
      this.tokenCardLaser = res;
      /*       const valores = {
              ...this.storeCardForm.value,
              tokenCardNutry: this.tokenCardNutry,
              tokenCardLaser: this.tokenCardLaser
            }; */

      try {
        const valores = {
          token_card_laser: this.tokenCardLaser,
          token_card_nutry: this.tokenCardNutry,
          card_number: (this.storeCardForm.value.number as string).substr(-4),
          brand: Conekta.card.getBrand(this.storeCardForm.value.number)
        }

        let req = await this.stripeService.registerStripeCard(valores);
        this.alertService.alertSuccess('Tarjeta añadida exitosamente');
        this.recargar = true;
        setTimeout(() => {
          this.closeModal();
        }, 1500);
      } catch (error) {
        this.alertService.alertError(CONSTANTES.MESSAGES.error);
      } finally {
        this.onSubmit = false;
      }

    });
    const sub2 = this.stripeService.nutriToken.subscribe((res: string) => {
      this.tokenCardNutry = res;
      sub2.unsubscribe();
      this.stripeService.createTokenLaser({
        card: this.storeCardForm.value
      });
    });




    this.stripeService.createTokenNutri({
      card: this.storeCardForm.value
    });
  }

}
