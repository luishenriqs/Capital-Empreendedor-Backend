var express = require('express');
var methods = require('../database/functions');
var getOppotunities = require('../services/getOpportunities');
var usersRouter = express.Router();


/******************[Buscando todos os clientes]****************** */
/* Esta requisição retorna uma lista com todos os clientes listados 
usando o método "getAll". */

usersRouter.get('/users', async (req, res) => {
  const data = await methods.getAll("users");
  const resposta = res.json(data)
  res.send(resposta);
});
/**************************************************************** */

/***************[Buscando todas as oportunidades]**************** */
/* Esta requisição retorna uma lista com todas oportunidades existentes, 
para isso usa o método "getAll". */

usersRouter.get('/opportunities', async (req, res) => {
  const data = await methods.getAll("opportunities");
  const resposta = res.json(data)
  res.send(resposta);
});
/**************************************************************** */

/******************[Buscando um único cliente]******************* */
/* Aqui é possível listar as informações de um cliente específico 
usando diretamente o método "getOne". */

usersRouter.get('/users/:email', async (req, res) => {
  const { email } = req.params;
  const data = await methods.getOne("users", email);
  const resposta = res.json(data)
  res.send(resposta);
});
/**************************************************************** */

/**************[Buscando oportunidades por cliente]************** */
/* Esta chamada lista todas as oportunidades de um cliente específico.
Para isso criamos um serviço auxiliar, o "getOpportunities", que 
identifica um usuário específico pelo seu email e retorna o seu array 
"opportunities" com todas as suas oportunidades */

usersRouter.get('/opportunities/:email', async (req, res) => {
  const { email } = req.params;
  const resposta = await getOppotunities(email);
  res.send(resposta);
});
/**************************************************************** */

/*****************[Criando uma nova oportunidade]**************** */
/* Aqui podemos inserir uma nova oportunidade na lista de oportunidades. 
O frontend deve fornecer um objeto com todas as informações da nova oportunidade.
Com o email, retirado do "req.params", usamos o serviço "getOpportunities" e 
selecionamos o array "opportunities" com todas as oportunidades do cliente.
Então, com o ".push()" inserimos a "newOpportunity" no array original e 
convertemos para o formato de um objeto.
Após esses passos o "object" esta pronto para ser salvo com o "method.set()". */

usersRouter.post('/opportunities/:email', async (req, res) => {
  const { email } = req.params;
  const newOpportunity = req.body;
  const opportunities = await getOppotunities(email);
  opportunities.push(newOpportunity);
  const object = {opportunities}
  const data = await methods.set("opportunities", email, object);
  res.send(data);
});
/**************************************************************** */

/**************[Editando o status da opportunidade]************** */
/* Com esta chamada é possível editar o campo status de uma oportunidade. 
O frontend deve enviar no corpo da requisição o index da opportunidade a ser
alterada e o seu novo status. Com o email, retirado do "req.params", selecionamos
as oportunidades do cliente com o serviço "getOpportunities". Daí, usando o index
escolhemos a oportunidade específica. Com o "Object.values" transformamos o 
objeto em array, e com o "splice" substituímos o status antigo pelo novo.
Retornamos para a forma de objeto criando a "const obj". 
Por fim, no objeto original de oportunidades (opportunities), removemos a 
oportunity desatualizada e inserimos a nova mais uma vez usando o "splice". 
Após esses passos o objeto esta pronto para ser salvo com o "method.set()". */

usersRouter.put('/opportunities/:email', async (req, res) => {
  const { email } = req.params;
  const { newStatus, index } = req.body;
  const opportunities = await getOppotunities(email);
  const opportunity = opportunities[index];
  array = Object.values(opportunity);
  array.splice(4,1,newStatus);

  const obj = {};
  obj.name = array[0];
  obj.limit = array[1];
  obj.interest = array[2];
  obj.term = array[3];
  obj.isActive = array[4];

  opportunities.splice(index,1,obj)

  const data = await methods.set("opportunities", email, {opportunities});
  res.send(data);
});
/**************************************************************** */

/******************[Deletando uma oportunidade]****************** */
/* Aqui novamente usamos o ".splice()", dessa vez apenas para remover
uma oportunidade específica da lista "opportunities". */

usersRouter.delete('/opportunities/:email', async (req, res) => {
  const { email } = req.params;
  const { index } = req.body;
  const opportunities = await getOppotunities(email);
  opportunities.splice(index, 1);
  const data = await methods.set("opportunities", email, {opportunities});
  res.send(data);
});
/**************************************************************** */

module.exports = usersRouter;