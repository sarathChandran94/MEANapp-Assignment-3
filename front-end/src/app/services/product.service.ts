import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    getProducts() {
        return this.http.get('http://localhost:5000/products')
    }

    newProduct(item) {
        // console.log(item)
        return this.http.post('http://localhost:5000/user/insert', item)
    }

    deleteProduct(item) {
        // console.log(item)
        return this.http.get('http://localhost:5000/user/delete/' + item)
    }

    editProduct(item) {
        return this.http.get('http://localhost:5000/user/edit/' + item)
    }

    editedProduct(item) {
        // console.log(item)
        return this.http.post('http://localhost:5000/user/edited/' + item._id, item)
    }
}
