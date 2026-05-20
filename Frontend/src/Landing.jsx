import Navbar from "./components/Navbar";
import { useCallback, useEffect, useState } from "react";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-particles";
import { NavLink, useNavigate } from "react-router-dom";

const Landing = () => {

  const [user, setUser] = useState({})
  const navigate = useNavigate();

  useEffect(()=>{
      const fetchUser = async ()=>{
        try{
          const res = await fetch("/api/user", {method : "GET", credentials : "include"})
          const data = await res.json()
          setUser(await data.user)
          
        }
        catch(e){
          console.log(e)
        }
      }
      fetchUser()
    }, [])

    

  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log(container);
  }, []);

  return (
    <div>
      <Navbar />
      {/* <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: { enable: true, zIndex: 0 },
          particles: {
            number: { value: 40 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 3 },
            move: { enable: true, speed: 2 },
            interact: { enable: true, modes: { grab: { distance: 200 } } },
          },
          interactivity: {
            detectsOn: "window",
            events: { onHover: { enable: true, mode: "grab" } },
          },
        }}
      /> */}
      <div className="heading flex flex-col pt-40 px-30 min-h-screen w-full bg-linear-to-t from-slate-800 to-rose-700 text-white select-none">
        <p className="text-6xl font-[geom]">
          Your Personalised{" "}
          <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-pink-200">
            <span className="relative text-rose-950">Password Management</span>
          </span>{" "}
          System.
        </p>
        <div className="btns w-[80%] flex justify-end items-center">
          <NavLink
            to={"/signin"}
            className="mx-5 decoration-1 mt-10 text-2xl px-6 underline font-bold py-2 rounded text-rose-600 bg-white hover:bg-rose-500 hover:text-white"
          >
            Sign In
          </NavLink>
          <NavLink
            to={"/login"}
            className="mx-5 decoration-1 mt-10 text-2xl px-6 underline font-bold py-2 rounded text-rose-600 bg-white hover:bg-rose-500 hover:text-white"
          >
            Log In
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Landing;
