import { Product } from './../product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  product: any = {};
  id: string;
  constructor(private productService: ProductService, 
      private router:Router,private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.productService.readById(this.id).subscribe(prod => {
      this.product = prod;
    });

  }


  updateProduct(): void{
    this.productService.update(this.product, this.id).subscribe(() => {
      this.productService.showMessage('Produto Atualizado com sucesso!');
    });
    this.router.navigate(['/products']);
  }

  cancel():  void{
    this.router.navigate(['/products']);
  }

}
