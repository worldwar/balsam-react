import React from 'react';
import Volume from './Volume.jsx'
import axios from 'axios'
import { Row, Col , Pagination ,Button, BackTop} from 'antd';

export default class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible1:true,
            visible2: false,
            i: 0,
            j: 0,
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
    queryContent(id,i,j) {
        $q.get($q.url+'/content/'+id , (data) => {
            this.setState({
                content: data.paragraph.content,
                chapter: data.chapter,
                visible1:false,
                visible2: true,
                i: i,
                j: j,
            },()=>{
                window.scrollTo(0,0);
            });
        })
    }
    load(type) {
        let i = 0, j =0 ;
        switch(type) {
            case 'pre' :
                i = this.state.i;
                j = this.state.j;
                this.queryContent(this.state.catalog.volumes[i].chapters[j-1].id,i,j-1);
                break;
            case 'next' :
                i = this.state.i;
                j = this.state.j;
                this.queryContent(this.state.catalog.volumes[i].chapters[j+1].id,i,j+1);
                
                break;
            case 'cat' :
                this.setState({
                    visible1:true,
                    visible2: false,
                });
                break;
        }
    }

    render() {
        return <div ref={node => this.node = node}>{this.state.visible1 ? <div>
                    {this.state.catalog && this.state.catalog.volumes.map((item, i) =>
                        {return <div key={i}>
                            {item.chapters.map((item2,j) => {
                                 return <div className="inline" key={i+'-'+j}><a onClick={this.queryContent.bind(this,item2.id,i,j)} >{item2.title}</a></div>
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
                    <div>
                        {!this.state.i && <Button type="primary" onClick={this.load.bind(this,'pre')}>上一页</Button>}
                        <span>  </span>
                        {<Button type="primary" onClick={this.load.bind(this,'next')}>下一页</Button>}
                        <span>  </span>
                        {<Button type="primary" onClick={this.load.bind(this,'cat')}>返回目录</Button>}
                    </div>
                    <BackTop>
                      <div>回到顶部</div>
                    </BackTop>
                </div> : null
                }
                </div>
    }
}
