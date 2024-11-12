import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Veterinario } from 'src/app/entidades/Veterinario';
import { faRightFromBracket, faKey  } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/service/login/login.service';




@Component({
  selector: 'app-header-veterinario',
  templateUrl: './header-veterinario.component.html',
  styleUrls: ['./header-veterinario.component.css']
})
export class HeaderVeterinarioComponent {

  logoutIcon = faRightFromBracket
  passIcon = faKey
  veterinario?: Veterinario;
  @ViewChild('changePasswordModal') changePasswordModal!: ElementRef;


  constructor(
    private router: Router,
    private loginService: LoginService,
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

  cambiarClave() {
    // Aquí se abre el modal usando el selector del modal
    //const modalRef = this.modalService.open(this.changePasswordModal, { centered: true });
  }

  guardarNuevaClave() {
    console.log("Guardando la nueva clave...");
  }

}
