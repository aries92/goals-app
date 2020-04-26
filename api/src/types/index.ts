export interface IUser {
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
