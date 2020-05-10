import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";
import { RootStackParamList } from "../../types";

type RegisterScreenRouteProp = RouteProp<RootStackParamList, "Register">;

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

export type Props = {
  route: RegisterScreenRouteProp;
  navigation: RegisterScreenNavigationProp;
};
