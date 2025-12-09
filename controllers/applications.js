// imports =======================================================================================

const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { route } = require('./auth')

// GET ============================================================================================

router.get('/', async (req, res) => {
    try{
        const currentUser = await User.findById(req.session.user._id)
        const {applications} = currentUser
        res.render('applications/index.ejs', {applications})
    }
    catch(err){
        console.error('Ran into an error:'+err)
        console.log('REDIRECTING ...')
        res.redirect('/')
    }
})

router.get('/new', async (req,res)=>{
    try{
        res.render('applications/new.ejs')
    }
    catch(err){
        console.error('Ran into an error:'+err)
        console.log('REDIRECTING ...')
        res.redirect('/')
    }
})

router.get('/:appId',async(req,res)=>{
    try{
        const currentUser = await User.findById(req.session.user._id)
        const currentApplication = currentUser.applications.id(req.params.appId)
        res.render('applications/show.ejs', { currentApplication })
    }
    catch(err){
        console.error('Ran into an error: '+ err)
        console.log('REDIRECTING ...')
        res.redirect('/')
    }

})

// POST ===========================================================================================

router.post('/', async(req,res)=>{
   try{
       try{
            // find the current user
            const currentUser = await User.findById(req.session.user._id)
            
            // push the new application to User.applications
            currentUser.applications.push(req.body)

            // await User.save()
            await currentUser.save()

            // redirect to the index
            res.redirect(`/users/${req.session.user._id}/applications`)
        }
        catch(err){
            console.error('Ran into an error: '+ err)
            console.log('REDIRECTING ...')
            res.redirect('/')
        }
   }
   catch(err){
        console.error('Ran into an error: '+ err)
        console.log('REDIRECTING ...')
        res.redirect('/')
   } 
})

router.post('/:appId', async(req,res)=>{

})

// DELETE =========================================================================================

router.delete('/:appId', async(req,res)=>{
    try{
        const currentUser = await User.findById(req.session.user._id)
        const currentApplication = currentUser.applications.id(req.params.appId)
        currentApplication.deleteOne()
        await currentUser.save()
        res.redirect(`/users/${req.session.user._id}/applications`)        
    }
    catch(err){
        console.error('Ran into an error: '+ err)
        console.log('REDIRECTING ...')
        res.redirect('/')
    }

})

// exports ========================================================================================

module.exports = router