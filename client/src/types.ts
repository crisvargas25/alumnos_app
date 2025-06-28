export interface User {
  _id: string;
  name: string;
  email: string;
  enrollmentYear: number;
}

export interface Message {
  _id: string;
  sender: User;
  recipient: string;
  content: string;
  createdAt: string;
}