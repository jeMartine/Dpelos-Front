import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ROOT_URL = 'http://localhost:8090';
  title = 'dpelos-front';
}
