import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({ templateUrl: './directives/home/home.component.html' })
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
   // this.getGirls();
  }/*
  addUser(id: number) {
    //this.userService.register(id).pipe(first()).subscribe(() => {
      this.loadAllUsers()
    });
  }
  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.loadAllUsers()
    });
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });*/
}


