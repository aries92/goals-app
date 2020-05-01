export type RootStackParamList = {
  Login: { to: string };
  Register: { to: string };
  Dashboard: undefined;
};

export interface IForm {
  email: string;
  password: string;
}
