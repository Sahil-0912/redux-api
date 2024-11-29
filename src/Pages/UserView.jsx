import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, viewUser } from '../Redux/UserSlice'
import { NavLink } from 'react-router-dom'
import { FaEye, FaTrash } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'

const UserView = () => {
  const { userList } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  /////// search value
  const [search, setSearch] = useState("")

  /// select city
  const [city,setCity]  = useState("")

  /// select sort 
  const [sortValue,setSort] = useState("")

  useEffect(() => {
    dispatch(viewUser())
  }, [dispatch])
  console.log(userList);

  function trash(id) {
    dispatch(deleteUser(id))
    alert("Delete...")
  }

  const selectCity = userList.map((user) => {
    return user.ucity
  })

  // unique city 
  const uniqueCity = new Set(selectCity);
  
  const filterData = userList
  .filter((user) => {
    const upperSearch = search.toUpperCase();
    const upperName = user.uname.toUpperCase();
    return upperName.includes(upperSearch)
  })
  .filter((user)=>{
    return user.ucity.includes(city)
  })
  .sort((a,b)=>{
    if(sortValue=='asc'){
      return a.uname.localeCompare(b.uname)
    }else if(sortValue=='dec'){
      return b.uname.localeCompare(a.uname)
    }
  })

  return (
    <div>
      <div className="table-responsive container my-5">
        <div className="row my-4">
          <div className="col-lg-4">
            <input type="text" onChange={(e) => setSearch(e.target.value)} className='form-control' placeholder='enter username' />
          </div>
          <div className="col-lg-4">
            <select className='form-control' onChange={(e)=>setCity(e.target.value)}>
              <option value="">select city</option>
              {
                [...uniqueCity].map((city) => {
                  return (
                    <option value={city}>{city}</option>
                  )
                })
              }
            </select>
          </div>
          <div className="col-lg-4">
            <select onChange={(e)=>setSort(e.target.value)} className='form-control'>
              <option value="">select sorting</option>
              <option value="asc">A-Z</option>
              <option value="dec">Z-A</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <table className="table table-hover table-stripped table-dark table-bordered">
          <thead className="table-success text-uppercase">
            <tr>
              <th>SRNO</th>
              <th>UserName</th>
              <th>UserEmail</th>
              <th>UserCity</th>
              <th>UserMobile</th>
              <th>UserAddress</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.uname}</td>
                <td>{user.uemail}</td>
                <td>{user.ucity}</td>
                <td>{user.umobile}</td>
                <td>{user.uaddress}</td>
                <td>
                  <NavLink to={`/singleuser/${user.id}`}>
                    <button className="btn btn-primary mx-2">
                      <FaEye />
                    </button>
                  </NavLink>
                  <NavLink to={`/updateuser/${user.id}`}>
                    <button className="btn btn-danger mx-2">
                      <MdModeEdit />
                    </button>
                  </NavLink>
                  <button
                    className="btn btn-warning mx-2"
                    onClick={() => trash(user.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default UserView
