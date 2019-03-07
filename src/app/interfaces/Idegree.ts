export interface coursesWithSemester{
  semester:number,
  offeredCourses:string[]
}

export interface Degrees{
    title:string,
    durationInMonths: number,
    semesters:number,
    courses: coursesWithSemester[],
    cou: {},
}
