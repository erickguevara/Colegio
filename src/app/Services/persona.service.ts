import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  url='/api';

  constructor(private http: HttpClient) { }
  
  getPersonas(){
  	return this.http.get(this.url);
  }

  getUnPersona(id:string){
  	return this.http.get(this.url+'/'+id);
  }

  addPersona(persona:Persona){

  	
    return this.http.post(this.url, persona);
  }

  deletePersona(id:number){
  	return this.http.delete(this.url+'/'+id);
  }

  editPersona(id:number, persona:Persona){
  	return this.http.put(this.url+'/'+id, persona);
  }

  umpload( formData){
       return this.http.post(this.url+'/upload', formData);
  }
  grado( ){
       return this.http.get(this.url+'/grado');
  }
  detalle_cronograma(id:number,id_grado:number ){
       return this.http.post(this.url+'/detalle_cronograma', {id:id,id_grado:id_grado});
  }


}

export interface Persona{
	nid_persona?:number;
	nom_persona?:string;
	ape_pare_pers?:string;
	ape_mate_pers?:string;
	nid_grado?:number;
	fecha_naci?:string;
	foto_ruta?:string;
}

export interface Grado{
  nid_grado?:number;
  desc_grado?:string;
  nivel?:string;
 
}