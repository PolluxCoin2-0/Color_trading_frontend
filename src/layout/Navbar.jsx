import WalletIcon  from "../assets/wallet.png";

const Navbar = () => {
  return (
    <div>
      <div className="flex flex-row justify-between bg-white py-4 shadow-md px-12">

        <div className="text-black">
          {/* logo */}
          <img src={WalletIcon} alt="" className="bg-black px-2 py-2 rounded-lg" />
        
        </div>

        <div className="ml-12">
          <p className="text-2xl font-bold pt-1">You win: 30 </p>
         </div>

        <div className="flex flex-row space-x-2">
        <img src={WalletIcon} alt="" className="bg-black px-2 py-2 rounded-lg" />
        <p className="text-xl font-bold pt-1">Connect Wallet</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar
