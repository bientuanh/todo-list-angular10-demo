import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AddTodoFormComponent } from './add-todo-form.component';

describe('AddTodoFormComponent', () => {
  let component: AddTodoFormComponent;
  let fixture: ComponentFixture<AddTodoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTodoFormComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Test exist of common element', () => {
    it('should create add todo item form', () => {
      expect(component).toBeTruthy();
    });
    it('should have "Enter your name" title above form', () => {
      const formTitle = fixture.debugElement.query(By.css('.form-group label'));
      expect(formTitle.nativeElement.textContent).toEqual('Enter task name');
    });
    it('should have one text field', () => {
      const taskNameField = fixture.debugElement.query(By.css('#taskName'));
      expect(taskNameField).toBeTruthy();
    });
    it('should have one submit button', () => {
      const addTodoBtn = fixture.debugElement.query(By.css('#addTodoBtn'));
      expect(addTodoBtn).toBeTruthy();
    });
    it('should disable button when no text on text field', () => {
      const addTodoBtn = fixture.debugElement.query(By.css('#addTodoBtn'));
      expect(addTodoBtn.nativeElement.disabled).toBeTruthy();
    });
  });

  describe('Test task name field', () => {
    it('Input some valid text in input field', () => {
      fixture.whenStable().then(() => {
        const inputTaskName = fixture.debugElement.query(By.css('#taskName'));
        inputTaskName.nativeElement.value = 'text';
        inputTaskName.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(inputTaskName.nativeElement.value).toContain('text');
      });
    });

    it('Add form is not valid at the first', () => {
      expect(component.addForm.valid).toBeFalsy();
    });

    it('Check invalid of task name field', () => {
      const taskName = component.addForm.controls.taskName;
      expect(taskName.valid).toBeFalsy();
    });

    it('Test task name require', () => {
      const taskName = component.addForm.controls.taskName;
      taskName.setValue('');
      const errors = taskName.errors || {};
      expect(errors.required).toBeTruthy();
    });

    it('Test task name max length 40 characters', () => {
      const taskName = component.addForm.controls.taskName;
      taskName.setValue('TestTestTestTestTestTestTestTestTestTestT');
      const errors = taskName.errors || {};
      expect(errors.maxlength).toBeTruthy();
    });

    it('Test task name is valid', () => {
      const taskName = component.addForm.controls.taskName;
      taskName.setValue('TestTestTestTestTestTestTestTestTestTest');
      const errors = taskName.errors || {};
      expect(errors.maxlength).toBeFalsy();
    });
  });

  it('should call onsubmit function', () => {
    // const spyTest = spyOn(component, 'onSubmit');
    component.onSubmit();
    // expect(spyTest).toHaveBeenCalled();
  });
});
