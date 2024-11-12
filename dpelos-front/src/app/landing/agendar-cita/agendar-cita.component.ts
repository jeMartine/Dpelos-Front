import { Component } from '@angular/core';
import { EmailService } from 'src/app/service/email/email.service';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent {
  nombrePropietario = '';
  nombreMascota = '';
  fechaConsulta = '';
  servicio = '';
  correoPropietario = '';

  constructor(private emailService: EmailService) {}

  private formatearFechaConsulta(): string {
    const fechaHora = new Date(this.fechaConsulta);
    const opcionesFecha: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const opcionesHora: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };

    const fecha = fechaHora.toLocaleDateString('es-ES', opcionesFecha);
    const hora = fechaHora.toLocaleTimeString('es-ES', opcionesHora);
    
    return `${fecha} a las ${hora}`;
}

  enviarCorreo() {
    const emailData = {
      nombrePropietario: this.nombrePropietario,
      nombreMascota: this.nombreMascota,
      fechaConsulta: this.formatearFechaConsulta(),
      servicio: this.servicio,
      correoPropietario: this.correoPropietario
    };

    this.emailService.enviarCorreo(emailData).subscribe(
      response => {
        alert('Correo enviado exitosamente');
      },
      error => {
        console.log(this.correoPropietario);
      }
    );
  }

}
