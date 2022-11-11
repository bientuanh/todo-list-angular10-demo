import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './services/data.service';
import { environment } from '../environments/environment';
import { AddTodoFormComponent } from './components/add-todo-form/add-todo-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(AddTodoFormComponent) addTodoFormComponent: AddTodoFormComponent;

  // Environment variables
  apiURL = environment.apiURL;

  title = 'todo-list';
  todos: any[];
  isLoading: boolean;
  maxId: number;
  selectedEditTodoId = '';
  editedTodoName = '';

  constructor(private dataService: DataService) {}

  getAllTodos(): void {
    this.isLoading = true;
    this.dataService.getAllTodos().subscribe(
      (data: any[]) => {
        this.isLoading = false;
        this.todos = data;
        // get biggest id in list
        const ids = data.map(item => item.id);
        this.maxId = Math.max(...ids);
      },
      err => {
        this.isLoading = false;
        console.error('Get all todos is error: ', err);
      }
    );
  }

  ngOnInit(): void {
    this.getAllTodos();
  }

  handleClickSubmit(event: any): void {
    this.dataService
      .addTodo({ id: this.maxId + 1, name: event, active: true })
      .subscribe((data: any[]) => {
        console.log('Add todo: ', data);
        this.addTodoFormComponent.addForm.reset({});
        this.getAllTodos();
      });
  }

  handleClickDelete(event: any): void {
    this.selectedEditTodoId = event;
  }

  handleClickDeleteModal(): void {
    this.dataService.deleteTodo(this.selectedEditTodoId).subscribe(data => {
      console.log('Delete todo: ', data);
      document.getElementById('close-delete-modal-button').click();
      this.ngOnInit();
    });
  }

  handleClickEdit(event: any): void {
    this.selectedEditTodoId = event;
    this.editedTodoName = this.todos.find(todo => todo.id === event).name;
  }

  handleClickSaveChanges(): void {
    this.dataService
      .editTodo({
        id: this.selectedEditTodoId,
        name: this.editedTodoName,
        active: true
      })
      .subscribe(data => {
        document.getElementById('close-button').click();
        this.ngOnInit();
      });
  }
}
