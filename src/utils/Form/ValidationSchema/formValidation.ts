import * as Yup from "yup";

export const LOGIN_VALIDATION_SCHEMA = Yup.object({
  email: Yup.string().email("Must be valid").required("Required"),
  password: Yup.string()
    .min(6, "Minimum length must be 6")
    .required("Required"),
});

export const SIGNUP_VALIDATION_SCHEMA = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Must be valid").required("Required"),
  password: Yup.string()
    .min(8, "Minimum length must be 8")
    .required("Required"),
  contact: Yup.string()
    .matches(new RegExp(`[6789]{1}[0-9]{9}`))
    .length(10, "Minimum length must be 10")
    .required("Required"),
  place: Yup.string().required("Required"),
});

export const CONTACT_VALIDATION_SCHEMA = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Must be valid").required("Required"),
  message: Yup.string().required("Required"),
});

export const SEQUENCE_VALIDATION_SCHEMA = Yup.object({
  sequence: Yup.number().moreThan(0, "Must be greater than zero"),
});

export const SEARCH_VALIDATION_SCHEMA = Yup.object({
  search: Yup.string().required("Required"),
});

export const ADDTOUR_VALIDATION_SCHEMA = Yup.object({
  name: Yup.string().required("Required"),
  from: Yup.string().required("Required"),
  to: Yup.string().required("Required"),
  cost: Yup.number()
    .required("Required")
    .moreThan(0, "Must be greater than zero"),
  description: Yup.string().required("Required"),
  license: Yup.string().required("Required"),
  startDate: Yup.date().required("Required"),
  endDate: Yup.date().required("Required"),
  file: Yup.mixed().required("Required"),
});

export const ADDHOTEL_VALIDATION_SCHEMA = Yup.object({
  name: Yup.string().required("Required"),
  latitude: Yup.number()
    .required("Required")
    .moreThan(0, "Must be non negative and zero"),
  longitude: Yup.number()
    .required("Required")
    .moreThan(0, "Must be non negative and zero"),
  address: Yup.string().required("Required"),
  license: Yup.string().required("Required"),
  file: Yup.mixed().required("Required"),
});

export const ADDROOM_VALIDATION_SCHEMA = Yup.object({
  name: Yup.string().required("Required"),
  cost: Yup.number()
    .required("Required")
    .moreThan(0, "Must be non negative and zero"),
  maxPerson: Yup.number()
    .required("Required")
    .moreThan(0, "Must be non negative and zero"),
  description: Yup.string().required("Required"),
  file: Yup.mixed().required("Required File must be an Image"),
});

export const ADDCATEGORY_VALIDATION_SCHEMA = Yup.object({
  category_name: Yup.string().required("Required"),
  file: Yup.mixed().required("Required File must be an Image"),
});

export const SETCATEGORY_VALIDATION_SCHEMA = Yup.object({
  name: Yup.string().required("Required"),
  from: Yup.string().required("Required"),
  to: Yup.string().required("Required"),
  startDate: Yup.date().required("Required"),
  endDate: Yup.date().required("Required"),
  closedOn: Yup.date().required("Required"),
  category: Yup.array().min(1).required("Required"),
});

export const POSTREVIEW_VALIDATION_SCHEMA = Yup.object({
  name: Yup.string().required("Required"),
  comment: Yup.string().required("Required"),
  rating: Yup.number().min(1).required("Required"),
});
export const GETOTP_VALIDATION_SCHEMA = Yup.object({
  email: Yup.string().email("Must be valid").required("Required"),
});

export const RESETPASS_VALIDATION_SCHEMA = Yup.object({
  otp: Yup.number().min(100000).max(999999).required("Required"),
  password: Yup.string().length(8).required("Required"),
  cnf_password: Yup.string().length(8).required("Required"),
});

export const COUPON_VALIDATION_SCHEMA = Yup.object({
  coupon: Yup.string().required("Required"),
  percent: Yup.number().min(1).max(100).required("Required"),
});
