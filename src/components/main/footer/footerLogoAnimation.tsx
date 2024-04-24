import { useRouter } from "next/navigation";

const FooterLogoAnimation = () => {
  const router = useRouter();
  const footerLogoHandleHover = () => {
    const circle_1: HTMLElement = document.querySelector(
      ".logo_circle_1"
    ) as HTMLElement;

    circle_1.style.top = `calc(var(--perX) * 31)`;
    circle_1.style.left = `calc(var(--perX) * 31)`;
    const circle_2: HTMLElement = document.querySelector(
      ".logo_circle_2"
    ) as HTMLElement;
    circle_2.style.top = `calc(var(--perX) * 31)`;
    circle_2.style.left = `calc(var(--perX) * 31)`;
    const circle_3: HTMLElement = document.querySelector(
      ".logo_circle_3"
    ) as HTMLElement;
    circle_3.style.top = `calc(var(--perX) * 31)`;
    circle_3.style.left = `calc(var(--perX) * 31)`;
    const circle_4: HTMLElement = document.querySelector(
      ".logo_circle_4"
    ) as HTMLElement;
    circle_4.style.top = `calc(var(--perX) * 31)`;
    circle_4.style.left = `calc(var(--perX) * 31)`;
    const circle_5: HTMLElement = document.querySelector(
      ".logo_circle_5"
    ) as HTMLElement;
    circle_5.style.top = `calc(var(--perX) * 31)`;
    circle_5.style.left = `calc(var(--perX) * 31)`;
  };

  const footerLogoHandleMouseOut = () => {
    const circle_1: HTMLElement = document.querySelector(
      ".logo_circle_1"
    ) as HTMLElement;
    circle_1.style.top = `calc(var(--perX) * 0)`;
    circle_1.style.left = `calc(var(--perX) * 0)`;
    const circle_2: HTMLElement = document.querySelector(
      ".logo_circle_2"
    ) as HTMLElement;
    circle_2.style.top = `calc(var(--perX) * 0)`;
    circle_2.style.left = `calc(var(--perX) * 63)`;
    const circle_3: HTMLElement = document.querySelector(
      ".logo_circle_3"
    ) as HTMLElement;
    circle_3.style.top = `calc(var(--perX) * 31)`;
    circle_3.style.left = `calc(var(--perX) * 31)`;
    const circle_4: HTMLElement = document.querySelector(
      ".logo_circle_4"
    ) as HTMLElement;
    circle_4.style.top = `calc(var(--perX) * 63)`;
    circle_4.style.left = `calc(var(--perX) * 0)`;
    const circle_5: HTMLElement = document.querySelector(
      ".logo_circle_5"
    ) as HTMLElement;
    circle_5.style.top = `calc(var(--perX) * 63)`;
    circle_5.style.left = `calc(var(--perX) * 63)`;
  };
  return (
    <>
      <div
        className="footer_logo"
        onClick={() => {
          router.push("/");
        }}
        onMouseEnter={() => {
          footerLogoHandleHover();
        }}
        onMouseLeave={() => {
          footerLogoHandleMouseOut();
        }}
      >
        <div className="logo_circle_1">
          <svg
            className="footer_circle_svg"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="25" cy="25" r="25" fill="white" />
          </svg>
        </div>
        <div className="logo_circle_2">
          <svg
            className="footer_circle_svg"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="25" cy="25" r="25" fill="white" />
          </svg>
        </div>
        <div className="logo_circle_3">
          <svg
            className="footer_circle_svg"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="25" cy="25" r="25" fill="white" />
          </svg>
        </div>
        <div className="logo_circle_4">
          <svg
            className="footer_circle_svg"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="25" cy="25" r="25" fill="white" />
          </svg>
        </div>
        <div className="logo_circle_5">
          <svg
            className="footer_circle_svg"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="25" cy="25" r="25" fill="white" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default FooterLogoAnimation;
