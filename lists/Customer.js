const {
  Text,
  Checkbox,
  Relationship,
  DateTime,
} = require("@keystonejs/fields");

module.exports = {
  fields: {
    name: {
      type: Text,
      isRequired: true,
    },
    reservationTime: {
      type: DateTime,
      format: "dd/MM/yyyy HH:mm O",
      // yearRangeFrom: 2020,
      // yearRangeTo: 2021,
      // yearPickerType: "auto",
    },
  },
};
