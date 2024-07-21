import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoriesComponent } from '../categories/categories.component';
import { MatPodhladitevComponent } from './mat-podhladitev/mat-podhladitev.component';
import { MatAlkoholComponent } from './mat-alkohol/mat-alkohol.component';
import { MatKacaComponent } from './mat-kaca/mat-kaca.component';
import { MatKlopComponent } from './mat-klop/mat-klop.component';
import { MatNezavComponent } from './mat-nezav/mat-nezav.component';
import { MatRanaComponent } from './mat-rana/mat-rana.component';
import { MatStrelaComponent } from './mat-strela/mat-strela.component';
import { MatSubstancaComponent } from './mat-substanca/mat-substanca.component';
import { MatTPOComponent } from './mat-tpo/mat-tpo.component';

@Component({
  selector: 'app-materials',
  standalone: true,
  imports: [
    RouterOutlet,
    CategoriesComponent,
    MatPodhladitevComponent,
    MatAlkoholComponent,
    MatKacaComponent,
    MatKlopComponent,
    MatNezavComponent,
    MatRanaComponent,
    MatStrelaComponent,
    MatSubstancaComponent,
    MatTPOComponent,
  ],
  templateUrl: './materials.component.html',
  styleUrl: './materials.component.scss',
})
export class MaterialsComponent {}
