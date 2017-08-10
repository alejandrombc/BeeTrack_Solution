import { Component, Injectable } from '@angular/core'
import { Http, Headers} from '@angular/http';

// Servicio global para ser accedido por el body

@Injectable()
export class GlobalService {

	public search = null; //Contendra la busqueda
	
	constructor(public http: Http) {
	}
}