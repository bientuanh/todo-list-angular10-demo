import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_SERVER = environment.apiURL;

  constructor(private httpClient: HttpClient) {}

  public getAllTodos(): Observable<any> {
    return this.httpClient.get(this.REST_API_SERVER + '/todos');
  }

  public addTodo(data: any): Observable<any> {
    return this.httpClient.post(this.REST_API_SERVER + '/todos', data);
  }

  public deleteTodo(todoId: any): Observable<any> {
    return this.httpClient.delete(this.REST_API_SERVER + '/todos/' + todoId);
  }

  public editTodo(data: any): Observable<any> {
    return this.httpClient.put(
      this.REST_API_SERVER + '/todos/' + data.id,
      data
    );
  }
}
