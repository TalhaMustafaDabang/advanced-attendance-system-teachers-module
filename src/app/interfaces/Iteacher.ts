import { EmailValidator } from "@angular/forms";

export interface teachingCourses{
  course:string,
  calss:string
}

export interface Teacher{
    firstName: string,
    lastName: string,
    id: string;
    dept: string,
    courses: string[],
    nowTeaching: teachingCourses[],
    email: string,
}
