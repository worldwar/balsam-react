import React from 'react';
import axios from 'axios'
import Config from 'Config'
export default class Content extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        const contentId = this.props.match.params.chapterId;
        if (contentId) {
            axios.get(Config.serverUrl + '/content/' + contentId)
                .then(res => {
                    const chapter = res.data.chapter;
                    const content = res.data.paragraph.content;
                    this.setState({
                        chapter: chapter,
                        content: content,
                        exists:true
                    });
                });
        } else {
            this.setState({
                exists: false
            })
        }
    }

    render() {
        if (this.state.exists === undefined) {
            return <div>正在加载...</div>;
        }
        if (this.state.exists) {
            return 
                <div>
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
            </div>;
        } else {
            return <div>页面不存在</div>
        }
    }
}
