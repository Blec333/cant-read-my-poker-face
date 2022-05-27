const { Schema, model } = require('mongoose');


const locationSchema = new Schema(
    {
        location:{
            type: String,
            unique: true,
        },
        difficulty:{
            type: String,
        },
    },
    {
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
    }
);

module.exports = model('Location', locationSchema)