import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { singleUser } from '../Redux/UserSlice'

const SingleUser = () => {
  const { userList } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(singleUser(id))
  }, [dispatch, id])
  console.log(userList);


  return (
    <div>
      <div className="col-6 mx-auto my-5 p-5 shadow">
        <ul>
          <li>Name: {userList.uname}</li>
          <li>Email: {userList.uemail}</li>
          <li>Mobile: {userList.umobile}</li>
          <li>Address: {userList.uaddress}</li>
          <li>Gender: {userList.ugender}</li>
          <li>Hobby: {userList.uhobby}</li>
        </ul>
      </div>

    </div>
  )
}

export default SingleUser
