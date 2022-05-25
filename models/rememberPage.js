const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rememberPageSchema = new mongoose.Schema({
    wpPostId: String,
    link: String,
    status: String, //in progress,complete
    pageManager: {type: Schema.Types.ObjectId , ref: 'User' },
    editors: [{type: Schema.Types.ObjectId , ref: 'User' }],
    watchedPeoples: [{
        name: String,
        email:{ type: String},
        phone: { type: String }
    }],
    candlesAndFlowers:[{
        kind: String, //candle/flower
        nameOfSender: String,
        message: String
    }],
    attributes: {
        mainImg: String,
        name: String,
        brief: String, //short description about people
        about: String,
        dateOfBirth: Date,
        dateOfDeath: Date,
        country: String,
        parents: [{
            name: String,
            rememberPageLink: String
        }],
        spouse: {
            kind: String, // wife/husband
            name: String,
            rememberPageLink: String
        },
        children: [{
            name: String,
            rememberPageLink: String
        }],
        timeline: [{
            year: Number,
            shortDescription: String
        }],
        stories: [{
            image: String, 
            content: String,
            witnessName: String,
            date: Date
        }],
        gallery: {
            items: [{
                startYear: String,
                endYear: String,
                albumes: [{
                    name: String,
                    startYear: String,
                    endYear: String,
                    images: [String],
                    videos: [String]
                }]
            }]
        },
        placesOfCommemoration: [{
            name: String,
            image: String,
            textAbout: String,
            shortDesc: String,
            address: String
        }],
        grave: {
            images: [String],
            nameOfCemetery: String,
            address: {
                location: {
                  lat: Number,
                  lng: Number,
                },
                name:String,
            },
        },
        addHebrewDate: Boolean
    }    
});


module.exports = mongoose.model('RememberPage', rememberPageSchema);