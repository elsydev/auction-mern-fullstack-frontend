import { useEffect } from 'react';
import AuctionsList from '../components/Auctions/AuctionsList.jsx';
import { useAuction } from '@/context/AuctionContext.jsx';
import Card from '../components/custom-components/Card.jsx'
import Spinner from '@/components/custom-components/Spinner.jsx';
const Auctions = () => {
    
    const{allAuctionItems,getAllAuctionItmes,loading}=useAuction()
    useEffect((() => {  
        getAllAuctionItmes();
        
        console.log(allAuctionItems);

    }),[]);
    return (
        <>
        {loading ? (
          <Spinner />
        ) : (
          <article className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col">
            <section className="my-8">
              <h1
                className={`text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl`}
              >
                Auctions
              </h1>
              <div className="flex flex-wrap gap-6">
                {allAuctionItems.map((element) => (
                  <Card
                    title={element.title}
                    startTime={element.startTime}
                    endTime={element.endTime}
                    imgSrc={element.auctionImage?.url}
                    startingBid={element.startingBid}
                    id={element._id}
                    key={element._id}
                  />
                ))}
              </div>
            </section>
          </article>
        )}
        {!loading && allAuctionItems.length===0 &&(
          <article className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col">
            <section className="my-8">
              <h1
                className={`text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl`}
              >
                Auctions
              </h1>
              <p>No Hay subastas registradas aun</p>
              
 </section>
</article>
        ) }
      </>
    );
};

export default Auctions;