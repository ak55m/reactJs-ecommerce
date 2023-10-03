import bcrypt from "bcryptjs";

const users = [
  {
    name: "Akeem Mohammed",
    email: "admin@localmerch.com",
    password: bcrypt.hashSync("Mylocalcommerce", 10),
    isAdmin: true,
  },
  {
    name: "Vamsi Gabitta",
    email: "vgabitta@gmail.com",
    password: bcrypt.hashSync("123456789", 10),
  },
];

export default users;
