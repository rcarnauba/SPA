import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Usuario } from './usuario';
@Injectable()
export class DataService {

  private apiAutenticacaoUrl = 'http://localhost:58655/api/Autenticacao';
  private apiProdutoUrl = 'http://localhost:58655/api/Produto';
  private produtos = new BehaviorSubject<any>(['Item1','Item2','Item3']);
  produto = this.produtos.asObservable();
  _data: String = null;
  constructor(private http : Http) { }

  listarProdutos(token)
  {
    let headers = new Headers({ 'Content-Type': 'application/json','Authorization':token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiProdutoUrl,options)
    .map(res => res.json())
    .catch(this.handleError);
  }

  login(email, senha)
  {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const body = JSON.stringify({email: email,senha:senha}); 
    return this.http.post(this.apiAutenticacaoUrl, body,options).map(res => res.json())
    .map(res => res.json())
    .catch(this.handleError);
  }

  public handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}

