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
  signIn: (token: string) => void,
  signOut: () => void
}
