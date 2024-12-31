import React, { useState } from "react";
import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext.jsx"
import { useAuction } from "@/context/AuctionContext.jsx";
import { Link } from "react-router-dom";

const SideDrawer = () => {
    const [show,setShow]= useState(false);
    const { user, logout, message, isAdmin, isAuthenticated,myCookie } = useAuth();
    const {setAuctionItems,auctionItems}=useAuction()
    console.log('User role desde side drawer:',user?.role);

    console.log('isAuthenticated desde side drawer:',isAuthenticated)
    console.log('my Cookie desde side drawer:',myCookie)
    const handleLogout=()=>{
        logout()
        //setAuctionItems(null);

    }
  return (
    <>
    <div onClick={()=> setShow(!show)} className="fixed right-5 top-5 bg-[#D6482B] text-white text-xl p-2 rounded-md
    hover:bg-[#b8381e] lg:hidden">
      <GiHamburgerMenu/>
    </div> 

    <div className={`w-[100%] sm:w-[300px] bg-[#f6f4f0] h-full fixed top-0 ${
          show ? "left-0" : "left-[-100%]"
        } transition-all duration-100 p-4 flex flex-col justify-between lg:left-0 border-r-[1px] border-r-stone-500`}
      >
        <div className="relative">
            <Link to={"/"}><h4 className="text-2xl font-semibold mb-4 flex flex-col gap-1">MultiVendor <span className="text-[#D6482b]">Subastas - Ventas</span></h4> </Link>
        <ul className="flex flex-col gap-3">
            <li>
                <Link to={"/auctions"} className="flex text-xl font-semibold gap-2 items-center hover:text-[#D6482b]">
                    <RiAuctionFill/> Subastas
                </Link>
            </li>
            <li>
                <Link to={"/leaderboard"} className="flex text-xl font-semibold gap-2 items-center hover:text-[#D6482b]">
                    <MdLeaderboard/> Clasificación
                </Link>
            </li>
            {isAuthenticated && user && user.role === "Auctioneer" &&(
                <>
                <li>
                <Link to={"/submit-commission"} className="flex text-xl font-semibold gap-2 
                items-center hover:text-[#D6482b] hover:transition-all hover:duration-150">
                    <FaFileInvoiceDollar/> Procesar Comisión
                </Link>
                
            </li>
{/*             <li>
                <Link to={"/myauctions"} className="flex text-xl font-semibold gap-2 
                items-center hover:text-[#D6482b] hover:transition-all hover:duration-150">
                    <FaFileInvoiceDollar/> My Auction Items
                </Link>
                
            </li> */}
            
            <li>
                <Link to={"/create-auction"} className="flex text-xl font-semibold gap-2 
                items-center hover:text-[#D6482b] hover:transition-all hover:duration-150">
                    <IoIosCreate/> Crear Substa
                </Link>
            </li>
            <li>
                <Link to={"/viewauctions"} className="flex text-xl font-semibold gap-2 
                items-center hover:text-[#D6482b] hover:transition-all hover:duration-150">
                    <FaEye/> View My Auctions
                </Link>
            </li>
                </>
            )}
            {isAuthenticated && (
                <>
                <li>
                <Link to={"/profile"} className="flex text-xl font-semibold gap-2 
                items-center hover:text-[#D6482b] hover:transition-all hover:duration-150">
                    <MdDashboard/> Profile
                </Link>
            </li>
                </>
            )}
            {isAuthenticated && user && user.role==="Super Admin" && (
                <>
                <li>
                <Link to={"/dashboard"} className="flex text-xl font-semibold gap-2 
                items-center hover:text-[#D6482b] hover:transition-all hover:duration-150">
                    <MdDashboard/> Dashboard
                </Link>
            </li>
                </>
            )}

        </ul>
        {!isAuthenticated ?(
            <>
              <div className="my-4 flex gap-2">
                <Link
                  to={"/register"}
                  className="bg-[#D6482B] font-semibold hover:bg-[#b8381e] text-xl py-1 px-4 
                  rounded-md text-white"
                >
                  Register
                </Link>
                <Link
                  to={"/login"}
                  className="text-[#DECCBE] bg-transparent border-[#DECCBE] border-2 
                  hover:bg-[#fffefd] hover:text-[#fdba88] font-bold text-xl py-1 px-4 rounded-md"
                >
                  Login
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="my-4 flex gap-4 w-fit" onClick={handleLogout}>
                <button className="bg-[#D6482B] font-semibold hover:bg-[#b8381e] text-xl py-1 px-4 rounded-md text-white">
                  Logout
                </button>
              </div>
            </>
          )}
          <hr className="mb-4 border-t-[#d6482b]"/>
          <ul className="flex flex-col gap-3">
          <li>
                <Link to={"/how-it-works-info"} className="flex text-xl font-semibold gap-2 items-center hover:text-[#D6482b]">
                    <SiGooglesearchconsole/> Como Subastar 
                </Link>
            </li>
            <li>
                <Link to={"/about"} className="flex text-xl font-semibold gap-2 items-center hover:text-[#D6482b]">
                    <BsFillInfoSquareFill/> Nosotros 
                </Link>
            </li>
          </ul>
          <IoMdCloseCircleOutline onClick={()=>setShow(!show)} className="absolute top-0 right-4 
          text-[28px] sm:hidden"/>
        </div>


        <div>
            <div className="flex gap-2 items-center mb-2">
                <Link to={"/" } className="bg-white  text-stone-500 p-2 text-xl rounded-sm hover:text-blue-700 "><FaFacebook/>
                </Link>
                <Link
              to="/"
              className="bg-white text-stone-500 p-2 text-xl rounded-sm hover:text-pink-500"
            >
              <RiInstagramFill />
            </Link>
            </div>
            <Link
            to={"/contact"}
            className="text-stone-500 font-semibold hover:text-[#d6482b] hover:transition-all hover:duration-150"
          >
            Contacto
          </Link>
          <p className="text-stone-500">&copy; MultiVendor Subastas y Ventas.</p>
        </div>

        
    </div>
    </>
  
    
  )
}

export default SideDrawer
