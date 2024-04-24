"use client";
import useUIControlStore from "@/store/UI_control/landingpage";
import useUserStore from "@/store/user_infor/userinfor";

const Welcome = () => {
  const setWelcomeState = useUIControlStore(
    (state) => state.updateWelcomeModal
  );
  const userNameState = useUserStore((state) => state.username);
  let username = userNameState;
  return (
    <>
      <div className="welcome-container">
        <div
          className="closeBtn"
          onClick={() => {
            setWelcomeState(false);
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
        <div className="welcome_form">
          <p className="welcome_text">Welcome to Squad, {username}</p>
          <p className="welcome_text mt-[30px]">
            Stay tuned for more updates
            <br /> coming Summer 2024.
          </p>
          <div
            className="flex items-center justify-center mt-[30px]"
            onClick={() => {
              setWelcomeState(false);
            }}
          >
            <svg
              width="42"
              height="40"
              viewBox="0 0 42 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="9.38938"
                cy="8.75"
                rx="8.88938"
                ry="8.75"
                fill="#322A44"
              />
              <ellipse
                cx="32.2478"
                cy="8.75"
                rx="8.88938"
                ry="8.75"
                fill="#322A44"
              />
              <ellipse
                cx="20.8188"
                cy="20"
                rx="9.0708"
                ry="8.92857"
                fill="#322A44"
              />
              <ellipse
                cx="9.5708"
                cy="31.0714"
                rx="9.0708"
                ry="8.92857"
                fill="#322A44"
              />
              <ellipse
                cx="32.4292"
                cy="31.0714"
                rx="9.0708"
                ry="8.92857"
                fill="#322A44"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
