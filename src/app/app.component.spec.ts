import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';

describe('AppComponent', () => {
  let service: DataService;
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [DataService]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    service = fixture.debugElement.injector.get(DataService);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'todo-list'`, () => {
    expect(app.title).toEqual('todo-list');
  });

  it('should init and call API get all todo items', async () => {
    const expectedTodos: any[] = [
      { id: '1', name: 'Learn ReactJS', active: true },
      { id: '2', name: 'Learn Angular10', active: true },
      { id: '3', name: 'Learn Vue3', active: true }
    ];
    app.todos = expectedTodos;
    app.selectedEditTodoId = '1';
    app.editedTodoName = 'New todo';

    spyOn(service, 'getAllTodos').and.returnValue(of(expectedTodos));
    app.ngOnInit();
    fixture.detectChanges();

    await fixture.whenStable();
    expect(app.todos).toEqual(expectedTodos);
    expect(service.getAllTodos).toHaveBeenCalledWith();
  });

  it('should init and call API get all todo items but get error', async () => {
    const expectedTodos: any[] = [
      { id: '1', name: 'Learn ReactJS', active: true },
      { id: '2', name: 'Learn Angular10', active: true },
      { id: '3', name: 'Learn Vue3', active: true }
    ];
    app.todos = expectedTodos;
    app.selectedEditTodoId = '1';
    app.editedTodoName = 'New todo';

    spyOn(service, 'getAllTodos').and.returnValue(throwError({ status: 404 }));
    app.ngOnInit();
    fixture.detectChanges();

    await fixture.whenStable();
    expect(app.todos).toEqual(expectedTodos);
    expect(service.getAllTodos).toHaveBeenCalledWith();
  });

  it('should click delete todo button', async () => {
    app.handleClickDelete('1');
    await fixture.whenStable();
  });

  xit('should click submit todo button', async () => {
    const expectedTodos: any[] = [
      { id: 1, name: 'Learn ReactJS', active: true },
      { id: 2, name: 'Learn Angular10', active: true },
      { id: 3, name: 'Learn Vue3', active: true }
    ];
    spyOn(service, 'addTodo').and.returnValue(of(expectedTodos));

    app.todos = expectedTodos;
    app.handleClickSubmit('Learn English');
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(app.todos).toEqual(expectedTodos);
      expect(service.getAllTodos).toHaveBeenCalledWith();
    });
  });

  it('Handle click close modal', () => {
    const expectedTodos: any[] = [
      { id: '1', name: 'Learn ReactJS', active: true },
      { id: '2', name: 'Learn Angular10', active: true },
      { id: '3', name: 'Learn Vue3', active: true }
    ];
    app.todos = expectedTodos;
    app.selectedEditTodoId = '1';
    app.editedTodoName = 'New todo';

    spyOn(service, 'deleteTodo').and.returnValue(of(expectedTodos));
    app.handleClickDeleteModal();
    fixture.detectChanges();

    expect(app.todos).toEqual(expectedTodos);
    expect(service.deleteTodo).toHaveBeenCalledWith('1');
  });

  it('Handle click edit', () => {
    const expectedTodos: any[] = [
      { id: '1', name: 'Learn ReactJS', active: true },
      { id: '2', name: 'Learn Angular10', active: true },
      { id: '3', name: 'Learn Vue3', active: true }
    ];
    app.todos = expectedTodos;
    app.handleClickEdit('1');
    fixture.whenStable().then(() => {
      expect(app.todos).toEqual(expectedTodos);
    });
  });

  it('Handle click save changes', () => {
    const expectedTodos: any[] = [
      { id: '1', name: 'Learn ReactJS', active: true },
      { id: '2', name: 'Learn Angular10', active: true },
      { id: '3', name: 'Learn Vue3', active: true }
    ];
    app.todos = expectedTodos;
    app.selectedEditTodoId = '1';
    app.editedTodoName = 'New todo';

    spyOn(service, 'editTodo').and.returnValue(of(expectedTodos));
    app.handleClickSaveChanges();
    fixture.detectChanges();

    expect(app.todos).toEqual(expectedTodos);
    expect(service.editTodo).toHaveBeenCalledWith({
      id: '1',
      name: 'New todo',
      active: true
    });
  });
});
