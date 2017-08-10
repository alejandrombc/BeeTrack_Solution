import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { GlobalService } from '../globals.component';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

	@Output() eventBusqueda = new EventEmitter<any>();

	// Elemento para cerrar el modal
	@ViewChild('closeBtn') closeBtn: ElementRef;

	// Formulario de busqueda
	public busqueda_form = this.fb.group({
    	  cuerpo: [""],
	});

	//Formulario de creacion de usuario
	public contact_form = this.fb.group({
		photo: "",
		name: "",
		description: ""
	});

	constructor(public http: Http, public fb: FormBuilder, private servicio: GlobalService) {}


	// Realizo la busqueda y la guardo en el servicio "global"
	busqueda(){
		let formData = this.busqueda_form.value;
	    let salida; 

	    this.http.get('http://localhost:3000/api/users?q='+formData['cuerpo'])
	    .subscribe(res => {
	            salida = res.json();
	           	this.servicio.search = salida;
	           	this.refrescar();
	           	console.log(this.servicio.search);
	      }, error => {
	          console.log(error.json());
	      });
	}

	// Evento para llamar funcion del body
	refrescar(){
		this.eventBusqueda.next();
	}

	// Funcion para crear un contacto mediante un POST
	crear_contacto(){
		let formData = this.contact_form.value;
		var headers = new Headers();
	    headers.append('Content-Type', 'application/json');
	    let salida; 
	    this.http.post('http://localhost:3000/api/users', JSON.stringify(formData),{ headers: headers })      
	    .subscribe(res => {
	            salida = res.json();
	            alert("Contacto agregado exitosamente");
	            this.closeModal();


	            // "Llamo" a refrescar los contactos
	            // En caso de que este en "busqueda", mantengo la misma
	            if(this.servicio.search == null){ 
	            	this.refrescar(); 
	            }else{
	            	this.busqueda();
	            }
	      }, error => {
	          console.log(error.json());
	    });
	}


	// Para cerrar el modal
	private closeModal(): void {
        this.closeBtn.nativeElement.click();
    }

	ngOnInit() {
	}

}
