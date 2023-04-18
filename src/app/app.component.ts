import { Component } from '@angular/core';
import { toDo } from './components/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  todo!:toDo

  ngOnInit():void{
    const d = localStorage.getItem('todo')
    if(!d)
      return
    const t:any = JSON.parse(d)
    //@ts-ignore
    // t?.dueDate = new Date(t.dueDate)
    t['dueDate'] = new Date(t['dueDate'])
    this.todo = {...t}
    console.info(">>> t:", t)
  }
  processTodo(todo:toDo){
    console.info('>>> todo: ', todo)
    localStorage.setItem('todo', JSON.stringify(todo))
  }
}
