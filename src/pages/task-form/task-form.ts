import { Task } from './../../models/task.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-task-form',
  templateUrl: 'task-form.html',
})
export class TaskFormPage {

  public taskForm: FormGroup;
  public task: Task;
  public isEditting: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder,
    private afDB: AngularFireDatabase,
    private toastCtrl: ToastController) {
      this._startForm();
  }

  private _startForm(): void {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      value: ['']
    });
  }

  public save(): void {
    if (!this.taskForm.valid) {
      this.toastCtrl.create({
        message: 'Please, enter the taskname.',
        duration: 2500,
        showCloseButton: true}
      ).present();
      return;
    }

    if (this.isEditting) {
      this.afDB.object(`tasks/${this.task.uid}`).update(this.taskForm.value)
        .then(() => this.navCtrl.pop())
    } else {
      this.afDB.list('tasks').push(this.taskForm.value)
        .then(() => this.navCtrl.pop());
    }
  }

  private _fillForm(): void {
    Object.keys(this.taskForm.controls).forEach(k => this.taskForm.get(k).setValue(this.task[k]));
  }

  ionViewDidLoad() {
    this.task = this.navParams.get('task');
    if (this.task) {
      this._fillForm();
      this.isEditting = true;
    }
  }

}
