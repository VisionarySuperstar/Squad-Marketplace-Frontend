import FooterLogoAnimation from "./footerLogoAnimation";
import { useState } from "react";

const Footer = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleContactClick = () => {
    window.location.href = "mailto:youremail@example.com";
  };
  return (
    <>
      <div className="footer">
        <div className="flex">
          <div>
            <FooterLogoAnimation />
          </div>
          <div className="w-full xl:grid grid-cols-2 lg:grid ">
            <div className="w-full xl:grid grid-cols-2 md:grid ">
              <div className="grid grid-cols-2 gap-0 mb-[30px]">
                <div>
                  <p className="footer_title mb-[30px] ">About</p>
                  <a href="/about" className="hover:opacity-60">
                    <p className="footer_title ">About us</p>
                  </a>
                  <a href="#" className="hover:opacity-60">
                    <p className="footer_title ">Newsletter</p>
                  </a>
                  <p
                    className="footer_title cursor-pointer hover:opacity-60"
                    onClick={handleContactClick}
                  >
                    Contact
                  </p>
                </div>
                <div className="lg:ms-[50px]">
                  <p className="footer_title mb-[30px]">Support</p>
                  <p className="footer_title hover:opacity-60 cursor-pointer">
                    Help
                  </p>
                  <p className="footer_title hover:opacity-60 cursor-pointer">
                    FAQ
                  </p>
                  <p className="footer_title hover:opacity-60 cursor-pointer">
                    Terms
                  </p>
                </div>
              </div>
              <div className="lg:ms-[50px]">
                <p className="footer_title mb-[30px]">Accessibility</p>
                <div className="mb-[30px]">
                  <svg
                    width="56"
                    height="30"
                    viewBox="0 0 56 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="41" cy="15" r="13" fill="white" />
                    <path
                      d="M40.5597 5.81904C40.7484 5.46814 41.2517 5.46814 41.4404 5.81904L42.6359 8.04191C42.8894 8.51335 43.4693 8.70153 43.9513 8.46882L46.313 7.32877C46.6778 7.15269 47.0896 7.46072 47.0237 7.86039L46.6344 10.2218C46.5438 10.7715 46.9199 11.2893 47.4707 11.3731L49.9933 11.7569C50.404 11.8194 50.5638 12.3263 50.2633 12.613L48.5194 14.2767C48.1064 14.6707 48.1064 15.3298 48.5194 15.7238L50.2633 17.3875C50.5638 17.6742 50.404 18.1811 49.9933 18.2436L47.4707 18.6274C46.9199 18.7112 46.5438 19.229 46.6344 19.7787L47.0237 22.1401C47.0896 22.5398 46.6778 22.8478 46.313 22.6717L43.9513 21.5317C43.4693 21.299 42.8894 21.4871 42.6359 21.9586L41.4404 24.1815C41.2517 24.5323 40.7484 24.5323 40.5597 24.1815L39.3642 21.9586C39.1107 21.4871 38.5309 21.299 38.0488 21.5317L35.6871 22.6717C35.3223 22.8478 34.9105 22.5398 34.9764 22.1401L35.3657 19.7787C35.4563 19.229 35.0802 18.7112 34.5294 18.6274L32.0068 18.2436C31.5961 18.1811 31.4363 17.6742 31.7368 17.3875L33.4807 15.7238C33.8937 15.3298 33.8937 14.6707 33.4807 14.2767L31.7368 12.613C31.4363 12.3263 31.5961 11.8194 32.0068 11.7569L34.5294 11.3731C35.0802 11.2893 35.4563 10.7715 35.3657 10.2218L34.9764 7.86039C34.9105 7.46072 35.3223 7.15269 35.6871 7.32877L38.0488 8.46882C38.5309 8.70153 39.1107 8.51335 39.3642 8.04191L40.5597 5.81904Z"
                      fill="#322A44"
                    />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="55"
                      height="29"
                      rx="14.5"
                      stroke="white"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <p className="footer_title">Join the squad for updates</p>
              <div className="flex p-[1px] email_input mt-[30px] xl:me-[150px] md:me-[30px]">
                <input
                  className="w-full h-full bg-transparent border border-none outline-none outline-[0px] px-[10px] text-white"
                  placeholder="EMAIL"
                ></input>
                <button className="bg-white w-[100px] rounded-[30px] font-Maxeville hover:opacity-60">
                  JOIN
                </button>
              </div>
              <div className="mt-[20px]">
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  className="hidden"
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor="agree"
                  className="flex items-center cursor-pointer"
                >
                  <div className="min-w-[15px] min-h-[15px] flex items-center justify-center border-2 border-gray-400 mr-2 rounded">
                    {isChecked && (
                      <svg
                        className="w-[9px] h-[9px] text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </div>
                  <p className="checkbox_label">
                    I agree to receive emails from SQUAD and the data privacy
                    statement
                  </p>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[40px] space">
          <p className="second_title">SQUAD LABS</p>
          <p className="second_title">+44-02071013384</p>
          <p className="second_title">CO.NUMBER 15567909, HUCKLETREE,</p>
          <div className="w-full lg:grid grid-cols-2 md:grid ">
            <div>
              <p className="second_title">213 OXFORD STREET, W1D 2LG, LONDON</p>
            </div>
            <div>
              <p className="second_title">
                ALL RIGHTS RESERVED SQUAD LABS (c) 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
