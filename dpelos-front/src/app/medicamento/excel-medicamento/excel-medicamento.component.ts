import { Component } from '@angular/core';
import { Droga } from 'src/app/entidades/Droga';
import * as XLSX from 'xlsx';
import { MedicamentoService } from 'src/app/service/medicamento/medicamento.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-excel-medicamento',
  templateUrl: './excel-medicamento.component.html',
  styleUrls: ['./excel-medicamento.component.css']
})
export class ExcelMedicamentoComponent {
  drogasExcel!: Droga[]

  constructor(
    private drogaService: MedicamentoService,
    private toast: ToastrService,
    private location: Location
  ){}

  onFileChange(evt: any){
    const target : DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('No se puede usar múltiples archivos');

    const reader: FileReader = new FileReader()
    reader.onload = (e: any) =>{
       // Lee el archivo
      const binaryData: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryData, { type: 'binary' });

      // Obtén la primera hoja de trabajo
      const worksheet: XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];

      // Convierte los datos de la hoja de trabajo a JSON
      const data: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      // Mapea los datos al arreglo de Medicamentos
      this.drogasExcel = data.slice(1).map(row => ({
        nombreDroga: row[0],
        precioVenta: row[1],
        precioCompra: row[2],
        unitDisponibles: +row[3],
        unitVendidas: +row[4],
        urlFotoDroga: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlI51dhbPhXKCkkb_koRivUYPb7pjyKjfNdw&s' 
      }));
      this.enviarBackend();
    } 
    reader.readAsBinaryString(target.files[0]);
  }

  enviarBackend() {
    this.drogaService.addDrogasExcel(this.drogasExcel).subscribe(
      (respuesta) => {
        this.toast.success(respuesta.message, 'Ok', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.location.back();
      },
      (error) => {
        this.toast.error(error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }
  

  preventDefault(evt: any){

  }
}
