import { useEffect, useReducer, useState } from "react";
import Navbar from "./components/Navbar";
import { PassGen } from "./passgen";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { MdOutlineContentCopy } from "react-icons/md";


const initialState = {
  platform : "",
  password : "",
}

const reduce = (state, action)=>{
  if(action.type == "PASSWORD"){
    return {
      ...state,
      password : action.value
    }
  }
  if(action.type == "PLATFORM"){
    return {
      ...state,
      platform : action.value
    }
  }
}

function Home() {
  const [state, dispatch] = useReducer(reduce, initialState)
  const [chars, setChars] = useState();
  const [numbers, setNumbers] = useState(true);
  const [sensi, setSensi] = useState(true);
  const [symb, setSymb] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setUser(await data.user);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUser();
  }, []);


  const numChanger = (e) => {
    const warn = document.querySelector(".warning");
    if (e.target.value < 10) {
      {
        warn.classList.remove("hidden");
      }
    } else {
      warn.classList.add("hidden");
      setChars(e.target.value);
    }
  };

  const tabHandler = (e) => {
    if (e.key == "Tab") {
      setChars(15);
      e.target.value = 15;
    }
  };
  let [shown, setShown] = useState(false);
  const [type, setType] = useState("password");

  const hideEvent = () => {
    if (!shown) {
      setShown(true);
      document.querySelector(".eyeSlash").classList.add("hidden");
      document.querySelector(".eye").classList.remove("hidden");
      setType("text");
    } else {
      setShown(false);
      setType("password");
      document.querySelector(".passContainer").setAttribute("type", "text");
      document.querySelector(".eyeSlash").classList.remove("hidden");
      document.querySelector(".eye").classList.add("hidden");
    }
  };

  const copyEvent = () => {
    let text = document.querySelector(".passContainer");
    text.select();
    text.setSelectionRange(0, 999999);
    navigator.clipboard.writeText(text.value);
  };

  const genHandler = () => {
    console.log(document.querySelector(".passContainer").value)
    let checkerObj = {
      num: numbers,
      alpha: true,
      symbol: symb,
      sensitivity: sensi,
    };
    const pass = PassGen(chars, checkerObj)
    document.querySelector(".passContainer").value = pass;
    dispatch({
      type: "PASSWORD",
      value : pass
    })
    setChars();
    console.log(document.querySelector(".passContainer").value)
  };

  const downloadHandler = ()=>{
    const fetchFile = async ()=>{
      try{
        const res = await fetch("/downloadFile", {
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          credentials : "include",
          body : JSON.stringify({DATA : state, userId : user.id})
        })
        const msg = await res.blob()
        const element = document.createElement('a');
        const file = new Blob([msg], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "data.kri";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        console.log(msg)

      }catch(e){
        console.log(e)
      }
    }
    fetchFile()
  }

  const uploadHandler = (e) => {
    console.log("file uploaded");

    // 1. Get the file
    const fileText = e.target.files[0];
    if (!fileText) return;

    const reader = new FileReader();

    
    reader.onload = async (event) => {
      const text = event.target.result;
      console.log("File content (Immediate):", text);

      try {
        const res = await fetch("/downloadFile", {
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          credentials : "include",
          
          body : JSON.stringify({ DATA : state, userId : user.id })
        })
        
        const msg = await res.text()
        
        const element = document.createElement('a');
        const file = new Blob([text+msg], {type: 'text/plain'});
        
        element.href = URL.createObjectURL(file);
        element.download = "data.kri";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        
      } catch(e) {
        console.log(e)
      }
    };

    // 4. Start the reading process
    reader.readAsText(fileText);
  }

  return (
    <div className="min-h-screen w-full bg-gray-200">
      <Navbar />
      <div className="config flex flex-col justify-center items-center p-50">
        <div className="warning px-6 py-2 text-white text-lg font-[geom] w-2/3 text-center rounded-xs bg-red-500 mb-10">
          Please Enter The Number Atleast Greater 10 for better Password
          Security.
        </div>
        <div className="chars">
          <input
            onKeyDown={(e) => {
              tabHandler(e);
            }}
            onChange={(e) => {
              numChanger(e);
            }}
            type="number"
            placeholder="Number of Character"
            className="w-150 px-2 py-3 outline-1 outline-rose-950 bg-rose-100 focus:outline-rose-700 focus:outline-2 rounded font-medium text-xl"
          />
          <p className="font-medium">
            *Recommended Characters Between 14 to 16.{" "}
            <span className="text-lg text-rose-700">
              (Hit Tab to auto-complete)
            </span>
          </p>
        </div>
        <div className="checkers justify-center items-start mt-8 w-150">
          <div className="check w-full flex justify-between mb-3 items-center mt-3 text-rose-900">
            <p className="text-xl mx-4 font-[ubuntu]">Numbers (123 ...) → </p>
            <input
              className="num size-10 accent-rose-800 text-rose-700 rounded-full"
              type="checkbox"
              defaultChecked="true"
              onClick={() => {
                document.querySelector(".num:checked") !== null
                  ? setNumbers(true)
                  : setNumbers(false);
              }}
            />
          </div>
          <hr className="text-rose-800" />
          <div className="check w-full flex justify-between mb-3 mt-3 text-rose-900 items-center">
            <p className="text-xl mx-4 font-[ubuntu]">Alphabets (abc ...) → </p>
            <input
              className="alphabets size-10 accent-rose-800 text-rose-700 rounded-full pointer-events-none"
              type="checkbox"
              defaultChecked={true}
            />
          </div>
          <hr className="text-rose-800" />
          <div className="check w-full flex justify-between mb-3 mt-3 text-rose-900 items-center">
            <p className="text-xl mx-4 font-[ubuntu]">
              Special Characters (!@# ...) →{" "}
            </p>
            <input
              className="symb size-10 accent-rose-800 text-rose-700 rounded-full"
              type="checkbox"
              defaultChecked="true"
              onClick={() => {
                document.querySelector(".symb:checked") !== null
                  ? setSymb(true)
                  : setSymb(false);
              }}
            />
          </div>
          <hr className="text-rose-800" />
          <div className="check w-full flex justify-between mb-3 mt-3 text-rose-900 items-center">
            <p className="text-xl mx-4 font-[ubuntu]">
              Case Independency (hJtB ...) →{" "}
            </p>
            <input
              className="case size-10 accent-rose-800 text-rose-700 rounded-full"
              type="checkbox"
              defaultChecked={true}
              onClick={() => {
                document.querySelector(".case:checked") !== null
                  ? setSensi(true)
                  : setSensi(false);
              }}
            />
          </div>
          <hr className="text-rose-800" />
        </div>
        <div className="pass flex flex-row justify-center items-center mt-5">
          <input
            type="submit"
            className="px-1.5 py-2 bg-rose-700 rounded text-white font-medium font-[geom]"
            value={"Generate Password"}
            onClick={genHandler}
          />
          <input
            type={type}
            className="passContainer selection:bg-rose-600 selection:text-white ml-3 font-[geom] font-medium bg-rose-300 py-2 outline-none rounded-bl rounded-tl text-gray-700 px-2"
            placeholder="Generated Password"
            value={state.password}
            onChange={(e)=>{
              dispatch({
                type : "PASSWORD",
                value : e.target.value
              })
            }}
            readOnly
          />
          <FaEyeSlash
            onClick={hideEvent}
            className="eyeSlash text-xl cursor-pointer bg-rose-300 h-10 p-2 w-10"
          />
          <FaEye
            onClick={hideEvent}
            className="eye text-xl cursor-pointer bg-rose-300 h-10 p-2 w-10 hidden"
          />
          <MdOutlineContentCopy
            onClick={copyEvent}
            className="text-xl cursor-pointer bg-rose-300 h-10 p-2 w-10 rounded-br rounded-tr"
          />
        </div>

        <input
          type="text"
          className="selection:bg-rose-600 selection:text-white mt-3 font-[geom] font-medium bg-rose-300 py-2 outline-none rounded-bl rounded-tl text-gray-700 px-2 w-90"
          placeholder="Enter Associated Platform URL or Name"
          value={state.platform}
          onChange={(e)=>{
            dispatch({
              type : "PLATFORM",
              value : e.target.value
            })
          }}
        />

        <div className="btns mt-6 flex flex-col justify-center items-center">
          <input type="file" onChange={(e)=>{uploadHandler(e)}} className="w-full text-sm text-grey-500
            file:mr-5 file:py-2 file:px-5 mt-5 file:rounded border px-1 py-0.5 rounded  file:text-md file:font-semibold  file:text-white file:bg-rose-600 hover:file:cursor-pointer hover:file:bg-rose-500" accept=".kri" />

          <input
            className="text-xl font-[geom] text-white mt-5 bg-rose-600 m-2 hover:bg-rose-500 px-3 py-2 rounded"
            type="submit"
            value={"Download a New File"}
            onClick={downloadHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
