import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CustomFields } from './form-fields/form-field';
import { FormGroup, Validators, FormControl, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { map } from 'rxjs/operators';

@Injectable()
export class FormService {
  private fields: CustomFields[] = [
    new CustomFields({
      key: 'name',
      label: 'Name',
      value: 'Adison',
      inputType: 'text',
      controlType: 'input',
      order: 1,
      validators: {
        sync: [ Validators.required, Validators.pattern(/^[A-z\s]+$/i) ]
      }
    }),
    new CustomFields({
      key: 'gender',
      label: 'Gender',
      value: 'male',
      controlType: 'dropdown',
      order: 2,
      selectOptions: [
        { key: 'Male',   value: 'male'   },
        { key: 'Female', value: 'female' },
        { key: 'Other',  value: 'other'  }
      ],
      validators: {
        sync: [ Validators.required ]
      }
    }),
    new CustomFields({
      key: 'notes',
      label: 'Notes',
      value: 'Enter your notes...',
      controlType: 'textarea',
      order: 5
    }),
    new CustomFields({
      key: 'username',
      label: 'Username',
      inputType: 'text',
      order: 3,
      validators: {
        sync: [ Validators.required ],
        async: [ this.checkUsername() ]
      }
    }),
    new CustomFields({
      key: 'password',
      label: 'Password',
      inputType: 'password',
      order: 4,
      validators: {
        sync: [ Validators.required, Validators.pattern(/^[A-z\s]+$/i) ]
      }
    })
  ];

  constructor(private http: HttpClient) { }

  get formFields(): Observable<CustomFields[]> {
    return of(this.fields);
  }

  generateForm(): FormGroup {
    let form: any = {};

    this.fields.sort((a, b) => a.order - b.order).forEach(field => {
      form[field.key] = new FormControl(
        field.value,
        field.validators.sync || null,
        field.validators.async || null
      )
    });
    return new FormGroup(form);
  }

  checkUsername(): AsyncValidatorFn {
    const usernames = [
      'hirayoki22',
      'hirayoki'
    ];

    return (control: AbstractControl): 
      Observable<ValidationErrors | null> => {
      return of(usernames).pipe(
        map(usernames => {
          const match = usernames.find(username => {
            return username.toLowerCase() == control.value.toLowerCase();
          });
          return match ? 
            { taken: { isTaken: true, enteredUsername: control.value } } : null;
        })
      )
    }
  }
}