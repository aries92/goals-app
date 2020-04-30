import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {RootStackParamList} from '../../types';

export interface IForm {
  email: string;
  password: string;
}

export interface IStyledCenter {
  center: boolean;
}

type LoginScreenRouteProp = RouteProp<RootStackParamList, "Login">;

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
  >;

export type Props = {
  route: LoginScreenRouteProp;
  navigation: LoginScreenNavigationProp;
};
