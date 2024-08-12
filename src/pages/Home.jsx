import Timer from "../components/Timer";
import yellowPoxImg from "../assets/yellow.png";
import pinkPoxImg from "../assets/pink.png";
import redPoxImg from "../assets/red.png";
import greenPoxImg from "../assets/green.png";
import iconImg from "../assets/icon.png";
import bgImg from "../assets/bgImage.png";

const Home = () => {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#010101] via-[#010101] to-[#e9dede]">
      {/* Background Image */}
      <img
        src={bgImg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen px-4 md:px-4 lg:px-24 flex flex-col items-center justify-center pr-4 lg:pr-20 xl:pr-20 2xl:pr-40 pb-10">
        <div className="w-[70%] md:w-[50%] lg:w-[40%] xl:w-[40%] 2xl:w-[20%] flex flex-col justify-center items-center">
          <p className="text-xl font-bold text-white lg:text-center mb-6 pt-10 md:pt-0">
            Draw Time
          </p>
          <Timer />
        </div>

        <div className="flex flex-col items-center justify-start md:flex-row md:justify-center md:items-center space-y-5 md:space-y-0 space-x-0 md:space-x-5 lg:space-x-10 w-full mt-10 ml-0 md:ml-0 lg:ml-0 xl:ml-0 2xl:ml-24">
          <div className="w-2/3 md:w-1/5 lg:w-1/4 xl:w-1/4 2xl:w-[90%]">
            <div className="w-full">
              <p className="text-[#979797] text-2xl text-center pb-0 md:pb-5">
                2
              </p>
              <img src={yellowPoxImg} alt="Yellow Pox" className="w-[90%]" />
              <input
                type="number"
                placeholder="Amount"
                className="text-[#979797] text-center bg-white rounded-lg mt-5 py-2 text-xl font-semibold cursor-pointer w-[90%]"
              />
            </div>
          </div>

          <div className="w-[65%] md:w-[20%] lg:w-[25%] xl:w-[25%] 2xl:w-[90%]">
            <div className="w-full">
              <p className="text-[#979797] text-2xl text-center pb-1 md:pb-5 2xl:w-full">
                2
              </p>
              <img src={pinkPoxImg} alt="" className="w-[90%]" />
              <input
                type="number"
                placeholder="Amount"
                className="text-[#979797] text-center bg-white rounded-lg mt-5 py-2 text-xl font-semibold cursor-pointer w-[90%]"
              />
            </div>
          </div>

          <div className="w-[65%] md:w-[20%] lg:w-[25%] xl:w-[25%] 2xl:w-[90%]">
            <div className="w-full">
              <p className="text-[#979797] text-2xl text-center pb-1 md:pb-5 2xl:w-full">
                2
              </p>
              <img src={redPoxImg} alt="" className="w-[90%]" />
              <input
                type="number"
                placeholder="Amount"
                className="text-[#979797] text-center bg-white rounded-lg mt-5 py-2 text-xl font-semibold cursor-pointer w-[90%]"
              />
            </div>
          </div>

          <div className="w-[65%] md:w-[20%] lg:w-[25%] xl:w-[25%] 2xl:w-[90%]">
            <div className="w-full">
              <p className="text-[#979797] text-2xl text-center pb-1 md:pb-5 2xl:full">
                2
              </p>
              <img src={greenPoxImg} alt="" className="w-[90%]" />
              <input
                type="number"
                placeholder="Amount"
                className="text-[#979797] text-center bg-white rounded-lg mt-5 py-2 text-xl font-semibold cursor-pointer w-[90%]"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center items-center">
          <div className="flex flex-row items-center space-x-4">
            <div className="flex flex-row">
              <img src={iconImg} alt="icon-image" />
            </div>
            <p className="text-white text-2xl md:text-4xl font-semibold whitespace-nowrap">
              Winning Color
            </p>
            <div className="flex flex-row">
              <img src={iconImg} alt="icon-image" />
            </div>
          </div>
        </div>
        <p className="text-[#63F601] text-6xl md:text-8xl font-bold pt-5 whitespace-nowrap">
          Green Color
        </p>
      </div>
    </div>
  );
};

export default Home;
