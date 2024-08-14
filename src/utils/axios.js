import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const postPlaceBetMethod = async (walletAddress, color, amount) => {
  try {
    const res = await axios.post(BASE_URL + "/placeBetMethod", {
      walletAddress: walletAddress,
      color: color,
      amount: amount
    });
    return res?.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const postGetUserTotalWinnings = async (walletAddress) => {
    try {
        const res = await axios.post(BASE_URL + "/getUserTotalWinnings", {
        walletAddress: walletAddress
        });
        return res?.data;
    } catch (error) {
        console.log("error", error);
    }

}


export const postGetUserBidCountByColor = async (walletAddress, color) => {
    try {
        const res = await axios.post(BASE_URL +"/getUserBidCountByColor", {
            walletAddress: walletAddress,
            color:color
        });
        return res?.data;
    } catch (error) {
        console.log("error", error);
    }
}


export const getWinColor = async () => {
    try {
        const res = await axios.get(BASE_URL + "/getWinColor");
        return res?.data;
    } catch (error) {
        console.log("error", error);
    }
}

export const getApproval= async (walletAddress, amount) => {
    try {
        const res = await axios.post(BASE_URL + "/approvalUSDX", {
             walletAddress: walletAddress,
             amount: amount
        });
        return res?.data;
    } catch (error) {
        console.log("error", error);
    }
}


