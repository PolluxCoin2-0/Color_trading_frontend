import Timer from "../components/Timer";
import Navbar from "../layout/Navbar";
import yellowPoxImg from "../assets/yellow.png";
import pinkPoxImg from "../assets/pink.png";
import redPoxImg from "../assets/red.png";
import greenPoxImg from "../assets/green.png";
const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <div>
        <Navbar />
      </div>

      {/* Main content */}
      <div className="bg-black w-full h-screen px-24 flex flex-col items-center pr-48">
        <p className="text-xl font-bold text-white text-center mb-6 pt-10">
          Draw Time
        </p>

        <div className=" w-full  flex justify-center items-center">
          <div className="bg-gradient-to-b from-[#4A93B6] to-[#006799] rounded-full py-2 border-[2px] shadow-inner shadow-[#006799] border-white px-32">
            <Timer />
          </div>
        </div>
      

        <div className="flex flex-row justify-center items-center w-full mt-10 ml-44" >
            <div className="w-[25%] flex items-center">
                <div >
                <p className="text-[#979797] text-2xl text-center pr-0 pb-5">2</p>
                <img src={yellowPoxImg} alt="" className="" />
                <p className="text-[#979797] text-center bg-white rounded-lg mt-5 py-2 text-xl font-semibold">Amount</p>
                </div>
            </div>

            <div className="w-[25%] flex items-center">
            <div >
                <p className="text-[#979797] text-2xl text-center  pr-0 pb-5">2</p>
                <img src={pinkPoxImg} alt="" className="" />
                <p className="text-[#979797] text-center bg-white rounded-lg mt-5 py-2 text-xl font-semibold" >Amount</p>
                </div>
            </div>

            <div className="w-[25%] flex items-center">
            <div >
                <p className="text-[#979797] text-2xl text-center  pr-0 pb-5">2</p>
                <img src={redPoxImg} alt="" className="" />
                <p className="text-[#979797] text-center bg-white rounded-lg mt-5 py-2 text-xl font-semibold">Amount</p>
                </div>
            </div>

            <div className="w-[25%] flex items-center">
            <div >
                <p className="text-[#979797] text-2xl text-center  pr-0 pb-5">2</p>
                <img src={greenPoxImg} alt="" className="" />
                <p className="text-[#979797] text-center bg-white rounded-lg mt-5 py-2 text-xl font-semibold ">Amount</p>
                </div>
            </div>
        </div>

        <div className="mt-16 flex justify-center items-center">
            <div className="flex flex-row items-center space-x-4">
                <div className="flex flex-row">
                    <p className="border-l-2 border-white h-[10px]"></p>
                    <p className="border-2 border-white w-[80px]"></p>
                    <p className="border-l-2 border-white h-[10px]"></p>
                </div>
                <p className="text-white text-3xl font-semibold">Winning Color</p>
                <p className="border-2 border-white h-[1px]"></p>
            </div>
        </div>
        <p className="text-[#B20000] text-6xl font-bold pt-5 ">Red Color</p>
        </div>
      </div>
   
  );
};

export default Home;
