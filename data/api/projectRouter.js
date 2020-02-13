const express = require('express');

const router = express.Router();
const Project = require('../helpers/projectModel.js')
const Action = require('../helpers/actionModel.js')


router.post('/', validateProject, (req, res) => {
  
  Project.insert(req.body)
    .then(project => res.status(201).json(project))
    .catch(err => res.status(400).json({error: "unble to create "}))
  
  })  ;

router.post('/:id/actions',validateProjectId,validateAction, (req, res) => {
  console.log(req.body);
   req.body = {...req.body, project_id:req.params.id}
   
  
   console.log(req.body);
  
  Action.insert(req.body)
    .then(action => res.status(201).json(action))
    .catch(err => res.status(500).json({error : "Sorry unable to create an action"}))
});

router.get('/', (req, res) => {
  
  Project.get()
    .then(projects => {
        
      res.status(200).json(projects)
    }
      )
    .catch(err => {
      
      console.log(err)
      res.status(404).json({error: "Couldn't retrieve projects"})
      
})
});

router.get('/:id', validateProjectId,(req, res) => {

  const project = req.project;
    
  res.status(200).json(project);
});

router.get('/:id/actions', validateProjectId , (req, res) => {
  
  const id = req.project.id
  Project.getProjectActions(id)
    .then(actions => res.status(500).json(actions))
    .catch(err => res.status(500).json({error: "Unable to retrive posts"}))
});

router.delete('/:id',validateProjectId, (req, res) => {
  // do your magic!
  const project = req.project;
  Project.remove(project.id)
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json({message:'Sorry something went wrong'}))

});

router.put('/:id',validateProjectId, validateProject,(req, res) => {
  // do your magic!
  Project.update(req.project.id, req.body)
    .then( count => res.status(500).json(count))
    .catch(err => res.status(500).json({message:'Sorry something went wrong'}))
  

});

// //custom middleware

function validateProjectId(req, res, next) {
  
  const id = req.params.id;
  Project.get(id)
    .then( project => {
     
        if (project){
          req.project = project
        
        next();
        } else {
          res.status(400).json({ message: "invalid project id" })
        }
        
      
      })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Sorry something went wrong" })})
   
}



function validateProject(req, res, next) {
 
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

module.exports = router;
