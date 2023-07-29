const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({

    brandName : {
        type: String,
        required : [true, "Brand name is mandatory."],
        index: true,
        unique : true
    },
    brandSlug : {
        type: String
    },
    brandImage : {
        type: String,
        required : [true, "Brand image is mandatory."]
    }
}
,{timestamps : true} );

module.exports = mongoose.model("brand", BrandSchema);