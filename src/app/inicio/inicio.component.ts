import { Component, OnInit } from '@angular/core';
import { PersonaService, Persona } from '../Services/persona.service';
import { NgbModalConfig, NgbModal,  } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class InicioComponent implements OnInit {
  ListarPersona: Persona[]; 
  ideliminar:any;
  filterPost='';
  constructor(private PersonaService:PersonaService,private router:Router,config: NgbModalConfig, private modalService: NgbModal) { 
config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  	this.listarPersonas();

  }

  listarPersonas(){
  	this.PersonaService.getPersonas().subscribe(
  			res=>{
          this.ListarPersona=<any>res;
          for (var i =0  ; i < this.ListarPersona.length; i++) {
            this.ListarPersona[i].fecha_naci=this.edad(this.ListarPersona[i].fecha_naci);
          }
          
  			},
  			err=> console.log(err)
  		);
  }
open(content) {
    this.modalService.open(content);
    

  }
  closed() {
    this.modalService.dismissAll();  
  }
  eliminar(id:number){
    this.ideliminar=id;

  }
    eliminarRegistro(){
  
    this.PersonaService.deletePersona(this.ideliminar).subscribe(
      res=>{
        this.listarPersonas();
      },
      err=>console.log(err)
      );
  }
  modificar(id:number){
    this.router.navigate(['/edit/'+id])

  }

  edad (fecha:any){
       var date=new Date(fecha);
       var todayDate=new Date();
       let timeDiff = Math.abs(Date.now() - date.getTime());
       let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
       var agemonth =   todayDate.getMonth()- date.getMonth();
       return age+' años '+agemonth+' mes';
  }



}
