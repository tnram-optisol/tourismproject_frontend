import { UserModel } from "./userModel";

export interface TourModel {
  tour_id: number;
  package_name: string;
  from: string;
  to: string;
  tour_image: string;
  provider_license: string;
  description: string;
  availablity: boolean;
  status: boolean;
  startDate: string;
  endDate: string;
  max_person: number;
  total_days: number;
  cost: number;
  user: UserModel;
}

export interface TourOrdersModel {
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
}

export interface BookTourModel {
  book_id: number;
  max_person: number;
  book_date: string;
  book_status: boolean;
  payment: boolean;
  user: UserModel;
  tour: TourModel;
}

export interface UserTourModel{
    banner_id: number;
    sequence: number;
    tour: TourModel;
    rating: number;
}
