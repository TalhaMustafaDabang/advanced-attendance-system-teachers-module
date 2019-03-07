export interface offeredTo{
  degree: string,
  semester: number
}

export interface Course{
    title:string,
    creditHours:number,
    totalClasses:number,
    offeredTo: offeredTo[],
}

