import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";

import { LoginAPI } from "../api/auth";
import { getErrorMessage } from "../components/ErrorCatcher";
import Loading from "../components/LoadingPage";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleLogin = async(
    e: React.FormEvent<HTMLFormElement>
  )=>{
    e.preventDefault();
  
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email')?.toString() ?? ""
    const password = formData.get('password')?.toString() ?? ""
    
    try {
      setLoading(true)
      const response = await LoginAPI({email : email,password : password});

      localStorage.setItem('access', response.data.access)
      localStorage.setItem('refresh', response.data.refresh)
      localStorage.setItem('name', response.data.profile.full_name)

      toast.success(
        response.message || "Logined Sucessfully !"
      )
      navigate('/home')
    }catch(error){
      toast.error(getErrorMessage(error))
    }finally{
      setLoading(false)
    }
  }

  if (loading) return <  Loading />

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#f5f5f7]">
      <form 
        className="w-md bg-[#fff] p-5 rounded-md flex flex-col gap-4 shadow"
        onSubmit={handleLogin}
      >
        <div className="w-full flex justify-center">
          <img src="./logo.png" alt="" className="w-20 h-20 relative"/>
        </div>
        <p className="text-[#1d1d1f] text-center font-extrabold text-2xl">
          Sign in
        </p>

        <p className="text-[#6E6E73] text-center">
          Sign in to continue to your account.
        </p>

        <input type="email" name="email" id=""  placeholder="Email Address" 
          className="px-2 py-3 border-1 border-gray-300 rounded-xl outline-none focus:border-blue-500"
        />
            
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            className="w-full px-3 py-3 pr-11 border border-gray-300 rounded-xl 
            outline-none focus:border-blue-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button 
          className="bg-[#0071E3] px-2 py-3 text-white rounded-md hover:bg-[#0071ff] 
            disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          Sign In
        </button>

        <p 
          className="text-[#0071E3] text-center hover:underline cursor-pointer"
          onClick={()=>navigate('/password/change')}
        >
          Forgot password?
        </p>

        <hr className="border border-gray-300"/>

        <p className="text-center mb-5">
          Don't have an account? <span className="text-[#0071E3] cursor-pointer hover:underline" onClick={()=>navigate('/register')}>Sign Up</span>
        </p>

      </form>
    </div>
  )
}

export default Login