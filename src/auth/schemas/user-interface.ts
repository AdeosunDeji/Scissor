export interface IUser {
  id: string
  username: string
  email: string
  password: string
}

export interface CustomRequest {
  headers: any
  user: IUser
  params: object
  path: object
}