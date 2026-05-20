import { Link } from "react-router-dom"
import Navbar from "./components/Navbar"
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IoMail } from "react-icons/io5";


const Contact = () => {

    return (
        <div className="min-h-screen w-full">
            <Navbar />
            <div className="content flex flex-row">
                
                <div className="c2 min-h-screen w-[50vw] bg- flex items-center justify-center flex-col bg-[url()]">
                    <img
                        src="/images/signin.jpg"
                        className="bg-cover h-screen w-[50vw]"
                    />
                </div>
                <div className="c1 min-h-screen w-[50vw] bg-rose-300 flex justify-center items-start flex-col px-80">
                    <div className="github flex justify-center items-center text-4xl mt-4 font-[ubuntu] text-rose-950 hover:text-rose-700">
                        <SiGithub />
                        <Link to={"https://github.com/VithHackie"} target="blank">Github</Link>
                    </div>
                    <div className="linkedin flex justify-center items-center text-4xl mt-4 font-[ubuntu] text-rose-950 hover:text-rose-700">
                        <FaLinkedin />
                        <Link to={"https://www.linkedin.com/in/krish-verma-384234271/"} target="blank">Linked-in</Link>
                    </div>
                    <div className="insta flex justify-center items-center text-4xl mt-4 font-[ubuntu] text-rose-950 hover:text-rose-700">
                        <RiInstagramFill />
                        <Link to={"https://www.instagram.com/_krish_verrma/"} target="blank">Instagram</Link>
                    </div>
                    <div className="mail flex justify-center items-center text-4xl mt-4 font-[ubuntu] text-rose-950 hover:text-rose-700">
                        <IoMail />
                        <Link to={"#"} target="blank" onClick={(e) => {
                            window.location.href = "mailto:krish3verma571@gmail.com"
                            e.preventDefault()
                        }}>Write me a Mail..</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact