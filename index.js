const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { keystone, authStrategy } = require("./keystone");

const { reserveTable } = require("./resolvers/Mutation");
// const { reserveTable } = require("./resolvers/Mutation");

const PROJECT_NAME = "backend";

const RestaurantSchema = require("./lists/Restaurant.js");
const TableSchema = require("./lists/Table.js");
const CustomerSchema = require("./lists/Customer.js");

keystone.extendGraphQLSchema({
  types: [
    {
      type:
        "type reserveTableOutput { tableId: Int!, customerName: String!, reservationTime: DateTime}",
    },
  ],
  mutations: [
    {
      schema:
        "reserveTable(tableId: Int, customerName: String, reservationTime: DateTime): reserveTableOutput",
      resolver: reserveTable,
    },
  ],
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
};
