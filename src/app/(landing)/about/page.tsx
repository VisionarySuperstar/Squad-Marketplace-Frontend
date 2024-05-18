"use client";

import Footer from "@/components/main/footer/footer";
import { useRouter } from "next/navigation";
import JoinModal from "@/components/main/modals/landing/joinModal";
import React from "react";
import Welcome from "@/components/main/modals/landing/welcome";
import useUIControlStore from "@/store/UI_control/landingpage";

const About = () => {
  const generalModalState = useUIControlStore((state) => state.generalModal);
  const welcomeModalState = useUIControlStore((state) => state.welcomeModal);
  const setJoinModalState = useUIControlStore((state) => state.updateJoinModal);
  const router = useRouter();
  return (
    <>
      {generalModalState && <JoinModal />}
      {welcomeModalState && <Welcome />}
      <div className="head_bar">
        <div
          onClick={() => {
            router.push("/");
          }}
        >
          <svg
            className="head_bar_logo_svg cursor-pointer"
            viewBox="0 0 113 112"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24.5" cy="24.5" r="24.5" fill="#322A44" />
            <circle cx="87.5" cy="24.5" r="24.5" fill="#322A44" />
            <circle cx="56" cy="56" r="25" fill="#322A44" />
            <circle cx="25" cy="87" r="25" fill="#322A44" />
            <circle cx="88" cy="87" r="25" fill="#322A44" />
          </svg>
        </div>
        <div
          className="join_btn"
          onClick={() => {
            setJoinModalState(true);
          }}
        >
          Join Waitlist
        </div>
      </div>
      <div className="section_container">
        <div className="line my-[40px]"></div>
        <div className="section mt-[40px]">
          <p className="question">ABOUT</p>
          <p className="mt-[30px] answer">
            The SQUAD LABS Team is based out of London. We are a forward
            thinking company looking to bring the fashion industry into the new
            age of the web. Our mission is to offer a new way for creatives to
            connect with each other to create and sell their content together.
          </p>
          <p className="mt-[30px] answer">
            SQUAD LABS
            <br />
            co.number 15567909, Huckletree,
            <br />
            213 Oxford Street, W1D 2LG, London
          </p>
        </div>
        <div className="line my-[40px]"></div>
        <div className="section mb-[100px]">
          <p className="question">TEAM</p>
          <div className="mt-[30px] flex">
            <p className="answer underline team_label">Shuhei Karatsu</p>
            <p className="ms-[50px] question">FOUNDER, CEO</p>
          </div>
          <div className="mt-[25px] flex">
            <p className="answer underline team_label">Zak LLC</p>
            <p className="ms-[50px] question">CCO</p>
          </div>
          <div className="mt-[25px] flex">
            <p className="answer underline team_label">Abhilash Bharadwaj</p>
            <p className="ms-[50px] question">CTO</p>
          </div>

          <div className="mt-[25px] flex">
            <p className="answer underline team_label">Felix Roxburgh</p>
            <p className="ms-[50px] question">
              MARKETING & <br />
              HUMAN RESOURCES
            </p>
          </div>
          <div className="mt-[25px] flex">
            <p className="answer underline team_label">Daniel Solis</p>
            <p className="ms-[50px] question">SMART CONTRACT</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
