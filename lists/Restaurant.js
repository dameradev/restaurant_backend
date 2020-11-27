const { Text, Checkbox, Relationship } = require("@keystonejs/fields");

module.exports = {
  fields: {
    name: {
      type: Text,
      isRequired: true,
    },

    description: {
      type: Text,
      isRequired: true,
    },
    isActive: {
      type: Checkbox,
      defaultValue: false,
    },
    tables: { type: Relationship, ref: "Table.restaurant", many: true },
  },
};
