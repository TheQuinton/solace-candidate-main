export interface Advocate {
  id: number | string;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
}

export type { Advocate as AdvocateType } from './types';