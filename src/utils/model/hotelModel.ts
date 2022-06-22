import { UserModel } from "./userModel";

export interface HotelModel {
  hotel_id: number;
  hotel_name: string;
  address: string;
  latitude: number;
  longitude: number;
  hotel_license: string;
  hotel_image: string;
  status: boolean;
  user: UserModel;
}

export interface RoomModel {
  room_id: number;
  room_price: number;
  room_name: string;
  description: string;
  room_image: string;
  hotel: HotelModel;
  max_person: number;
  availability: boolean;
}

export interface HotelOrdersModel {
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
  bookRoom: BookRoomModel;
}
export interface BookRoomModel {
  id: number;
  user: UserModel;
  room: RoomModel;
  in_Date: string;
  out_Date: string;
  total_Days: number;
  total_person: number;
  book_status: boolean;
  payment: boolean;
}
