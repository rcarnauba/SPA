import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Usuario }    from '../usuario';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email : string = "";
  senha : string = "";
  _dataReturn:  string = "";;
  _erro:  string = "";;

  constructor(private _data: DataService,private cookieService: CookieService,private router: Router ) { }
  ngOnInit() {}

  login()
  {
    this.cookieService.delete('AutToken');
     let obs = this._data.login(this.email,this.senha);
    obs.subscribe(
      data => {
        this.cookieService.set('AutToken',data);
        this._dataReturn = data;
        this._erro = "";
        this.router.navigate(['produto'])
        },
        err => {
          this._dataReturn = "";
          this._erro = "Favor, verifique a conexão com a API: " + err;
        }
    ); 
  }
}
