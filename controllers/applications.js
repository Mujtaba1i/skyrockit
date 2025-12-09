// imports =======================================================================================

const express = require('express')
const router = express.Router()
const User = require('../models/user')

// GET ============================================================================================

router.get('/', async (req, res) => {
    try{
        res.render('applications/index.ejs')
    }
    catch(err){
        console.log('Ran into an error:'+err)
        console.log('REDIRECTING ...')
        res.redirect('/')
    }
})

// POST ===========================================================================================

// exports ========================================================================================

module.exports = router