export const userFields = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    required: true,
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
    required: true,
    pattern: /^[0-9]{10}$/,
    patternMessage: "Phone must be 10 digits",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    patternMessage: "Invalid email format",
  },
];
