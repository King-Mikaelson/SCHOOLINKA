export type Item = {
  title:string,
  date?:any,
  fromTime?:string | number | Date,
  id:number,
  toTime?:string | number | Date,
  completed:boolean,
  userId:number
}

export type Todos = {
  title:string,
  date?:any,
  fromTime?:string | number | Date,
  id:number,
  toTime?:string | number | Date,
  completed:boolean,
  userId:number
}

export interface AppContextProp {
  children?: React.ReactNode,
  page?: number | string,
  setPage?: React.Dispatch<React.SetStateAction<number | string>>,
  limit?: number,
  setLimit?: React.Dispatch<React.SetStateAction<number>>,
  getTasks: any,
  getLength: () => number,
  totalPage: number,
  returnPaginationRange: (sibilings: number) => (string | number)[],
  handleNextButton:() => void,
  handlePreviousButton:() => void,
  handleNumberButton:(value:number| string) => void,
  date: any,
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>,
  texts:Item[],
  setTexts:React.Dispatch<React.SetStateAction<Item[]>>,
  addText : (title: string, fromTime: string | number | Date, toTime: string | number | Date, date: Date | undefined) => void,
  EditTextsById: (id: number, title: string, fromTime: string | number | Date, toTime: string | number | Date, date: any) => void,
  ToggleTextsCompletedById: (id: number) => void,
  DeleteTextsById: (id: number) => void,
  sortArray: () => Item[],
  selectedTodo: string | number | null,
  setSelectedTodo: React.Dispatch<React.SetStateAction<string | number | null>>

}