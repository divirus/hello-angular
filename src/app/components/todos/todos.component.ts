import { Component, OnInit } from "@angular/core";
import { Todo } from "./../../modules/Todo";
import { TodoService } from "../../services/todo.service";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.css"]
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodoItem(todoItem: Todo) {
    // Remove form UI
    this.todos = this.todos.filter(item => item.id !== todoItem.id);
    // Remove from server
    this.todoService.deleteTodoItem(todoItem).subscribe();
  }

  addTodoItem(todoItem: Todo) {
    this.todoService.addTodoItem(todoItem).subscribe(todoItem => {
      this.todos.push(todoItem);
    });
  }
}
