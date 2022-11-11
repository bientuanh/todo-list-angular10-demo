import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss']
})
export class ListTodoComponent implements OnInit {
  @Output()
  clickDelete = new EventEmitter<string>();

  @Output()
  clickEdit = new EventEmitter<string>();

  constructor() {}

  @Input() todos: any[];

  ngOnInit(): void {}

  ngOnChanges(): void {
    // THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES 'someInput'
    // Write your code here
    this.ngOnInit();
  }

  handleClickDeleteBtn(event: any): void {
    this.clickDelete.emit(event);
  }

  handleClickEditBtn(event: any): void {
    this.clickEdit.emit(event);
  }
}
