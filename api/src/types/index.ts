export interface IUser {
  id: number;
  email: string;
  password: string;
}
export interface IGoalComplete {
  id: number;
  complete: boolean;
  userId: number;
}
export interface IGoalCreate {
  userId: number;
  text: string;
}
