export class JwtPayloadDto {
  sub!: string;

  firstName!: string;

  lastName!: string;

  email!: string;

  tokenVersion!: number;

  userStatus!: string;
}