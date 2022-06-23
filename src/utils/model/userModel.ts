import { BookRoomModel } from "./hotelModel";
import { BookTourModel } from "./tourModel";

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

export interface OrdersModel {
  order_id: string;
  purchased_by: string;
  email: string;
  orderCost: number;
  description: string;
  paymentId: string;
  discount: number;
  paymentStatus: boolean;
  orderStatus: boolean;
  orderdAt: Date;
  user: UserModel;
  bookTour: BookTourModel;
  bookRoom: BookRoomModel;
}
