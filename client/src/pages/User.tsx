import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <div className="mx-auto w-full  px-3 sm:px-5 lg:px-8">

    <h1 className="mb-6 text-2xl sm:text-3xl font-bold text-gray-800">
      User Management
    </h1>


    <div className="
      rounded-xl 
      bg-white 
      p-4 sm:p-6 
      shadow-md
    ">


      <div className="overflow-x-auto">

        <table className="
          min-w-full
          border-collapse
          text-sm sm:text-base
        ">

          <thead className="bg-gray-100">

            <tr>

              <th className="
                border 
                px-3 sm:px-4 
                py-3 
                text-left
              ">
                #
              </th>


              <th className="
                border 
                px-3 sm:px-4 
                py-3 
                text-left
              ">
                Name
              </th>


              <th className="
                border 
                px-3 sm:px-4 
                py-3 
                text-left
              ">
                Email
              </th>


              <th className="
                border 
                px-3 sm:px-4 
                py-3 
                text-left
              ">
                Role
              </th>

            </tr>

          </thead>



          <tbody>

          {users.length === 0 ? (

            <tr>

              <td
                colSpan={4}
                className="
                  border 
                  py-6 
                  text-center 
                  text-gray-500
                "
              >
                No Users Found
              </td>

            </tr>


          ) : (


            users.map((user,index)=>(

              <tr 
                key={user.id}
                className="hover:bg-gray-50"
              >

                <td className="
                  border 
                  px-3 sm:px-4 
                  py-3
                ">
                  {index+1}
                </td>


                <td className="
                  border 
                  px-3 sm:px-4 
                  py-3
                  font-medium
                  whitespace-nowrap
                ">
                  {user.name}
                </td>


                <td className="
                  border 
                  px-3 sm:px-4 
                  py-3
                  whitespace-nowrap
                ">
                  {user.email}
                </td>


                <td className="
                  border 
                  px-3 sm:px-4 
                  py-3
                ">
                  <span className="
                    rounded-full
                    bg-blue-100
                    px-3
                    py-1
                    text-sm
                    font-medium
                    text-blue-700
                  ">
                    {user.role}
                  </span>
                </td>


              </tr>

            ))

          )}

          </tbody>


        </table>


      </div>


    </div>


  </div>
);
};

export default Users;