import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ListTodoComponent } from './list-todo.component';

describe('ListTodoComponent', () => {
  let component: ListTodoComponent;
  let fixture: ComponentFixture<ListTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTodoComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create list todo component', () => {
    expect(component).toBeTruthy();
  });

  it('should show list todo empty when don"t have todos', () => {
    component.todos = [];
    component.ngOnInit();
    const pElement = fixture.debugElement.query(By.css('p'));
    expect(pElement.nativeElement.textContent).toEqual(' List todo is empty\n');
  });

  it('should show list todo when input has todos', () => {
    component.todos = [
      {
        id: 1,
        name: 'Learn ReactJs',
        active: true
      },
      {
        id: 2,
        name: 'Learn Angular',
        active: true
      }
    ];
    component.ngOnInit();
    fixture.detectChanges();

    const pElement = fixture.debugElement.queryAll(By.css('li'));
    expect(pElement[0].nativeNode.textContent).toEqual(' Learn ReactJs ');
    expect(pElement[1].nativeNode.textContent).toEqual(' Learn Angular ');
  });

  it('should call handleClickDeleteBtn function', () => {
    // const spyTest = spyOn(component, 'handleClickDeleteBtn');
    component.handleClickDeleteBtn('1');
    // expect(spyTest).toHaveBeenCalled();
  });

  it('should call ngOnChange function', () => {
    // const spyTest = spyOn(component, 'ngOnChanges');
    component.ngOnChanges();
    // expect(spyTest).toHaveBeenCalled();
  });

  it('should call handleClickEditBtn function', () => {
    // const spyTest = spyOn(component, 'handleClickEditBtn');
    component.handleClickEditBtn('1');
    // expect(spyTest).toHaveBeenCalled();
  });
});
