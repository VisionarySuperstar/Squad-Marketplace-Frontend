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
