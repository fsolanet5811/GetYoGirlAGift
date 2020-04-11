import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";
import { Girl } from "../../services/girl.service";

@Component({
  selector: 'app-add-girl',
  templateUrl: './add-girl.component.html',
  styleUrls: ['./add-girl.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  addForm: FormGroup;

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      id: [],
      Name: ['', Validators.required],
      Relationship: ['', Validators.required],
          });

  }

  onSubmit() {
    this.girl.register(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['list-user']);
      });
  }

}
