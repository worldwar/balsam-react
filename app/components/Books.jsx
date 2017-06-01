import React from 'react';
import Book from './Book.jsx'
import AddButton from './AddButton.jsx'
import axios from 'axios'
import util from 'util'

export default class Books extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            page: 0,
            size: 10,
            sort: "importDate"
        };
    }

    componentWillMount() {
        const {page, size, sort} = this.state;
        const q = util.format("page=%d&size=%d&sort=%s,desc", page, size, sort);

        axios.get('http://localhost:9000/books?' + q)
            .then(res => {
                const books = res.data.content;
                this.setState({
                    books: books
                });
            });
    }

    render() {
        if (this.state.books.length > 0) {
            return <div>
                <AddButton />
                {this.state.books.map((book, i) =>
                    <Book key={i} book={book}/>
                )}
            </div>
        } else {
            return <div>
                <AddButton />
                <div>没有记录</div>
            </div>
        }

    }
}