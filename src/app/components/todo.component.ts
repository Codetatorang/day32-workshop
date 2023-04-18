import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toDo } from './models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  toDoForm!: FormGroup
  fb!: FormBuilder
  taskArray!: FormArray

  @Input()
  todo!:toDo
  
  @Output()
  onNewTodo = new Subject<toDo>()

  constructor(fb: FormBuilder) {
    this.fb = fb
  }

  ngOnInit(): void {
    this.toDoForm = this.createToDo()
  }

  private createToDo(): FormGroup {
    this.taskArray = this.fb.array([])
    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      dueDate: this.fb.control<string>('', [Validators.required]),
      tasks: this.taskArray
    })
  }

  hasError(cn: string): boolean {
    return !!(this.toDoForm.get(cn)?.invalid)
  }

  isFormInvalid(): boolean {
    return this.toDoForm?.invalid//havent finish
  }

  processTodo() {
    const todo = this.toDoForm.value as toDo
    console.info(">>> todoInfo: ", todo)
    todo.dueDate
    this.onNewTodo.next(todo)
    this.ngOnInit() //used to reset the form
  }

  private createTaskGroup(): FormGroup {
    return this.fb.group({
      description: this.fb.control<string>('', [Validators.required]),
      priority: this.fb.control<string>('low', [Validators.required])
    })
  }

  addTask() {
    const task = this.createTaskGroup()
    this.taskArray.push(task)
  }

  deleteTask(idx:number) {
    this.taskArray.removeAt(idx)
  }
}
