import React, { Component } from 'react';
import SimpleWebRTC from 'simplewebrtc';
import {callFriend,sendEndCall,requestCreateCall} from '../vendors/socket';
import {Row, Col,ButtonGroup,Button } from 'reactstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

class Call extends Component {
    constructor(props) {
        super(props);
        let that = this;
        let count =0;
        this.state ={isMute:false,isBlind:false,isEnd:false,value:100};
        
        setTimeout(()=>{
            let media = { video: true, audio: true };
            if(this.props.match.params.option === 'audio'){
                media = { video: false, audio: true };
            }
            that.webrtc = new SimpleWebRTC({
                // the id/element dom element that will hold "our" video
                localVideoEl: 'localVideo',
                // the id/element dom element that will hold remote videos
                remoteVideosEl: 'remoteVideos',
                // immediately ask for camera access
                autoRequestMedia: true,
                autoRemoveVideos: true, //auto remove videos when stream stopped
                media
            });
            that.webrtc.on('readyToCall', function () {
                that.webrtc.setVolumeForAll(1);
                if (count === 0) {
                    if (that.props.match.params.type === 'call') {
                        requestCreateCall({
                            roomId: props.match.params.id,
                            option: props.match.params.option
                        }, (callID) => {
                            // you can name it anything
                            that.webrtc.joinRoom(callID);
                            // send a request call to server
                            callFriend(props.match.params.id);
                            count++;
                        });
                    }
                    else{
                        that.webrtc.joinRoom(props.match.params.id);
                        count++;
                    }
                }
            });
            that.webrtc.on('leftRoom',function(roomName){
                that.createNotification('warning','Left room','You are lefted current call room');
                that.webrtc.stopLocalVideo();
            });
        });
        
    }
    componentDidMount(){
        window.addEventListener("beforeunload", (ev) => 
        {
            //send request close call
            sendEndCall(this.props.match.params.id);
            this.webrtc.leaveRoom();
            ev.preventDefault();
            return ev.returnValue = 'Are you sure you want to close?';
        });
    }
    onClick(event){
        switch (event.target.name) {
            case 'mute-btn':
                if(this.state.isMute){
                    this.webrtc.unmute();
                    this.setState({isMute:false});
                } else {
                    this.webrtc.mute();
                    this.setState({isMute:true});
                }
                break;
            case 'end-btn':
                if(!this.state.isEnd){
                    sendEndCall(this.props.match.params.id);
                    this.webrtc.leaveRoom();
                    this.setState({isEnd:true});
                }
                break;
            case 'blind-btn':
                if(this.state.isBlind){
                    this.webrtc.resumeVideo();
                    this.setState({isBlind:false});
                } else {
                    this.webrtc.pauseVideo();
                    this.setState({isBlind:true});
            }
                break;
            
        }
    }
    //event off audio slider
    // handleChangeStart = () => {
    //     console.log('Change event started')
    // };
    handleChange = value => {
        this.setState({
          value: value
        });
    };
    handleChangeComplete = () => {
        let video =document.getElementById("remoteVideos").children[0];
        video.volume = this.state.value/100;
    };
    //end event audio slider
    render() {
        const { value } = this.state;
        let endBtn = ()=>{
            if(!this.state.isEnd){
                return (
                    <div>
                        <style dangerouslySetInnerHTML={{__html: ".deep-zone{pointer-events:none;}" }} />
                        <Button style={{height: 45,width:45,marginRight:4}} className="btn btn-success rounded-circle" name="mute-btn" onClick={this.onClick.bind(this)}>
                            <i className={`deep-zone fas fa-microphone${this.state.isMute?'-slash':''}`}/>
                        </Button>
                        <Button style={{height: 45,width:45}} className="btn btn-danger rounded-circle" name="end-btn" onClick={this.onClick.bind(this)}>
                            <i className="deep-zone fas fa-phone-slash"/>
                        </Button>
                        <Button style={{height: 45,width:45,marginLeft:4}} className=" btn btn-warning rounded-circle" name="blind-btn" onClick={this.onClick.bind(this)}>
                            <i className={`deep-zone fas fa-video${this.state.isBlind?'-slash':''}`}/>
                        </Button>
                    </div>);
            }
            return '';
        };
        return (
            <div>
                <Row>
                    <Col>
                        <video className="float-right" id="localVideo"/>
                    </Col>
                    <Col>
                        <div className="float-left" id="remoteVideos"/>
                    </Col>
                </Row>
                <Row>
                    <Col md={{offset:4,size:4}}>
                        <Slider
                            min={0}
                            max={100}
                            value={value}
                            onChange={this.handleChange}
                            onChangeComplete={this.handleChangeComplete}
                        />
                    </Col>
                </Row>
                <div className="fixed-bottom d-flex justify-content-center">
                    <ButtonGroup>
                        {endBtn()}
                    </ButtonGroup>
                </div>
                <NotificationContainer/>
            </div>
        );
    }
    createNotification = (type,title,content) => {
        switch (type) {
          case 'info':
            NotificationManager.info(content,title,3000);
            break;
          case 'success':
            NotificationManager.success(content,title,3000);
            break;
          case 'warning':
            NotificationManager.warning(content,title,3000);
            break;
          case 'error':
            NotificationManager.error(content,title,3000);
            break;
        }
    }
}

export default Call;