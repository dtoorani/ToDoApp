import { Component, OnInit } from '@angular/core';
import { Users } from '../users';
import { Todos } from '../todo';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  users :  Users[] = [];
  todos : Todos[] = [];
  selectedUser: Users;

  constructor() {
  }

  async ngOnInit() {
    let url = 'http://jsonplaceholder.typicode.com/users/';
    let url2 = 'https://jsonplaceholder.typicode.com/todos';
    await this.getUserInfo(url);
    await this.getTodoInfo(url2);
    this.sortOnLastName();
    this.sortOnCompleted();
    console.log(this.todos);
  }

  onSelect(user: Users): void {
    this.selectedUser = user;
  }

  private getUserInfo(url:string): Promise<void> {
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        this.users = json;
      })
  }

  private getTodoInfo(url:string): Promise<void> {
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        this.todos = json;
      })
  }

  private sortOnLastName() {
    this.users.sort(function(a, b){
      if(a.name.substr(a.name.lastIndexOf(' '), a.name.length-1) < b.name.substr(b.name.lastIndexOf(' '), b.name.length-1)) return -1;
      if(a.name.substr(a.name.lastIndexOf(' '), a.name.length-1) > b.name.substr(b.name.lastIndexOf(' '), b.name.length-1)) return 1;
      return 0;
    })
  }

  private sortOnCompleted() {
    this.todos.sort(function(a, b) {
      if (a.completed < b.completed) return -1;
      if (a.completed > b.completed) return 1;
      return 0;
    });
  }
}
