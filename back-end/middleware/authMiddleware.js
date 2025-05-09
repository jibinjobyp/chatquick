const jwt = require('jsonwebtoken')

const authMiddleware = ( req, res, next ) => {

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message:'token not authorized'})
    }

    const token = authHeader.split(' ')[1]

    try{
         const decoded = jwt.verify(token,process.env.JWT_SECRET)
         req.user = decoded
         next()

    }catch(error){
        return res.status(500).json({message:'internal server error'})
    }

}

module.exports = authMiddleware