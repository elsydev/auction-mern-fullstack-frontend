import React, { useEffect, useState } from "react";
import Spinner from "../components/custom-components/Spinner.jsx";
import CardTwo from "../components/custom-components/CardTwo.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useAuction } from "../context/AuctionContext.jsx";
import { useNavigate } from "react-router-dom";

const MyAuctionsDetails = () => {
    const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { loading, getMyAuctionItems, myAuctions } = useAuction();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    getMyAuctionItems();
    console.log("Desde view my auctions",myAuctions,loading);
  }, []);
  return (
    <>
          <div className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col">
  
      <h1
          className={`text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl`}
        >
          My Auctions
        </h1>
         {loading ? (
          <Spinner />
        ) : (
          <div
            className={`${
              myAuctions.length > 2 && "flex-grow"
            } flex flex-wrap gap-6`}
          >
            {myAuctions.length > 0 ? (
              myAuctions.map((element) => {
                return (
                  <CardTwo
                    title={element.title}
                    startingBid={element.startingBid}
                    endTime={element.endTime}
                    startTime={element.startTime}
                    imgSrc={element.auctionImage?.url}
                    id={element._id}
                    key={element._id}
                  />
                );
              })
            ) : (
              <h3 className="text-[#666] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl mt-5">
                You have not posted any auction.
              </h3>
            )}{" "}
            :
          </div>
        )}  


    </div>  
    </>

  )
}

export default MyAuctionsDetails
