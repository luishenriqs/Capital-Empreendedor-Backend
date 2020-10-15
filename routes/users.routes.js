var express = require('express');
var methods = require('../database/functions');
var getOppotunities = require('../services/getOpportunities');
var usersRouter = express.Router();


/******************[Buscando todos os usuários]****************** */
usersRouter.get('/users', async (req, res) => {
  const data = await methods.getAll("users");
  const resposta = res.json(data)
  res.send(resposta);
});
/**************************************************************** */

/***************[Buscando todas as oportunidades]**************** */
usersRouter.get('/opportunities', async (req, res) => {
  const data = await methods.getAll("opportunities");
  const resposta = res.json(data)
  res.send(resposta);
});
/**************************************************************** */

/******************[Buscando um único usuário]****************** */
usersRouter.get('/users/:email', async (req, res) => {
  const { email } = req.params;
  const data = await methods.getOne("users", email);
  const resposta = res.json(data)
  res.send(resposta);
});
/**************************************************************** */

/**************[Buscando oportunidades por usuário]************** */
usersRouter.get('/opportunities/:email', async (req, res) => {
  const { email } = req.params;
  const resposta = await getOppotunities(email);
  res.send(resposta);
});
/**************************************************************** */

/*****************[Criando uma nova oportunidade]**************** */
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

module.exports = usersRouter;