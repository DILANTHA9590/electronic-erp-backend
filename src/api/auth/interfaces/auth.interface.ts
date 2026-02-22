import { USER_STATUS } from "src/api/user/entities/user-status.enum";

export interface accessToken {
    sub:string,
    first_name:string,
    last_name?:string,
    token_version?:number,
    user_status:USER_STATUS

}


export interface refreshToken  {
    sub:string,
    token_version?:number,
}
// auth/interfaces/token-payload.interface.ts

export interface TokenPayload {
  id: string;
  first_name: string;
  last_name?: string;
  email: string;
  token_version: number;
  user_status: string;
}