import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

	products: Product;

  constructor(private productService: ProductService) {
  		// this.products = [];
  		this.getAllProducts();
   }

  ngOnInit() {
  }

  getAllProducts(): Product{
  	this.productService.getProducts().subscribe(
  		result => {
  			this.products = result;
  		});

  	return this.products;
  }

}
