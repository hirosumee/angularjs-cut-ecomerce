import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Libs/react-chat-elements/main.css';
import 'react-notifications/lib/notifications.css';
import Login from './components/Login';
import {ChatList, SideBar} from './Libs/react-chat-elements/main.js';
import {NotificationContainer, NotificationManager} from 'react-notifications';
//
import {
    loginSocket, checkLoginSocket, userOnline, receiveMessage, readMessage,
    checkUser, receiveCall
} from './vendors/socket';
import NavBar from './components/NavBar';
import Notify from './components/Notify';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Call from './components/Call';
import Search from './components/Search'
import ChatContainer from "./components/ChatContainer";

//
class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {isLogin: false, user: {}, listUser: []};
        this.flag = false;
        checkLoginSocket((data) => {
            this.setState({isLogin: true, user: data.user, rooms: data.rooms, userOnline: data.userOnline});
        });
        userOnline((data) => {
            this.setState({userOnline: data})
        });
        receiveMessage((data) => {
            if (data.sender != this.state.user.email) {
                this.createNotification('success', data.sender, data.content);
            }

            let roomOrUser = data.roomName; //roomId
            let userOnline = this.state.userOnline;
            for (let i = 0; i < userOnline.length; i++) {
                let user = userOnline[i];
                if (user._id == roomOrUser) {
                    user.unread = user.unread ? user.unread + 1 : 1;
                    this.setState({userOnline: userOnline});
                    return;
                }
            }
            //
            let rooms = this.state.rooms;
            for (let i = 0; i < rooms.length; i++) {
                let rooM = rooms[i];
                if (rooM._id == roomOrUser) {
                    rooM.unread = rooM.unread ? rooM.unread + 1 : 1;
                    this.setState({rooms});
                    return;
                }
            }
        });

        //
        checkUser((users) => {
            this.setState({userOnline: users});
        });
        //
        receiveCall((data) => {
            if (data.email != this.state.user.email) {
                console.log(data)
                this.setState({
                    callRequest: true,
                    caller: data.email,
                    callRoom: data.roomId,
                    optionCall: data.option
                });
            }
        });

        if (!this.state && this.state.isLogin) {

        }
    }

    Login({email, password}) {
        loginSocket({email, password}, (data) => {
            this.setState({isLogin: true, user: data.user, rooms: data.rooms, userOnline: data.userOnline});
        });
    }


    listRoom() {
        let temp = [];
        if (this.state.rooms) {
            return this.state.rooms
                .map((item) => {
                    return {
                        avatar: 'https://png.pngtree.com/element_origin_min_pic/16/11/29/bc43e00bfa3ccd2b0f9cf2d873513490.jpg',
                        alt: item._id,
                        title: item.name,
                        subtitle: item.messages,
                        date: new Date(),
                        unread: item.unread || 0,
                    }
                });
        }
        return temp;
    }

    listUser() {
        let temp = [];
        if (this.state.userOnline) {
            return this.state.userOnline
                .map((item) => {
                    return {
                        avatar: 'https://png.pngtree.com/element_origin_min_pic/16/11/29/bc43e00bfa3ccd2b0f9cf2d873513490.jpg',
                        title: item.name,
                        subtitle: item.messages,
                        date: new Date(),
                        alt: item._id,
                        unread: item.unread || 0,
                    }
                })
        }
        return temp;
    }

    ChatListClick(data) {
        let {alt} = data;
        this.setState({room: alt});
        // set read all message in room
        readMessage(alt);
        //set flag you change
        this.flag = true;
        //set read all
        for (let i = 0; i < this.state.userOnline.length; i++) {
            if (this.state.userOnline[i]._id == alt) {

                this.state.userOnline[i].unread = 0;
                this.setState({userOnline: this.state.userOnline});
                return;
            }
        }
        //
        for (let i = 0; i < this.state.rooms.length; i++) {
            if (this.state.rooms[i]._id == alt) {
                this.state.rooms[i].unread = 0;
                this.setState({rooms: this.state.rooms});
                return;
            }
        }
    }

    turnOffNotify() {
        this.setState({
            callRequest: false
        });
    }

    changeRoom(room){
        console.log('change room')
        this.setState({room});
    }

    render() {
        return (
            <div>
                <NavBar email={this.state.user.email}/>
                <Notify show={this.state.callRequest} caller={this.state.caller}
                        room={this.state.callRoom}
                        option={this.state.optionCall}
                        turnOff={this.turnOffNotify.bind(this)}
                />
                <div className="contain">
                    <div className="chat-list">
                        <SideBar

                            center={
                                <div>
                                    <h5 className="user-online">USER ONLINE:</h5>
                                    <ChatList
                                        onClick={this.ChatListClick.bind(this)}
                                        dataSource={[...this.listUser(), ...this.listRoom()]}/>
                                </div>

                            }
                        />
                    </div>

                    <div className="right-panel" style={{marginTop: 55}}>
                        <div>
                            <Router>
                                <div>
                                    <Switch>
                                        <Route path="/call/:type(call|receive)/:option(audio|video)/:id"
                                               component={Call}/>
                                        <Route path="/search/:text/:mode" component={Search}/>
                                        <Route path="/room/:id/:from" render={(match) => {
                                            console.log('rerender');
                                            let room = this.state.room;
                                            let flag_change_room = false;
                                            if (match.match.params.id !== 'default'&&!this.flag) {
                                                room = match.match.params.id;
                                                flag_change_room = true;
                                            }
                                            //set flag state to default
                                            this.flag = false;
                                            return (
                                                <div>
                                                    {
                                                        this.state.isLogin && <ChatContainer
                                                            room={room}
                                                            notify={this.createNotification.bind(this)}
                                                            user={this.state.user}
                                                            isLogin={this.state.isLogin}
                                                            match={match}
                                                            changeRoom={this.changeRoom.bind(this)}
                                                            flag={flag_change_room}
                                                        />
                                                    }
                                                </div>
                                            )
                                        }}/>
                                        <Route path="/" exact render={(match) => {
                                            return (<div>
                                                {
                                                    (!this.state.isLogin) && <Login Login={this.Login.bind(this)}/>
                                                }
                                                {
                                                    this.state.isLogin && <Redirect to="/room/default/0"/>
                                                }
                                            </div>)
                                        }
                                        }/>
                                    </Switch>
                                </div>
                            </Router>
                        </div>
                    </div>
                </div>
                <NotificationContainer/>
            </div>
        );
    }

    createNotification = (type, title, content) => {
        switch (type) {
            case 'info':
                NotificationManager.info(content, title, 3000);
                break;
            case 'success':
                NotificationManager.success(content, title, 3000);
                break;
            case 'warning':
                NotificationManager.warning(content, title, 3000);
                break;
            case 'error':
                NotificationManager.error(content, title, 3000)
                break;
        }
    }
}

export default App;
