import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html'
})
export class ProductsPageComponent implements OnInit {

  public products$: Observable<Product[]>;

  constructor(private data: DataService) {
   }

  ngOnInit(): void {
    this.products$ =  this.data.getProducts();
  }

}
