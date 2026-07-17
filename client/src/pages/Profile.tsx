import { useEffect, useState } from "react";
import axios from "axios";
import {FaUserCircle} from "react-icons/fa";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const Profile = () => {
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "import.meta.env.VITE_API_URL/api/users/profile"
      );

      setUser(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-xl mt-10">
        Loading...
      </div>
    );
  }

  return (
  <div className="max-w-3xl mx-auto">
    <div className="bg-white shadow-lg rounded-xl p-8">
  <div className="flex flex-col items-center">

    <FaUserCircle
      className="text-blue-600 mb-4"
      size={100}
    />

    <h2 className="text-3xl font-bold">
      {user.name || "No Name"}
    </h2>

    <p className="text-gray-500 mt-2">
      {user.email || "No Email"}
    </p>

    <span className="mt-4 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
      {user.role ? user.role.toUpperCase() : "N/A"}
    </span>

  </div>

  <div className="mt-8 border-t pt-6 space-y-4">

    <div className="flex justify-between">
      <span className="font-semibold">User ID</span>
      <span>{user.id}</span>
    </div>

    <div className="flex justify-between">
      <span className="font-semibold">Name</span>
      <span>{user.name}</span>
    </div>

    <div className="flex justify-between">
      <span className="font-semibold">Email</span>
      <span>{user.email}</span>
    </div>

    <div className="flex justify-between">
      <span className="font-semibold">Role</span>
      <span>{user.role}</span>
    </div>

  </div>
</div>
  </div>
);
};

export default Profile;