import { useState, useEffect } from "react";
import { useSuper } from "@/context/SuperContext";
import AuctionItemDelete from "./sub-components/AuctionItemDelete";
import BiddersAuctioneersGraph from "./sub-components/BiddersAuctioneersGraph";
import PaymentGraph from "./sub-components/PaymentGraph";
import PaymentProofs from "./sub-components/PaymentProofs";
import Spinner from "@/components/custom-components/Spinner";
import { useAuth } from "@/context/AuthContext";
import {Link, useNavigate} from "react-router-dom"
const Dashboard = () => {
  const {
    getMonthlyRevenue,
    getPaymentProofs,
    updatePaymentStatus,
    deletePaymentProof,
    getAllUsers,
    deleteAuction,
    loading,
    errors: superErrors,
    monthlyRevenue,
    totalAuctioneers,
    totalBidders,
    paymentProofs,
    singlePaymentProof,
    updatedProof,
    resetSuperContext,
  } = useSuper();
  const{user,isAuthenticated}=useAuth();
  const navigate=useNavigate()
useEffect(()=>{
if(user.role!=="Super Admin" || !isAuthenticated){
  navigate("/")
}
},[isAuthenticated])

  useEffect(() => {
    getMonthlyRevenue();
    getAllUsers();
    getPaymentProofs();
    resetSuperContext();
  }, []);
  return <>{loading ? <Spinner /> : ( <>
<div className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col gap-10">
    <h1 className={`text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl`}>
    Dashboard
    </h1>
    <div className="flex flex-col gap-10">
    <div>
      <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">Monthly Total Payments Received</h3>
      <PaymentGraph/>
    </div>
    <div>
      <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">Users</h3>
      <BiddersAuctioneersGraph/>
    </div>
    <div>
      <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">Payment Proofs</h3>
      <PaymentProofs/>
    </div>
    <div>
      <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">Delete Item from Auction</h3>
      <AuctionItemDelete/>
    </div>

    </div>
</div>



  </>)
 }
  
  
  
  </>;
};

export default Dashboard;
