import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MaterialsComponent } from './components/materials/materials.component';
import { QuizComponent } from './components/quiz/quiz.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    HomepageComponent,
    MaterialsComponent,
    QuizComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
