
import React, { useState, useRef, } from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import './index.css'

const Input = (props) => {
    var [username, setusername] = useState('');
    var [password, setpassword] = useState('');
    var UserInput = useRef(null);
    var PassInput = useRef(null);
    axios.defaults.withCredentials = true
    //   var History = useHistory();
    //    修改用户名
    var ChangeUser = function () {
        //   console.log(Input)
        setusername(username = UserInput.current.value)
    }
    //    修改密码名
    var ChangePass = function () {
        //   console.log(Input)
        setpassword(password = PassInput.current.value)
    }
    var Login = function () {
        var params = new URLSearchParams()
        params.append('username', username)
        params.append('password', password)
        axios.post("/login", params).then((data) => {
            if (data.data.state) {
                alert("登录成功")
                props.history.push('/message')
             

            } else {
                alert('失败')

            }
        })

    }

    var KeyLogin = function (e) {
        // console.log(e)
        if (e.charCode == 13) {
            var params = new URLSearchParams()
            params.append('username', username)
            params.append('password', password)
            axios.post("/login", params).then((data) => {
                alert('登录')
                if (data.data.state) {
                    alert("登录成功")
                    console.log(props)
                    props.history.push('/message')


                } else {
                    alert('失败')

                }
            })

        }

    }
    return (
        <div className="mainBox">
            <div className="Login_box">
                <h1>登录界面</h1>
                <input type="text" placeholder="输入用户名" ref={UserInput} value={username} onKeyPress={(e) => KeyLogin(e)} onChange={() => { ChangeUser() }} />
                <input type="password" placeholder="输入密码" ref={PassInput} value={password} onKeyPress={(e) => KeyLogin(e)} onChange={() => { ChangePass() }} />
                <div className="controller">
                    <button onClick={() => { Login() }} >登录</button>
                    <button>注册</button>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Input);
