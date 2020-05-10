import { Component, OnInit } from '@angular/core';
import { CustomFormControls } from '../form-control';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  fields: CustomFormControls[] = [
    // { 
    //   key: 'imageUrl', 
    //   label: 'Image',
    //   controlType: 'input',
    //   type: 'url'
    // },
    { 
      key: 'name', 
      label: 'Name',
      controlType: 'input'
    },
    { 
      key: 'entryNumber', 
      label: 'Entry number',
      controlType: 'input'
    },
    { 
      key: 'description', 
      label: 'Description',
      controlType: 'textarea'
    },
    { 
      key: 'height', 
      label: 'Height',
      controlType: 'input'
    },
    { 
      key: 'weight', 
      label: 'Weight',
      controlType: 'input',
      type: 'number'
    },
    { 
      key: 'gender', 
      label: 'Gender',
      controlType: 'dropdown',
      options: [
        { key: 'Male', value: 'male' },
        { key: 'Female', value: 'female' }
      ]
    },
    { 
      key: 'category', 
      label: 'Category',
      controlType: 'input'
    },
    { 
      key: 'evolutions', 
      label: 'Evolution(s)',
      controlType: 'input'
    },
    { 
      key: 'evolutionOrder', 
      label: 'Evolution Order',
      controlType: 'input',
      type: 'number'
    },
    { 
      key: 'hp', 
      label: 'HP',
      controlType: 'input',
      type: 'number'
    },
    { 
      key: 'attack', 
      label: 'Attack',
      controlType: 'input',
      type: 'number'
    },
    { 
      key: 'defense', 
      label: 'Defense',
      controlType: 'input',
      type: 'number'
    },
    { 
      key: 'spAtk', 
      label: 'Sp. Atk',
      controlType: 'input',
      type: 'number'
    },
    { 
      key: 'spDef', 
      label: 'Sp. Def',
      controlType: 'input',
      type: 'number'
    },
    { 
      key: 'speed', 
      label: 'Speed',
      controlType: 'input',
      type: 'number'
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
