export interface UserModel {
  id: number;
  name: string;
  password: string;
  email: string;
  contact: number;
  place: string;
  role: {
    id: number;
    role: string;
  };
}
