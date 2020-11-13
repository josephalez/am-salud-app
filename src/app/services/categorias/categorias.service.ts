import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';

@Injectable({
    providedIn: 'root'
})
export class CategoriasService {

    categoriesMock: any[] = Array(5).fill(null).map((el, i) => {
        let index = i + 1;

        return {
            name: "Categoría " + index,
            id: index,
        }

    });

    constructor (
        private connectionService: ConnectionService,
    ) { }

    fetchCategories(): Promise<any> {

        return this.connectionService.getUrl('products/categroia');

        return new Promise((resolve) => {
            resolve({
                data: this.categoriesMock
            });
        })

    }

}
