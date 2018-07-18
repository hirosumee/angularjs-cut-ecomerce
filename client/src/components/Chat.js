import React, {Component} from 'react';
import axios from 'axios';
import {sendMessage, getMessages, receiveMessage} from '../vendors/socket';
import {MessageList, Input, Button} from '../Libs/react-chat-elements/main.js';
import {Scrollbars} from 'react-custom-scrollbars';

class MsgList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let message = this.props.messages.map(item => {
            let check = this.props.email === item.sender;
            if (item.fileType === 'image/jpeg' || item.fileType === 'image/png') {
                item.type = 'photo';
            }
            return {
                position: check ? 'right' : 'left',
                type: item.type || 'text',
                text: item.content,
                date: new Date(item.timestamp),
                title: item.sender,
                data: {
                    uri: `/file/?room=${this.props.room}&name=${item.content}`,
                    status: {
                        click: false,
                        loading: 0,
                    },
                    width: 300,
                    height: 300,
                    latitude: '37.773972',
                    longitude: '-122.431297'
                }
            }
        });
        return (
            <div>
                <MessageList
                    className='message-list'
                    lockable={true}
                    toBottomHeight={10}
                    dataSource={message}/>
            </div>
        );
    }
}

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {messages: [], loadTime: 1, typeMessages: true};
        receiveMessage((data) => {
            if (this.props.room === data.roomName) {
                this.state.messages.push({content: data.content, sender: data.sender, timestamp: data.timestamp});
                this.setState({messages: this.state.messages});
            }
        });
        this.from = this.props.from;
        this.to = this.from;
    }
    getMessageWithRoomAndFrom(room, from) {
        getMessages({_id: room, from}, (data) => {
            if(data.length === 0){
                return ;
            }
            if (from < this.state.messages.length) {
                console.log(data,from);
                return;
            }
            this.setState({messages: [...data.reverse(), ...this.state.messages]});
            if (data.length > 3) {
                let that = this;
                setTimeout(() => {
                    that.container.scrollTop(data.length * 42);
                    // that.container.scrollTop = data.length * 42;
                }, 50)
            }
        });
    }

    getMessagesFrom() {
        this.getMessageWithRoomAndFrom(this.props.room, this.state.messages.length);
    }
    getMessageOnTop(room=this.props.room){
        getMessages({_id: room, from:this.to}, (data) => {
            if(data.length === 0){
                return ;
            }
            console.log(this.to,data[0].pos,data[data.length-1].pos);
            if (this.to !== data[0].pos) {
                console.log(this.to);
                console.log(data);
                return;
            }
            this.to+= data.length;
            this.setState({messages: [...data.reverse(), ...this.state.messages]});
            if (data.length > 3) {
                let that = this;
                setTimeout(() => {
                    that.container.scrollTop(data.length * 42);
                    // that.container.scrollTop = data.length * 42;
                }, 50)
            }
        });
    }
    getMessageOnBottom(room=this.props.room){
        // to not  negative
        getMessages({_id: room, from:this.from-10>0?this.from-10:0}, (data) => {
            if(data.length === 0){
                return ;
            }

            if (this.from !== data[data.length-1].pos+1) {
                return;
            }
            this.from -= data.length;
            this.setState({messages: [...this.state.messages,...data.reverse()]});
        });
    }
    getRemainBottomMessage(content,room=this.props.room){
        getMessages({_id:room,from:0,amount:this.from},(data)=>{
            if(data.length === 0){
                return ;
            }

            if (this.from !== data[data.length-1].pos+1) {
                return;
            }
            this.from -= data.length;
            this.setState({messages: [...this.state.messages,...data.reverse()]});
            console.log(data);
            sendMessage(content,room);
        });
    }
    onClick() {
        this.sendMessage(this.refs.message.state.value, this.props.room);
        // let current = this.container.getScrollTop();
        // let height = this.container.getScrollHeight();
        let that = this;
        if (this.container.getValues().top>0.9) {
            //setTimeout(()=>{
                that.setDefaultScroll();
            // },50);
        }
        this.refs.message.clear();
    }

    setDefaultScroll() {
        setTimeout(() => {
            this.container.scrollToBottom();
        }, 50)
    }

    componentDidMount() {
        this.getMessageOnTop();
        this.setDefaultScroll();
    }

    scrollChange(event) {
        let height = event.target.scrollTop;
        if (height === 0) {
            this.getMessageOnTop();
        }
        if(this.container.getValues().top>=1&&this.from>0){
            console.log('getBottom');
            this.getMessageOnBottom();
        }
    }
    componentDidUpdate(){
        //this.setDefaultScroll();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.room !== nextProps.room) {
            this.setState({messages: []});
            this.from =0;
            this.to =0;
            this.getMessageOnTop(nextProps.room);
            this.setDefaultScroll();
        }
    }

    fileChange(event) {
        let files = event.target.files;
        this.setState({file: URL.createObjectURL(files[files.length - 1])});
        console.log(files);
    }

    clearInput() {
        if (this.refs.fileInput) {
            this.refs.fileInput.value = null;
            this.setState({file: null});
        }
    }

    async upLoadFile() {
        let files = this.refs.fileInput.files;
        if (!files) {
            return;
        }
        if (files && files.length === 0) {
            return;
        }
        let form = new FormData();
        form.append('file', files[files.length - 1]);
        form.append('room', this.props.room);
        let response = await axios.post('/file', form);
        console.log(response);
        this.clearInput();
    }

    sendMessage(content,room){
        if(this.from!==0){
            //do something
            this.getRemainBottomMessage(content,room);
        } else {
            sendMessage(content,room);
        }
    }
    render() {

        return (
            <div>
                <Scrollbars onScroll={this.scrollChange.bind(this)} style={{
                    height: '70vh'
                }} ref={el => this.container = el}>
                    <MsgList room={this.props.room} messages={this.state.messages} email={this.props.user.email}/>

                </Scrollbars>
                {
                    this.state.typeMessages && (
                        <Input
                            placeholder="Type here..."
                            className="input-position"

                            multiline={false}
                            ref="message"
                            onKeyPress={(e) => {
                                if (e.shiftKey && e.charCode === 13) {
                                    return true;
                                }
                                if (e.charCode === 13) {
                                    this.refs.message.clear();
                                    this.sendMessage(this.refs.message.state.value, this.props.room);
                                    let that = this;
                                    if (this.container.getValues().top>0.9) {
                                        //setTimeout(()=>{
                                        that.setDefaultScroll();
                                        // },50);
                                    }
                                    e.preventDefault();
                                    return false;
                                }
                            }}
                            leftButtons={
                                <div>
                                    <Button
                                        color='white'
                                        backgroundColor='warning'
                                        text='File'
                                        onClick={() => {
                                            this.setState({typeMessages: false});
                                        }}
                                    />
                                </div>
                            }
                            rightButtons={
                                <Button
                                    color='white'
                                    backgroundColor='primary'
                                    text='Send'
                                    onClick={this.onClick.bind(this)}
                                />
                            }
                        />
                    )
                }
                {
                    this.state.typeMessages || (
                        <div className="input-position">
                            <img style={{maxHeight: 50}} src={this.state.file}/>
                            <div className="input-group">
                                <div className="input-group-append" onClick={() => {
                                    this.clearInput();
                                    this.setState({typeMessages: true})
                                }}>
                                    <span className="input-group-text">Cancel</span>
                                </div>
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="inputGroupFile02"
                                           onChange={this.fileChange.bind(this)} ref="fileInput"/>
                                    <label className="custom-file-label" htmlFor="inputGroupFile02">Choose
                                        file</label>
                                </div>
                                <div className="input-group-append" onClick={() => {
                                    this.setState({typeMessages: true});
                                    this.upLoadFile();
                                }}>
                                    <span className="input-group-text">Upload</span>
                                </div>
                            </div>
                        </div>
                    )
                }
                {/* <div style={{position: 'fixed', bottom: 0, right: 0, width: '75%'}}>
                    
                </div> */}
            </div>
        );
    }
}

export default Chat;