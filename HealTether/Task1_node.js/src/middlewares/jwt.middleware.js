import jwt from 'jsonwebtoken'
const jwtAuth = (req, res,  next)=>{
    console.log('inside the jwt middleware')
    const token = req.headers["authorization"];
    console.log(token)
    if(!token){
        return res.status(401).send({result:'not logged in!!!'})
    }
    try{
    const payload = jwt.verify(token, "gAmhmrCfWSl9CdRuFZ6SIS1zYXohdmjHFFuUcck")
    req.userID = payload.UserID
    console.log('paylod is')
    console.log(payload.email)
    console.log(req.userID)

    }catch(err){
        console.log(err)
        return res.status(401).send({result:'Unauthorized access'})
    }
    next()
}

export default jwtAuth