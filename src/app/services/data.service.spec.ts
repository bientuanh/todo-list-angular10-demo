import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './data.service';

describe('StudentsService', () => {
  let service: DataService;
  let httpClientSpy: {
    get: jasmine.Spy;
    post: jasmine.Spy;
    delete: jasmine.Spy;
    put: jasmine.Spy;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'delete',
      'put'
    ]);
    service = new DataService(httpClientSpy as any);
  });

  afterEach(() => {
    // httpMock.verify();
  });

  it('Test get all todos', () => {
    const expectedTodos: any[] = [
      { id: 1, name: 'Learn ReactJS', active: true },
      { id: 2, name: 'Learn Angular10', active: true }
    ];
    httpClientSpy.get.and.returnValue(of(expectedTodos));
    service
      .getAllTodos()
      .subscribe(
        todos => expect(todos).toEqual(expectedTodos, 'expected todos'),
        fail
      );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('Test add a todo', () => {
    const expectedTodos: any[] = [
      { id: 1, name: 'Learn ReactJS', active: true },
      { id: 2, name: 'Learn Angular10', active: true },
      { id: 3, name: 'Learn Vue3', active: true }
    ];
    httpClientSpy.post.and.returnValue(of(expectedTodos));
    service
      .addTodo({ id: 3, name: 'Learn Vue3', active: true })
      .subscribe(
        todos => expect(todos).toEqual(expectedTodos, 'expected todos'),
        fail
      );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('Test delete a todo', () => {
    const expectedTodos: any[] = [
      { id: 1, name: 'Learn ReactJS', active: true },
      { id: 2, name: 'Learn Angular10', active: true },
      { id: 3, name: 'Learn Vue3', active: true }
    ];
    httpClientSpy.delete.and.returnValue(of(expectedTodos));
    service
      .deleteTodo({ id: 3, name: 'Learn Vue3', active: true })
      .subscribe(
        todos => expect(todos).toEqual(expectedTodos, 'expected todos'),
        fail
      );
    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  });

  it('Test update a todo', () => {
    const expectedTodos: any[] = [
      { id: 1, name: 'Learn ReactJS', active: true },
      { id: 2, name: 'Learn Angular10', active: true },
      { id: 3, name: 'Learn Vue3', active: true }
    ];
    httpClientSpy.put.and.returnValue(of(expectedTodos));
    service
      .editTodo({ id: 3, name: 'Learn Vue3', active: true })
      .subscribe(
        todos => expect(todos).toEqual(expectedTodos, 'expected todos'),
        fail
      );
    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  });
});
