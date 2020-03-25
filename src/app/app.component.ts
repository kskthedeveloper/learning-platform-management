import { Component } from '@angular/core';
import {NbMenuItem} from '@nebular/theme';
import {ExerciseMenuComponent} from './component/exercise-menu/exercise-menu.component';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: NbMenuItem[] = [
    {
      title: 'Menu',
      link: '/menu'
    },
    {
      title: 'List',
      link: '/list'
    },
  ];
  title = 'english-dashboard-management';
}
