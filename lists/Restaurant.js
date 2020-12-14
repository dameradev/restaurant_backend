const { Text, Checkbox, Relationship } = require("@keystonejs/fields");

module.exports = {
  fields: {
    name: {
      type: Text,
      isRequired: true,
    },

    slogan: {
      type: Text,
    },

    description: {
      type: Text,
      isRequired: true,
    },

    descriptionTitle: {
      type: Text,
    },

    reserveText: {
      type: Text,
    },
    isActive: {
      type: Checkbox,
      defaultValue: false,
    },
    tables: { type: Relationship, ref: "Table.restaurant", many: true },
  },
};
