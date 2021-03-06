export interface IUser {
  id: number;
  name: string;
  role: Role;
}

export type Role = 'USER' | 'MODERATOR' | 'ADMIN';

export interface IPost {
  id: number;
  title: string;
  content: string;
  creator: IUser;
  lastModifier: IUser;
  creationDate: string;
  modificationDate: string;
}

export interface IAuthenticaionResponse {
  user: IUser;
  posts: IPost[];
}

export interface ILoginRequest {
  mail: string;
  password: string;
}

export interface IRegisterRequest extends ILoginRequest {
  name: string;
}

export interface ILogin extends IAuthenticaionResponse {
  email: string;
  password: string;
}

export interface IPostRequest {
  title: string;
  content: string;
}

export interface IRoleRequest {
  id: number;
  role: Role;
}
