/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { addCourse } from '../redux/slices/courseSlice'

export const useUserCourses = () => {
  const { user } = useSelector((state) => state.user)
  const userId = user.uid

  // const user = localStorage.getItem("userId");
  // const userId = JSON.parse(user)
  const [userCourses, setUserCourses] = useState([])
  const dispatch = useDispatch()

  const getUserCourses = async () => {
    try {
      const userDocRef = doc(db, 'users', userId)
      const userCourse = await getDoc(userDocRef)

      const data = userCourse.data().courses
      const coursesData = []
      await Promise.all(
        data.map(async (courseId) => {
          const courseDocRef = doc(db, 'courses', courseId)
          const courseSnapshot = await getDoc(courseDocRef)
          if (courseSnapshot.exists()) {
            coursesData.push(courseSnapshot.data())
          }
        })
      )
      setUserCourses(coursesData)
      dispatch(addCourse({ course: coursesData }))
    } catch (err) {
      console.log('Error fetching user courses:', err)
    }
  }

  useEffect(() => {
    getUserCourses()
  }, [])

  return userCourses
}
