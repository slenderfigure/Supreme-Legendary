export interface CustomFormControls {
  key: string;
  label: string;
  type?: string;
  value?: any;
  controlType: string;
  options?: { key: string, value: any }[]
}