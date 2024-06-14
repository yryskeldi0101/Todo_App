import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild("form") form!: NgForm

  props = {
    date: new Date(),
    title: ""
  }
  todoList: any = []

  constructor() { }

  ngOnInit() {
    const item = localStorage.getItem("todo");
    if (item) {
      this.todoList = JSON.parse(item);
    }
  }

  get todo() {
    return this.todoList;
  }

  deleteHandler(id: number) {
    this.todoList = this.todoList.filter((item: any) => item.id !== id);
    localStorage.setItem("todo", JSON.stringify(this.todoList));
    console.log(this.todoList);
  }

  submit(form: NgForm) {
    if (form.valid) {
      const data = {
        title: form.value.title,
        date: formatDate(form.value.date, "dd.MM.yyyy", "en"),
        id: Math.random()
      }
      this.todoList.push(data);
      localStorage.setItem("todo", JSON.stringify(this.todoList));
      this.props.title = "";
    }
  }
}
