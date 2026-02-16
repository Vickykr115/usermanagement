import type { FormField } from '../types';

export const formFields: FormField[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true,
    pattern: /^[A-Za-z]+$/,
    patternMessage: 'Only letters allowed',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true,
    pattern: /^[A-Za-z]+$/,
    patternMessage: 'Only letters allowed',
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    type: 'tel',
    required: true,
    pattern: /^[0-9]{10}$/,
    patternMessage: 'Must be exactly 10 digits',
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    pattern: /^\S+@\S+\.\S+$/,
    patternMessage: 'Invalid email format',
  },
];