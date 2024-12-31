import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getMyAuctionItemsRequest,
  getAllAuctionItemsRequest,
  getAuctionItemRequest,
  postAuctionBidRequest,
  registerAuctionRequest,
  deleteAuctionRequest,
  republishAuctionRequest,
} from "../api/auctions.js";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate, Navigate, useParams } from "react-router-dom";

const AuctionContext = createContext();

export const useAuction = () => {
  const context = useContext(AuctionContext);
  if (!context)
    throw new Error("useAuction must be used within AuctionProvider");
  return context;
};

export const AuctionProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [auctionItems, setAuctionItems] = useState([]);
  const [allAuctionItems, setAllAuctionItems] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [auctionItemDetail, setAuctionItemDetail] = useState([]);
  const [auctionBidders, setAuctionBidders] = useState([]);
  const [currentBid, setCurrentBid] = useState(null);
  const [newAuction, setNewAuction] = useState(null);
  const [republishedItem, setRepublishedItem] = useState(null);
  const { auctionCreator, setAuctionCreator } = useState("");
  const [myAuctions, setMyAuctions] = useState([]);
  const [auctionDeleted, setAuctionDeleted] = useState(false);
  const [auctionRepublished, setAuctionRepublished] = useState(false);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const getMyAuctionItems = async () => {
    /*const cookies = Cookies.get()
  try {
        const res=await verifyTokenRequest(cookies.token)
   } catch (error) {
    console.log(error)
    } */
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      console.log("desde get my items en auction context", token);
      if (!token) return;
      const res = await getMyAuctionItemsRequest(token);
      console.log(res.data.items);
      setMyAuctions(res.data.items);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
      toast.error(error.response.data.message);
    }
  };
  const resetContext = async () => {
    setLoading(false);
    setAuctionItems(auctionItems);
    setAllAuctionItems(allAuctionItems);
    setAuctionItemDetail(auctionItemDetail);
    setMyAuctions(myAuctions);
  };
  const getAllAuctionItmes = async () => {
    setAllAuctionItems([]);
    setLoading(true);
    try {
      const res = await getAllAuctionItemsRequest();
      setAllAuctionItems(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
      toast.error(error.response.data.message);
    }
  };
  const getAuctionItemDetail = async (id) => {
    setAuctionItemDetail([]);

    setLoading(true);
    console.log("id desde getAuctionItmeDetail", id);
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) return;
    try {
      const res = await getAuctionItemRequest(token, id);
      setAuctionItemDetail(res.data.existingAuctionItem);
      console.log(auctionItemDetail.title);
      setAuctionBidders(res.data.bidders);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
      toast.error(error.response.data.message);
    }
  };

  const postAuctionBid = async (values, id) => {
    setLoading(true);
    console.log("id desde postAuctionBid", id);
    console.log("values desde postAuctionBid", values);
    const token = localStorage.getItem("token");
    console.log("Desde posting bid", token);
    if (!token) return;
    try {
      const res = await postAuctionBidRequest(values, token, id);
      setCurrentBid(res.data.currentBid);
      console.log(currentBid);
      console.log(auctionItemDetail.title);

      setLoading(false);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
      toast.error(error.response.data.message);
    }
  };
  const createAuction = async (values) => {
    setLoading(true);
    console.log("values desde createAuction", values);
    const token = localStorage.getItem("token");
    console.log("Desde createAuction", token);
    if (!token) return;
    try {
      const res = await registerAuctionRequest(values, token);
      setNewAuction(res.data.auctionItem);

      setLoading(false);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
      toast.error(error.response.data.message);
    }
  };

  const deleteAuctionItem = async (id) => {
    setLoading(true);
    console.log("id desde deleteAuctionItem", id);
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) return;
    try {
      const res = await deleteAuctionRequest(token, id);
      toast.success(res.data.message);
      getMyAuctionItems(), getAllAuctionItmes();
      setLoading(false);
      setAuctionDeleted(true);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
      toast.error(error.response.data.message);
    }
  };

  const republishAuction = async (values, id) => {
    setLoading(true);
    console.log("values desde republishAuction", values);
    const token = localStorage.getItem("token");
    console.log("Desde republishAuction", token);
    console.log("id Desde republishAuction", id);
    if (!token) return;
    try {
      const res = await republishAuctionRequest(values, token, id);
      /* const res= await axios.post(`http://localhost:5000/api/auctionitem/item/republish/${id}`,values,{
      headers: {
        "Content-Type":"multipart/form-data",
        Authorization: `Bearer ${token}`
    }
    }) */
      setRepublishedItem(res.data.auctionItem);
      setAuctionCreator(res.data.createdBy);
      toast.success(res.data.message);
      setLoading(false);
      setAuctionRepublished(true);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
      toast.error(error.response.data.message);
    } finally {
      getMyAuctionItems();
    }
  };
  return (
    <AuctionContext.Provider
      value={{
        errors,

        message,
        getMyAuctionItems,
        auctionItems,
        allAuctionItems,
        getAllAuctionItmes,
        loading,
        getAuctionItemDetail,
        auctionItemDetail,
        auctionBidders,
        postAuctionBid,
        currentBid,
        createAuction,
        newAuction,
        deleteAuctionItem,
        republishAuction,
        republishedItem,
        auctionCreator,
        resetContext,
        myAuctions,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
};
export default AuctionContext;
