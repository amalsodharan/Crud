const Auth = (role) => {
    return (req, res, next) => {
        if(req.user.role != role){
            return res.status(403).send('Access Denied!')
        }
        next();
    }
}

module.exports = Auth;