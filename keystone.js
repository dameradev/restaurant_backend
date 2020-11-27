const { Keystone } = require("@keystonejs/keystone");
const initialiseData = require("./initial-data");
const { PrismaAdapter: Adapter } = require("@keystonejs/adapter-prisma");
const adapterConfig = {
  url: "postgresql://postgres:damjan@localhost:5433/damjanradev",
  //   dropDatabase: true,
};

const { PasswordAuthStrategy } = require("@keystonejs/auth-password");

const UserSchema = require("./lists/User.js");
const RestaurantSchema = require("./lists/Restaurant.js");
const TableSchema = require("./lists/Table.js");
const CustomerSchema = require("./lists/Customer.js");

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  onConnect: initialiseData,
  cookie: {
    secure: process.env.NODE_ENV === "production", // Default to true in production
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    sameSite: false,
  },
});

const User = keystone.createList("User", UserSchema);
const Restaurant = keystone.createList("Restaurant", RestaurantSchema);
const Table = keystone.createList("Table", TableSchema);
const Customer = keystone.createList("Customer", CustomerSchema);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User",
});

module.exports = { authStrategy, keystone, Table, Restaurant, Customer, User };
