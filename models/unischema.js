const mongoose = require('mongoose')
const conn = require('./../db/conn')

const l_merit = new mongoose.Schema({
    program : String,
    merit : String
},{ _id : false })

const scholarship = new mongoose.Schema({
    program : String,
    details : String
})

const listschema = new mongoose.Schema({
    info : {
        name : {
            type : String,
            required : true
        },
        campus : String,
        about : String,
        website : String,
        address : String,
        status : String,
    },
    keyword : String,
    admission : {
        admission_start_date : Date,
        admission_end_date : Date,
        apply_web : String,
        batch : String,
        session : String,
        apply_test : String,
        test_date : Date,
        last_merit : [l_merit]
    },
    scholarship : [scholarship],
    agg_cal : {
        matric : String,
        inter : String,
        test : String
    },
    contact : {
        email : [String],
        phone : [String],
        fax : [String]
    }

}, { versionKey: false })

const model = new mongoose.model('list',listschema);

module.exports = model