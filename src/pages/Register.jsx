import { Form } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import isAuthenticated from "../utils/Auth";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/authActions";

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const [user, setUser] = useState({
      firstName: "",
      lastName: "",  
      username: "",
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
      dispatch(register(user, navigate));
    }
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-cover bg-center p-4" style={{ backgroundImage: 'url(/login-bg.jpg)'}}>
      <div className="bg-transparent backdrop-blur-2xl w-full max-w-4xl p-4 sm:p-6 mx-auto flex flex-col md:flex-row rounded-2xl shadow-2xl">
        <div className="w-full md:w-1/2 space-y-4 text-center flex flex-col justify-center items-center p-4 md:p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100">Welcome to CHITCHAT!</h1>
          <p className="text-gray-200 text-base md:text-lg">
            Please Register to continue
          </p>
        </div>
        
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-center items-center">
          {error && <div className="text-red-500 mb-4 text-center w-full">{error}</div>}
          <Form className="flex flex-col justify-center items-center w-full max-w-sm">
            <div className="grid grid-cols-2 gap-4 w-full mb-4">
              <Input 
                className="bg-white w-full" 
                type="text" 
                name="firstName" 
                value={user.firstName} 
                onChange={handleChange} 
                placeholder="First Name" 
              />
              <Input 
                className="bg-white w-full" 
                type="text" 
                name="lastName" 
                value={user.lastName} 
                onChange={handleChange} 
                placeholder="Last Name" 
              />
            </div>
            <Input 
              className="mb-4 bg-white w-full" 
              type="text" 
              name="username" 
              value={user.username} 
              onChange={handleChange} 
              placeholder="Username" 
            />
            <Input 
              className="mb-4 bg-white w-full" 
              type="email" 
              name="email" 
              value={user.email} 
              onChange={handleChange} 
              placeholder="Email" 
            />
            <Input 
              className="mb-4 bg-white w-full" 
              type="password" 
              name="password" 
              value={user.password} 
              onChange={handleChange} 
              placeholder="Password" 
            />
            <Button 
              className="w-full" 
              type="submit" 
              onClick={handleSubmit}
            >
              {loading ? "Loading..." : "Register"}
            </Button>
            <p className="text-gray-200 text-center text-sm mt-4">
              Already have an account?{" "}
              <a 
                className="underline font-semibold text-gray-100 hover:text-blue-100" 
                href="/login"
              >
                Login
              </a>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}
