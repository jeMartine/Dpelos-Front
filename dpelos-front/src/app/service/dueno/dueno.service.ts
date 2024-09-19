import { Injectable } from '@angular/core';
import { Dueno } from '../../entidades/Dueno';  // Asegúrate de que la ruta sea correcta


@Injectable({
  providedIn: 'root'
})
export class DuenoService {

  constructor() { }

  //Base de datos falsa de dueños

duenosList: Dueno[] = [
    {   
        idDueno:1,
        cedulaDueno: "13231",
        nombreDueno: "Ana",
        apellidoDueno: "Martínez",
        correoDueno: "ana.martinez@gmail.com",
        celularDueno: "3001234567",
        fotoUrl: "https://static01.nyt.com/images/2017/05/07/arts/07GAL-GADOTweb/07GAL-GADOTweb-articleLarge.jpg?quality=75&auto=webp&disable=upscale"
    },
    {   
        idDueno:2,
        cedulaDueno: "210332323",
        nombreDueno: "Jorge",
        apellidoDueno: "Esteban",
        correoDueno: "jorge.esteban@gmail.com",
        celularDueno: "3122345678",
        fotoUrl: "https://media.gq.com.mx/photos/6203c5ba43f71a078a355054/16:9/w_2560%2Cc_limit/atractivo.jpg"
    },
    {   
        idDueno:3,
        cedulaDueno: "45312",
        nombreDueno: "Laura",
        apellidoDueno: "Gómez",
        correoDueno: "laura.gomez@gmail.com",
        celularDueno: "3109876543",
        fotoUrl: "https://www.mundiario.com/asset/thumbnail,1280,720,center,center/media/mundiario/images/2017/09/10/2017091005043465273.jpg"
    },
    {  
        idDueno:4,
        cedulaDueno: "87456",
        nombreDueno: "Carlos",
        apellidoDueno: "Pérez",
        correoDueno: "carlos.perez@gmail.com",
        celularDueno: "3156789012",
        fotoUrl: "https://media.revistagq.com/photos/6008111d0c66a2a0f048c638/16:9/w_2560%2Cc_limit/chris-hemsworth.jpg"
    },
    {   
        idDueno:5,
        cedulaDueno: "29384",
        nombreDueno: "Sofía",
        apellidoDueno: "Rodríguez",
        correoDueno: "sofia.rodriguez@gmail.com",
        celularDueno: "3165432109",
        fotoUrl: "https://cdn.pixabay.com/photo/2023/07/30/09/12/red-hair-girl-8158373_640.jpg"
    },
    {  
        idDueno:6,
        cedulaDueno: "38475",
        nombreDueno: "Luis",
        apellidoDueno: "Fernández",
        correoDueno: "luis.fernandez@gmail.com",
        celularDueno: "3176543210",
        fotoUrl: "https://www.lolitamoda.com/uploads/post/image/61/56.Reglas_de_estilo_que_todo_hombre_debe_conocer.jpg"
    },
    {
        idDueno:7,
        cedulaDueno: "65748",
        nombreDueno: "Marta",
        apellidoDueno: "García",
        correoDueno: "marta.garcia@gmail.com",
        celularDueno: "3187654321",
        fotoUrl: "https://fotografias.antena3.com/clipping/cmsimages01/2020/07/21/50A45B0A-59A5-4693-ABFE-CBC7FE467909.png"
    },
    {
         
        idDueno:8,
        cedulaDueno: "98234",
        nombreDueno: "Pedro",
        apellidoDueno: "Sánchez",
        correoDueno: "pedro.sanchez@gmail.com",
        celularDueno: "3198765432",
        fotoUrl: "https://media.revistavanityfair.es/photos/60e831737c159c2a681488f5/master/w_1600%2Cc_limit/229873.jpg"
    }
];


  findAll(){
    return this.duenosList;
  }

  findById(id: number): Dueno {
    const dueno: Dueno = this.duenosList.find((dueno) => dueno.idDueno === id)!;
    return dueno;
  }

  addDueno(dueno: Dueno): void {
    this.duenosList.push(dueno);
  }

  updateDueno(dueno: Dueno): void {
    const index = this.duenosList.findIndex((d) => d.idDueno === dueno.idDueno);
    this.duenosList[index] = dueno;
  }

  deleteDueno(dueno:Dueno): void {
    const index = this.duenosList.findIndex((d) => d.idDueno === dueno.idDueno);
    this.duenosList.splice(index, 1);
  }
}
