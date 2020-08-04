const Clarifai = require ('clarifai');

const app = new Clarifai.App({
    apiKey: '57e83fd8a2d94f82afad183992bb3cb8'
});


const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(response => res.json(response))
        .catch(err => res.status(400).json(err))
}


const handleImage = (req, res, db) => {
    const { id } = req.body;
    db.select('*').from('users')
    .where('id','=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        db.select('*').from('users')
        .where('id','=', id)
        .then(user => res.json(user))
    })
    .catch(err => res.status(400).json('unable to get entries'))
    
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}