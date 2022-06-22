export interface UserModel {
  id: number;
  name: string;
  password: string;
  email: string;
  contact: number;
  role: {
    id: number;
    role: string;
  };
}
