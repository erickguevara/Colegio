import { Component, OnInit } from '@angular/core';
import {Persona,PersonaService, Grado } from '../Services/persona.service';
import { Router } from '@angular/router';
import { InicioComponent } from '../inicio/inicio.component';

import { FormBuilder, FormGroup,Validators } from '@angular/forms'
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']

})
export class AgregarComponent implements OnInit {
  
  last_id :any;
  ListarGrado: Grado[];
  edad :any; 
  uploadedFiles: Array < File > ;
  public formPersona: FormGroup;
  persona: Persona={
  nid_persona:null,
	nom_persona:'',
	ape_pare_pers:'',
	ape_mate_pers:'',
	nid_grado:null,
	fecha_naci:'',
	foto_ruta:null,
  };
  constructor(private formBuilder: FormBuilder,private PersonaService:PersonaService,private router:Router,private InicioComponent:InicioComponent) {


   }

  ngOnInit(): void {
    this.listargrado();
     this.formPersona = this.formBuilder.group({
      nom_persona: ['', [Validators.required,Validators.maxLength( 40 )]],
      ape_pare_pers: ['', [Validators.required,Validators.maxLength( 40 ) ]],
      ape_mate_pers: ['', [Validators.required,Validators.maxLength( 40 )]],
      nid_grado: ['', [Validators.required]],
      fecha_naci: ['', [Validators.required]],
      foto_ruta: ['', [Validators.required]],

    });
  }
  listargrado(){
    this.PersonaService.grado().subscribe(
        res=>{
          this.ListarGrado=<any>res;
        },
        err=> console.log(err)
      );
  }


  agregar():any{
  	delete this.persona.nid_persona;
    const formData = new FormData();
    formData.append("uploads[]", this.uploadedFiles[0], this.uploadedFiles[0].name);
    this.PersonaService.umpload(formData).subscribe((res)=>{
      this.persona.foto_ruta=<any>res;
        this.PersonaService.addPersona(this.persona).subscribe(res=>{
            this.InicioComponent.agregarpersonalista(<any>res);
        });
      });
      this.InicioComponent.closed();
  }

  detalle_cronograma(id,grado){

    this.PersonaService.detalle_cronograma(id,grado).subscribe();
  }
  public fecha(event:any){
    this.edad=this.InicioComponent.edad(event.target.value);
  }
  public onFileSelected(event: any) {
    this.uploadedFiles = event.target.files;
  }

}
