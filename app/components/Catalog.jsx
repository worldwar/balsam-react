import React from 'react';
import Volume from './Volume.jsx'
import axios from 'axios'
import { Row, Col , Pagination } from 'antd';

export default class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible1:true,
            visible2: false,
        };
    }

    componentDidMount() {
        console.log(this.state.match);
        let bookId = this.props.match.params.bookId || "cc991299b5941889ec7afd41e25e8ba7";

        $q.get($q.url+'/catalog/'+bookId , (data) => {
            this.setState({
                catalog: data,
            });
        })
        /*axios.get('http://45.33.110.10:9000/catalog/' + bookId)
            .then(res => {
                const catalog = res.data;
                console.log("something")
                console.log(catalog);
                this.setState({
                    catalog: catalog
                });
            });*/
    }
    queryContent(id) {
        $q.get($q.url+'/content/'+id , (data) => {
            this.setState({
                content: data.paragraph.content,
                chapter: data.chapter,
                visible1:false,
                visible2: true,
            });
        })
    }


    render() {
        return <div>{this.state.visible1 ? <div>
                    {this.state.catalog && this.state.catalog.volumes.map((item, i) =>
                        {return <div key={i}>
                            {item.chapters.map((item2,j) => {
                                 return <div className="inline" key={i+'-'+j}><a onClick={this.queryContent.bind(this,item2.volumeId)} >{item2.title}</a></div>
                            })}
                        </div>}
        
                 
                    )}
                </div> : null}
                {this.state.visible2 ? <div>
                    <h2>
                        {this.state.chapter.title}
                    </h2>
                    <div>
                        {this.state.content.split("\n").map(
                            (p, i) =>
                            <p key={i}>{p}</p>
                        )
                        }
                    </div>
                </div> : null
                }
                </div>
    }
}
