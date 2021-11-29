import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
// import { closeWebSocket, createWebSocket,events } from '../../WebSocket/WebSocket'
import { withRouter } from 'react-router-dom'
import './Message.css'
function Message(props) {

    let websocket, lockReconnect = false;
    var [events, setevnet] = useState(events);
    var [userList, SetUserList] = useState([])
    var [username, setUsername] = useState('');
    var [TouserId, SetToUser] = useState('')
    let createWebSocket = (url) => {
        websocket = new WebSocket(url);
        websocket.onopen = function () {
            heartCheck.reset().start();
        }
        websocket.onerror = function () {
            reconnect(url);
        };
        websocket.onclose = function (e) {
            console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
        }
        websocket.onmessage = function (event) {
            lockReconnect = true;
            //event 为服务端传输的消息，在这里可以处理
            console.log(event)
            setevnet(events = event)
        }

    }
    let reconnect = (url) => {
        if (lockReconnect) return;
        //没连接上会一直重连，设置延迟避免请求过多
        setTimeout(function () {
            createWebSocket(url);
            lockReconnect = false;
        }, 4000);
    }

    let heartCheck = {
        timeout: 600000, //60秒
        timeoutObj: null,
        reset: function () {
            clearInterval(this.timeoutObj);
            return this;
        },
        start: function () {
            this.timeoutObj = setInterval(function () {
                //这里发送一个心跳，后端收到后，返回一个心跳消息，
                //onmessage拿到返回的心跳就说明连接正常
                websocket.send("HeartBeat");
            }, this.timeout)
        }
    }
    //关闭连接
    let closeWebSocket = () => {
        websocket && websocket.close();
    }



    axios.defaults.withCredentials = true
    useEffect(() => {
        async function fetch() {
            var v = await axios({
                method: "POST",
                url: "/isLogin"
            })
            // 检查是否登录
            console.log(v)

            if (v.data.state) {
                //    链接websocket
                let url = `ws://o395789203.goho.co/websocket/${v.data.data.user}`
                createWebSocket(url);
                console.log(v.data)
                setUsername(username = v.data.data.user)


            } else {
                props.history.push('/login')
            }
            // 获取在线人数
            var c = await axios({
                method: "GET",
                url: "/Online"
            })
            console.log(Object.keys(c.data.message))
            Object.keys(c.data.message).forEach((item) => {

                SetUserList(userList = [...userList, {
                    name: item,
                    select: false
                }]);

            })

        }
        fetch()




        return () => {

        };
    }, []);
    var [msgList, SetList] = useState([]);

    var [Message, setMessage] = useState('');
    var Me = useRef();
    // 发送
    var PushInfo = () => {
        if (TouserId == '') {
            alert('不能不选择对话');
            return
        }
        var params = new URLSearchParams()
        params.append('message', Message)
        params.append('toUserId', TouserId)
        axios.post('/push', params).then((v) => {
            console.log(v)
        })
        
        // 添加信息到msg
        SetList(msgList = [...msgList, Message])
          // 清空输入
          setMessage(Message='')

    }
    // 键盘发送
    var KeyPush=(e)=>{
     if(e.keyCode==13){
        if (TouserId == '') {
            alert('不能不选择对话');
            return
        }
        var params = new URLSearchParams()
        params.append('message', Message)
        params.append('toUserId', TouserId)
        axios.post('/push', params).then((v) => {
            console.log(v)
        })
      
        // 添加信息到msg
        SetList(msgList = [...msgList, Message])
          // 清空输入
          setMessage(Message='')
     }
    }


    var [IsMessageing, SetMessages] = useState(true)
    var ChangeMessage = () => {
        setMessage(Message = Me.current.value)
    }
    var SetToUserId = (id) => {
        // 改为高亮
        userList.forEach((item) => {
            item.select = false
            if (item.name == id) {
                item.select = true
            }
        })
        // 改为聊天取反
        if (TouserId == id) {
            console.log(TouserId, id)

            // 变
            SetMessages(IsMessageing = !IsMessageing)
        } else {
            if (IsMessageing == false) {
                SetMessages(IsMessageing = !IsMessageing)

            }
        }

        // 设置联系人
        SetToUser(TouserId = id)

    }

    // 监视event
    useEffect(() => {
        console.log("新消息" + events)
        if (events != undefined) {
            // 消息
            console.log(events.data)

            SetList(msgList = [...msgList, events.data])
        }
    }, [events])

    return (
        <div className="MessageBox">
            <div className="on">
                {/* 左侧  在线人员*/}
                <h1>你好!{username}点击即可聊天</h1>
                <ul >


                    {
                        userList.map((item, index) => {
                            if (item.name != username) {
                                return (
                                    <li key={index} className={item.select ? "Select" : ""} onClick={() => { SetToUserId(item.name) }}>
                                        {item.name} 在线中
                                    </li>
                                )
                            }

                        })
                    }
                </ul>
            </div>






            {/* 右侧  聊天*/}
            <div className="flex" style={{ display: IsMessageing ? "block" : "none" }}>
                <div className="Rigth"  >
                    {/* 聊天框 */}
                    <div className="textBox">
                        <ul>
                            {
                                msgList.map((item, index) => {
                                    return (
                                        <li key={index} className="msg">{item}</li>
                                    )
                                })
                            }
                        </ul>

                    </div>
                    <input ref={Me} value={Message} placeholder="开始聊天" onChange={() => { ChangeMessage() }} onKeyDown={(e)=>{KeyPush(e)}} />
                    <button onClick={() => { PushInfo() }}>发送</button>
                </div>
            </div>

        </div>
    )
}
export default withRouter(Message)
