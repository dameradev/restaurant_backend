// const  Table = require('')
const { Table } = require("../keystone");

const reserveTable = async (_, { tableId, customerName }) => {
  const { adapter } = Table;

  const newItem = await adapter.model.update({
    where: { id: tableId },
    data: {
      customer: { create: { name: customerName } },
    },
  });

  console.log(newItem);

  return {
    tableId,
    customerName: customerName,
  };
};

module.exports = { reserveTable };
