const express = require('express');

const router = express.Router();

const Action = require('../helpers/actionModel.js')
const Project = require('../helpers/projectModel.js')

router.get('/', (req, res) => {
  
    Action.get()
      .then(actions => {
          
        res.status(200).json(actions)}
        )
      .catch(err => {
        
        console.log(err)
        res.status(404).json({error: "Couldn't retrieve actions"})
        
  })
  });
  
//   router.get('/actions/:project_id', validateProjectId,(req, res) => {
  
//     Action.get()
//       .then(actions => {
          
//         res.status(200).json(actions)}
//         )
//       .catch(err => {
        
//         console.log(err)
//         res.status(404).json({error: "Couldn't retrieve actions"})
        
//   })
//   });
  
  
  router.get('/:id', validateActionId,(req, res) => {
  
    const action = req.action;
      
    res.status(200).json(action);
  });
  
 
  
  router.delete('/:id',validateActionId, (req, res) => {
    // do your magic!
    const action = req.action;
    Action.remove(action.id)
      .then(count => res.status(200).json(count))
      .catch(err => res.status(500).json({message:'Sorry something went wrong'}))
  
  });
  
  router.put('/:project_id/:id',
  validateProjectId,
  validateActionId, 
  validateAction, (req, res) => {
    action = req.body;
   
    action = {...action, project_id:req.params.project_id}
    console.log("body for update" , action)
    Action.update(req.action.id, action)
      .then( count => res.status(500).json(count))
      .catch(err => res.status(500).json({message:'Sorry something went wrong'}))
    
  
  });
  
 //custom middleware


function validateAction(req, res, next) {
 
    if (!Object.keys(req.body).length) {
      res.status(400).json({message: 'missing action data'}) 
      } else if (!req.body.description || !req.body.notes) {
      
        res.status(400).json({message: ' notes and description required'}) 
      } else if (req.body.completed) {
          typeof req.body.completed === "boolean" ? 
          next() : 
          res.status(400).json({message: 'Completed field has to be boolean'})
  
      } else {
          next();
      } 
  }


  function validateActionId(req, res, next) {
  
    const id = req.params.id;
    console.log("Action ID: ",id)
    Action.get(id)
      .then( action => {
        console.log(action)
          if (action){
            req.action = action
          console.log("validated action: ", req.action)
          next();
          } else {
            res.status(400).json({ message: "invalid action id" })
          }
          
        
        })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Sorry something went wrong" })})
     
  }

  function validateProjectId(req, res, next) {
  
    const id = req.params.project_id;
    console.log("validated project id: ", id)
    
    Project.get(id)
      .then( project => {
         console.log("data: ", project)
          if (project){
            
          next();
          } else {
              console.log(project)
            res.status(400).json({ message: "invalid project id for action update" })
          }
          
        
        })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Sorry something went wrong" })})
     
  }
module.exports = router;