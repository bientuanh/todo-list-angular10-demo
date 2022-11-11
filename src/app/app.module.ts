import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddTodoFormComponent } from './components/add-todo-form/add-todo-form.component';
import { ListTodoComponent } from './components/list-todo/list-todo.component';

@NgModule({
  declarations: [AppComponent, AddTodoFormComponent, ListTodoComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
