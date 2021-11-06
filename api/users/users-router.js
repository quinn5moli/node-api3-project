const router = require('express').Router();

// You will need `users-model.js` and `posts-model.js` both
const usersModel = require('./users-model');
const postsModel = require('../posts/posts-model');

// The middleware functions also need to be required
const {logger , validateUserId, validateUser, validatePost} = require('../middleware/middleware');



router.get('/',  (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  // try{
  //   console.log('started')
  //   const users = await usersModel.get(users)
  //   res.status(200).json(users)
  // } catch (error) {
  //   res.status(500).json({ message: "The users' information could not be retrieved" })
  // }

  usersModel.get()
    .then(users => {
      res.json(users)
  }) 
    .catch(() => res.status(500).jsin({ message: "server error "}))
})

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
//   usersModel.getById(req.params.id)
//   .then((user) => {
//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({message: 'user could not be retrieved' });
//     }
//   })
//   .catch((err) => {
//     res.status(500).json({ message: err })
//   })
// });
res.json(req.user)
})

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  usersModel.insert({name: req.name})
    .then((newUser) => {
      res.status(201).json({ newUser });
    })
    .catch(()=> res.status(500).json({ message: "server error" }));
    });
// console.log(req.name)
// })
router.put('/:id', validateUserId, validateUser, async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  usersModel.update(req.params.id, {name: req.name })
    .then(() => {
      return usersModel.getById(req.params.id) 
    })
      .then(user => {
        res.json(user)
      })
      .catch(() => res.status(500).json({ message: "server error" }))
  // console.log(req.user)
  // console.log(req.name)
});

router.delete('/:id', validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    await usersModel.remove(req.params.id)
    res.json(req.user)
  } catch (err) {
    next(err)
  }
// console.log(req.user)
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try {
    const usersPost = await usersModel.getUserPosts(req.params.id)
    res.json(usersPost)
  } catch (err) {
    next(err)
  }
  // console.log(req.user)
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {const newPost = postsModel.insert({user_id: req.params.id, text: req.text, })
  .then((data) => {
    res.status(200).json(newPost)
  })}
  catch (err) {
    next(err)
  }
  // console.log(req.user)
  // console.log(req.text)
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: "error in posts router"
  })
});

// do not forget to export the router
module.exports = router;
