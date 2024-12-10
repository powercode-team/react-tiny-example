'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { FC } from 'react';

import { useContactForm } from '@/components/Contacts/components/Form/useContactForm';

import { FIELDS_MAPPER } from './const';
import styles from './index.module.scss';

export const Form: FC = () => {
  const { loading, errors, isValid, snackbarData, register, handleSubmit, handler } =
    useContactForm();

  return (
    <>
      <form onSubmit={handleSubmit(handler)} className={styles.form}>
        <fieldset>
          {FIELDS_MAPPER.map(({ type, label, placeholder, validation, name }, idx) => (
            <label
              key={`label-${idx}-for-${name}`}
              className={clsx({ [styles.error]: errors[name] })}
            >
              <span className={styles.label}>{label}</span>
              {type === 'textArea' ? (
                <textarea
                  placeholder={placeholder}
                  {...register(name, validation)}
                  className={styles.field}
                />
              ) : (
                <input
                  type={type}
                  placeholder={placeholder}
                  {...register(name, validation)}
                  className={styles.field}
                />
              )}
              {errors[name] && <span className={styles.msg}>{errors[name].message}</span>}
            </label>
          ))}
        </fieldset>

        <p>
          By submiting this form I consent to have my data collected in order to process this
          request.
          <br />
          We will add your info to our CRM for contacting you regarding your request.
          <br />
          For more info please consult our&nbsp;
          <Link href="/privacy">privacy policy</Link>
        </p>

        <button type="submit" disabled={!isValid || loading}>
          {loading ? <span className={styles.loader} /> : 'Send message'}
        </button>
      </form>

      {snackbarData?.message && (
        <div className={styles.snackbar}>
          <snackbarData.icon />
          <span>{snackbarData.message}</span>
        </div>
      )}
    </>
  );
};
