import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Importa FontAwesomeModule
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'; // Importa los iconos

@Component({
  selector: 'app-footer',
  standalone: true, // Indica que es un componente standalone
  imports: [FontAwesomeModule], // Importa FontAwesomeModule aquí
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  // Define los iconos como propiedades
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
}