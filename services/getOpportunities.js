var methods = require('../database/functions');

const getOppotunities = async (email) => {
  const data = await methods.getOne("opportunities", email);
  const { opportunities } = data;
  return opportunities;
}

module.exports = getOppotunities;
