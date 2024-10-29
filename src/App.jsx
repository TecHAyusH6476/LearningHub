/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Route, Routes } from 'react-router-dom'
import Home from './home/Home'
import Login from './auth/Login'
import Register from './auth/Register'
import Sidebar from './components/layout/Sidebar'
import CoursePage from './course-page/CoursePage'
import UserCourse from './user-course/UserCourse'
import { useDispatch } from 'react-redux'
import { setUser } from '../src/redux/slices/userSlice'

const Layout = ({ children, withSidebar }) => {
  const dispatch = useDispatch()
  const userData = localStorage.getItem('user')
  const user = JSON.parse(userData)
  dispatch(setUser(user))

  return (
    <main className='flex'>
      {withSidebar && (
        <div className='flex border-r shadow-xl max-w-xs   min-h-screen overflow-y-auto md:min-w-[20rem]'>
          <Sidebar />
        </div>
      )}
      <div className='flex-1 bg-[#f4f4f4]'>{children}</div>
    </main>
  )
}

const App = () => {
  return (
    <main className=''>
      <Routes>
        {/* <Route path="/" element={<Layout withSidebar>{<Home />}</Layout>} /> */}
        <Route
          path='/course/:id'
          element={<Layout withSidebar>{<CoursePage />}</Layout>}
        />
        <Route
          path='/course'
          element={<Layout withSidebar>{<UserCourse />}</Layout>}
        />
        <Route path='/' element={<Layout>{<Login />}</Layout>} />
        <Route path='/register' element={<Layout>{<Register />}</Layout>} />
      </Routes>
    </main>
  )
}

export default App
