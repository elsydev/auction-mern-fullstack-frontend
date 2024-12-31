import axios from "./axios.js";
export const getMyAuctionItemsRequest = async (token) => axios.get("/auctionitem/myitems",{
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
});
export const getAllAuctionItemsRequest = async () => axios.get("/auctionitem/allitems")

export const getAuctionItemRequest = async (token,id) => axios.get(`/auctionitem/auction/${id}`,{
    headers: {
       
        Authorization: `Bearer ${token}`
    }
});

export const postAuctionBidRequest = async (values,token,id) => {
    console.log("values, token,id",values,token,id)
return axios.post(`/bid/place/${id}`,values,{
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
})};

export const registerAuctionRequest = async (values,token) =>
  axios.post(`/auctionitem/create`, values,{
    headers: {
       "Content-Type":"multipart/form-data",
        Authorization: `Bearer ${token}`
    }
});
export const deleteAuctionRequest = async (token,id) =>
  axios.delete(`/auctionitem/remove/${id}`,{
    headers: {
       
        Authorization: `Bearer ${token}`
    }
});
export const republishAuctionRequest = async (values,token,id) =>
    axios.put(`/auctionitem/republish/${id}`, values,{
    headers: {
        "Content-Type":"multipart/form-data",
        Authorization: `Bearer ${token}`
    }
});