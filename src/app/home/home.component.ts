import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { User } from '../Models/user';
import { Location } from '../Models/location';
import { Skill } from '../Models/skill';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Users: User[];
  recentUser: User[];
  recentUserLocation01: string;
  recentUserLocation02: string;
  recentUserLocation03: string;
  recentUserSkill01: string;
  recentUserSkill02: string;
  recentUserSkill03: string;
  recentUserPrice01: string;
  recentUserPrice02: string;
  recentUserPrice03: string;
  recentUserID01: string;
  recentUserID02: string;
  recentUserID03: string;
  
  keyword = 'skillName';
  skillSearch: Skill[];
  count: number;

  constructor(private srvc: ServiceService) { }

  ngOnInit(): void {
    this.srvc.getUsers().subscribe((data: User[]) => {
      this.count = data.length;
      this.Users = data;
      });

    this.srvc.getRecentUser().subscribe((data: User[]) => {
      this.recentUser = data;
      this.recentUserID01 = data[0]._id;
      this.recentUserID02 = data[1]._id;
      this.recentUserID03 = data[2]._id;

      this.srvc.getUserLocation(this.recentUser[0]._id).subscribe((location: Location[]) => {
        this.recentUserLocation01 = location[0].cityName;

        });

      this.srvc.getUserLocation(this.recentUser[1]._id).subscribe((location: Location[]) => {
          this.recentUserLocation02 = location[0].cityName;

          });

      this.srvc.getUserLocation(this.recentUser[2]._id).subscribe((location: Location[]) => {
            this.recentUserLocation03 = location[0].cityName;

            });

      this.srvc.getSkillsByID(this.recentUser[0]._id).subscribe((daata: Skill[]) => {
            this.recentUserSkill01 = daata[0].skillType;
            this.recentUserPrice01 = daata[0].charges;

            });
      this.srvc.getSkillsByID(this.recentUser[1]._id).subscribe((daata: Skill[]) => {
            this.recentUserSkill02 = daata[0].skillType;
            this.recentUserPrice02 = daata[0].charges;

            });

      this.srvc.getSkillsByID(this.recentUser[2]._id).subscribe((daata: Skill[]) => {
            this.recentUserSkill03 = daata[0].skillType;
            this.recentUserPrice03 = daata[0].charges;

            });


    });

    this.srvc.getSkills().subscribe((data: Skill[]) => {
      this.skillSearch = data;

    });


  }

  selectEvent(item) {
    console.log(item);

  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e){
    // do something when input is focused
  }
}
