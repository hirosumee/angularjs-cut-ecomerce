import React, {Component} from 'react';
import Chat from "./Chat";

class ChatContainer extends Component {
    constructor(props) {
        super(props);
        let from = Number(props.match.match.params.from);
        if(isNaN(from)){
           from =0;
        }
        this.state ={from};
        if(this.props.flag){
            this.props.changeRoom(this.props.room);
        }
    }

    checkInRoom(event) {
        if (!this.props.room) {
            this.props.notify('error', 'Error', 'Please choose a room to calling');
            event.preventDefault();
        }
    }
    render() {
        return (
            <div>
                <div className="alert alert-secondary">
                    <h6>Room:{this.props.room}</h6>
                    <div className="row">
                        <div className="col-5">
                            <a style={{marginLeft: 10, marginRight: 10}}
                               href={"/call/call/audio/" + this.props.room} target="_blank"
                               onClick={this.checkInRoom.bind(this)} id="audio-call">Audio Call <i
                                className="fas fa-phone"/></a>
                            <a style={{marginLeft: 10}} href={"/call/call/video/" + this.props.room}
                               target="_blank"
                               onClick={this.checkInRoom.bind(this)} id="video-call">Video Call <i
                                className="fas fa-video"/></a>
                        </div>
                        <div className="input-group mb-3 col-5 offset-2">
                            <select defaultValue={this.props.room} ref={(el) => {
                                this.select_search_mode = el;
                            }} className="custom-select" id="inputGroupSelect01">
                                <option value={this.props.room}>In Room</option>
                                <option value="all">All Room</option>
                            </select>
                            <input type="text" ref={(el) => {
                                this.search_text = el;
                            }} className="form-control" placeholder="Messages"
                                   aria-label="Messages" aria-describedby="basic-addon2"/>
                            <div className="input-group-append">
                                <button onClick={() => {
                                    // this.props.history.push('/search/ha/ha')
                                    if (this.props.room) {
                                        let text = this.search_text.value;
                                        let mode = this.select_search_mode.value;
                                        this.props.match.history.push(`/search/${text||'*'}/${mode}`);
                                        // console.log(this)
                                    }
                                }} className="btn btn-outline-secondary" type="button">Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    (this.props.isLogin&&this.props.room)&&<Chat room={this.props.room} user={this.props.user} from={this.state.from}/>
                }
            </div>
        );
    }
}


export default ChatContainer;
