import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {RootStackParamList} from '../../types';

type DashboardScreenRouteProp = RouteProp<RootStackParamList, "Dashboard">;

type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Dashboard"
  >;

export type Props = {
  route: DashboardScreenRouteProp;
  navigation: DashboardScreenNavigationProp;
};
