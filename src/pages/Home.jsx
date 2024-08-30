import Timer from "../components/Timer";
import yellowPoxImg from "../assets/yellow.png";
import whitePoxImg from "../assets/white.png";
import redPoxImg from "../assets/red.png";
import greenPoxImg from "../assets/green.png";
import iconImg from "../assets/icon.png";
import bgImg from "../assets/bgImage.png";
import { useEffect, useState } from "react";
import {
  getApproval,
  getWinColor,
  postGetUserBidCountByColor,
  postPlaceBetMethod,
} from "../utils/axios";
import polluxweb from "polluxweb";

const Home = () => {
  const [winningColor, setWinningColor] = useState("");
  const [redCount, setRedCount] = useState(0);
  const [whiteCount, setWhiteCount] = useState(0);
  const [yellowCount, setYellowCount] = useState(0);
  const [greenCount, setGreenCount] = useState(0);
  const [betAmounts, setBetAmounts] = useState({
    yellow: 1,
    white: 1,
    red: 1,
    green: 1,
  });
  const [isLoading, setIsLoading] = useState(false);

  const walletAddress = localStorage.getItem("wallet");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWinColor();
      if (data?.data === 0) {
        setWinningColor("Yellow");
      } else if (data?.data === 1) {
        setWinningColor("White");
      } else if (data?.data === 2) {
        setWinningColor("Red");
      } else {
        setWinningColor("Green");
      }

      const yellowData = await postGetUserBidCountByColor(walletAddress, 0);
      setYellowCount(yellowData?.data);

      const whiteData = await postGetUserBidCountByColor(walletAddress, 1);
      setWhiteCount(whiteData?.data);

      const redData = await postGetUserBidCountByColor(walletAddress, 2);
      setRedCount(redData?.data);

      const greenData = await postGetUserBidCountByColor(walletAddress, 3);
      setGreenCount(greenData?.data);
    };

    fetchData();
  }, []);

  const handleBet = async (color, amount) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    const transaction = await getApproval(walletAddress, amount);
    const signedTransaction = await window.pox.signdata(
      transaction?.data?.transaction
    );

    JSON.stringify(
      await window.pox.broadcast(JSON.parse(signedTransaction[1]))
    );

    const apiData = await postPlaceBetMethod(walletAddress, color, amount);

    const signedTransaction1 = await window.pox.signdata(
      apiData?.data?.transaction
    );

    JSON.stringify(
      await window.pox.broadcast(JSON.parse(signedTransaction1[1]))
    );

    setIsLoading(false);
  };

  const handleBetAmountChange = (color, amount) => {
    setBetAmounts((prev) => ({
      ...prev,
      [color]: amount,
    }));
  };

  const getWinningColorClass = () => {
    switch (winningColor) {
      case "Yellow":
        return "text-yellow-600";
      case "White":
        return "text-white";
      case "Red":
        return "text-red-600";
      case "Green":
        return "text-green-600";
      default:
        return "";
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#010101] via-[#010101] to-[#e9dede] pb-20">
      {/* Background Image */}
      <img
        src={bgImg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen px-4 md:px-4 lg:px-24 flex flex-col items-center justify-center pr-4 lg:pr-20 xl:pr-20 2xl:pr-40 pb-10 ">
        <div className="w-[70%] md:w-[50%] lg:w-[40%] xl:w-[40%] 2xl:w-[20%] flex flex-col justify-center items-center">
          <p className="text-xl font-bold text-white lg:text-center mb-6 pt-10 md:pt-0">
            Draw Time
          </p>
          <Timer />
        </div>

        <div className="flex flex-col items-center justify-start md:flex-row md:justify-center md:items-center space-y-5 md:space-y-0 space-x-0 md:space-x-5 lg:space-x-10 w-full mt-10 ml-5 md:ml-0 lg:ml-0 xl:ml-0 2xl:ml-24">
          <div className="w-2/3 md:w-1/5 lg:w-1/4 xl:w-1/4 2xl:w-[90%]">
            <div className="w-full relative cursor-pointer">
              <p className="text-[#979797] text-2xl text-center pb-0 md:pb-5 pr-6 md:pr-4 lg:pr-6 xl:pr-6 2xl:pr-12">
                {yellowCount && yellowCount}
              </p>
              <img
                src={yellowPoxImg}
                alt="Yellow Pox"
                className="w-[90%]"
                onClick={() => handleBet(0, betAmounts?.yellow)}
              />
              <input
                onChange={(e) =>
                  handleBetAmountChange("yellow", e.target.value)
                }
                value={betAmounts.yellow}
                type="number"
                placeholder="Amount"
                className="text-[#979797] text-center bg-white rounded-lg mt-5 py-2 text-xl font-semibold cursor-pointer w-[90%]"
              />
              <p
                className="text-black font-bold text-4xl md:text-xl lg:text-xl xl:text-3xl 2xl:text-4xl absolute top-[39%] md:top-[42%] lg:top-[42%] xl:top-[42%]
             left-[16%] md:left-[18%] lg:left-[22%] xl:left-[25%]"
              >
                Tap Here
              </p>
            </div>
          </div>

          <div className="w-[65%] md:w-[20%] lg:w-[25%] xl:w-[25%] 2xl:w-[90%]">
            <div className="w-full relative cursor-pointer">
              <p className="text-[#979797] text-2xl text-center pb-1 md:pb-5 2xl:w-full pr-6 md:pr-4 lg:pr-6 xl:pr-6 2xl:pr-12">
                {whiteCount && whiteCount}
              </p>
              <img
                src={whitePoxImg}
                alt="White Pox"
                className="w-[90%]"
                onClick={() => handleBet(1, betAmounts?.white)}
              />
              <input
                onChange={(e) => handleBetAmountChange("white", e.target.value)}
                value={betAmounts.white}
                type="number"
                placeholder="Amount"
                className="text-[#979797] text-center bg-white rounded-lg mt-5 py-2 text-xl font-semibold cursor-pointer w-[90%]"
              />
              <p
                className="text-black font-bold text-4xl md:text-xl lg:text-xl xl:text-3xl 2xl:text-4xl absolute top-[39%] md:top-[42%] lg:top-[42%] xl:top-[42%]
             left-[16%] md:left-[18%] lg:left-[22%] xl:left-[25%]"
              >
                Tap Here
              </p>
            </div>
          </div>

          <div className="w-[65%] md:w-[20%] lg:w-[25%] xl:w-[25%] 2xl:w-[90%]">
            <div className="w-full relative cursor-pointer">
              <p className="text-[#979797] text-2xl text-center pb-1 md:pb-5 2xl:w-full pr-6 md:pr-4 lg:pr-6 xl:pr-6 2xl:pr-12">
                {redCount && redCount}
              </p>
              <img
                src={redPoxImg}
                alt="Red Pox"
                className="w-[90%]"
                onClick={() => handleBet(2, betAmounts?.red)}
              />
              <input
                onChange={(e) => handleBetAmountChange("red", e.target.value)}
                value={betAmounts.red}
                type="number"
                placeholder="Amount"
                className="text-[#979797] text-center bg-white rounded-lg mt-5 py-2 text-xl font-semibold cursor-pointer w-[90%]"
              />
              <p
                className="text-black font-bold text-4xl md:text-xl lg:text-xl xl:text-3xl 2xl:text-4xl absolute top-[39%] md:top-[42%] lg:top-[42%] xl:top-[42%]
             left-[16%] md:left-[18%] lg:left-[22%] xl:left-[25%]"
              >
                Tap Here
              </p>
            </div>
          </div>

          <div className="w-[65%] md:w-[20%] lg:w-[25%] xl:w-[25%] 2xl:w-[90%]">
            <div className="w-full relative cursor-pointer">
              <p className="text-[#979797] text-2xl text-center pb-1 md:pb-5 2xl:full pr-6 md:pr-4 lg:pr-6 xl:pr-6 2xl:pr-12">
                {greenCount && greenCount}
              </p>
              <img
                src={greenPoxImg}
                alt="Green Pox"
                className="w-[90%]"
                onClick={() => handleBet(3, betAmounts?.green)}
              />
              <input
                onChange={(e) => handleBetAmountChange("green", e.target.value)}
                value={betAmounts.green}
                type="number"
                placeholder="Amount"
                className="text-[#979797] text-center bg-white rounded-lg mt-5 py-2 text-xl font-semibold cursor-pointer w-[90%]"
              />
              <p
                className="text-black font-bold text-4xl md:text-xl lg:text-xl xl:text-3xl 2xl:text-4xl absolute top-[39%] md:top-[42%] lg:top-[42%] xl:top-[42%]
             left-[16%] md:left-[18%] lg:left-[22%] xl:left-[25%]"
              >
                Tap Here
              </p>
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
        <p
          className={`${
            getWinningColorClass()
          } text-6xl md:text-8xl font-bold pt-5 whitespace-nowrap`}
        >
          {winningColor && winningColor} Color
        </p>
      </div>
    </div>
  );
};

export default Home;
