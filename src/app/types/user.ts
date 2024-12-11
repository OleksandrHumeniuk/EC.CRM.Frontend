export enum UserRole {
  Director = 'Директор',
  Mentor = 'Ментор',
  Student = 'Студент',
}

export type UserRoleType = keyof typeof UserRole;

export type TokenUser = {
  uid: string;
  email: string;
  locationUids: string[];
  studyFieldUids: string[];
  role: UserRoleType;
}
