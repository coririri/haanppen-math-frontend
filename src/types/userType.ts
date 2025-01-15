export interface UserFormType {
  phoneNumber: string;
  name: string;
  password: string;
  newPassword: string;
  registerDate: string;
}

export interface AccountInfoType {
  userName: string;
  phoneNumber: string;
  role: 'STUDENT' | 'ADMIN' | 'TEACHER';
  grade: number;
}

export interface UserInformationErrorMessageType {
  name: string;
  phoneNumber: string;
  password: string;
  newPassword: string;
}
