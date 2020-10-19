var express = require('express');
var methods = require('../database/functions');
var getOppotunities = require('../services/getOpportunities');
var usersRouter = express.Router();


/******************[Buscando todos os clientes]****************** */
// Esta chamada "GET" trás uma lista com todos os clientes listados.
usersRouter.get('/users', async (req, res) => {
  const data = await methods.getAll("users");
  const resposta = res.json(data)
  res.send(resposta);
});
/**************************************************************** */

/***************[Buscando todas as oportunidades]**************** */
// Esta chamada "GET" trás uma lista com todas oportunidades existentes.
usersRouter.get('/opportunities', async (req, res) => {
  const data = await methods.getAll("opportunities");
  const resposta = res.json(data)
  res.send(resposta);
});
/**************************************************************** */

/******************[Buscando um único cliente]******************* */
// Aqui é possível listar as informações de um cliente específico.
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
identifica um usuário específico e trás seu array de oportunidades */
usersRouter.get('/opportunities/:email', async (req, res) => {
  const { email } = req.params;
  const resposta = await getOppotunities(email);
  res.send(resposta);
});
/**************************************************************** */

/*****************[Criando uma nova oportunidade]**************** */
/* Aqui podemos inserir na lista de oportunidades de cada cliente uma
nova oportunidade com todos os seus dados. Escolhemos o cliente, com 
auxilio do serviço "getOpportunities" buscamos seu array de oportunidades
e usando o ".push()" inserimos a nova oportuidade criada.*/
usersRouter.post('/opportunities/:email', async (req, res) => {
  const { email } = req.params;
  const newOpportunity = req.body;
  const opportunities = await getOppotunities(email);
  opportunities.push(newOpportunity);
  const array = {opportunities}
  const data = await methods.set("opportunities", email, array);
  res.send(data);
});
/**************************************************************** */

/*******************[Editando uma oportunidade]****************** */
/* Com esta chamada é possível editar qualquer campo de uma oportunidade
específica. O frontend deve enviar no corpo da requisição um novo objeto
com todas as informações da oportunidade editada já atualizada. Então, o
".splice()" remove a oportunidade desatualizada e insere no mesmo lugar o 
novo objeto. */
usersRouter.put('/opportunities/:email', async (req, res) => {
  const { email } = req.params;
  const { newData, index } = req.body;
  const opportunities = await getOppotunities(email);
  opportunities.splice(index, 1, newData);
  const data = await methods.set("opportunities", email, {opportunities});
  res.send(data);
});
/**************************************************************** */

/******************[Deletando uma oportunidade]****************** */
/* Aqui novamente usamos o ".splice()", dessa vez apenas para remover
da lista de oportunidades uma especícica identificada pelo valor do 
index no array. */
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