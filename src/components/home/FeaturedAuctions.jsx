import {useEffect,useState} from 'react'
import Card from '../custom-components/Card';
import {useNavigate} from 'react-router-dom';
import { useAuction } from '@/context/AuctionContext';
const FeaturedAuctions = () => {
    const{allAuctionItems,getAllAuctionItmes,loading}=useAuction()
useEffect(()=>{
    getAllAuctionItmes()
    console.log(allAuctionItems)
},[])
  return (
    <>
      <section className="my-8">
        <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
          Featured Auctions
        </h3>
        <div className="flex flex-wrap gap-6">
          {allAuctionItems.slice(0, 8).map((element) => {
            return (
              <Card
                title={element.title}
                imgSrc={element.auctionImage?.url}
                startTime={element.startTime}
                endTime={element.endTime}
                startingBid={element.startingBid}
                id={element._id}
                key={element._id}
              />
            );
          })}
        </div>
      </section>
    </>
  )
}

export default FeaturedAuctions
