import { Component, OnInit } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { GlobalService } from '../globals.component';

@Component({
  selector: 'app-body-table',
  templateUrl: './body-table.component.html',
  styleUrls: ['./body-table.component.css']
})
export class BodyTableComponent implements OnInit {
  
	public contactos = [];
	public mas_contactos;
	public limit;
	public current_page;
	
	// Creo esta variable por el estilo que tiene el primer elemento de la tabla
	public primer_contacto; 

	constructor(public http: Http, private servicio: GlobalService) { 
		this.mas_contactos = true;
		this.limit = 5;
		this.current_page = 1;
		this.refreshContact("");
		this.primer_contacto = []
	}


	refreshContact(action){
		if(this.servicio.search == null){
			if(action == "next"){ this.current_page += 1; } //Click en "siguiente pagina"
			// En caso de pagina anterior
			else if(action == "before" && this.current_page > 1){ 
				this.mas_contactos = true;
				this.current_page -= 1;
			}
			
			if(this.mas_contactos){
				this.http.get('http://localhost:3000/api/users?_page='+this.current_page+'&_limit='+this.limit)
					.subscribe(res => {
								this.contactos = res.json(); //Respuesta del API
								if(this.contactos.length > 0){
									this.primer_contacto = this.contactos[0] //Obtengo el primero
									this.contactos.shift(); //Elimino el primero del arreglo
								} else { 
									// En caso de no tener mas "siguientes"
									this.mas_contactos = false;
									this.current_page -= 1; 
								}
					});
			}
		}else{
			//Obtengo el primero y lo elimino
			this.primer_contacto = this.servicio.search[0];
			this.servicio.search.shift();
			this.contactos = this.servicio.search;
			
			// this.servicio.search = [];

			// Actualizo variables para que no salgan los botones "Siguiente/Anterior"
			this.mas_contactos = false;
			this.current_page = 1;

		}
	}

	// Obtenemos el ID del usuario y mandamos la peticion
	eliminarContacto(id_contacto){
		this.http.delete('http://localhost:3000/api/users/'+id_contacto)
					.subscribe(res => {
						// Una vez eliminado, refrescamos
						this.refreshContact("");
		});
	}

	ngOnInit() {
	}

}
