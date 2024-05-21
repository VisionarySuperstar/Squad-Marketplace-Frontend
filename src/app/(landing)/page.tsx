"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/main/footer/footer";
import Mobile from "@/components/main/poster/mobile_screen";
import Laptop from "@/components/main/poster/laptop_screen";

import useLoadingControlStore from "@/store/UI_control/loading";

export default function Home() {
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );
  useEffect(() => {
    setLoadingState(false);
  }, [setLoadingState]);
  const router = useRouter();
  const logoHandleHover = () => {
    const circle_1: HTMLElement = document.querySelector(
      ".circle_1"
    ) as HTMLElement;
    circle_1.style.top = `calc(var(--perX) * -10)`;
    circle_1.style.right = `calc(var(--perX) * -630)`;
    const circle_2: HTMLElement = document.querySelector(
      ".circle_2"
    ) as HTMLElement;
    circle_2.style.top = `calc(var(--perX) * 850)`;
    circle_2.style.right = `calc(var(--perX) * -270)`;
    const circle_3: HTMLElement = document.querySelector(
      ".circle_3"
    ) as HTMLElement;
    circle_3.style.top = `calc(var(--perX) * 1100)`;
    circle_3.style.right = `calc(var(--perX) * 150)`;
    const circle_4: HTMLElement = document.querySelector(
      ".circle_4"
    ) as HTMLElement;
    circle_4.style.top = `calc(var(--perX) * 390)`;
    circle_4.style.left = `calc(var(--perX) * -600)`;
    const circle_5: HTMLElement = document.querySelector(
      ".circle_5"
    ) as HTMLElement;
    circle_5.style.top = `calc(var(--perX) * 1100)`;
    circle_5.style.left = `calc(var(--perX) * 0)`;
  };

  const logoHandleMouseOut = () => {
    const circle_1: HTMLElement = document.querySelector(
      ".circle_1"
    ) as HTMLElement;
    circle_1.style.top = `calc(var(--perX) * 0)`;
    circle_1.style.right = `calc(var(--perX) * -300)`;
    const circle_2: HTMLElement = document.querySelector(
      ".circle_2"
    ) as HTMLElement;
    circle_2.style.top = `calc(var(--perX) * 450)`;
    circle_2.style.right = `calc(var(--perX) * 70)`;
    const circle_3: HTMLElement = document.querySelector(
      ".circle_3"
    ) as HTMLElement;
    circle_3.style.top = `calc(var(--perX) * 300)`;
    circle_3.style.right = `calc(var(--perX) * 300)`;
    const circle_4: HTMLElement = document.querySelector(
      ".circle_4"
    ) as HTMLElement;
    circle_4.style.top = `calc(var(--perX) * 390)`;
    circle_4.style.left = `calc(var(--perX) * -200)`;
    const circle_5: HTMLElement = document.querySelector(
      ".circle_5"
    ) as HTMLElement;
    circle_5.style.top = `calc(var(--perX) * 785)`;
    circle_5.style.left = `calc(var(--perX) * 70)`;
  };

  return (
    <>
      <div>
        <Laptop />
        <Mobile />
        <div className="main_container tracking-[1px]">
          <div className="section_container">
            <div className="line my-[40px]"></div>
            <div className="section mt-[40px]">
              <p
                className="question"
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
              >
                What is SQUAD?
              </p>
              <p
                className="mt-[30px] answer"
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
              >
                Squad is a space for creatives and fashion enthusiasts to
                collaborate and innovate together and showcase their ideas on a
                vibrant marketplace
              </p>
            </div>
            <div
              className="line my-[40px]"
              data-aos="fade-up"
              data-aos-anchor-placement="center-bottom"
            ></div>
            <div className="section">
              <div
                className="question"
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
              >
                What can I do with SQUAD?
              </div>
              <div
                className="mt-[30px] answer"
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
              >
                With SQUAD and the $SQD token, you can:
              </div>
              <div
                className="answer mt-[30px] mx-[20px]"
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
              >
                <div className="flex space-between gap-5">
                  <p>●</p>
                  <p>Make content with creators as equitable teams.</p>
                </div>
              </div>
              <div
                className="answer mx-[20px]"
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
              >
                <div className="flex space-between gap-5">
                  <p>●</p>
                  <p>
                    Fully manage and control the ownership of content and
                    distribution of profits within your team.
                  </p>
                </div>
              </div>
              <div
                className="answer mx-[20px]"
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
              >
                <div className="flex space-between gap-5">
                  <p>●</p>
                  <p>
                    Create, share, support, and distribute content as
                    non-tangible assets to fashion and creative enthusiasts.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="line my-[40px]"
              data-aos="fade-up"
              data-aos-anchor-placement="center-bottom"
            ></div>
            <div
              className="section"
              data-aos="fade-up"
              data-aos-anchor-placement="center-bottom"
            >
              <p
                className="question"
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
              >
                Timeline
              </p>
              <div
                className="mt-[30px] answer"
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
              >
                SQUAD will be governed by owners of the $SQD token, a
                cryptocurrency to be issued in Q1 2025. Marketplace launching
                July 2024, more details in August 2024.
                <br />
                Join the waitlist to stay updated!
              </div>
            </div>
          </div>
          <div className="background"></div>
          <div className="circle_container">
            <div className="circle_1">
              <svg
                className="circle_svg"
                viewBox="0 0 642 642"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="321" cy="321" r="321" fill="#322A44" />
              </svg>
            </div>
            <div className="circle_2">
              <svg
                className="circle_svg"
                viewBox="0 0 642 642"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="321" cy="321" r="321" fill="#322A44" />
              </svg>
            </div>
            <div className="circle_3">
              <svg
                className="circle_svg"
                viewBox="0 0 642 642"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="321" cy="321" r="321" fill="#322A44" />
              </svg>
            </div>
            <div className="circle_4">
              <svg
                className="circle_svg"
                viewBox="0 0 642 642"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="321" cy="321" r="321" fill="#322A44" />
              </svg>
            </div>
            <div className="circle_5">
              <svg
                id="svg_5"
                className="circle_svg"
                viewBox="0 0 642 642"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="321" cy="321" r="321" fill="#322A44" />
              </svg>
            </div>
            <button
              className="BigButton"
              onClick={() => {
                router.push("/discover");
              }}
              onMouseEnter={() => {
                logoHandleHover();
              }}
              onMouseLeave={() => {
                logoHandleMouseOut();
              }}
            >
              Open App
            </button>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
