import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  produtos = [];
  _erro : any = {};
  constructor(private _data: DataService,private cookieService: CookieService,private router: Router) { }

  ngOnInit() 
  {
    if(this.cookieService.get('AutToken') != "")
      {
        let res = this._data.listarProdutos(this.cookieService.get('AutToken'));   
        
        res.subscribe(
          data => {
            this.produtos = data;
            this._erro = "";},
            err => {
              this._erro = err;
              this.router.navigate(['login']);
            }
        );
      }
    else
    {
      this.router.navigate(['login']);
    }
  }
}
