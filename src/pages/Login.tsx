import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

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

<div className="min-h-screen w-full bg-[#f5f5f7] flex items-center justify-center px-4 py-8">
  <form
    onSubmit={handleLogin}
    className="w-full max-w-md rounded-2xl border border-gray-200/80 bg-white p-6 
    sm:p-9 shadow-[0_8px_40px_rgba(0,0,0,0.06)] flex flex-col gap-5"
  >
    <div className="flex justify-center">
      <img
        src="/logo.png"
        alt="CareerTracker logo"
        className="h-16 w-16 object-contain cursor-pointer"
        onClick={()=>navigate('/')}
      />
    </div>

    <div className="text-center space-y-2">
      <h1 className="text-3xl font-bold tracking-tight text-[#1d1d1f]">
        Welcome back
      </h1>
      <p className="text-sm leading-6 text-[#6e6e73]">
        Sign in to continue your job search journey.
      </p>
    </div>

    <div className="space-y-2">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-[#1d1d1f]"
      >
        Email address
      </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="you@example.com"
        autoComplete="email"
        required
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm 
        text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#0071e3] 
        focus:ring-4 focus:ring-blue-100"
      />
    </div>

    <div className="space-y-2">
      <label
        htmlFor="password"
        className="block text-sm font-medium text-[#1d1d1f]"
      >
        Password
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-12 
          text-sm text-gray-900 placeholder:text-gray-400 outline-none transition 
          focus:border-[#0071e3] focus:ring-4 focus:ring-blue-100"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 
          text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
        </button>
      </div>
    </div>

    <div className="flex justify-end -mt-2">
      <button
        type="button"
        onClick={() => navigate("/password/change")}
        className="text-sm font-medium text-[#0071e3] transition 
        hover:text-[#005bb5] hover:underline"
      >
        Forgot password?
      </button>
    </div>

    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-xl bg-[#0071e3] px-4 py-3 text-sm font-semibold 
      text-white shadow-sm transition hover:bg-[#0077ed] active:scale-[0.99] 
      disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Signing in..." : "Sign In"}
    </button>

    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-gray-200" />
      <span className="text-xs text-gray-400">OR</span>
      <div className="h-px flex-1 bg-gray-200" />
    </div>

    <p className="text-center text-sm text-[#6e6e73]">
      Don't have an account?{" "}
      <button
        type="button"
        onClick={() => navigate("/register")}
        className="font-semibold text-[#0071e3] transition 
        hover:text-[#005bb5] hover:underline"
      >
        Sign up
      </button>
    </p>
  </form>
</div>

  )
}

export default Login