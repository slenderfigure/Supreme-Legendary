import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';

export class CustomFields {
  key: string;
  label: string;
  value: any;
  inputType: string;
  controlType: string;
  order: number;
  selectOptions: { key: string; value: any; }[];
  validators: {
    sync: ValidatorFn[],
    async?: AsyncValidatorFn[]
  };

  constructor(properties: {
    key: string,
    label?: string,
    value?: any,
    inputType?: string,
    controlType?: string,
    order?: number,
    selectOptions?: { key: string, value: any }[],
    validators?: {
      sync?: ValidatorFn[],
      async?: AsyncValidatorFn[]
    }
  }) {
    this.key = properties.key;
    this.label = properties.label || this.key;
    this.value = properties.value || '';
    this.inputType = properties.inputType || 'text';
    this.controlType = properties.controlType || 'input';
    this.order = properties.order || 1;
    this.selectOptions = properties.selectOptions || [];
    this.validators = {
      sync: properties?.validators?.sync || [],
      async: properties?.validators?.async || []
    };
  }
}