import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    productsMock: any[] = Array(4).fill(null).map((el, i) => {
        return {
            main_picture: "assets/images/default/user.png",
            picture_1: "assets/images/default/user.png",
            picture_2: "assets/images/default/user.png",
            id: i + 1,
            name: "Producto número " + i + 1,
            description: "Producto genérico hecho genéricamente",
            price: 1200,
        }
    })

    constructor (
        private connectionService: ConnectionService,
    ) { }

    fetchProducts(categoryId: number): Promise<any> {

        return this.connectionService.getUrl('products?categori_id=' + categoryId);

        return new Promise((resolve) => {
            resolve({
                data: this.productsMock
            });
        })

    }



}
