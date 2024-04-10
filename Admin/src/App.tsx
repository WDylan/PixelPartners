import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { AuthProvider } from "../../Frontend/src/components/AuthContext";

export const App = () => <Admin authProvider={AuthProvider}></Admin>;
