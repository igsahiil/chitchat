import { Form } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authActions";
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import isAuthenticated from "../utils/Auth";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  },[navigate])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
      }
    ))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(user,navigate));
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-cover bg-center p-4" style={{ backgroundImage: 'url(/login-bg.jpg)'}}>
      <div className="bg-transparent backdrop-blur-2xl w-full max-w-4xl p-4 sm:p-6 mx-auto flex flex-col md:flex-row rounded-2xl shadow-2xl">
        <div className="w-full md:w-1/2 space-y-4 text-center flex flex-col justify-center items-center p-4 md:p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100">Welcome to CHITCHAT!</h1>
          <p className="text-gray-200 text-base md:text-lg">
            Please login to continue
          </p>
        </div>
        
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-center items-center">
          {error && <div className="text-red-500 mb-4 text-center w-full">{error}</div>}
          <Form className="flex flex-col justify-center items-center w-full max-w-sm">
            <Input 
              className="mb-4 bg-white w-full" 
              type="email" 
              placeholder="Email" 
              name="email" 
              value={user.email} 
              onChange={handleChange} 
            />
            <Input 
              className="mb-4 bg-white w-full" 
              type="password" 
              placeholder="Password" 
              name="password" 
              value={user.password} 
              onChange={handleChange} 
            />
            <Button 
              className="w-full cursor-pointer" 
              onClick={handleSubmit}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
            <p className="text-gray-200 text-center text-sm mt-4">
              Don&apos;t have an account?{" "}
              <a 
                className="underline font-semibold text-gray-100 hover:text-blue-100" 
                href="/register"
              >
                Sign up
              </a>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}
