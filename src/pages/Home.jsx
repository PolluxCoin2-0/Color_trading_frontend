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

  const walletAddress = sessionStorage.getItem("wallet");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWinColor();
      console.log(data);
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
    if (!walletAddress) {
      alert("Please connect your wallet to make a bet.");
      return;
    }

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const transaction = await getApproval(walletAddress, amount);
      const signedTransaction = await window.pox.signdata(
        transaction?.data?.transaction
      );

      console.log(signedTransaction);

      JSON.stringify(
        await window.pox.broadcast(JSON.parse(signedTransaction[1]))
      );

      const apiData = await postPlaceBetMethod(walletAddress, color, amount);

      const signedTransaction1 = await window.pox.signdata(
        apiData?.data?.transaction
      );

      console.log(signedTransaction1);

      JSON.stringify(
        await window.pox.broadcast(JSON.parse(signedTransaction1[1]))
      );

      alert("Bet placed Successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
      <div className="relative z-10 w-full min-h-screen px-4 md:px-4 lg:px-24 flex flex-col items-center justify-center  pb-10 ">
        <div className="w-[70%] md:w-[50%] lg:w-[40%] xl:w-[40%] 2xl:w-[20%] flex flex-col justify-center items-center">
          <p className="text-xl font-bold text-white lg:text-center mb-6 pt-10 md:pt-0">
            Draw Time
          </p>
          <Timer />
        </div>

        <div className="flex flex-row flex-wrap items-center justify-center w-full mt-10 overflow-x-hidden">
          {/* Reusable Color Block Component */}
          {[
            {
              color: "yellow",
              img: yellowPoxImg,
              count: yellowCount,
              bet: betAmounts.yellow,
            },
            {
              color: "white",
              img: whitePoxImg,
              count: whiteCount,
              bet: betAmounts.white,
            },
            {
              color: "red",
              img: redPoxImg,
              count: redCount,
              bet: betAmounts.red,
            },
            {
              color: "green",
              img: greenPoxImg,
              count: greenCount,
              bet: betAmounts.green,
            },
          ].map(({ color, img, count, bet }, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 md:p-4 space-y-2 md:space-y-3"
            >
              {/* Count Display */}
              <p className="text-white text-lg md:text-xl text-center">
                {count}
              </p>

              {/* Image and Button Container */}
              <div
                className="w-full min-h-[200px] md:min-h-[250px] lg:min-h-[275px] max-h-[300px] bg-center bg-contain bg-no-repeat flex items-center justify-center rounded-lg shadow-md cursor-pointer"
                style={{ backgroundImage: `url(${img})` }}
                onClick={() => handleBet(index, bet)}
              >
              <p
  className="text-black font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl"
  style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
>
  Tap Here
</p>

              </div>

              {/* Input Field */}
              <input
                onChange={(e) => handleBetAmountChange(color, e.target.value)}
                value={bet}
                type="number"
                placeholder="Amount"
                className=" mt-2 md:mt-3 text-center bg-white text-gray-700 rounded-lg py-2 text-lg md:text-xl font-semibold"
              />
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center items-center">
          <div className="flex flex-row items-center space-x-4">
            <div className="flex flex-row">
              <img src={iconImg} alt="icon-image" />
            </div>
            <p className="text-white text-2xl md:text-4xl font-semibold whitespace-nowrap">
             Last Winning Color
            </p>
            <div className="flex flex-row">
              <img src={iconImg} alt="icon-image" />
            </div>
          </div>
        </div>
        <p
          className={`${getWinningColorClass()} text-6xl md:text-8xl font-bold pt-5 whitespace-nowrap`}
        >
          {winningColor && winningColor} Color
        </p>
      </div>
    </div>
  );
};

export default Home;
