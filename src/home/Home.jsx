/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import CourseData from '../components/course/CourseData'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase'
import { setUser } from '../../src/redux/slices/userSlice'

const Home = () => {
  const [courses, setCourses] = useState([])
  const [input, setInput] = useState('')
  const [currentUser] = useAuthState(auth)

  const getCourses = async () => {
    try {
      const courseCollection = collection(db, 'courses')

      const q = query(courseCollection, orderBy('name'))
      const response = await getDocs(q)

      const coursesData = []
      response.forEach((doc) => {
        coursesData.push(doc.data())
      })
      setCourses(coursesData)
      console.log(coursesData)
    } catch (err) {
      console.log('Error: ', err)
    }
  }

  useEffect(() => {
    getCourses()
  }, [])

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { course } = useSelector((state) => state)

  const userToken = localStorage.getItem('token')
  const userData = localStorage.getItem('user')

  const token = JSON.parse(userToken)
  const user = JSON.parse(userData)

  const fetchUserData = async () => {
    try {
      if (token) {
        dispatch(setUser(user))
      } else {
        console.log('No such document!')
        navigate('/login')
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      navigate('/login')
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <div className='max-w-[65rem] mt-10 mx-auto'>
      <div className='text-[#5932EA] text-3xl font-bold mb-10 px-10 md:px-0'>
        Courses
      </div>
      <div className=' flex justify-center items-center m-5 pr-12 pb-4'>
        <div className=' w-[30rem] md:w-[700px] relative px-5'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Search course...'
            className=' w-full  border border-black h-10 rounded-full placeholder:text-gray-400 text-gray-700 outline-none flex-1 bg-white pl-5'
          />
        </div>
      </div>
      <div className='px-10 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-10'>
        {courses.length > 0 ? (
          courses
            .filter((results) => {
              if (!input) {
                return true
              } else if (
                results.name?.toLowerCase().includes(input.toLowerCase()) ||
                results.instructor?.toLowerCase().includes(input.toLowerCase())
              ) {
                return true
              } else {
                return false
              }
            })
            .map((course) => <CourseData key={course.id} course={course} />)
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default Home
