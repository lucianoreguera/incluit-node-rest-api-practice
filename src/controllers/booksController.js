const _ = require('lodash');
const books = require('../../data/books.json');
const authors = require('../../data/authors.json');

exports.index = (req, res) => {
    let booksWithAuthor = [];

    try {
        _.each(books, (book) => {     
            _.each(authors, (author) => {
                if (author.id == book.authorID) {
                    const bookAuthor = {
                        "id": book.id,
                        "title": book.title,
                        "author": author
                    };
                    booksWithAuthor.push(bookAuthor);
                }
            });
        });
        res.json({
            'books': booksWithAuthor
        }); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 'error': 'server error' });
    }
};

exports.save = async (req, res) => {
    const { title, authorID } = req.body;
    
    if (!title || !authorID) {
        res.status(400).json({'error': 'Title and author are required'});
        return;
    }

    const id = _.last(books).id + 1;
    const newBook = { id, title, authorID };
    
    const existAuthor = _.find(authors, (author) => { return newBook.authorID == author.id; });

    if (!existAuthor) {
        res.status(400).json({'error': 'Author not found'});
        return;
    }

    try {
        await books.push(newBook);
        res.json({
            'success': 'successfully registered book',
            'books': books
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 'error': 'server error' });
    }
        
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const { title, authorID } = req.body;
    
    if (!title && !authorID) {
        res.status(400).json({'error': 'Title and author are required'});
        return;
    }
    
    const existAuthor = _.find(authors, (author) => { return authorID == author.id; });

    if (!existAuthor) {
        res.status(400).json({'error': 'Author not found'});
        return;
    }

    try {
        await _.each(books, (book) => {
            if (book.id == id) {
                book.title = title ? title : book.title;
                book.authorID = authorID ? authorID : book.authorID;
                res.json({
                    'success': 'successfully book update',
                    'books': books
                });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 'error': 'server error' });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    
    try {
        await _.remove(books, (book) => {
            return book.id == id;
        });
    
        res.json({
            'success': 'successfully book delete',
            'books': books
        });        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 'error': 'server error' });
    }
};