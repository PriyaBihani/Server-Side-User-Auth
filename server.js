// we didnt created a html page, just a rest page which sends the server an http request like a fetch statement in html page.
// In fetch the get function dont get any options in the html page but the post request in html do get the options.
const express = require('express')
const bcrypt = require('bcryptjs')// it is an lib to hash the password 
const app = express()

app.use(express.json())

const users= []

app.get('/users',(req,res)=>{
    res.json(users) // it just shows the above array
})

app.post('/users',async (req,res)=>{
    try{
        // const salt = await bcrypt.genSalt()
        // const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const hashedPassword = await bcrypt.hash(req.body.password, 10) // it is just shortcut to hash the password send by the user post request 
        const user= {
            name: req.body.name,
            password: hashedPassword
        }
        users.push(user)
        console.log("user is saved")
        res.status(201).send()
    }catch{
        res.status(500).send()
    }

})
app.post('/users/login', async(req,res)=>{
    console.log("request recieved")
    console.log(users)
    const user = users.find(user=>{
        if( user.name === req.body.name){
            return user
        }
    })
    if(user==null){
        return res.status(400).send('Cannot find user')
    }
    try {
       if (await bcrypt.compare(req.body.password, user.password)){
           console.log("working")
           res.send('Success')
       }else{
           res.send('Not Allowed')
       }
    }catch{
        res.status(500).send()

    }
})

app.listen(3000)