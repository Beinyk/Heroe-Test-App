const { Schema, model } = require('mongoose')

const schema = new Schema({
    nickname: {
        type: String,
        required: true
    },
    realName: {
        type: String,
        required: true
    },
    originDescription: {
        type: String,
        required: true
    },
    superpowers: {
        type: String,
        required: true
    },
    catchPhrase: {
        type: String,
        required: true
    },
    pathImage: {
        type: String,
        default: 'none',
        required: true
    }
    
        
})

module.exports = model('Todo', schema)