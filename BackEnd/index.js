 import express from "express"    //for this we have to add "type": "module" in package
 import cors from "cors"
 import mongoose from "mongoose"

 

// install npm i express cors mongoose for the import of libs


 const app = express()
 app.use(express.json())
 app.use(express.urlencoded({ extended: false }))
 app.use(cors())


mongoose.connect("mongodb://127.0.0.1:27017/myLoginappDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true
},).then(() => console.log('Connected Successfully'))
.catch((err) => { console.error(err); });


//define a schema for user here
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})


const User = new mongoose.model("User", userSchema)

//Routes 
/*app.get("/",(req,res)=> {
    res.send("My App")
})*/ //if anyone want get 
app.post("/login",(req,res)=> {
    //res.send("My App")
    //Now we will see who want to login
    const {email, password} = req.body
    User.findOne({email:email}, (err, user) =>{
        if(user){
            if( password === user.password)
            {
                res.send({message: "Login Successfully", user: user})
            }
            else
            {
                res.send({message: "Password don't match"})
            }
        }else{
            res.send({message: "User not Registerd" })
        }
    })
})
app.post("/register",(req,res)=> {
    //console.log(req.body)
    //this show us what is send from user, now we have to open the body and save it in database
    const {name, email, password} = req.body
    User.findOne({email:email}, (err, user) =>{
        if(user){
            res.send({message: "User is already registred"})
        }
        else{
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err){
                    res.send(err)
                }else{
                    res.send({message: "Successfully Registerd, Login now!" })
                }
            })
        }
    })

})

app.listen(9002,()=>{
    console.log("BE started at port: 9002")
})
