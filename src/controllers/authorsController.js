const _ = require('lodash');
const authors = require('../../data/authors.json');
const books = require('../../data/books.json');

exports.index = async (req, res) => {
    try {
        await res.json(authors);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 'error': 'server error' });
    }
};

exports.save = async (req, res) => {
    const { name, lastname } = req.body;
        
    if (!name || !lastname) {
        res.status(400).json({'error': 'Name and lastname are required'});
        return;
    }
    
    try {
        const id = _.last(authors).id + 1;
        const newAuthor = { id, name, lastname };
        await authors.push(newAuthor);
        res.json({
            'success': 'successfully registered author',
            'authors': authors
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 'error': 'server error' });
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const { name, lastname } = req.body;
        
    if (!name && !lastname) {
        res.status(400).json({'error': 'Name and lastname are required'});
        return;
    }
    
    try {
        await _.each(authors, (author) => {
            if (author.id == id) {
                author.name = name ? name : author.name;
                author.lastname = lastname ? lastname : author.lastname;
            }
        });
        res.json({
            'success': 'successfully updated author',
            'authors': authors
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 'error': 'server error' });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    
    try {
        const deleteAuthor = await _.remove(authors, (author) => {
            return author.id == id;
        });

        if(deleteAuthor) {
            await _.remove(books, (book) => {
                return book.authorID == id;
            });
        }
    
        res.json({
            'success': 'successfully deleted author and books',
            'authors': authors,
            'books': books
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 'error': 'server error' });
    }
};