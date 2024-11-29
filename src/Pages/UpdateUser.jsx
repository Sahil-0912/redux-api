import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { edituser } from '../Redux/UserSlice'
const UpdateUser = () => {
  const { userList } = useSelector((state) => state.users)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const single_user = userList.find((user) => {
      return user.id == id
    })
    reset(single_user)
  },[])

  function regist(data) {
    // console.log(data);
    dispatch(edituser(data))
    navigate('/viewuser')
    alert("updated....")
  }
  return (
    <div>
      <form action='' method='post' onSubmit={handleSubmit(regist)} className='col-6 mx-auto my-5 p-5 shadow'>
        <div className="my-3">
          <label>UserName:</label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter The Name'
            {...register('uname', {
              required: {
                value: true,
                message: 'Enter user name'
              }
            })}
          />
          <p className='text-danger'>{errors?.uname?.message}</p>
        </div>

        <div className="my-3">
          <label>Email:</label>
          <input
            type='email'
            className='form-control'
            placeholder='Enter the Email'
            {...register('uemail', {
              required: {
                value: true,
                message: 'Enter Email'
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email"
              }
            })}
          />
          <p className='text-danger'>{errors?.uemail?.message}</p>
        </div>

        <div className="my-3">
          <label>Mobile:</label>
          <input
            type='number'
            className='form-control'
            placeholder='Enter the Mobile'
            {...register('umobile', {
              required: {
                value: true,
                message: "Enter mobile number"
              },
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit mobile number"
              }
            })}
          />
          <p className='text-danger'>{errors?.umobile?.message}</p>
        </div>

        <div className="my-3">
          <label>Address:</label>
          <textarea
            className='form-control'
            placeholder='Enter the Address'
            {...register('uaddress', {
              required: {
                value: true,
                message: "Enter address"
              }
            })}
          />
          <p className='text-danger'>{errors?.uaddress?.message}</p>
        </div>

        <div className="my-3">
          <label>Gender :</label> <br />
          <input type="radio" {...register('ugender', { required: "Please select your gender" })} value="Male" /> Male
          <input type="radio" {...register('ugender', { required: "Please select your gender" })} value="Female" className="mx-2" /> Female
          <input type="radio" {...register('ugender', { required: "Please select your gender" })} value="Other" className="mx-2" /> Other
          <p>{errors?.ugender?.message}</p>
        </div>

        <div className="my-3">
          <label>Hobby :</label> <br />
          <input type="checkbox" {...register('uhobby', { required: "Please select at least one hobby" })} value="Cricket" /> Cricket
          <input type="checkbox" {...register('uhobby', { required: "Please select at least one hobby" })} value="Football" className="mx-2" /> Football
          <input type="checkbox" {...register('uhobby', { required: "Please select at least one hobby" })} value="Basketball" className="mx-2" /> Basketball
          <p className='text-danger'>{errors?.uhobby?.message}</p>
        </div>
        <div className="my-3">
          <button className='btn btn-success'>Update</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateUser
