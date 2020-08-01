const router = require('express').Router()

const {getHydratedNodeById, getActionsbyId, getConditionById, getTriggerById, getResponseById, getNodesById} = require("./service")

router.get('/nodes', (req, res) => {
  res.json(nodes)
})

router.get('/nodeById/:id', (req, res) => {
  let id = req.params.id
  let result = getNodesById(id)
  res.json(result)
})

router.get('/responseById/:id', (req, res) => {
  let id = req.params.id
  let result = getResponseById(id)
  res.json(result)
})

router.get('/actionById/:id', (req, res) => {
  let id = req.params.id
  let result = getActionsbyId(id)
  res.json(result)
})

router.get('/triggerById/:id', (req, res) => {
  let id = req.params.id
  let result = getTriggerById(id)
  
  res.json(result)
})

router.get('/conditionById/:id', (req, res) => {
  let id = req.params.id
  let result = getConditionById(id)
  res.json(result)
})

router.get('/hydratedNode/:id', (req, res) => {
  let id = req.params.id
  let result = getHydratedNodeById(id)
  res.json(result)
})

module.exports = router