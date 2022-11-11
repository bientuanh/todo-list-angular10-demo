import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.scss']
})
export class AddTodoFormComponent implements OnInit {
  @Output()
  clickSubmit = new EventEmitter<string>();

  addForm: any;

  constructor() {}

  ngOnInit(): void {
    this.addForm = new FormGroup({
      taskName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(40)
      ])
    });
  }

  get name(): string {
    return this.addForm.get('taskName');
  }

  onSubmit(): void {
    this.clickSubmit.emit(this.addForm.value.taskName);
  }
}
