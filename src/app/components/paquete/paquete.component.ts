import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'paquete',
  templateUrl: './paquete.component.html',
  styleUrls: ['./paquete.component.scss'],
})
export class PaqueteComponent implements OnInit {

  @Input() points: number = 0;

  @Input() bonus: number = 0;

  @Input() isActive: boolean = false;

  @Input() index: number = 0;

  @Output() selectPaquete = new EventEmitter<number>();

  bonusT = 0;

  constructor () { }



  ngOnInit() {
    this.bonusT = (this.points * this.bonus) / 100;
    this.bonusT = (this.points * 1) + this.bonusT;

  }



  emitIndex() {
    this.selectPaquete.emit(this.index);
  }

}
