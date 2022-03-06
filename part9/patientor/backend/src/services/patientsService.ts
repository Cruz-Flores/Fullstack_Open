import patients from '../../data/patients';

import { WithoutSsnDiaryEntry } from '../types';

const getEntries = (): WithoutSsnDiaryEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getEntries,
};
