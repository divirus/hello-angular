import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Todo } from '../modules/Todo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit = '?_limit=10';

  constructor(private http:HttpClient) { }

  // Get Todos
  getTodos():Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  // Delete Todo
  deleteTodoItem(todoItem:Todo):Observable<Todo> {
    const url = `${this.todosUrl}/${todoItem.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  // Add todo
  addTodoItem(todoItem:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todoItem, httpOptions);
  }

  // Toggle completed
  toggleCompleted(todoItem: Todo):Observable<any> {
    const url = `${this.todosUrl}/${todoItem.id}`;
    return this.http.put(url, todoItem, httpOptions);
  }
}
