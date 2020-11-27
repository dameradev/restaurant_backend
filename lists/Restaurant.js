const { Text, Checkbox } = require("@keystonejs/fields");

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
  },
};
