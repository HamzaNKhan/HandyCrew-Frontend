import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { User } from '../Models/user';
import { Skill } from '../Models/skill';
import { City } from '../Models/Cities';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  Users: User[];
  Skills: Skill[];
  Cities: City[];

  userCount: number;
  skillsCount: number;
  cityCount: number;

  constructor(private srvc: ServiceService) { }

  ngOnInit(): void {
    this.srvc.getUsers().subscribe((data: User[]) => {
      this.userCount = data.length;
      this.Users = data;
      });

    this.srvc.getSkills().subscribe((data: Skill[]) => {
      this.skillsCount = data.length;
      this.Skills = data;
    });

    this.srvc.getCities().subscribe((data: City[]) => {
      this.cityCount = data.length;
      this.Cities = data;
    });

  }

}
