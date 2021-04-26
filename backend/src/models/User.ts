import mongodb from 'mongodb'
import mongoose from 'mongoose'

export interface User {
    _id: mongodb.ObjectId,
    FirstName: string,
    LastName: string,
    Email: string,
    UserName: string,
    TotalPoints: number,
    DateJoined: Date
}

const UserSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    FirstName: String,
    LastName: String,
    Email: { type: String, required: true},
    UserName: {type: String, required: true},
    TotalPoints: {type: Number, default: 0},
    DateJoined: {type: Date, default: Date.now()}
})

const UserModel = mongoose.model("Users", UserSchema, "Users")

const getUsers = async (req : any, res : any) => {
    console.log("Recevied a request at " + req.url)

    UserModel.find().lean().then(users => {
        console.log(users)
        res.json({ users })
    }).catch(err => console.log(err))
}

const addUser = async(req : any, res: any) => {
    console.log("Recevied a request at " + req.url)

    const { user } = req.body

    const lol = new UserModel(user)

    console.log(lol)

    const response = { result: "success"};

    lol.save(err => {
        console.log(err)
        response.result = "error"
    })

    res.json(response)
}

const users = { getUsers, addUser }

export default users
