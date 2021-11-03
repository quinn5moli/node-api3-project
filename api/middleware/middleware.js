const model = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`[${req.method}] to ${req.url} at ${Date()}`)
  next()
}

// function validateUserId(req, res, next) {
//   // DO YOUR MAGIC
//   console.log('validateUserId')
//   model.getById(req.params.id)
//     .then(user => {
//       if (!user) {
//         res.status(404).json({message: 'user not found' })
//       } else {
//         req.user = user
//         next()
//       }
//     })

// }

// function validateUser(req, res, next) {
//   // DO YOUR MAGIC
//   console.log('validateUser')
//   if(!req.body.name) {
//       res.status(400).json({ message: 'missing required name field'})
//   } else {
//     next()
//   }
// }

// function validatePost(req, res, next) {
//   // DO YOUR MAGIC
//   console.log('validatePost')
//   if(!req.body.text) {
//     res.status(400).json({ message: 'missing required text field' })
//   } else {
//     next()
//   }
// }

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  // validateUserId,
  // validateUser,
  // validatePost
};