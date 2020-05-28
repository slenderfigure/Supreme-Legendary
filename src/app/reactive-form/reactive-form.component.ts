import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormService } from './form.service';
import { Observable } from 'rxjs';
import { CustomFields } from './form-fields/form-field';

@Component({
  selector: 'reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
  providers: [FormService]
})
export class ReactiveFormComponent implements OnInit {
  fields$: Observable<CustomFields[]>;
  form: FormGroup;

  constructor(private fs: FormService) { }

  ngOnInit(): void {
    this.fields$ = this.fs.formFields;
    this.form = this.fs.generateForm();
  }

  onSubmit(): void {
    console.log(this.form.get('username').errors);
    // console.log(this.form.value);
  }
}
