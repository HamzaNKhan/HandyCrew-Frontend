import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ServiceService } from '../service.service';
import { City } from '../Models/Cities';
import { Skill } from '../Models/skill';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  angForm: FormGroup;
  city: City[];
  skill: Skill[];
  skillID: string;
  uploadedFile: File = null;

  constructor(
    private formBuilder: FormBuilder,
    private srvc: ServiceService,
    private http: HttpClient) {
    this.angForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      cellNo: '',
      password: '',
      dob: '',
      gender: '',
      cityName: '',
      skillName: '',
      skillDescription: '',
      charges: ''
    });
  }

  ngOnInit(): void {
    this.srvc.getCities().subscribe((data: City[]) => {
      this.city = data;

    });

    this.srvc.getSkills().subscribe((data: Skill[]) => {
      this.skill = data;
    });
  }

  onSignUP(firstName, lastName, email, cellNo, password, gender, dob, cityName, skillName, skillDescription, charges){

    this.srvc.getSkillIDBySkillName(skillName).subscribe((data: Skill[]) => {
      this.skillID = data[0]._id;
      this.srvc.postUser(firstName, lastName, email, cellNo, password, gender, dob, cityName, skillName, skillDescription,
         charges, this.skillID);
    });

  }

}
