import { Component, OnInit } from '@angular/core';
import { ProductModel } from "../product-list/product.model";
import { ProductService } from "../services/product.service";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    title: string = 'Product List';
    products: ProductModel[];
    imageHeight: number = 200;
    imageMargin: number = 2;
    showImage: boolean = true;
    addBook: boolean = false;
    editBook: boolean = false;

    constructor(private productService: ProductService, private authService: AuthService, private router: Router) { }
    productItem = new ProductModel(null, null, null, null, null, null, null, null)
    editItem = new ProductModel(null, null, null, null, null, null, null, null)


    ngOnInit(): void {
        this.productService.getProducts().subscribe((data) => {
            this.products = JSON.parse(JSON.stringify(data));
        });

    }

    loggedIn() {
        return this.authService.loggedIn();
    }

    imageToggle() {
        this.showImage = !this.showImage;
    }

    addProduct() {
        this.productService.newProduct(this.productItem).subscribe(
            res => {
                this.productService.getProducts().subscribe((data) => {
                    this.products = JSON.parse(JSON.stringify(data));
                });
            },
            err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.router.navigate(['/login'])
                    }
                }
            }
        );

        this.addBook = false;
    }

    addBookToggle() {
        this.addBook = !this.addBook;
    }

    // deleteProduct(item) {
    //     this.productService.deleteProduct(item).subscribe((data) => {
    //         this.productService.getProducts().subscribe((data) => {
    //             this.products = JSON.parse(JSON.stringify(data));
    //         });
    //     });
    // }


    deleteProduct(item) {
        this.productService.deleteProduct(item).subscribe(
            res => {
                this.productService.getProducts().subscribe((data) => {
                    this.products = JSON.parse(JSON.stringify(data));
                });
            },
            err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.router.navigate(['/login'])
                    }
                }
            }
        );
    }

    editBookToggle() {
        this.editBook = !this.editBook;
    }

    editProduct(item) {
        console.log(item)
        this.productService.editProduct(item).subscribe(
            res => {
                console.log(res)
                this.editItem = JSON.parse(JSON.stringify(res));
            },
            err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.router.navigate(['/login'])
                    }
                }
            }
        );
    }

    editedProduct() {
        this.productService.editedProduct(this.editItem).subscribe(
            res => {
                this.productService.getProducts().subscribe((data) => {
                    this.products = JSON.parse(JSON.stringify(data));
                });
            },
            err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.router.navigate(['/login'])
                    }
                }
            }

        );
        this.editBook = false;
    }

}
