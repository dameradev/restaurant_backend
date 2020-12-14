const {
  Text,
  Checkbox,
  Relationship,
  DateTime,
  DateTimeUtc,
} = require("@keystonejs/fields");

module.exports = {
  fields: {
    name: {
      type: Text,
      isRequired: true,
    },
    reservationTime: {
      type: DateTimeUtc,
      // format: "dd/MM/yyyy HH:mm",
      // yearRangeFrom: 1901,
      // yearRangeTo: 2018,
      // yearPickerType: "auto",
    },
  },
};
