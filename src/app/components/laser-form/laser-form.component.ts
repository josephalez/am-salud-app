import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, ValidationErrors, Validators } from '@angular/forms';

export const validarFecha: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const radiation = control.get('radiation');
  const date = control.get('date');
  let invali = false;

  if (radiation.value) {
    if (date.value === null) {
      invali = true;
    }
  }

  return invali ? { 'validarFecha': true } : null;
};


@Component({
  selector: 'laser-form',
  templateUrl: './laser-form.component.html',
  styleUrls: [
    './laser-form.component.scss',
    '../../styles/clinics-style.scss',
    "../../styles/table-style.scss",
  ],
})
export class LaserFormComponent implements OnInit {

  laserForm: FormGroup

  @Output() continue: any = new EventEmitter;
  @Output() regresar: any = new EventEmitter;

  @Input() mostrar: boolean = false;
  constructor (
    private formBuilder: FormBuilder
  ) {
    this.laserForm = this.formBuilder.group({
      sun: [false],
      medical: [false],
      radiation: [false],
      sensible_skin: [false],
      hormonal: [false],
      external_product: [false],
      menstruation: [false],
      date: [null],
    }, { validator: validarFecha })
  }
  get radiation() {
    return this.laserForm.value.radiation;
  }

  ngOnInit() { }

  setVals(labelValue) {
    this.laserForm.patchValue({
      [labelValue]: !this.laserForm.controls[labelValue].value
    })
  }

  continueEmit() {

    this.continue.emit(this.laserForm.value);
  }
  backButton() {
    this.regresar.emit();
  }
}
