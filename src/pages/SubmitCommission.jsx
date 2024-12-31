import React from 'react'
import {useState,useEffect,useRef} from 'react'
import {useNavigate,Link,Navigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCommission } from '../context/CommissionContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const SubmitCommission = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
      } = useForm();
      const [proofImage, setProofImage] = useState("");
      const [proofImagePreview, setProofImagePreview] = useState("");
      const [proof, setProof] = useState("");
      const [amount, setAmount] = useState("");
      const [comment, setComment] = useState("");
      const {postCommissionProof,loading,
        errors:postCommissionErrors,        
        message,}=useCommission();
        const {user}=useAuth()
      const navigate = useNavigate();

      const handlePaymentProof=(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append("amount",amount);
    formData.append("comment",comment);
        formData.append("proof",proof);
        postCommissionProof(formData)

      }

      const imageHandler=(e)=>{
        const file=e.target.files[0];
        const reader= new FileReader();
        reader.readAsDataURL(file);
        reader.onload =()=>{
            setProofImage(file);
            setProofImagePreview(reader.result);
        }
    }

    const proofHandler = (e) => {
      const file = e.target.files[0];
      setProof(file);
    };
  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-start">
        <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md">
        {postCommissionErrors.map((error, i) => (
          <p className="bg-red-500" key={i}>
            {error}
          </p>
        ))}
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={handlePaymentProof}
          >
            <h3 className={`text-[#D6482B] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl`}>Upload Payment Proof</h3>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-500">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-500">
                Payment Proof (ScreenShot)
              </label>
              <input
                type="file"
                onChange={proofHandler}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-500">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={7}
                className="text-[16px] py-2 bg-transparent border-[1px] rounded-md px-1 border-stone-500 focus:outline-none"
              />
            </div>
              <button
                className="bg-[#d6482b] mx-auto font-semibold hover:bg-[#b8381e] text-xl transition-all duration-300 py-2 px-4 rounded-md text-white my-4"
                type="submit"
              >
               Upload
              </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default SubmitCommission
