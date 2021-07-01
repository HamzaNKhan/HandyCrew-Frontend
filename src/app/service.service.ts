import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from './Models/user';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  uri = 'http://localhost:3000';
  constructor(public http: HttpClient) { }
  Users: User[];
  skillID: string ;

  // GET REQUESTS
    getUsers(){
      return this.http.get(`${this.uri}/user/all`);
    }

    getSkills(){
      return this.http.get(`${this.uri}/skill/all`);
    }

    getSkillsByID(id){
      return this.http.get(`${this.uri}/userskill/${id}`);
    }

    getCities(){
      return this.http.get(`${this.uri}/cities/all`);
    }

    getRecentUser(){
      return this.http.get(`${this.uri}/user/`);
    }

    getUserByID(id){
      return this.http.get(`${this.uri}/user/${id}`);
    }

    getUserLocation(id){
      return this.http.get(`${this.uri}/location/get/${id}`);
    }

    getCity(){
      return this.http.get(`${this.uri}/cities/all`);
    }

    getSkillsBySkillsID(id){
      return this.http.get(`${this.uri}/userskill/get/${id}`);
    }


    getSkillIDBySkillName(name){
      return this.http.get(`${this.uri}/skill/${name}`);
    }

    // POST REQUESTS
    postContact(name, email, message){
      const obj = {
        name,
        email,
        message
      };
      this.http.post(`${this.uri}/contact/add` , obj)
                .subscribe((res) => console.log('Done'));
    }


    postUser(firstName, lastName, email, cellNo, password, gender, dob, cityName, skillName, skillDescription, charges, skillID){

      const obj = {
        firstName,
        lastName,
        email,
        cellNo,
        password,
        gender,
        dob,
        cityName,
        skillName,
        skillDescription,
        charges,
        skillID
      };
      // console.log(obj);
      this.http.post(`${this.uri}/user/add`, obj)
        .subscribe((res) =>  {
          this.http.post(`${this.uri}/location/add/${res._id}`, obj)
          .subscribe();

          this.http.post(`${this.uri}/userskill/add/${res._id}`, obj)
          .subscribe();


        });


    }

    // postUserLocation(res){
    //   this.http.post(`${this.uri}/location/add/${res._id}`)
    //     .subscribe();
    // }



}
