import React, {Component} from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import {searchMessages} from "../vendors/socket";
import {Link} from "react-router-dom";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {search: []};
    }

    search(text, room) {
        let r = room === 'all' ? null : room;
        console.log(text, room, r);
        searchMessages(text, r, (data) => {
            // let res = data.map((item) => {
            //     return item._source;
            // });
            this.setState({search: data});
        })
    }

    componentWillMount() {
        this.search(this.props.match.params.text, this.props.match.params.mode);
    }

    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-expand-sm navbar-light bg-light">

                    <div className="input-group mb-3">
                        <button onClick={() => {
                            console.log(this.props.history.push('/'))
                        }} className="btn btn-light"><i className="fas fa-chevron-left"/></button>
                        <input defaultValue={this.props.match.params.text} ref="search_text" type="text"
                               className="form-control" placeholder="Recipient's username"
                               aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                        <div className="input-group-append">
                            <button onClick={() => {
                                this.search(this.refs.search_text.value, this.props.match.params.mode)
                            }} className="btn btn-outline-secondary" type="button">Search
                            </button>
                        </div>
                    </div>
                </nav>
                <Scrollbars style={{ height: '80vh' }}>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            {/*<th scope="col">Room</th>*/}
                            {/*<th scope="col">Sender</th>*/}
                            <th scope="col">Message</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            // console.log(this.state.search)&&
                            this.state.search.map((item, index) => {
                                return (
                                    <tr key={index}>

                                        <th scope="row">{index}</th>
                                        {/*<td>{item.room}</td>*/}
                                        {/*<td>{item.sender}</td>*/}
                                        <td><Link to={`/room/${item.room}/${item.messageId}`}>{item.content}</Link></td>
                                    </tr>)
                            })
                        }
                        </tbody>
                    </table>
                </Scrollbars>
            </div>
        );
    }
}


export default Search
