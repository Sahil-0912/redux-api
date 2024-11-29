import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom'
import UserForm from './Pages/UserForm'
import UserView from './Pages/UserView'
import Header from './Layouts/Header'
import './assets/css/style.css'
import UpdateUser from './Pages/UpdateUser'
import SingleUser from './Pages/SingleUser'
const App = () => {
  return (
    <div>
        <Routers>
          <Header />
          <Routes>
            <Route path='/' element={<UserForm />}></Route>
            <Route path='/viewuser' element={<UserView />}></Route>
            <Route path='/singleuser/:id' element={<SingleUser />}></Route>
            <Route path='/updateuser/:id' element={<UpdateUser />}></Route>
          </Routes>
        </Routers>
    </div>
  )
}

export default App
