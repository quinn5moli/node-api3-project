const model = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`[${req.method}] to ${req.url} at ${Date().toLocaleString()}`)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const user = await model.getById(req.params.id)
    if (!user) {
      ({status:404 ,message: 'user not found' })
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    res.status(500).json({ message: 'server error'})
  }
}
function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log('validateUser')
  const { name } = req.body
  if(!name || name.trim()) {
      res.status(400).json({ message: 'missing required name field'})
  } else {
    req.name = name=trim()
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log('validatePost')
  if(!req.body.text) {
    res.status(400).json({ message: 'missing required text field' })
  } else {
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};