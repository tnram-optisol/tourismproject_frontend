export const LOGIN_INITIAL_VALUES = {
  email: "",
  password: "",
};

export const SIGNUP_INITIAL_VALUES = {
  name: "",
  email: "",
  place: "",
  password: "",
  contact: "",
};

export const CONTACT_INITIAL_VALUES = {
  name: "",
  email: "",
  message: "",
};

export const SEQUENCE_INITIAL_VALUES = {
  sequence: 0,
};

export const SEARCH_INITIAL_VALUES = {
  search: "",
};

export const ADDTOUR_INITIAL_VALUES = {
  name: "",
  from: "",
  to: "",
  description: "",
  cost: 0,
  startDate: null,
  endDate: null,
  license: "",
  file: null,
};

export const ADDHOTEL_INITIAL_VALUES = {
  name: "",
  latitude: 0,
  longitude: 0,
  address: "",
  license: "",
  file: null,
};

export const ADDROOM_INITIAL_VALUES = {
  name: "",
  image: "",
  description: "",
  cost: 0,
  file: null,
};

export const ADDCATEGORY_INITIAL_VALUES = {
  category_name: "",
  file: null,
};

export const SETCATEGORY_INITIAL_VALUES = {
  name: "",
  from: "",
  to: "",
  category: [],
  startDate: null,
  endDate: null,
  closedOn: null,
};

export const POSTREVIEW_INITIAL_VALUES = {
  name: "",
  roleId: 4,
  rating: 0,
  comment: "",
};

export const BOOKTOUR_INITIAL_VALUES = {
  date: null,
  maxDays: 0,
  maxPerson: 0,
};

export const BOOKROOM_INITIAL_VALUES = {
  inDate: new Date(),
  outDate: new Date(),
  maxPerson: 0,
};

export const GETOTP_INITIAL_VALUES = {
  email: "",
};

export const RESETPASS_INITIAL_VALUES = {
  otp: 0,
  password: "",
  cnf_password: "",
};
