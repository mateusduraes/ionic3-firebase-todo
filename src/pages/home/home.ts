import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Task } from '../../models/task.model';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public tasks$: Observable<Task[]>;
  constructor(public navCtrl: NavController,
    private afDB: AngularFireDatabase) {
      this.tasks$ = this.afDB.list<Task>('tasks').valueChanges();
  }


  public goEdit(task: Task): void {
    this.navCtrl.push('TaskFormPage', {task});
  }

}
