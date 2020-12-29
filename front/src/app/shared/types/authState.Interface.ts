import {ResponseImageInterface} from "../../auth/types/responseImage.interface";

export interface AuthStateInterface {
  isLoading: boolean
  isChecking: boolean
  status: boolean | null,
  img: ResponseImageInterface | null
  activeUsername: string | null
  online: boolean | null
}
