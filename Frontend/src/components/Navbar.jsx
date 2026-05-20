import { NavLink } from "react-router-dom";
import { TbFaceId } from "react-icons/tb";
import { useState, useEffect } from "react";

const Navbar = () => {

  const [user, setUser] = useState({})


  useEffect(()=>{
      
    const ele = document.querySelector(".profile")
    ele.classList.remove("active")
      const fetchUser = async ()=>{
        try{
          const res = await fetch("/api/user", {method : "GET", credentials : "include"})
          const data = await res.json()
          setUser(await data.user)
        }
        catch(e){
          setUser({username : "Not Logged In"})
          console.log(e)
        }
      }
      fetchUser()
    }, [])

  return (
    <div className="h-25 w-full flex flex-row bg-white justify-between items-center shadow-2xl fixed">
      <div className="img flex justify-center items-center gap-0">
        <img
          src="/images/logo.PNG"
          height={50}
          width={100}
          className="m-10"
          alt=""
          />
          <p className="text-2xl text-rose-900 font-[oswald]">Never Forget Your Passwords Now !</p>
      </div>
      <div className="links flex relative right-10">
        <NavLink
          className="px-3 mx-3 text-2xl text-black font-light rounded hover:bg-rose-200 decoration-1 flex items-center justify-center hover:underline"
          to={"/home"}
        >
          <span
            className={(isActive) => {
              isActive ? "active" : "inactive";
            }}
          >
            Home
          </span>
        </NavLink>
        <NavLink
          className="px-3 mx-3 text-2xl text-black font-light rounded hover:bg-rose-200 decoration-1 flex items-center justify-center hover:underline"
          to={"/hashes"}
        >
          <span
            className={(isActive) => {
              isActive ? "active" : "inactive";
            }}
          >
            Hashes
          </span>
        </NavLink>
        <NavLink
          className="px-3 mx-3 text-2xl text-black font-light rounded hover:bg-rose-200 decoration-1 flex items-center justify-center hover:underline"
          to={"/contact"}
        >
          <span
            className={(isActive) => {
              isActive ? "active" : "inactive";
            }}
          >
            Contact Me!
          </span>
        </NavLink>
        <NavLink to={"/profile"} className="profile flex flex-col items-center justify-center bg-white rounded">
              {/* <TbFaceId className="size-8 bg-slate-200 p-1 rounded-full shadow-2xl "/> */}
              <img src="/images/avatar.png" className="size-10 bg-slate-200 rounded-full shadow-2xl" />
              <p className="text-xm font-[geom] hover:underline">{user.username}</p>

        </NavLink>
      </div>
    </div>
  );
};


export default Navbar;
