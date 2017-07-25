import React from 'react';
import axios from 'axios';
import Config from 'Config';

export default class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({url: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        axios.post(Config.serverUrl + '/add', {url: this.state.url, source: "qidian", bookId: ""})
            .then(res => {
                const status = res.data.status;
                const desc = res.data.desc;
                this.setState({
                    status: status,
                    desc: desc
                });
            });
    }

    render() {
        let desc = null;
        if (this.state.status !== undefined) {
            if (this.state.status === '1') {
                desc = <div color="green">添加成功</div>
            } else {
                desc = <div color="red">{this.state.desc}</div>
            }
        }
        return <form onSubmit={this.onSubmit}>
            <div>
                <label>书籍url:</label>
                <input id="add_url" type="text" value={this.state.url} onChange={this.onChange}/>
            </div>
            <input type="submit" value="提交添加申请"/>
            {desc}
        </form>
    }
}
