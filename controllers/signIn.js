const handleSignIn = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    db.select('email', 'hash').from('login').where('email','=', email)
    .then(data => {
        if(bcrypt.compareSync(password, data[0].hash)) {
            db.select('*').from('users')
            .where('email','=',email)
            .then(user => {
                res.json(user[0]);
            })
        }else{
            res.json("password mismatch");
        }    
    })
    .catch(err => res.json("failed"))
}

module.exports = {
    handleSignIn: handleSignIn    
}