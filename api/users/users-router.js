const router = require('express').Router();

// You will need `users-model.js` and `posts-model.js` both
const usersModel = require('./users-model');
const postsModel = require('../posts/posts-model');

// The middleware functions also need to be required
const {logger , validateUserId, validateUser, validatePost} = require('../middleware/middleware');



router.get('/', async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  try{
    console.log('started')
    const users = await usersModel.get(users)
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: "The users' information could not be retrieved" })
  }
})
//   usersModel.get()
//     .then(users => {
//       res.status(200).json(users)
//   }) 
//     .catch((err) => res.status(500).json({ message: err}));
// })

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  usersModel.getById(req.params.id)
  .then((user) => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({message: 'user could not be retrieved' });
    }
  })
  .catch((err) => {
    res.status(500).json({ message: err })
  })
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  usersModel.insert(req.body)
    .then((data) => {
      res.status(201).json({ id: data.id, name: req.body.name });
    })
    .catch(() => {
      res.status(500).json({ message: "There was an error while adding the user to the database" })
    })
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  usersModel.update(id, req.body)
    .then((updatedUser) => {
      usersModel.getById(id).then((updatedUser) => { res.status(200).json(updatedUser) })
      console.log(updatedUser, "updated user")
    })
});

router.delete('/:id', validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    await usersModel.remove(req.params.id)
    res.status(200).json(usersModel.getById(id))
  } catch (error) {
    res.status(500).json({ message: "The user could not be deleted"})
  }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try {
    const usersPost = await usersModel.getUserPosts(req.params.id)
    res.status(200).json(usersPost)
  } catch {
    res.status(500).json({ message: "The post could not be retrieved" })
  }
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  postsModel.insert(req.params.id)
  .then((data) => {
    res.status(200).json(data)
  })
  .catch(() => {
    res.status(500).json({ message: "The created post could not be saved" })
  })
});

// do not forget to export the router
module.exports = router;
