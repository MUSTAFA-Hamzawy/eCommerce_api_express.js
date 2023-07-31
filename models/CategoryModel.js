const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({

    categoryName : {
        type: String,
        required : [true, "Category name is mandatory."],
        index: true,
        unique : true
    },
    categorySlug : {
        type: String
    },
    categoryImage : {
        type: String,
        required : [true, "Category image is mandatory."]
    }
}
,{timestamps : true} );

CategorySchema.index({categorySlug: 'text'});
module.exports = mongoose.model("category", CategorySchema);