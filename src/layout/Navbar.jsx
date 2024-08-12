import WalletIcon  from "../assets/wallet.png";

const Navbar = () => {
  return (
    <div>
      <div className="flex flex-row justify-between items-center  bg-white py-4 shadow-md px-2 md:px-12">

        <div className="text-black">
          {/* logo */}
          <img src={WalletIcon} alt="" className="bg-black px-1 py-1 md:px-2 md:py-2 rounded-lg" />
        
        </div>

        <div className="ml-12">
          <p className=" text-lg md:text-2xl font-bold pt-1">You win: 30 </p>
         </div>
         <div className="flex items-center space-x-2">
  <img src={WalletIcon} alt="" className="bg-black px-1 py-1 md:px-2 md:py-2 rounded-lg " />
  <p className="text-lg md:text-xl font-bold pt-1 md:pt-0 text-left leading-5 pb-2">
    <span className="block md:inline">Connect</span>
    <span className="block md:inline"> Wallet</span>
  </p>
</div>



      </div>
    </div>
  )
}

export default Navbar
