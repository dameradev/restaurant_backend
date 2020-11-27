const { AutoIncrement } = require("@keystonejs/fields-auto-increment");
const {
  Text,
  Checkbox,
  Integer,
  Relationship,
  DateTime,
} = require("@keystonejs/fields");

const { keystone } = require("../keystone");

console.log(keystone, "TABLEE");
const TableSchema = {
  fields: {
    number: {
      type: AutoIncrement,
      gqlType: "Int",
    },

    // reservationTime: {
    //   type: DateTime,
    //   format: "dd/MM/yyyy HH:mm O",
    //   yearRangeFrom: new Date().getFullYear(),
    //   yearRangeTo: new Date().getFullYear() + 2,
    //   yearPickerType: "auto",
    // },

    seats: {
      type: Integer,
    },
    description: {
      type: Text,
    },
    restaurant: { type: Relationship, ref: "Restaurant.tables", many: false },
    // users: { type: Relationship, ref: "User", many: true },
    customer: { type: Relationship, ref: "Customer", many: true },

    // description: {
    //   type: Text,
    //   isRequired: true,
    // },
  },
};

// exports.Table = keystone.createList("Table", TableSchema);

module.exports = TableSchema;
