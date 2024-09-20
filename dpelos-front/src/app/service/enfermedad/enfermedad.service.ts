import { Injectable } from '@angular/core';
import { Enfermedad } from 'src/app/entidades/Enfermedad';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadService {

  constructor() { }

  enfermedadesList: Enfermedad[] = [
    { idEnfermedad: 1, nombreEnfermedad: "Displasia de cadera" },
    { idEnfermedad: 2, nombreEnfermedad: "Dermatitis" },
    { idEnfermedad: 3, nombreEnfermedad: "Otitis" },
    { idEnfermedad: 4, nombreEnfermedad: "Parvovirus" },
    { idEnfermedad: 5, nombreEnfermedad: "Moquillo" },
    { idEnfermedad: 6, nombreEnfermedad: "Gastroenteritis" },
    { idEnfermedad: 7, nombreEnfermedad: "Leishmaniasis" },
    { idEnfermedad: 8, nombreEnfermedad: "Filariosis" },
    { idEnfermedad: 9, nombreEnfermedad: "Sarna" },
    { idEnfermedad: 10, nombreEnfermedad: "Enfermedad de Lyme" },
    { idEnfermedad: 11, nombreEnfermedad: "Torsión gástrica" },
    { idEnfermedad: 12, nombreEnfermedad: "Alergias" },
    { idEnfermedad: 13, nombreEnfermedad: "Epilepsia" },
    { idEnfermedad: 14, nombreEnfermedad: "Insuficiencia renal" },
    { idEnfermedad: 15, nombreEnfermedad: "Hepatitis infecciosa" },
    { idEnfermedad: 16, nombreEnfermedad: "Enfermedad del corazón" },
    { idEnfermedad: 17, nombreEnfermedad: "Cataratas" },
    { idEnfermedad: 18, nombreEnfermedad: "Artritis" },
    { idEnfermedad: 19, nombreEnfermedad: "Problemas dentales" },
    { idEnfermedad: 20, nombreEnfermedad: "Infecciones urinarias" },
    { idEnfermedad: 21, nombreEnfermedad: "Anemia" },
    { idEnfermedad: 22, nombreEnfermedad: "Problemas de tiroides" },
    { idEnfermedad: 23, nombreEnfermedad: "Enfermedad de Cushing" },
    { idEnfermedad: 24, nombreEnfermedad: "Hipoglucemia" },
    { idEnfermedad: 25, nombreEnfermedad: "Pancreatitis" },
    { idEnfermedad: 26, nombreEnfermedad: "Luxación de rótula" },
    { idEnfermedad: 27, nombreEnfermedad: "Problemas respiratorios" },
    { idEnfermedad: 28, nombreEnfermedad: "Gingivitis" },
    { idEnfermedad: 29, nombreEnfermedad: "Diarrea crónica" },
    { idEnfermedad: 30, nombreEnfermedad: "Cáncer de piel" },
    { idEnfermedad: 31, nombreEnfermedad: "Problemas de columna" },
    { idEnfermedad: 32, nombreEnfermedad: "Otitis externa" },
    { idEnfermedad: 33, nombreEnfermedad: "Gripe canina" },
    { idEnfermedad: 34, nombreEnfermedad: "Conjuntivitis" },
    { idEnfermedad: 35, nombreEnfermedad: "Queratoconjuntivitis seca" },
    { idEnfermedad: 36, nombreEnfermedad: "Prolapso de glándula nictitante" },
    { idEnfermedad: 37, nombreEnfermedad: "Problemas hepáticos" },
    { idEnfermedad: 38, nombreEnfermedad: "Insuficiencia cardíaca" },
    { idEnfermedad: 39, nombreEnfermedad: "Problemas gastrointestinales" },
    { idEnfermedad: 40, nombreEnfermedad: "Parásitos internos" }
  ];
  

  findAll(): Enfermedad[] {
    return this.enfermedadesList;
  }

  findById(id: number): Enfermedad {
    const enfermedad: Enfermedad  = this.enfermedadesList.find((ennf) => ennf.idEnfermedad === id)!;
    return enfermedad;
  }

  updateEnfermedad(enfermedad: Enfermedad) {
    const index = this.enfermedadesList.findIndex(e => e.idEnfermedad === enfermedad.idEnfermedad);
    this.enfermedadesList[index] = enfermedad;
  }

  addEnfermedad(enfermedad: Enfermedad) {
    enfermedad.idEnfermedad = this.enfermedadesList.length +1;
    this.enfermedadesList.push(enfermedad);
  }
}
