import { useReducer } from "react";
import Navbar from "./components/Navbar";
import { Navigate, useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  gender : "",
  country : "",
  password: "",
  privateKey: "",
};

const reduce = (state, action) => {
  if (action.type === "NAME") {
    return {
      ...state,
      name: action.value,
    };
  }
  if (action.type === "EMAIL") {
    return {
      ...state,
      email: action.value,
    };
  }
  if (action.type === "GENDER") {
    return {
      ...state,
      gender: action.value,
    };
  }
  if (action.type === "COUNTRY") {
    return {
      ...state,
      country : action.value,
    };
  }
  if (action.type === "PASSWORD") {
    return {
      ...state,
      password: action.value,
    };
  }
  if (action.type === "PRIVATEKEY") {
    return {
      ...state,
      privateKey: action.value,
    };
  }
};

const Signin = () => {
  const [state, dispatch] = useReducer(reduce, initialState);
  const navigate = useNavigate()

  const crossHandler = ()=>{
    const ele = document.querySelector(".prob");
    ele.classList.add("hidden")
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(state);

    try {
      const res = await fetch("/newuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userData: state }),
      });
      const { msg } = await res.json();
      console.log(msg)
      if (msg == "User Exist") {
        document.querySelector(".prob").classList.remove("hidden")
      }else if(msg == "Done"){
      navigate("/login")
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="main min-h-screen w-full bg-slate-300">
      <Navbar />
      <div className="content flex min-h-[90vh]">
        <div className="image h-[90vh] w-[40vw] bg-red-600">
          <img
            src="/images/signin.jpg"
            className="bg-cover h-screen w-[40vw]"
          />
        </div>  
        <div className="form h-screen bg-linear-to-tr to-rose-600 from-amber-600 w-[60vw]">
          <form
            onSubmit={submitHandler}
            className="flex flex-col justify-center items-center min-h-[90vh]"
          >
            <h1 className="text-4xl font-[ubuntu] text-slate-950">Sign In</h1>
            <input
              className="pl-2 pr-3 py-2 mt-5 bg-white rounded outline-none text-lg font-[ubuntu]"
              type="text"
              name="name"
              placeholder="Username"
              value={state.name}
              onChange={(e) => {
                dispatch({
                  type: "NAME",
                  value: e.target.value,
                });
              }}
              required
            />
            <p className="prob mt-5 text-lg text-red-600 px-4 py-1 bg-white rounded font-[roboto] hidden">
              Looks Like This Email Already Exist In Our Database.{" "}
              <btn onClick={crossHandler} className="font-[geom] cursor-pointer text-gray-700 hover:text-black pl-3">
                {" "}
                x
              </btn>
            </p>
            <input
              className="pl-2 pr-3 py-2 mt-5 bg-white rounded outline-none text-lg font-[ubuntu]"
              type="email"
              name="email"
              placeholder="Email"
              value={state.email}
              onChange={(e) => {
                dispatch({
                  type: "EMAIL",
                  value: e.target.value,
                });
              }}
              required
            />
            <input
              className="pl-2 pr-3 py-2 mt-5 bg-white rounded outline-none text-lg font-[ubuntu]"
              type="gender"
              name="gender"
              placeholder="Gender"
              value={state.gender}
              onChange={(e) => {
                dispatch({
                  type: "GENDER",
                  value: e.target.value,
                });
              }}
              required
            />
            <input
              className="pl-2 pr-3 py-2 mt-5 bg-white rounded outline-none text-lg font-[ubuntu]"
              type="country"
              name="country"
              placeholder="Country"
              value={state.country}
              onChange={(e) => {
                dispatch({
                  type: "COUNTRY",
                  value: e.target.value,
                });
              }}
              required
            />
            <input
              className="pl-2 pr-3 py-2 mt-5 bg-white rounded outline-none text-lg font-[ubuntu]"
              type="password"
              name="password"
              placeholder="Password"
              value={state.password}
              onChange={(e) => {
                dispatch({
                  type: "PASSWORD",
                  value: e.target.value,
                });
              }}
              required
            />
            <input
              className="pl-2 pr-3 py-2 mt-5 bg-white rounded outline-none text-lg font-[ubuntu]"
              type="password"
              name="privateKey"
              placeholder="Private Key"
              value={state.privateKey}
              onChange={(e) => {
                dispatch({
                  type: "PRIVATEKEY",
                  value: e.target.value,
                });
              }}
              required
            />
            <input
              className="pl-2 pr-3 py-2 mt-5 text-white font-medium bg-linear-to-tr to-amber-600 from-rose-600 rounded outline-none text-lg font-[geom]"
              type="submit"
              value={"Sign In"}
            />
            <p className="mt-5 text-xl font-[ubuntu]">Already User Login <btn onClick={()=>{navigate("/login")}} className="font-bold underline cursor-pointer">Here</btn>.</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
