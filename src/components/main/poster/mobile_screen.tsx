import MobileLogo from "../logo/mobile_logo";
import useLoadingControlStore from "@/store/UI_control/loading";
import { useRouter } from "next/navigation";

const Mobile = () => {
  const handleLogoClick = () => {
    const main_container: HTMLElement = document.querySelector(
      ".main_container"
    ) as HTMLElement;
    const mobile_logo: HTMLElement = document.querySelector(
      ".mobile_logo_svg"
    ) as HTMLElement;
    const Logo: HTMLElement = document.querySelector(".Logo") as HTMLElement;
    const mobile_logo_container: HTMLElement = document.querySelector(
      ".mobile_logo_container"
    ) as HTMLElement;
    const MobileTitle: HTMLElement = document.querySelector(
      ".mobile_title"
    ) as HTMLElement;
    MobileTitle.style.display = "block";
    mobile_logo_container.style.top = "0px";
    Logo.style.cssText = "top: 70px; left: 20px;";
    main_container.style.display = "block";
    mobile_logo.style.width = `calc(var(--perX) * 150)`;
    mobile_logo.style.height = `calc(var(--perX) * 150)`;
  };
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );
  const router = useRouter();
  return (
    <>
      <div
        className="mobile_screen"
        onPointerMove={() => {
          handleLogoClick();
        }}
      >
        <div className="mobile_screen_background"></div>
        <div className="flex justify-center">
          <div className="text-center mx-[30px] mobile_title">
            <p>
              Finally, a digital market for <br />
              fashion creatives. <br />
              Prepare with your team <br />
              (SQUAD)
            </p>
          </div>
        </div>

        <div className="mobile_join_btn active:translate-y-1">
          <div
            className="join_btn"
            onClick={() => {
              router.push("/discover");
              setLoadingState(true);
            }}
          >
            <p className="tracking-[1px] font-bold ">Open App</p>
          </div>
        </div>
        <div className="discover_text tracking-[1px]">
          <svg
            width="208"
            height="26"
            viewBox="0 0 208 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_603_842)">
              <path
                d="M4.062 4.04H7.392C10.506 4.076 13.638 6.092 13.638 10.52C13.638 14.93 10.416 16.964 7.392 17H4.062V4.04ZM5.538 15.596H7.302C9.138 15.596 12.072 14.228 12.072 10.538C12.072 8 10.434 5.444 7.302 5.444H5.538V15.596ZM22.195 15.596H25.435V17H17.461V15.596H20.719V5.444H17.587V4.04H25.309V5.444H22.195V15.596ZM38.8521 13.472C38.8521 15.002 37.6641 17.18 34.2981 17.18C30.5901 17.18 29.3841 14.93 29.2761 12.68L30.8601 12.662C30.9501 14.192 31.5981 15.812 34.2981 15.812C35.9181 15.812 37.2681 15.038 37.2681 13.49C37.2681 12.266 36.6561 11.78 35.0901 11.366L33.2001 10.862C31.2741 10.376 29.6721 9.62 29.6721 7.298C29.6721 4.94 31.7601 3.86 33.9381 3.86C36.9981 3.86 38.5461 5.408 38.5461 8.018H36.9621C36.9621 6.218 36.0621 5.246 33.9381 5.246C33.0561 5.246 31.2561 5.444 31.2561 7.28C31.2561 8.324 31.7961 8.99 33.3081 9.368L35.3781 9.926C37.3041 10.34 38.8521 11.24 38.8521 13.472ZM41.8651 10.61C41.8651 6.794 43.1971 3.86 46.9231 3.86C49.8751 3.86 51.2071 5.966 51.4591 8.522L49.8391 8.54C49.3171 5.642 47.6431 5.246 46.8151 5.246C44.3671 5.246 43.5031 7.208 43.5031 10.52C43.5031 13.832 44.6371 15.812 46.9591 15.812C49.6231 15.812 49.8211 13.004 49.9111 12.482L51.4231 12.518C51.1171 14.588 50.1991 17.18 46.9591 17.18C43.5031 17.18 41.8651 14.732 41.8651 10.61ZM59.2781 3.86C62.1581 3.878 64.0661 6.47 64.0661 10.61C64.0661 14.156 62.4101 17.18 59.2781 17.18C56.1461 17.18 54.4901 14.156 54.4901 10.61C54.4901 6.47 56.4161 3.878 59.2781 3.86ZM59.2781 15.812C61.7261 15.812 62.4641 13.454 62.4641 10.52C62.4641 7.496 61.5461 5.246 59.2781 5.246C57.0281 5.246 56.0921 7.496 56.0921 10.52C56.0921 13.454 56.8301 15.812 59.2781 15.812ZM76.6552 4.04L72.8032 17H70.9492L67.0792 4.04H68.8072L71.8852 15.272L74.9452 4.04H76.6552ZM80.2442 17V4.04H88.7402V5.444H81.7202V9.728H88.4522V11.114H81.7202V15.596H88.7402V17H80.2442ZM99.8712 10.79C100.843 11.042 101.401 11.456 101.401 12.788V15.56C101.401 16.1 101.671 16.568 101.869 16.784V17H100.303L100.285 16.982C100.069 16.82 99.9252 16.316 99.9252 15.686V13.022C99.9252 11.906 99.2592 11.33 97.8372 11.33H93.7872V17H92.3112V4.04H97.8732C100.411 4.04 101.887 5.552 101.887 7.73C101.887 9.512 100.753 10.43 99.8712 10.79ZM97.8732 5.588H93.7872V9.926H97.8732C99.4572 9.926 100.411 9.134 100.411 7.73C100.411 6.362 99.4932 5.588 97.8732 5.588Z"
                fill="white"
              />
              <path
                d="M121.272 9.584C123.108 9.962 125.304 10.736 125.304 13.328C125.304 14.498 124.656 15.542 123.594 16.244C122.676 16.838 121.452 17.18 120.192 17.18C117.06 17.18 114.846 15.344 114.72 12.59L116.916 12.536C117.006 14.498 118.68 15.362 120.192 15.362C120.876 15.362 123.054 15.056 123.054 13.346C123.054 12.518 122.442 12.05 120.822 11.636L118.968 11.186C117.114 10.718 115.224 9.908 115.224 7.46C115.224 5.732 116.664 3.86 119.868 3.86C122.928 3.86 124.836 5.498 124.836 8.144H122.64C122.64 6.254 121.128 5.678 119.868 5.678C117.636 5.678 117.402 6.974 117.402 7.46C117.402 8 117.618 8.684 119.238 9.098L121.272 9.584ZM133.466 3.86C136.562 3.86 139.676 5.948 139.676 10.61C139.676 14.048 137.534 16.64 134.474 17.108V18.98H136.526V20.906H132.476V17.108C129.416 16.658 127.292 14.066 127.292 10.61C127.292 6.074 130.28 3.86 133.466 3.86ZM133.466 15.362C135.896 15.362 137.462 13.364 137.462 10.52C137.462 7.64 135.932 5.678 133.466 5.678C131.018 5.678 129.506 7.64 129.506 10.52C129.506 13.364 131.054 15.362 133.466 15.362ZM150.36 12.374V4.04H152.448V12.374C152.448 15.344 150.486 17.18 147.318 17.18C144.15 17.18 142.188 15.344 142.188 12.374V4.04H144.276V12.374C144.276 14.084 145.482 15.362 147.318 15.362C149.154 15.362 150.36 14.084 150.36 12.374ZM159.236 4.04H161.45L166.436 17H164.006L162.764 13.526H157.922L156.68 17H154.25L159.236 4.04ZM158.606 11.582H162.08L160.334 6.722L158.606 11.582ZM173.921 4.04C176.945 4.04 179.915 6.254 179.915 10.52C179.915 14.624 176.585 17 173.921 17H168.791V4.04H173.921ZM173.489 15.056C175.523 15.056 177.683 13.436 177.683 10.538C177.683 7.46 175.505 5.984 173.489 5.984H170.879V15.056H173.489Z"
                fill="white"
              />
              <path
                d="M198.112 4.04H199.588V15.056L203.638 11.006V13.148L199.786 17H197.914L194.062 13.148V11.006L198.112 15.056V4.04Z"
                fill="white"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_603_842"
                x="-1"
                y="0.859985"
                width="210"
                height="25.046"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_603_842"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_603_842"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div
        className="mobile_logo_container justify-center"
        onClick={() => {
          handleLogoClick();
        }}
      >
        <MobileLogo />
      </div>
    </>
  );
};

export default Mobile;
