import { Product } from './../product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  product: any = {};
  id:string;
  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.productService.readById(this.id).subscribe( prod => {
      this.product = prod;
    });
  }

  deleteProduct():void
  {
    this.productService.delete(`${this.id}`).subscribe(() => {
      this.productService.showMessage('Produto Excluido com sucesso!')
    });
    this.router.navigate(['/products']);
  }

  cancel():void
  {
    this.router.navigate(['/products']);
  }

}
