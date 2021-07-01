import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  angForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private srvc: ServiceService) {
    this.angForm = this.formBuilder.group({
      name: '',
      email: '',
      message: ''
    });
   }

  ngOnInit(): void {
  }

  onSubmit(name, email, message){;
    this.srvc.postContact(name, email, message);
  }


}
