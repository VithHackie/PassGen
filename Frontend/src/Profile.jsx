import { Link, useNavigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import { useEffect, useState } from "react"

const Profile = () => {
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  const [passwords, setPasswords] = useState([])


  useEffect(() => {

    const ele = document.querySelector(".profile")
    ele.classList.remove("active")
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user", { method: "GET", credentials: "include" })
        const data = await res.json()
        setUser(await data.user)
      }
      catch (e) {
        setUser({ username: "Not Logged In" })
        console.log(e)
      }
    }
    fetchUser()

  }, [])

  const logoutHandler = async ()=>{
    await fetch("/logout", {method : "POST"})
    await navigate("/")
  }

  const uploadHandler = (e) => {
    setPasswords([])
    const fileText = e.target.files[0];
    if (!fileText) return;

    const reader = new FileReader();


    reader.onload = async (event) => {
      const text = event.target.result;
      console.log(text);

      const passes = text.split("\n")
      passes.pop()
      passes.forEach(element => {
        console.log(element)
      });

      try{
        const res = await fetch("/uk", {
          method : "POST",
          credentials : "include",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({userId : user.id, passwords : passes})
        })
        const dPasses = await res.json()
        if(dPasses == "NotFound"){
          navigate("/login")
        }else{
          dPasses.forEach((e)=>{
            console.log(JSON.parse(e))
            setPasswords((prevArray) => [...prevArray, JSON.parse(e)])
          })
        }
      }catch(e){
        console.log(e)
      }
    };
    reader.readAsText(fileText);
  }
  

  return (
    <div className="content">
      <Navbar />
      <div className="req min-h-screen w-full items-center hidden">
        <Link to={"/login"} className="absolute top-[50%] left-[50%] text-5xl font-[geom] translate-x-[-50%] translate-y-[-50%] font-medium px-4 py-2 rounded bg-rose-200 text-rose-600">
          Please Log In First
        </Link>
      </div>
      <div className="content min-h-screen w-full flex flex-row">

        <div className="id h-screen w-[30vw] p-30 flex flex-col justify-center items-center shadow-2xl shadow-black">
          <img src="/images/avatar.png" className="h-70 w-70 rounded-full border" />
          <div className="details flex flex-col mt-5 px-10 w-full">
            <h1 className="text-4xl font-medium font-[geom]">{user.username}</h1>
            <h1 className="text-3xl font-[geom]">{
              (user.gender == "Male" ? "He / Him" : "") ||
              (user.gender == "Female" ? "She / Her" : "") ||
              (user.gender == "Other" ? "They / Them" : "")
            }</h1>

            <h1 className="text-3xl font-[geom]">From - {user.country}</h1>
            <h1 className="text-3xl font-light font-[geom]">{user.email}</h1>
            <div className="btns flex flex-row justify-around items-center mt-5">
              <button onClick={logoutHandler} className="px-3 py-2 rounded text-xl font-medium font-[ubuntu] bg-red-600 text-white">Log Out</button>
            </div>
          </div>
        </div>
        <div className="activity h-screen w-[70vw] p-30">
          <h1 className="text-4xl font-medium font-[ubuntu]">Your Activities</h1>
          <input type="file" onChange={(e) => { uploadHandler(e) }} className="w-full text-sm text-grey-500
            file:mr-5 file:py-2 file:px-5 mt-5 file:rounded border px-1 py-0.5 rounded  file:text-md file:font-semibold  file:text-white file:bg-rose-600 hover:file:cursor-pointer hover:file:bg-rose-500" accept=".kri" />
          <div>
            <div className="heading flex flex-row justify-around p-10">
              <h1 className="text-4xl font-[ubuntu] font-medium">Platform</h1>
              <h1 className="text-4xl font-[ubuntu] font-medium">Password</h1>
            </div>
            {passwords?.map((e)=>{
              return(
                <div className="pass flex flex-row justify-around p-10 items-center">
                <h1 className="text-3xl font-[ubuntu] font-light">{e?.platform}</h1>
                <h1 className="text-3xl font-[ubuntu] font-light">{e?.password}</h1>
              </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile