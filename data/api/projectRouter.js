const express = require('express');

const router = express.Router();
const Project = require('../helpers/projectModel.js')
// const User = require('./userDb.js')

router.post('/', validateProject, (req, res) => {
  
  Project.insert(req.body)
    .then(project => res.status(201).json(project))
    .catch(err => res.status(400).json({error: "unble to create "}))
  
  })  ;

// router.post('/:id/posts',validateUserId,validatePost, (req, res) => {
//   console.log(req.body);
//   const post = {...req.body, user_id:req.user.id}
//   console
  
//   console.log("before posting: ",post)
//   Post.insert(post)
//     .then(post => res.status(201).json(post))
//     .catch(err => res.status(400).json({error : "Sorry unable to create a post"}))
// });

// router.get('/', (req, res) => {
//   // do your magic!
//   User.get()
//     .then(users => {
        
//       res.status(500).json(users)}
//       )
//     .catch(err => {
//       console
//       console.log(err)
//       res.status(401).json({error: "Couldn't retrieve users"})
      
// })
// });

// router.get('/:id', validateUserId,(req, res) => {
//   // do your magic!
//   const user = req.user;
//   console.log("get user by id: ",user)
//   res.status(500).json(user);
// });

// router.get('/:id/posts', validateUserId , (req, res) => {
//   // do your magic!
//   const id = req.user.id
//   User.getUserPosts(id)
//     .then(posts => res.status(500).json(posts))
//     .catch(err => res.status(401).json({error: "Unable to retrive posts"}))
// });

// router.delete('/:id',validateUserId, (req, res) => {
//   // do your magic!
//   const user = req.user;
//   User.remove(user.id)
//     .then(count => res.status(500).json(count))
//     .catch(err => res.status(401).json({message:'Sorry something went wrong'}))

// });

// router.put('/:id',validateUserId, validateUser,(req, res) => {
//   // do your magic!
//   User.update(req.user.id, req.body)
//     .then( count => res.status(500).json(count))
//     .catch(err => res.status(401).json({message:'Sorry something went wrong'}))
  

// });

// //custom middleware

// function validateUserId(req, res, next) {
//   // do your magic!
//   const id = req.params.id;
//   User.getById(id)
//     .then( user => {
//       console.log(user)
//         if (user){
//           req.user = user
//         console.log("middleware: ", req.user)
//         next();
//         } else {
//           res.status(400).json({ message: "invalid user id" })
//         }
        
      
//       })
//     .catch(err => {
//       console.log(err)
//       res.status(401).json({ message: "Sorry something went wrong" })})
   
// }

// function validateUser(req, res, next) {
//   // do your magic!
  
//   if (!Object.keys(req.body).length) {
//     res.status(400).json({message: 'missing user data'}) 
//     } else if (!req.body.name) {{}
//       console.log(!req.body.name)
//       res.status(400).json({message: 'user name required'}) 
//     } else if(Object.keys(req.body).length > 1) {
//       res.status(400).json({message: 'Invalid data'})
//     } else {
//       next();
//     }
      
    

    
  

// }

function validateProject(req, res, next) {
  // do your magic!
  if (!Object.keys(req.body).length) {
    res.status(400).json({message: 'missing project data'}) 
    } else if (!req.body.name || !req.body.description) {
      console.log(!req.body.name)
      res.status(400).json({message: 'Project name and description required'}) 
    } else if (req.body.completed) {
        typeof req.body.completed === "boolean" ? 
        next() : 
        res.status(400).json({message: 'Completed field has to be boolean'})

    } else {
        next();
    } 
}

module.exports = router;
