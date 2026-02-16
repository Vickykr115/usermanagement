import { formFields } from '../config/formFields';

export type User = {
  id: number;
} & {
  [K in typeof formFields[number]['name']]: string;
};

export type FormField = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  pattern?: RegExp;
  patternMessage?: string;
};