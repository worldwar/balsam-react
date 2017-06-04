import React from 'react';
import Book from './Book.jsx'
import AddButton from './AddButton.jsx'
import axios from 'axios'
import util from 'util'
import { Link } from 'react-router-dom'

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            page: 0,
            size: 10,
            sort: "importDate"
        };
        this.componentWillMount = this.componentWillMount.bind(this);
        this.load = this.load.bind(this);
    }

    componentWillMount() {
        let page = this.props.match.params.page || 0;
        this.load(page);
    }

    componentWillReceiveProps(nextProps, nextState) {
        console.log(nextProps);
        this.load(nextProps.match.params.page);
    }

    load(page) {
        const q = util.format("page=%d&size=%d&sort=%s,desc", page, this.state.size, this.state.sort);
        axios.get('http://localhost:9000/books?' + q)
            .then(res => {
                const books = res.data.content;
                const last = res.data.last;
                const first = res.data.first;
                const number = res.data.number;
                this.setState({
                    books: books,
                    last: last,
                    first: first,
                    number: number
                });
            });
    }

    render() {
        const lastPage = this.state.number - 1;
        let lastUrl =  lastPage === 0 ? "/" : "/page/" + lastPage;
        if (this.state.books.length > 0) {
            return <div>
                <AddButton />
                {this.state.books.map((book, i) =>
                    <Book key={i} book={book}/>
                )}
                <div>
                    {!this.state.first && <Link to={lastUrl}>上一页</Link>}
                    <span>  </span>
                    {!this.state.last && <Link to={"/page/" + (this.state.number + 1)}>下一页</Link>}
                </div>
            </div>
        } else {
            return <div>
                <AddButton />
                <div>没有记录</div>
            </div>
        }
    }
}