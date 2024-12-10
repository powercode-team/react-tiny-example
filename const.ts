/*
fullName: '',
companyName: '',
email: '',
phoneNumber: '',
details: '',
*/

export const FIELDS_MAPPER = [
  {
    name: 'fullName',
    type: 'text',
    label: 'FULL NAME',
    placeholder: 'Full name',
    validation: {
      required: 'Please enter your name',
    },
  },
  {
    name: 'companyName',
    type: 'text',
    label: 'COMPANY NAME',
    placeholder: 'Company name',
    validation: {
      required: 'Please enter company name',
    },
  },
  {
    name: 'email',
    type: 'email',
    label: 'EMAIL',
    placeholder: 'e-mail',
    validation: {
      required: 'Please enter email address',
      pattern: {
        value: /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9-]{1,}(\.[a-zA-Z]{2,}){1,}$/,
        message: 'Email is invalid',
      },
    },
  },
  {
    name: 'phoneNumber',
    type: 'tel',
    label: 'PHONE NUMBER',
    placeholder: 'Phone number',
    validation: {
      required: 'Please enter email address',
      pattern: {
        value: /^\+?\d{0,3}[\s-]?(\(?\d{2,4}\)?[\s-]?)?(\d{2,4}[\s-]?){2,3}\d{2,4}$/,
        message: 'Phone is invalid',
      },
    },
  },
  {
    name: 'details',
    type: 'textArea',
    label: 'TELL ME MORE ABOUT THIS PROJECT',
    placeholder: 'About the project',
    validation: {
      required: 'Please tell about the project',
      min: { value: 10, message: 'To short' },
      max: { value: 1000, message: 'To long' },
    },
  },
] as const;
