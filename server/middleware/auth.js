import jwt from 'jsonwebtoken';
import config from '../config.js';

const secret = config.secret;

export const auth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    try{
        if (token == null) 
            return res.status(401).json({"message":"Unauthorize"})

        const decode = await jwt.verify(token, secret);

        const { id } = decode.data;

        req.userId = id;

        next();
    } catch(err) {
        res.status(401).json(err);
    }

    

}



