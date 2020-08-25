export interface UserModel {
  _id: string
  username: string
  email: string
  password: string
  role: string
}

export interface UserPost {
  _id: string
  title: string
  content: string
  author: object
}

export interface MailUser {
  to: string
  from: string
  subject: string
  html: string
}
