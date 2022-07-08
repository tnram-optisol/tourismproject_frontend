import { HotelModel } from "./hotelModel";
import { TourModel } from "./tourModel";
import { UserModel } from "./userModel";

export interface BannerModel {
  banner_id: number;
  sequence: number;
  tour: TourModel;
  rating: number;
}

export interface CategoryModel {
  id: number;
  category: string;
  image: string;
}

export interface RequestModel {
  request_id: number;
  user: UserModel;
  hotel: HotelModel;
  tour: TourModel;
  status: boolean;
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
}

export interface NotificationModel {
  id: number;
  notification: string;
  type: string;
}

export interface CouponModel {
  coupon_id: number;
  coupon_name: string;
  percent_off: number;
  addedOn: Date;
}
