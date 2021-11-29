// 登录组件
import Input from './Component/Login/Input'
import Error from './Component/error/error'
 import { Route,Router,Switch, BrowserRouter,Navigate } from 'react-router-dom'
import router from './Router/Router'
function App() {

  return (
    <div>
      <BrowserRouter>
       <Switch>
        {/* <Route path="/login" element={<Input/>}  />
        <Route path="/*" element={<Error/>}/> */}

        {/* 循环路由组件数组 */}
        {
          router.map((router,index)=>{
            return <Route path={router.path} component={router.component}  key={index}/>
          })
        }
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
