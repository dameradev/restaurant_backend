// const  Table = require('')
const { Table } = require("../keystone");

const reserveTable = async (_, { tableId, customerName, reservationTime }) => {
  const { adapter } = Table;

  console.log(tableId);

  const newItem = await adapter.model.update({
    where: { id: tableId },
    data: {
      customer: {
        create: {
          name: customerName,
          reservationTime: new Date(`${reservationTime}:00`),
        },
      },
    },
  });

  console.log(newItem);

  return {
    tableId,
    customerName: customerName,
  };
};

module.exports = { reserveTable };
