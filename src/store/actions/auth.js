import { createAction } from '@reduxjs/toolkit';

export const sigIn = createAction('auth/sigIn', (value) => ({
  payload: { ...value, birthday: value.birthday ? (typeof value.birthday !== 'number' ? value.birthday._seconds * 1000 : value.birthday) : undefined },
}));
export const sigOut = createAction('auth/sigOut');
