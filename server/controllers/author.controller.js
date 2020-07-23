const Author = require("../models/author.model");

module.exports.findAllAuthors = (req, res) => {
    Author.find().sort('name')
        .then(allAuthors => res.json({authors: allAuthors}))
        .catch(err => res.status(400).json(err));
};

module.exports.findOneAuthor = (req, res) => {
    Author.findOne({_id: req.params.id})
        .then(oneAuthor => res.json({author: oneAuthor}))
        .catch(err => res.status(400).json(err));
};

module.exports.newAuthor = (req, res) => {
    const { name } = req.body;
    const tempArr = name.match(/\S+/g) || [];
    const newName = tempArr.map(char=>char[0].toUpperCase()+char.substring(1).toLowerCase()).join(' ');
    Author.exists({name: newName})
        .then(userExists=>{
            if (userExists) {
                console.log('author exists')
                return Promise.reject({errors: {name: {properties: {message: 'This author already exists'}}}});
            }
            return Author.create({name: newName})
        })
        .then(newAuthor => res.json({author: newAuthor}))
        .catch(err => {
            return res.status(400).json(err.errors)
        });
};

module.exports.updateAuthor = (req, res) => {
    const { name } = req.body;
    const tempArr = name.match(/\S+/g) || [];
    const newName = tempArr.map(char=>char[0].toUpperCase()+char.substring(1).toLowerCase()).join(' ');
    Author.exists({name: newName, _id: {$ne: req.params.id}})
        .then(userExists=>{
            if (userExists) {
                return Promise.reject({errors: {name: {properties: {message: 'This author already exists'}}}});
            }
            return Author.findOneAndUpdate({_id: req.params.id}, {name: newName}, {new: true, runValidators: true})
        })
        .then(updatedAuthor => res.json({author: updatedAuthor}))
        .catch(err => res.status(400).json(err.errors));
};

module.exports.deleteAuthor = (req, res) => {
    Author.deleteOne({_id: req.params.id})
        .then(deletedAuthor => res.json({author: deletedAuthor}))
        .catch(err => res.status(400).json(err));
};