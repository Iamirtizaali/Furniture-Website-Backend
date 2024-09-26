const User=require('../api/models/user');


const isAdmin=async (req,res,next)=>{
    try{
        const user=await User.findOne({email:req.user.email});
        console.log(user);
        if(user.role=='admin'){
            next();
        }
        else
        throw new Error('You are not authorized to access this route');
    }
    catch(error){
        throw new Error(error);
    }
}

module.exports={
    isAdmin
}