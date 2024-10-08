import { Component, OnInit } from '@angular/core';
import { Testimonios } from '../comentarios';
import * as $ from 'jquery';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit{

  comentarios: Testimonios[] = [
    {
      "nombre_dueno": "Jhon Casto",
      "nombre_mascota": "Tobias",
      "foto": "https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg",
      "fecha_comentario": "Jul 11, 2024",
      "comentario": "Estoy muy contento con la atención que recibí en su clínica. Desde el momento en que entré, el personal fue muy amable y atento con mi mascota. Se tomaron el tiempo para explicarme todo y asegurarse de que mi perro estuviera cómodo.",
      "likes": 15,
      "rating": 4
  },
  {
      "nombre_dueno": "Nicol Benavides",
      "nombre_mascota": "Anton",
      "foto": "https://as01.epimg.net/diarioas/imagenes/2022/05/29/actualidad/1653826510_995351_1653826595_noticia_normal_recorte1.jpg",
      "fecha_comentario": "Ago 3, 2024",
      "comentario": "La atención médica que mi perrito recibió fue excepcional. El veterinario fue muy profesional y se notaba que tenía mucho conocimiento. Me tranquilizó saber que mi mascota estaba en buenas manos.",
      "likes": 10,
      "rating": 5
  },
  {
      "nombre_dueno": "Carlos Peralta",
      "nombre_mascota": "Luna",
      "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfCOLkdK_Jpr8Yl-v-pQQjlVHzGu3D2MT7GA&s",
      "fecha_comentario": "Jul 24, 2024",
      "comentario": "Estoy satisfecho con los precios de los servicios. Me pareció que los costos eran justos y transparentes. Además, agradezco que me hayan ofrecido diferentes opciones de tratamiento para ajustarse a mi presupuesto.",
      "likes": 6,
      "rating": 5
  },
  {
      "nombre_dueno": "Katherine Moreno",
      "nombre_mascota": "Benito",
      "foto": "https://cdn.aarp.net/content/dam/aarpe/es/home/hogar-familia/casa-jardin/info-2019/mejores-perros-compania-lidiar-soledad/_jcr_content/root/container_main/container_body_main/container_body1/container_body_cf/body_one_cf_one/par7/articlecontentfragme/cfimage.coreimg.50.932.jpeg/content/dam/aarp/home-and-family/your-home/2019/05/1140-miniature-schnauzer-esp.jpg",
      "fecha_comentario": "Apr 11, 2022",
      "comentario": "Las instalaciones de la clínica son muy limpias y modernas. Me gustó mucho que tuvieran una sala de espera con juguetes para mi mascota. Se nota que se preocupan por el bienestar de los animales.",
      "likes": 11,
      "rating": 4
  },
  {
      "nombre_dueno": "Esteban Gonzalez",
      "nombre_mascota": "Sol",
      "foto": "https://www.rover.com/blog/wp-content/uploads/iStock-1402117306-1-960x540.jpg",
      "fecha_comentario": "Jul 19, 2024",
      "comentario": "Agradezco la excelente comunicación durante la visita. El veterinario me explicó detalladamente el diagnóstico y el tratamiento de mi mascota, y respondió a todas mis preguntas de manera clara. Me sentí muy bien informado.",
      "likes": 9,
      "rating": 5
  },
  {
      "nombre_dueno": "Carol Lopez",
      "nombre_mascota": "Charlie",
      "foto": "https://phantom-expansion.unidadeditorial.es/aaad57cd1e20cab29748a0375dcd0309/crop/0x110/1920x1191/resize/828/f/jpg/assets/multimedia/imagenes/2022/05/20/16530528329270.jpg",
      "fecha_comentario": "Ago 01, 2024",
      "comentario": "Tuve una experiencia muy positiva en su veterinaria. Mi perro recibió un trato cariñoso y profesional, y me sentí muy bien atendido en todo momento. Sin duda, recomendaré su clínica a otros dueños de mascotas.",
      "likes": 15,
      "rating": 5
  }
  ]

  responsiveOptions: any[] = [];

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  getLikeIconClass(comentario: Testimonios): string {
    return comentario.likes > 0 ? 'fas fa-heart' : 'far fa-heart';;
  }

  toggleLike(comentario: any) {
    if (comentario.liked) {
      comentario.likes--;
    } else {
      comentario.likes++;
    }
    comentario.liked = !comentario.liked;
  }

}