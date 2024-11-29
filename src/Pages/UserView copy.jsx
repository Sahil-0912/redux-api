import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, viewUser } from '../Redux/UserSlice'
import { NavLink } from 'react-router-dom'
import { FaEye, FaTrash } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'

const UserView = () => {
  const [search, setSearch] = useState("")
  const [selectcity, setSelectedCity] = useState("")
  const [selectsort, setSelectesort] = useState("")
  const { userList } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(viewUser())
  }, [dispatch])
  console.log(userList);

  function trash(id) {
    dispatch(deleteUser(id))
    alert("Delete...")
  }


  const cities = userList.map((users) => {
    return users.ucity
  })

  const uniqueCity = new Set(cities)
  console.log(uniqueCity);

  const finalCity = [...uniqueCity]


  const filterData = userList
    .filter((users) => {
      const serarched = search.toUpperCase()
      const username = users.uname.toUpperCase()
      return username.includes(serarched)
    })
    .filter((users) => {
      return users.ucity.includes(selectcity);
    })

    .sort((a, b) => {
      if (selectsort == "asc") {
        return a.uname.localeCompare(b.uname)
      } else if (selectsort == "desc") {
        return b.uname.localeCompare(a.uname)
      }
    })


  return (
    <div>
      <div className="table-responsive container my-5">
        <div className="row">
          <div className="col-lg-4 my-3">
            <input
              type="text"
              placeholder="Enter UserName"
              className="form-control"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-lg-4 my-3">
            <select
              className="form-select"
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">--Select your city--</option>
              {finalCity.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="col-lg-4 my-3">
            <select
              className="form-select"
              onChange={(e) => setSelectesort(e.target.value)}
            >
              <option value="">Select Sorting</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
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
