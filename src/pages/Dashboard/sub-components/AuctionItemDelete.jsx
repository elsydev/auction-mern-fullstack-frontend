import React, {useState,useEffect} from 'react';
import { useSuper } from '@/context/SuperContext';
import { useAuction } from '@/context/AuctionContext';
import { Link,useNavigate } from "react-router-dom";

const AuctionItemDelete = () => {
  const{allAuctionItems,getAllAuctionItmes}=useAuction();
  const{deleteAuction,loading,}=useSuper();
  useEffect((() => {  
    getAllAuctionItmes();
    
    console.log(allAuctionItems);

}),[]);
  const handleAuctionDelete=(id)=>{
    deleteAuction(id);
  }
  return (
    <>
      <div className="overflow-x-auto mb-10">
        <table className="min-w-full bg-white border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {allAuctionItems.length > 0 ? (
              allAuctionItems.map((element) => {
                return (
                  <tr key={element._id}>
                    <td className="py-2 px-4">
                      <img
                        src={element.auctionImage?.url}
                        alt={element.title}
                        className="h-12 w-12 object-cover rounded"
                      />
                    </td>
                    <td className="py-2 px-4">{element.title}</td>
                    <td className="py-2 px-4 flex space-x-2">
                      <Link
                        to={`/auction/details/${element._id}`}
                        className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition-all duration-300"
                      >
                        View
                      </Link>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-700 transition-all duration-300"
                        onClick={() => handleAuctionDelete(element._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="text-left text-xl text-sky-600 py-3">
                <td>No Auctions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
    
  )
}

export default AuctionItemDelete
