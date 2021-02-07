export interface IUser {
  _id: string;
  name: string;
  phone: string;
  role: string;
  isNotice: boolean;
}

export interface IUserInputDTO {
  name: string;
  phone: string;
  isNotice: string;
}
