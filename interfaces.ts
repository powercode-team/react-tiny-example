import { FC } from 'react';

export type TSendResult = 'success' | 'error';

export interface ISnackbarData {
  message: string;
  icon: FC;
}

export interface IContactForm {
  fullName: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  details: string;
}
