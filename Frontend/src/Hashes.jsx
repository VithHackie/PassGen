import Navbar from "./components/Navbar"
import { hashGenerator } from "./hashgen"
import { MdOutlineContentCopy } from "react-icons/md";



const Hashes = () => {


    const clickHandler = async () => {
        const text = document.querySelector(".userText")
        if (/^\s*$/.test(text.value)) {
            alert("Please Enter Some Value first...")
        } else {
            const allHashes = await hashGenerator(text.value)
            allHashes.forEach((e) => {
                document.querySelector("." + Object.keys(e)[0]).value = Object.values(e)[0]
            })
        }
    }

    const copyHandler = (className)=>{
        let text = document.querySelector(className);
        text.select();
        text.setSelectionRange(0, 999999);
        navigator.clipboard.writeText(text.value);
    }



    return (
        <div className="min-h-screen w-full">
            <Navbar />
            <div className="container min-w-screen p-30 flex flex-col items-center">
                <div className="mainInput">
                    <textarea className="userText px-4 py-3 w-200 h-50 wrap font-[ubuntu] bg-rose-100 rounded resize-none focus:outline-2 focus:outline-rose-500 outline-l-none focus:border-none" type="text" placeholder="Enter Your Text Which You Want to Hash..." />
                </div>
                <div className="btns px-3 py-2 bg-linear-to-t to-rose-600 from-rose-900 text-lg font-medium text-white rounded hover:bg-rose-600">
                    <button onClick={clickHandler}>Calculate Hash</button>
                </div>
            </div>
            <div className="hashes flex flex-row flex-wrap gap-3 justify-center items-center p-5 h-[90vh] w-full mb-20">
                <div className="hash w-80 h-100 bg-rose-200 flex flex-col items-center p-1 rounded">
                    <h1 className="font-[geom] text-xl">SHA</h1>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-lg">
                        <p>SHA512 - </p>
                        <input type="text" className="sha512 outline-1 w-43 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".sha512")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />

                    </div>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-lg">
                        <p>SHA384 - </p>
                        <input type="text" className="sha384 outline-1 w-43 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".sha384")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />

                    </div>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-lg">
                        <p>SHA256 - </p>
                        <input type="text" className="sha256 outline-1 w-43 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".sha256")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />

                    </div>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-lg">
                        <p>SHA224 - </p>
                        <input type="text" className="sha224 outline-1 w-43 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".sha224")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />

                    </div>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-lg">
                        <p>SHA3 - </p>
                        <input type="text" className="sha3 outline-1 w-43 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".sha3")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />

                    </div>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-lg">
                        <p>SHA1 - </p>
                        <input type="text" className="sha1 outline-1 w-43 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".sha1")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />

                    </div>
                </div>
                <div className="hash w-80 h-100 bg-rose-200 flex flex-col items-center p-1">
                    <h1 className="font-[geom] text-xl">MD</h1>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-lg">
                        <p>MD5 - </p>
                        <input type="text" className="md5 outline-1 w-43 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".md5")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />
                    </div>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-lg">
                        <p>MD4 - </p>
                        <input type="text" className="md4 outline-1 w-43 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".md4")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />
                    </div>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-sm">
                        <p>RIPEMD160 - </p>
                        <input type="text" className="ripemd outline-1 w-43 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".ripemd")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />
                    </div>
                </div>
                <div className="hash w-80 h-100 bg-rose-200 flex flex-col items-center p-1">
                    <h1 className="font-[geom] text-xl">ADLER</h1>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-lg">
                        <p>ADLER32 - </p>
                        <input type="text" className="adler32 outline-1 w-40 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".adler32")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />
                    </div>
                </div>
                <div className="hash w-80 h-100 bg-rose-200 flex flex-col items-center p-1">
                    <h1 className="font-[geom] text-xl">BLAKE</h1>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-lg">
                        <p>BLAKE2B - </p>
                        <input type="text" className="blake2b outline-1 w-40 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".blake3b")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />
                    </div>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-lg">
                        <p>BLAKE2S - </p>
                        <input type="text" className="blake2s outline-1 w-40 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".blake2s")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />
                    </div>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-lg">
                        <p>BLAKE3 - </p>
                        <input type="text" className="blake3 outline-1 w-40 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".blake3")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />
                    </div>
                </div>
                <div className="hash w-80 h-100 bg-rose-200 flex flex-col items-center p-1">
                    <h1 className="font-[geom] text-xl">CRC</h1>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-lg">
                        <p>CRC32 - </p>
                        <input type="text" className="crc32 outline-1 w-40 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".crc32")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />
                    </div>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-lg">
                        <p>CRC64 - </p>
                        <input type="text" className="crc64 outline-1 w-40 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".crc64")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />
                    </div>
                </div>
                <div className="hash w-80 h-100 bg-rose-200 flex flex-col items-center p-1">
                    <h1 className="font-[geom] text-xl">KECCAK</h1>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-lg">
                        <p>KECCAK512 - </p>
                        <input type="text" className="keccak512 outline-1 w-33 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".keccak512")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />
                    </div>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-lg">
                        <p>KECCAK384 - </p>
                        <input type="text" className="keccak384 outline-1 w-33 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".keccak384")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />
                    </div>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-lg">
                        <p>KECCAK256 - </p>
                        <input type="text" className="keccak256 outline-1 w-33 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".keccak256")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />
                    </div>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-lg">
                        <p>KECCAK224 - </p>
                        <input type="text" className="keccak224 outline-1 w-33 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".keccak224")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />
                    </div>
                </div>
                <div className="hash w-80 h-100 bg-rose-200 flex flex-col items-center p-1">
                    <h1 className="font-[geom] text-xl">SM</h1>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-lg">
                        <p>SM3 - </p>
                        <input type="text" className="sm3 outline-1 w-40 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".sm3")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />
                    </div>
                </div>
                <div className="hash w-80 h-100 bg-rose-200 flex flex-col items-center p-1">
                    <h1 className="font-[geom] text-xl">WHIRLPOOL</h1>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-base">
                        <p>WHIRLPOOL - </p>
                        <input type="text" className="whirlpool outline-1 w-37 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".whirlpool")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />
                    </div>
                </div>
                <div className="hash w-80 h-100 bg-rose-200 flex flex-col items-center p-1">
                    <h1 className="font-[geom] text-xl">XXHASH</h1>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-sm">
                        <p>XXHASH128 - </p>
                        <input type="text" className="xxhash128 outline-1 w-40 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".xxhash128")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />
                    </div>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-sm">
                        <p>XXHASH64 - </p>
                        <input type="text" className="xxhash64 outline-1 w-40 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".xxhash64")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />
                    </div>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-sm">
                        <p>XXHASH32 - </p>
                        <input type="text" className="xxhash32 outline-1 w-40 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".xxhash32")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />
                    </div>
                    <div className="hashbit flex flex-row items-center justify-end w-full px-0.5 mt-5 gap-2 font-[geom] text-sm">
                        <p>XXHASH3 - </p>
                        <input type="text" className="xxhash3 outline-1 w-40 focus:outline-rose-900 text-rose-900 px-1 py-1" readOnly />
                        <MdOutlineContentCopy onClick={()=>{copyHandler(".xxhash3")}} className="outline-1 outline-rose-900 w-9 h-9 p-1 text-white bg-rose-900 rounded hover:bg-rose-700" />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Hashes