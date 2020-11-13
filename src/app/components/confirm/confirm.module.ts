import { NgModule } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { ConfirmComponent } from './confirm.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[ConfirmComponent],
    imports:[
        CommonModule,        
        IonicModule
    ],
    exports:[ConfirmComponent]
})

export class ConfirmModule {}