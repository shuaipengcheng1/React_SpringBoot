import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>首页</h1>
            <Link to="/login">登录</Link>
        </div>
    );
}

export default Home;
