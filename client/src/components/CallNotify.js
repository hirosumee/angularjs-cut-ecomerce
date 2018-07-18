import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SimpleWebRTC from 'simplewebrtc';
import {callFriend} from '../vendors/socket';
class CallNotify extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
        this.toggle = this.toggle.bind(this);

    }
    
    toggle() {
        if(this.webrtc){
          
          this.webrtc.leaveRoom();
          this.webrtc.stopLocalVideo();
          // this.webrtc.disconnect();
        }
        this.props.cancelCall(false);
    }
    componentWillReceiveProps(nextProps) {
      this.setState({
        modal: nextProps.show
      });
      if (nextProps.show && nextProps.room) {
        this.webrtc = new SimpleWebRTC({
          // the id/element dom element that will hold "our" video
          localVideoEl: 'localVideo',
          // the id/element dom element that will hold remote videos
          remoteVideosEl: 'remoteVideos',
          // immediately ask for camera access
          autoRequestMedia: true,
          autoRemoveVideos: true, //auto remove videos when stream stopped

        });
        if(nextProps.iCall){
          let that = this;
          this.webrtc.on('readyToCall', function () {
            // you can name it anything
            that.webrtc.joinRoom(nextProps.room);
            // send a request call to server
            callFriend(nextProps.room);
          });
        }
        
      }
    }
    allowCallClick(){
      if(this.webrtc){
        this.webrtc.joinRoom(this.props.room);
        // this.webrtc.on('readyToCall',function(){
        //   this.webrtc.joinRoom(this.props.room);
        // })
      }
    }
      render() {
        let allowCallBtn = "";
        if(!this.props.iCall){
          allowCallBtn = <Button color="primary" onClick={this.allowCallClick.bind(this)}>Allow</Button>
        }
        return (
          <div>
            <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Calling</ModalHeader>
              <ModalBody>
              <style dangerouslySetInnerHTML={{__html: "\n#remoteVideos video {height: 150px;}#localVideo {height: 150px;}" }} />
              <video id="localVideo"></video>
              <div id="remoteVideos"></div>
                </ModalBody>
              <ModalFooter>
                {allowCallBtn}
                {' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        );
      }
}

export default CallNotify;