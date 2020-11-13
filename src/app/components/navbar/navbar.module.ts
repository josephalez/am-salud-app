import { NgModule } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';

@NgModule({
    imports:[
        CommonModule,
        IonicModule,
    ],
    declarations:[
        NavbarComponent
    ],
    exports:[
        NavbarComponent
    ]
})

export class NavbarModule{}