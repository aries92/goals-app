import { IUser } from "../../../api/src/types";

export type RootStackParamList = {
  Login: { to: string };
  Register: { to: string };
  Dashboard: undefined;
};

export interface IForm {
  email: string;
  password: string;
}

export interface IAuth {
  signIn: (token: string) => void;
  signOut: () => void;
  user: IUser;
}

export interface IToken {
  user: IUser;
}

export interface IGoal {
  id: number;
  text: string;
  complete: boolean;
  userId: number;
}

export interface IGoalsMapped {
  todo: IGoal[];
  done: IGoal[];
}
