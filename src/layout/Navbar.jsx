import { useEffect, useState } from "react";
import WalletIcon from "../assets/wallet.png";
import { postGetUserTotalWinnings } from "../utils/axios";
import polluxweb from "polluxweb";
import bgImg from "../assets/bgImage.png";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [winningCount, setWinningCount] = useState(0);
  const walletAddress = localStorage.getItem("wallet");

  useEffect(() => {
    if (walletAddress) {
      const fetchData = async () => {
        const data = await postGetUserTotalWinnings(walletAddress);
        const toDecimal = await polluxweb.toDecimal(data?.data?.hex)
        setWinningCount(toDecimal);
      };
      fetchData();
    }
  }, []);

  // connect wallet function
  async function getPolinkweb() {
    var obj = setInterval(async () => {
      if (window.pox) {
        clearInterval(obj);
        const detailsData = JSON.stringify(await window.pox.getDetails());
        const parsedDetailsObject = JSON.parse(detailsData);
        localStorage.setItem(
          "wallet",
          parsedDetailsObject[1].data?.wallet_address
        );
        window.location.reload();
      }
    }, 1000);
  }

  function truncateString(str, maxLength) {
    if (str?.length > 0 && str?.length <= maxLength) {
      return str;
    } else {
      const truncatedString =
        str?.substring(0, Math.floor(maxLength / 2)) +
        "..." +
        str?.substring(str?.length - Math.floor(maxLength / 2));
      return truncatedString; // If string length exceeds maxLength, return a truncated version with ellipsis
    }
  }

  return (
    <div className="relative w-full h-full bg-black border-b-[2px] border-gray-600 to-[#e9dede]">

      {/* Background Image */}
      <img
        src={bgImg}
        alt="Background"
        className="absolute inset-0 object-contain z-0"
      />
      <div className="flex flex-row justify-between items-center py-4  px-2 md:px-12 shadow-2xl shadow-gray-400">


        <div className="text-black flex flex-row items-center">
          {/* logo */}
          <img
            src={logo}
            alt=""
            className="bg-black px-1 py-1 md:px-2 md:py-2 rounded-lg"
          />
          <p className="text-white font-bold text-2xl whitespace-nowrap hidden md:block">Color Trade</p>
        </div>
          <div className="ml-0">
            <p className=" text-lg md:text-2xl font-bold pt-1 text-white">You win: {winningCount? winningCount: 0} </p>
          </div>
        <div className="flex items-center space-x-2 cursor-pointer z-20 pr-4">
          <img
            src={WalletIcon}
            alt=""
            className="bg-black px-1 py-1 md:px-2 md:py-2 rounded-lg "
          />
          <p className="text-lg md:text-xl font-bold pt-1 md:pt-0 text-left leading-5 pb-2">
            <div onClick={getPolinkweb} className="text-white ">
              {
                walletAddress ? truncateString(walletAddress,8) : (
                  <>
                  <span className="block md:inline">Connect</span>
                  <span className="block md:inline"> Wallet</span>
                  </>
                )
              }
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
