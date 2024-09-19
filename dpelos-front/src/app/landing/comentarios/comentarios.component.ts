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
      "nombre_dueño": "Jhon Casto",
      "nombre_mascota": "Tobias",
      "foto": "https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg",
      "fecha_comentario": "Jul 11, 2024",
      "comentario": "Estoy muy contento con la atención que recibí en su clínica. Desde el momento en que entré, el personal fue muy amable y atento con mi mascota. Se tomaron el tiempo para explicarme todo y asegurarse de que mi perro estuviera cómodo.",
      "likes": 15,
      "rating": 4
  },
  {
      "nombre_dueño": "Nicol Benavides",
      "nombre_mascota": "Anton",
      "foto": "https://as01.epimg.net/diarioas/imagenes/2022/05/29/actualidad/1653826510_995351_1653826595_noticia_normal_recorte1.jpg",
      "fecha_comentario": "Ago 3, 2024",
      "comentario": "La atención médica que mi perrito recibió fue excepcional. El veterinario fue muy profesional y se notaba que tenía mucho conocimiento. Me tranquilizó saber que mi mascota estaba en buenas manos.",
      "likes": 10,
      "rating": 5
  },
  {
      "nombre_dueño": "Carlos Peralta",
      "nombre_mascota": "Luna",
      "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfCOLkdK_Jpr8Yl-v-pQQjlVHzGu3D2MT7GA&s",
      "fecha_comentario": "Jul 24, 2024",
      "comentario": "Estoy satisfecho con los precios de los servicios. Me pareció que los costos eran justos y transparentes. Además, agradezco que me hayan ofrecido diferentes opciones de tratamiento para ajustarse a mi presupuesto.",
      "likes": 6,
      "rating": 5
  },
  {
      "nombre_dueño": "Katherine Moreno",
      "nombre_mascota": "Benito",
      "foto": "https://cdn.aarp.net/content/dam/aarpe/es/home/hogar-familia/casa-jardin/info-2019/mejores-perros-compania-lidiar-soledad/_jcr_content/root/container_main/container_body_main/container_body1/container_body_cf/body_one_cf_one/par7/articlecontentfragme/cfimage.coreimg.50.932.jpeg/content/dam/aarp/home-and-family/your-home/2019/05/1140-miniature-schnauzer-esp.jpg",
      "fecha_comentario": "Apr 11, 2022",
      "comentario": "Las instalaciones de la clínica son muy limpias y modernas. Me gustó mucho que tuvieran una sala de espera con juguetes para mi mascota. Se nota que se preocupan por el bienestar de los animales.",
      "likes": 11,
      "rating": 4
  },
  {
      "nombre_dueño": "Esteban Gonzalez",
      "nombre_mascota": "Sol",
      "foto": "https://www.rover.com/blog/wp-content/uploads/iStock-1402117306-1-960x540.jpg",
      "fecha_comentario": "Jul 19, 2024",
      "comentario": "Agradezco la excelente comunicación durante la visita. El veterinario me explicó detalladamente el diagnóstico y el tratamiento de mi mascota, y respondió a todas mis preguntas de manera clara. Me sentí muy bien informado.",
      "likes": 9,
      "rating": 5
  },
  {
      "nombre_dueño": "Carol Lopez",
      "nombre_mascota": "Charlie",
      "foto": "https://phantom-expansion.unidadeditorial.es/aaad57cd1e20cab29748a0375dcd0309/crop/0x110/1920x1191/resize/828/f/jpg/assets/multimedia/imagenes/2022/05/20/16530528329270.jpg",
      "fecha_comentario": "Ago 01, 2024",
      "comentario": "Tuve una experiencia muy positiva en su veterinaria. Mi perro recibió un trato cariñoso y profesional, y me sentí muy bien atendido en todo momento. Sin duda, recomendaré su clínica a otros dueños de mascotas.",
      "likes": 15,
      "rating": 5
  }
  ]

  constructor() {}

  ngOnInit(): void {
    this.initializeCarousel();
  }

  initializeCarousel(): void {
    const testimonialsContainer = document.getElementById('testimonial-slider');
    if (testimonialsContainer) {
      this.comentarios.forEach((testimonial) => {
        const testimonialElement = this.createTestimonialElement(testimonial);
        testimonialsContainer.appendChild(testimonialElement);

        // Agregar evento para el botón "me gusta"
        const heartElement = testimonialElement.querySelector('.heart');
        const likeCountElement = testimonialElement.querySelector('.like-count');
        if (heartElement && likeCountElement) {
          heartElement.addEventListener('click', () => {
            this.toggleLike(heartElement, likeCountElement);
          });
        }
      });

      // Inicializar el carrusel usando OwlCarousel
      ($(`#testimonial-slider`) as any).owlCarousel({
        items: 3,
        itemsDesktop: [1000, 3],
        itemsDesktopSmall: [980, 2],
        itemsTablet: [768, 2],
        itemsMobile: [650, 1],
        pagination: true,
        navigation: false,
        slideSpeed: 1000,
        autoPlay: true
      });
    }
  }

  // Método para crear un elemento testimonial
  createTestimonialElement(testimonial: Testimonios): HTMLElement {
    const testimonialElement = document.createElement('div');
    testimonialElement.className = 'testimonial';

    // Crear estrellas basadas en la calificación
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      starsHtml += i <= testimonial.rating
        ? '<i class="fa fa-star"></i>'
        : '<i class="fa fa-star-o"></i>';
    }

    // Estructura HTML del testimonio
    testimonialElement.innerHTML = `
      <div class="testimonial-header">
        <img src="${testimonial.foto}" alt="User Photo">
        <div>
          <div class="pet-name">${testimonial.nombre_mascota} <i class="fa fa-paw paw-icon"></i></div>
          <div class="owner-name">${testimonial.nombre_dueño}</div>
        </div>
      </div>
      <div class="separator"></div>
      <div class="stars-date">
        <div class="stars">
          ${starsHtml}
        </div>
        <div class="date">${testimonial.fecha_comentario}</div>
      </div>
      <div class="description">
        ${testimonial.comentario}
      </div>
      <div class="separator"></div>
      <div class="reactions">
        <div>
          <i class="fa fa-heart heart"></i> <span class="like-count">${testimonial.likes}</span>
        </div>
        <i class="fa fa-flag flag"></i>
      </div>
    `;
    return testimonialElement;
  }

  // Método para manejar el evento de clic en "me gusta"
  toggleLike(heartElement: Element, likeCountElement: Element): void {
    heartElement.classList.toggle('liked');
    let count = parseInt(likeCountElement.textContent || '0', 10);
    count = heartElement.classList.contains('liked') ? count + 1 : count - 1;
    likeCountElement.textContent = count.toString();
  }

}
