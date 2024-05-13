"use client";

import { addToWaitlist } from "@/utils/supabase";
import React, { useState } from "react";
import useUIControlStore from "@/store/UI_control/landingpage";
import Person from "@/interfaces/person";
import useUserStore from "@/store/user_infor/userinfor";

const JoinModal = () => {
  const joinModalState = useUIControlStore((state) => state.joinModal);
  const setJoinModalState = useUIControlStore((state) => state.updateJoinModal);
  const setWelcomeState = useUIControlStore(
    (state) => state.updateWelcomeModal
  );
  const setUserState = useUserStore((state) => state.updateUserName);
  const [selectedOption, setSelectedOption] = useState("");
  const [isShowReferalInput, setIsShowReferalInput] = useState(false);
  const handleOptionChange = (option: any) => {
    setSelectedOption(option);
  };

  async function handleJoinWaitlist(person: Person) {
    try {
      await addToWaitlist(person);
      setUserState(person.name);
      await sendEmail(person.email);
    } catch (error) {
      console.error(error);
    }
  }

  async function sendEmail(email: string) {
    const res = await fetch(
      "https://totally-liked-goldfish.ngrok-free.app/api/sendemail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();
    console.log(data.message);
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    instagram: "",
    code: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setJoinModalState(false);
    setWelcomeState(true);
    e.preventDefault();
    const newPerson: Person = {
      name: formData.name,
      email: formData.email,
      city: formData.city,
      instagram: formData.instagram,
      from: selectedOption,
      code: formData.code,
    };
    handleJoinWaitlist(newPerson);
  };
  return (
    <>
      <div className="">
        <div
          className="bg-chocolate-main/50 w-[100vw] h-[100vh] fixed top-0 z-[1100]"
          onClick={() => {
            setJoinModalState(false);
          }}
        ></div>
        <div className="joinModal z-[1300] marker:drop-shadow-lg">
          <div
            className="closeBtn"
            onClick={() => {
              setJoinModalState(false);
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.6 16L0 14.4L6.4 8L0 1.6L1.6 0L8 6.4L14.4 0L16 1.6L9.6 8L16 14.4L14.4 16L8 9.6L1.6 16Z"
                fill="#322A44"
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center join_form">
              <div className="p-[40px]">
                <div className="flex justify-center answer">
                  JOIN THE WAITLIST
                </div>
                <form onSubmit={handleSubmit}>
                  <div>
                    <input
                      id="name"
                      className="w-full h-full bg-transparent regist_input outline-none outline-[0px] px-[25px] text-black mt-[30px]"
                      placeholder="NAME*"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    ></input>
                    <input
                      id="email"
                      className="w-full h-full bg-transparent regist_input outline-none outline-[0px] px-[25px] text-black mt-[30px]"
                      type="email"
                      placeholder="EMAIL*"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    ></input>
                    <input
                      id="city"
                      className="w-full h-full bg-transparent regist_input outline-none outline-[0px] px-[25px] text-black mt-[30px]"
                      placeholder="CITY*"
                      required
                      value={formData.city}
                      onChange={handleChange}
                    ></input>
                    <input
                      id="instagram"
                      className="w-full h-full bg-transparent regist_input outline-none outline-[0px] px-[25px] text-black mt-[30px]"
                      placeholder="INSTAGRAM"
                      value={formData.instagram}
                      onChange={handleChange}
                    ></input>
                  </div>

                  <div className="pt-[30px]">
                    <p className="question">HOW DID YOU HEAR ABOUT SQUAD?</p>
                  </div>

                  <div>
                    <label
                      htmlFor="option1"
                      className={`flex items-center cursor-pointer mt-[10px] ${
                        selectedOption === "Referral"
                          ? "text-blue-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => {
                        handleOptionChange("Referral");
                        setIsShowReferalInput(true);
                      }}
                    >
                      <input
                        type="radio"
                        id="option1"
                        name="options"
                        className="hidden"
                      />
                      <span
                        className={`w-5 h-5 inline-block border border-gray-300 rounded-full mr-2 ${
                          selectedOption === "Referral"
                            ? "bg-zinc-800"
                            : "bg-white"
                        }`}
                      ></span>
                      <p className="question">REFFERRAL</p>
                    </label>
                    {isShowReferalInput && (
                      <input
                        id="code"
                        className="w-[60%] h-full bg-transparent regist_input outline-none outline-[0px] px-[25px] text-black mt-[10px]"
                        placeholder="Referral code"
                        value={formData.code}
                        onChange={handleChange}
                      ></input>
                    )}

                    <label
                      htmlFor="option2"
                      className={`flex items-center cursor-pointer mt-[10px] ${
                        selectedOption === "social media"
                          ? "text-blue-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => {
                        handleOptionChange("social media");
                        setIsShowReferalInput(false);
                      }}
                    >
                      <input
                        type="radio"
                        id="option2"
                        name="options"
                        className="hidden"
                      />
                      <span
                        className={`w-5 h-5 inline-block border border-gray-300 rounded-full mr-2 ${
                          selectedOption === "social media"
                            ? "bg-zinc-800"
                            : "bg-white"
                        }`}
                      ></span>

                      <p className="question">SOCIAL MEDIA</p>
                    </label>
                    <label
                      htmlFor="option3"
                      className={`flex items-center cursor-pointer mt-[10px] ${
                        selectedOption === "other"
                          ? "text-gray-800"
                          : "text-gray-500"
                      }`}
                      onClick={() => {
                        handleOptionChange("other");
                        setIsShowReferalInput(false);
                      }}
                    >
                      <input
                        type="radio"
                        id="option3"
                        name="options"
                        className="hidden"
                      />
                      <span
                        className={`w-5 h-5 inline-block border border-gray-300 rounded-full mr-2 ${
                          selectedOption === "other"
                            ? "bg-zinc-800"
                            : "bg-white"
                        }`}
                      ></span>
                      <p className="question">OTHER</p>
                    </label>
                  </div>
                  <div className="flex justify-center mt-[30px]">
                    <button className="text-white join_btn_2" type="submit">
                      JOIN
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinModal;
