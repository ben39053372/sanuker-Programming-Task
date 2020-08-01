
const actions = require('./data/actions.json')

const conditions = require('./data/conditions.json')

const node = require('./data/nodes.json')

const responses = require('./data/responses.json')

const triggers = require('./data/triggers.json')


const getNodesById = (id) => {
  return node.find(obj => obj["_id"] === id)
}

const getResponseById = (id) => {
  return responses.find(obj => obj["_id"] === id)
}

const getActionsbyId = (id) => {
  return actions.find(obj => obj["_id"] === id)
}

const getTriggerById = (id) => {
  return triggers.find(obj => obj["_id"] === id)
}


const getConditionById = (id) => {
  return conditions.find(obj => obj["_id"] === id)
}

const mapCondition = (conditions) => {
  let result = conditions.map(id_operator_array => {
    if (id_operator_array?.constructor === Object) {
      return id_operator_array
    } else if (Array.isArray(id_operator_array)) {
      // array
      return mapCondition(id_operator_array)
    } else if (typeof id_operator_array === "string" && id_operator_array.length === 24) {
      // id
      return getConditionById(id_operator_array) || "none"
    } else {
      // operator
      return id_operator_array
    }
  });
  return result
}

const getHydratedNodeById = (id) => {
  var node = getNodesById(id)
  if (node.trigger) {
    node.trigger = getTriggerById(node.trigger) || node.trigger
    // if conditions exist
    if (node.trigger.conditions) {
      let conditions = node.trigger.conditions
      node.trigger.conditions = mapCondition(conditions)
    }
    console.log(node.responses)
    if(node.responses) {
      node.responses = node.responses.map(id => id = getResponseById(id))
    }

  }
  return node
}

module.exports = {
  getActionsbyId,
  getNodesById,
  getResponseById,
  getTriggerById,
  getConditionById,
  getHydratedNodeById
}
