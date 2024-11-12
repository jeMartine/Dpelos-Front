import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Veterinario } from 'src/app/entidades/Veterinario';
import { faRightFromBracket, faKey  } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/service/login/login.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-header-veterinario',
  templateUrl: './header-veterinario.component.html',
  styleUrls: ['./header-veterinario.component.css']
})
export class HeaderVeterinarioComponent {

  logoutIcon = faRightFromBracket
  passIcon = faKey
  veterinario?: Veterinario;
  @ViewChild('changePasswordModal') changePasswordModal: any;
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';



  constructor(
    private router: Router,
    private loginService: LoginService,
    private modalService: NgbModal,
    //private modalService: NgbModal
  ) {}

  ngOnInit(){
    this.cargarVet();
  }

  cargarVet(){
    const user = localStorage.getItem('userVet');
    if(user){
      this.veterinario = JSON.parse(user);
    }
  }

  cerrarSesion(): void {
    this.loginService.logout('userVet', "isVetLogged")
    this.router.navigate(['/home']);
  }

  homeEmpreado(): void {
    this.router.navigate(['/empleado']);
  }


  guardarNuevaClave() {
    console.log("Guardando la nueva clave...");
  }

}
