import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()

    const [email,setEmail] = useState("")
    const [password,setPassword]= useState("")
    const [loading,setLoading]=useState(false)

    const handleLogin = async (e:React.FormEvent) => {
        e.preventDefault()
        if(!email || !password)
        {
            alert("Please enter email and password")
            return
        }

        try{
            setLoading(true)

            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`,{
                email,
                password
            })

            //  Save JWT Token

            localStorage.setItem("token",res.data.token)

            // Save user data

            localStorage.setItem("user",JSON.stringify(res.data.user))

            alert("Login Successfully")
            navigate("/")
        }catch(error:any){
        console.log(error);
        alert(
            error.response?.data?.message || "Login Failed"
        )
    }finally{
        setLoading(false)
    }
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Smart Inventory
                </h1>

                <h2 className="text-xl font-semibold mb-5 text-center">
                    Login
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className="w-full border rounded-lg p-3"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="w-full border rounded-lg p-3"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Logging in" : "Login"}
                    </button>
                </form>
            </div>
        </div>
    )
}


export default Login;