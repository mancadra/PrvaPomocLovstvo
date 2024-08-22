import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { MaterialsComponent } from './components/materials/materials.component';
import { MatAlkoholComponent } from './components/materials/mat-alkohol/mat-alkohol.component';
import { MatKacaComponent } from './components/materials/mat-kaca/mat-kaca.component';
import { MatKlopComponent } from './components/materials/mat-klop/mat-klop.component';
import { MatNezavComponent } from './components/materials/mat-nezav/mat-nezav.component';
import { MatPodhladitevComponent } from './components/materials/mat-podhladitev/mat-podhladitev.component';
import { MatRanaComponent } from './components/materials/mat-rana/mat-rana.component';
import { MatStrelaComponent } from './components/materials/mat-strela/mat-strela.component';
import { MatSubstancaComponent } from './components/materials/mat-substanca/mat-substanca.component';
import { MatTPOComponent } from './components/materials/mat-tpo/mat-tpo.component';
import { HistoryComponent } from './components/history/history.component';
import { VideoGradivaComponent } from './components/video-gradiva/video-gradiva.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'kviz', component: QuizComponent },
  { path: 'zgodovina', component: HistoryComponent },
  { path: 'video_gradiva', component: VideoGradivaComponent},
  {
    path: 'gradiva',
    component: MaterialsComponent,
    children: [
      {
        path: 'pretirano_zauzitje_alkohola',
        component: MatAlkoholComponent,
      },
      { path: 'ugriz_strupene_kace', component: MatKacaComponent },
      { path: 'ugriz_klopa', component: MatKlopComponent },
      { path: 'polozaj_nezavestnega', component: MatNezavComponent },
      { path: 'podhladitev', component: MatPodhladitevComponent },
      { path: 'ugrizne_rane', component: MatRanaComponent },
      { path: 'udar_strele', component: MatStrelaComponent },
      {
        path: 'zastrupitev_s_prepovedanimi_substancami',
        component: MatSubstancaComponent,
      },
      { path: 'temeljni_postopki_ozivljanja', component: MatTPOComponent },
    ],
  },
];
