import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from '../Models/skill';
import { User } from '../Models/user';
import { ServiceService } from '../service.service';
import { Location } from '../Models/location';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {

firstName = [];
skill: Skill[];
user = [];

keyword = 'skillName';
skillSearch: Skill[];

constructor(
    private route: ActivatedRoute,
    private router: Router,
    private srvc: ServiceService
  ) { }

  ngOnInit(): void {
    console.log(this.router.url);
    this.srvc.getSkills().subscribe((data: Skill[]) => {
      this.skill = data;
    });

    this.route.params.subscribe((params) => {
      // Getting userSkill referenced by skillID
      this.srvc.getSkillsBySkillsID(params.skill).subscribe((data: Skill[]) => {

        this.user = [];

        data.forEach(value => {
          // Getting User referenced by UserID in UserSkill
          this.srvc.getUserByID(value.userId).subscribe((dataa: User[]) => {

            this.srvc.getUserLocation(value.userId).subscribe((response: Location[]) => {

              this.srvc.getSkillsByID(value.userId).subscribe((res: Skill[]) => {

                this.user.push({
                  "ID": data[0].userId,
                  "email": dataa[0].email,
                  "firstName": dataa[0].firstName,
                  "lastName": dataa[0].lastName,
                  "cellNo": dataa[0].cellNo,
                  "charges": res[0].charges,
                  "skillName": res[0].skillType,
                  "cityName": response[0].cityName
                });
              });
            });
          });
        });
        console.log(this.user);
      });
    });
    this.srvc.getSkills().subscribe((data: Skill[]) => {
      this.skillSearch = data;

    });
  }

  selectEvent(item) {
  

  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e){
    // do something when input is focused
  }

}
