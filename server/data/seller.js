import bcrypt from "bcryptjs";

const sellers = [
  {
    name: "Akeem Mohammed",
    email: "seller@localmerch.com",
    storename: "Red Raider Outfitter",
    password: bcrypt.hashSync("Mylocalseller", 10),
    isSeller: true,
  },
  {
    name: "Lil Baby",
    email: "lilbaby@localmerch.com",
    storename: "Fourpf",
    password: bcrypt.hashSync("lilbaycool", 10),
    isSeller: true,
  },
  {
    name: "Logan Roy",
    email: "loganroy@localmerch.com",
    storename: "Waystar Royco",
    password: bcrypt.hashSync("roycostuff", 10),
    isSeller: true,
  },
  {
    name: "Samaila Kisham",
    email: "kishindustries@localmerch.com",
    storename: "Kish Inc",
    password: bcrypt.hashSync("kishsmasher", 10),
    isSeller: true,
  },
  {
    name: "Patrick Enyoun",
    email: "Dafuqcorporation@localmerch.com",
    storename: "Dafuq Corporation",
    password: bcrypt.hashSync("blingbling", 10),
    isSeller: true,
  },
];

export default sellers;