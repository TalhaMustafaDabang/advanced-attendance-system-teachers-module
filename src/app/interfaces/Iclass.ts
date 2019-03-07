export type shifts = "Morning" | "Evening" | "Weekends" | "Night";

export interface Class{
    degree: string,
    enrollmentYear: number,
    passingOutYear: number,
    status:number,
    shift: shifts,
    section: string,
    id: string,
    currentStudentsId: string[]
}
