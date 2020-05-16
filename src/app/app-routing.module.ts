import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewExerciseComponent} from './component/new-exercise/new-exercise.component';
import {ExerciseMenuComponent} from './component/exercise-menu/exercise-menu.component';
import {ExerciseListComponent} from './component/exercise-list/exercise-list.component';
import {UnitComponent} from './component/unit/unit.component';


const routes: Routes = [
  {path: '', redirectTo: '/menu', pathMatch: 'full'},
  {path: 'menu', component: ExerciseMenuComponent},
  {path: 'unit/:id', component: UnitComponent},
  {path: 'new-form', component: NewExerciseComponent},
  {path: 'list', component: ExerciseListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
