const userServices = require("../../services/userServices");
const {authSchema,
    userSchema,
    categorySchema,
    productSchema,
    orderSchema,
    blogSchema,
    newsletterSchema,
    loginSchema,
    reviewSchema,
    updatePasswordSchema,
} = require("../../middlewares/validationMiddleware");

const register = async (req, res) => {
    try{
            const result=await userSchema.validateAsync(req.body);
        const user=await userServices.addUser(result);
        res.status(201).send(user);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}

const login = async (req, res) => {
    try{
        const result=await authSchema.validateAsync(req.body);
        console.log(result);
        const user=await userServices.getUser(result.email);
        if(!user){
            throw new Error("User not found");
        }
        // console.log(user.verifyPassword(result.password));
        if(!user.verifyPassword(result.password)){
            throw new Error("Invalid password");
        }
        const token= user.generateAuthToken();
        res.status(200).send({
            user,
            token
        });
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}


const updateUser=async (req,res)=>{
    try{
        const result=await userSchema.validateAsync(req.body);
        const user=await userServices.updateUser(req.user.email,result);
        res.status(200).send(user);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}

const updatePassword=async (req,res)=>{
    try{
        console.log(req.user);
        const result=await updatePasswordSchema.validateAsync(req.body);
        const user=await userServices.getUser(req.user.email);
        if(!user.verifyPassword(result.old_password)){
            throw new Error("Invalid password");
        }
        user.password=result.new_password;
        await user.save();
        res.status(200).send({message:"Password updated successfully"});
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}

const addAddress=async (req,res)=>{
    try{
        const result=await userSchema.validateAsync(req.body);
        const user=await userServices.addAddress(req.user.email,result);
        res.status(200).send(user);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}

module.exports = {
    register,
    login,
    updateUser,
    updatePassword,
    addAddress
}