export interface toDo{
    name:string,
    dueDate:Date
    tasks:task[]
}

export interface task{
    description:string,
    priority:string
}