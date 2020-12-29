import {ChatStateInterface} from "./chatState.Interface";
import {AuthStateInterface} from "./authState.Interface";

export interface AppStateInterface {
  message: ChatStateInterface,
  auth: AuthStateInterface,
}
