var methods = require('../database/functions');

/******************[Buscando as oportunidades]******************* */
/* Este serviço auxiliar recebe como parâmetro o email identificador
de cada cliente e o usa para listar o array de oportunidades de cada
cliente específico */
const getOppotunities = async (email) => {
  const data = await methods.getOne("opportunities", email);
  const { opportunities } = data;
  return opportunities;
}
/**************************************************************** */
module.exports = getOppotunities;
