/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useSelector } from 'react-redux'

const CourseData = ({ course }) => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  const userId = user.uid

  // const user = localStorage.getItem("userId");
  // const userId = JSON.parse(user)

  const [likes, setLikes] = useState(0)

  const handleClick = async () => {
    console.log({ course })
    const courseRef = doc(db, 'courses', course.id)
    const courseSnapshot = await getDoc(courseRef)
    const courseData = courseSnapshot.data()

    if (!courseData.likes.includes(userId)) {
      const updatedLikes = [...courseData.likes, userId]
      await updateDoc(courseRef, { likes: updatedLikes })
      setLikes(updatedLikes.length)
    } else {
      const updatedLikes = courseData.likes.filter((uid) => uid !== userId)
      await updateDoc(courseRef, { likes: updatedLikes })
      setLikes(updatedLikes.length)
    }
    window.location.reload()
    //Store the likes in localstorage before logging out and then retrive it while logging in using redux
  }

  return (
    <div className=''>
      <Card className='w-full max-w-md rounded-xl bg-[#fff]'>
        <img
          alt='Card Image'
          className='object-cover rounded-t-xl'
          src={course.thumbnail}
        />
        <CardContent className='p-4 space-y-4'>
          <CardTitle className='text-2xl font-bold text-black'>
            {course.name.slice(0, 20)}...
          </CardTitle>
          <p className='text-gray-500 dark:text-gray-400'>
            {course.description.slice(0, 50)}...
          </p>
          <div className='flex justify-center items-center gap-x-2'>
            <button
              onClick={() => navigate(`/course/${course.id}`)}
              className='w-full rounded-lg p-2 bg-[#5932EA] text-[#fff]'
            >
              View Course
            </button>
            <div className='flex justify-center items-center gap-x-2'>
              <FaHeart
                className={`h-10 w-10 border rounded-lg p-2 shadow-lg hover:cursor-pointer ${
                  Array.isArray(course.likes) && course.likes.includes(userId)
                    ? 'text-red-500'
                    : ''
                }`}
                onClick={handleClick}
              />
              <span>{course.likes.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CourseData
