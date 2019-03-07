export interface IUser{
  email: string,
  name: string,
  role:{
    admin: boolean,
    teacher: boolean,
    student: boolean,
  }
}
