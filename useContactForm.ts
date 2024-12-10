import { Error, Success } from '@assets/svg';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { IContactForm, ISnackbarData, TSendResult } from './interfaces';

const sendForm = (body: FormData, cb: (result: TSendResult) => void) => {
  let result: TSendResult;
  fetch('/contact-form.php', {
    method: 'POST',
    body,
  })
    .then((res) => {
      result = 'success';

      return res.json();
    })
    .catch((error) => {
      result = 'error';
      console.error({ error });
    })
    .finally(() => {
      cb(result);
    });
};

export const useContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [snackbarData, setSnackbarData] = useState<ISnackbarData | null>(null);
  const {
    handleSubmit,
    formState: { errors, isValid },
    register,
    reset,
  } = useForm<IContactForm>({
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      companyName: '',
      email: '',
      phoneNumber: '',
      details: '',
    },
  });

  const handler = useCallback((data: IContactForm) => {
    setLoading(true);
    const body = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      let newKey;
      switch (key as keyof IContactForm) {
        case 'companyName':
          newKey = 'company_name';
          break;
        case 'phoneNumber':
          newKey = 'phone';
          break;
        case 'fullName':
          newKey = 'full_name';
          break;
        case 'details':
          newKey = 'about_project';
          break;
        default:
          newKey = key;
          break;
      }
      body.append(newKey, val);
    });

    const cb = (result: TSendResult) => {
      setLoading(false);
      setSnackbarData({
        icon: result === 'success' ? Success : Error,
        message: result === 'success' ? 'Message successfully sent' : 'Error occurred',
      });
      if (result === 'success') reset();
      setTimeout(() => {
        setSnackbarData(null);
      }, 3000);
    };
    sendForm(body, cb);
  }, []);

  return {
    loading,
    errors,
    isValid,
    snackbarData,
    register,
    handleSubmit,
    handler,
  };
};
