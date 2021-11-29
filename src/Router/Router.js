import Login from '../Component/Login/Input'
import Error from '../Component/error/error'
import Home from '../Component/Home/Home'
import Message from '../Component/Message/Message'

let Router = [
    {
        path:"/login",
        component:Login,
        exact:true
    },
 
    {
     path:"/message",
     component:Message
    },
 {
        path:"/",
        component:Home
     },
    {
        path:"/*",
        component:Error,

    },
   
]

export default Router