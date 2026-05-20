import { useReducer } from "react";
import Navbar from "./components/Navbar";
import { MdPassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const initialState ={
  email : "",
  password : ""
}

const reduce = (state, action)=>{
  if(action.type == "EMAIL"){
    return {...state,
      email : action.value}
  }
  if(action.type == "PASSWORD"){
    return{
      ...state,
      password : action.value
    }
  }
}

const Login = () => {

  const navigate = useNavigate()
  
  const submitHandler = async (e)=>{
    e.preventDefault();
    console.log(state)
    try{
      const res = await fetch("/enterin", {
        method : "POST",
        headers : {
          "Content-type" : "application/json"
        },
        body : JSON.stringify(state)
      });
      const {msg} = await res.json();
      console.log(msg)
      if(msg == "Incorrect Password"){
        document.querySelector(".warning1").classList.remove("hidden")
      }else if(msg == "Not Registered"){
        document.querySelector(".warning2").classList.remove("hidden")
      }else if(msg.id){
        console.log(msg.username)
        navigate("/home")
      }

    }catch(e){
      console.error(e)
    }
  }

  const [state, dispatch] = useReducer(reduce, initialState)
  return (
    <div>
      <Navbar />
      <div className="content min-h-screen w-full flex">
        <div className="img h-screen w-[40vw]">
          <img src="/images/signin.jpg" className="h-screen w-[40vw]" alt="" />
        </div>
        <div className="form h-screen w-[60vw] flex flex-col justify-center items-center bg-linear-to-tr to-rose-600 from-amber-600">
          <form onSubmit={submitHandler} className="h-[90vh] w-[60vw] flex flex-col justify-center items-center">
            <h1 className="text-4xl font-[ubuntu] text-slate-950">Log In</h1>
            <p className="warning1 hidden mt-5 text-xl font-[geom] text-red-600 px-5 py-1 bg-white rounded border border-red-700">Seems Like The Email or Password is Incorrect.</p>
            <p className="warning2 hidden mt-5 text-xl font-[geom] text-red-600 px-5 py-1 bg-white rounded border border-red-700">User does not exist please Register yourself first.</p>
            <input
              className="pl-2 pr-3 py-2 mt-5 bg-white rounded outline-none text-lg font-[ubuntu]"
              type="email"
              name="email"
              placeholder="Email"
              value={state.email}
              onChange={(e)=>{
                dispatch({
                  type : "EMAIL",
                  value : e.target.value
                })
              }}
            />
            <input
              className="pl-2 pr-3 py-2 mt-5 bg-white rounded outline-none text-lg font-[ubuntu]"
              type="password"
              name="password"
              placeholder="Password"
              value={state.password}
              onChange={(e)=>{
                dispatch({
                  type : "PASSWORD",
                  value : e.target.value
                })
              }}
            />
            <input
              className="pl-2 pr-3 py-2 mt-5 text-white font-medium bg-linear-to-tr to-amber-600 from-rose-600 rounded outline-none text-lg font-[geom]"
              type="submit"
              value={"Log In"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
