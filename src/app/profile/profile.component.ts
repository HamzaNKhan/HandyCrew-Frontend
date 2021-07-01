import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Models/user';
import { Location } from '../Models/location';
import { Skill } from '../Models/skill';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private srvc: ServiceService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.srvc.getUserByID(params.id).subscribe((user: User[]) => {

        this.srvc.getUserLocation(user[0]._id).subscribe((location: Location[]) => {

          this.srvc.getSkillsByID(user[0]._id).subscribe((skill: Skill[]) => {

            this.profile.push({

              "ID": user[0]._id,
              "firstName": user[0].firstName,
              "lastName": user[0].lastName,
              "email": user[0].email,
              "cellNo": user[0].cellNo,
              "gender": user[0].gender,
              "memberSince": user[0].memberSince.substring(0, 10),
              "cityName": location[0].cityName,
              "skillName": skill[0].skillType,
              "skillDes": skill[0].skillDescription,
              "charges": skill[0].charges
              
            });
        });


        });
      });
    });
    

  }

}
