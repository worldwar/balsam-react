import React from 'react';
import Volume from './Volume.jsx'
import axios from 'axios'

export default class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        console.log(this.state.match);
        let bookId = this.props.match.params.bookId || "cc991299b5941889ec7afd41e25e8ba7";

        axios.get('http://localhost:9000/catalog/' + bookId)
            .then(res => {
                const catalog = res.data;
                console.log("something")
                console.log(catalog);
                this.setState({
                    catalog: catalog
                });
            });
    }

    render() {
        return <div>
            {this.state.catalog && this.state.catalog.volumes.map((volume, i) =>
                <Volume key={i} volume={volume}/>
            )}
        </div>
    }
}
