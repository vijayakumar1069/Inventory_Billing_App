const mongoose=require('mongoose');

const adminSchema=new mongoose.Schema({
    username:
    {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:
    {
        type:String,
        required:true
    },avatar:
    {
        type:String,
        default:"https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg"

    }

},{
    timestamps:true,
})
const Admin=mongoose.model('Admin',adminSchema)

module.exports = Admin