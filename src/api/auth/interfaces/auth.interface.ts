import { USER_STATUS } from "src/api/user/entities/user-status.enum";

export interface accessToken {
    sub:string,
    firstName:string,
    lastName?:string,
    tokenVersion?:number,
    email?:string
    userStatus:USER_STATUS

}


export interface refreshToken  {
    sub:string,
    tokenVersion?:number,
}
// auth/interfaces/token-payload.interface.ts

export interface TokenPayload {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  tokenVersion: number;
  userStatus: USER_STATUS;
}