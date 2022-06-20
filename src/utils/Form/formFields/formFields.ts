
export const LOGIN_FORM_DATA = [
  {
    control: "input",
    label: "Email",
    name: "email",
    type: "email",
  },
  {
    control: "input",
    label: "Password",
    name: "password",
    type: "password",
  },
];

export const SIGNUP_FORM_DATA = [
  {
    control: "input",
    label: "Name",
    name: "name",
    type: "text",
  },
  {
    control: "input",
    label: "Email",
    name: "email",
    type: "email",
  },
  {
    control: "input",
    label: "Password",
    name: "password",
    type: "password",
  },
  {
    control: "input",
    label: "Contact",
    name: "contact",
    type: "number",
  },
  {
    control: "input",
    label: "Place",
    name: "place",
    type: "text",
  },
];

export const CONTACT_FORM_DATA = [
  {
    control: "input",
    label: "Name",
    name: "name",
    type: "text",
  },
  {
    control: "input",
    label: "Email",
    name: "email",
    type: "email",
  },
  {
    control: "textarea",
    label: "Message",
    name: "message",
  },
];

export const SEQUENCE_FORM_DATA = [
  {
    control: "input",
    label: "Sequence",
    name: "sequence",
    type: "number",
  },
];

export const SEARCH_FORM_DATA = [
  {
    control: "input",
    label: "Search For Packages",
    name: "search",
    type: "text",
  },
];

export const ADDTOUR_FORM_DATA = [
  {
    control: "input",
    label: "Package Name",
    name: "name",
    type: "text",
  },
  {
    control: "input",
    label: "Tour From",
    name: "from",
    type: "text",
  },
  {
    control: "input",
    label: "Tour to",
    name: "to",
    type: "text",
  },
  {
    control: "input",
    label: "Tour cost",
    name: "cost",
    type: "number",
  },
  {
    control: "input",
    label: "Total Days",
    name: "days",
    type: "number",
  },
  {
    control: "date",
    label: "Booking Start Date",
    name: "startDate",
    type: "date",
  },
  {
    control: "date",
    label: "Booking End Date",
    name: "endDate",
    type: "date",
  },
  {
    control: "input",
    label: "Provider license",
    name: "license",
    type: "text",
  },
  {
    control: "textarea",
    label: "Tour description",
    name: "description",
  },
  {
    control: "file",
    label: "Tour Image",
    name: "file",
  },
];

export const ADDHOTEL_FORM_DATA = [
  {
    control: "input",
    label: "Hotel Name",
    name: "name",
    type: "text",
  },
  {
    control: "input",
    label: "Latitude",
    name: "latitude",
    type: "number",
  },
  {
    control: "input",
    label: "Longitude",
    name: "longitude",
    type: "number",
  },
  {
    control: "textarea",
    label: "Address",
    name: "address",
  },
  {
    control: "input",
    label: "Hotel license",
    name: "license",
    type: "text",
  },
  {
    control: "file",
    label: " Hotel Image",
    name: "file",
  },
];

export const ADDROOM_FORM_DATA = [
  {
    control: "input",
    label: "Room Name",
    name: "name",
    type: "text",
  },
  {
    control: "input",
    label: "Room Cost",
    name: "cost",
    type: "number",
  },
  {
    control: "input",
    label: "Max Person",
    name: "maxPerson",
    type: "number",
  },
  {
    control: "textarea",
    label: "Description",
    name: "description",
  },
  {
    control: "file",
    label: " Room Image",
    name: "file",
  },
];

export const CATEGORY_FORM_DATA = [
  {
    control: "input",
    label: "Category Name",
    name: "category_name",
    type: "text",
  },
  {
    control: "file",
    label: "Category Image",
    name: "file",
  },
];

export const SETCATEGORY_FORM_DATA = [
  {
    control: "input",
    label: "Package Name",
    name: "name",
    type: "text",
  },
  {
    control: "input",
    label: "Tour From",
    name: "from",
    type: "text",
  },
  {
    control: "input",
    label: "Tour to",
    name: "to",
    type: "text",
  },
  {
    control: "select",
    label: "Category",
    name: "category",
    type: "select",
  },
  {
    control: "date",
    label: "Booking Start Date",
    name: "startDate",
    type: "date",
  },
  {
    control: "date",
    label: "Booking End Date",
    name: "endDate",
    type: "date",
  },
  {
    control: "date",
    label: "Booking Closed On",
    name: "closedOn",
    type: "date",
  },
];

export const REVIEW_FORM_DATA = [
  {
    control: "input",
    label: "Name",
    name: "name",
    type: "text",
  },
  {
    control: "input",
    label: "Email",
    name: "email",
    type: "email",
  },
  {
    control: "input",
    label: "Rating",
    name: "rating",
    type: "number",
  },
  {
    control: "textarea",
    label: "Commment",
    name: "comment",
  },
];

export const BOOKTOUR_FORM_DATA = [
  {
    control: "date",
    label: "Current Date",
    name: "date",
    type: "date",
  },
  {
    control: "input",
    label: "Max Days",
    name: "maxDays",
    type: "number",
  },
  {
    control: "options",
    label: "Total Guests",
    name: "maxPerson",
    type: "select",
  },
];

export const BOOKROOM_FORM_DATA = [
  {
    control: "date",
    label: "Check In Date",
    name: "inDate",
    type: "date",
  },
  {
    control: "date",
    label: "Check out Date",
    name: "outDate",
    type: "date",
  },
  {
    control: "options",
    label: "Total Guests",
    name: "maxPerson",
    type: "select",
  },
];
