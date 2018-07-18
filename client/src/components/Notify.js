import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Notify extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.props.turnOff();
        this.setState({
          modal: !this.state.modal
        });
      }
      componentWillReceiveProps(nextProps){
          this.setState({modal:nextProps.show});
      }
      render() {
        return (
          <div>
            <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
              <ModalBody>
                Bạn có 1 cuộc gọi  từ {this.props.caller}
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={()=>{this.toggle();window.open(`/call/receive/${this.props.option||'video'}/${this.props.room}`, "_blank")}}>Đồng ý</Button>{' '}
                <Button color="danger" onClick={this.toggle}>Không đồng ý</Button>
              </ModalFooter>
            </Modal>
          </div>
        );
      }
}

export default Notify;