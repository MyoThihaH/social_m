import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config.js';

import User from "../models/users.js";



export const signIn = async (req, res) => {
    const { email, password } = req.body;
    
    
    try{
        const passwordHash = await bcrypt.hash(password, 10);
        const resDoc = await User.findOne({ email });
        const isMatch = bcrypt.compare(password, resDoc.password);
        if(!resDoc || !isMatch){
            res.status(401).json({"message":"Email or Password Invalid!"});
        }
        
        const token = jwt.sign({
            data: {
                email: resDoc.email,
                id: resDoc._id,
                username: resDoc.username,
                password: passwordHash,
            }
        },config.secret, { expiresIn: '1d'});
        
        res.status(200).json({token});
    } catch(err) {
        res.status(400).json(err);
    }
       
}


export const signUp = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
  
    
    try {
        console.log('a')
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);
        if( !email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        )){
            res.status(400).json({"message": "Email must be valid"});
        }
        if( await User.findOne({ email })) 
            res.status(402).json({"message": "Email already in use"});
        if( password != confirmPassword )
        res.status(402).json({"message": "Password must be match"});
        const user =  User({
                            username,
                            email,
                            password: passwordHash,
                            });
       const resMongo = await user.save();
       const resDoc = {...resMongo['_doc']};
       const token = jwt.sign({
           data: {
               email: resDoc.email,
               id: resDoc._id,
               username: resDoc.username,
               password: passwordHash,
           }
       },config.secret, {expiresIn: '1d'});
       res.status(201).json({...resDoc,token});

    } catch(err) {
        res.status(400).json(err);
    }
    
    
}

