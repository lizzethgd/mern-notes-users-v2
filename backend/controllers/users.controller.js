const usersCtrl = {}

const UserModel = require('../models/User')

usersCtrl.getUsers = async(req, res) => {
    const users = await UserModel.find()
    res.json(users)
}

usersCtrl.createUser = async(req, res) => {
    const {username} = req.body
    const newUser = new UserModel({username})
    await newUser.save()
    res.json({message: 'User Created'})
}

usersCtrl.deleteUser = async(req, res) => {
    await UserModel.findByIdAndDelete(req.params.id)
    res.json({message: 'User Deleted'})
}

module.exports = usersCtrl