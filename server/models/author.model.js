const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema(
    { 
        name: {
            type: String,
            required: [true, "Author name is required"],
            minlength: [3, "Author name must be at least 3 characters in length"]
        }
    }
);

const Author = mongoose.model("Author", AuthorSchema);

// Author.schema.path('name').validate(value => value.length >= 3, 'Author name not valid');

module.exports = Author;