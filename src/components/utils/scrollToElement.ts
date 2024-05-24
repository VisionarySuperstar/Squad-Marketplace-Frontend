"use client";

export function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    const elementTop = element.getBoundingClientRect().top;
    const windowScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    window.scrollTo({
      top: elementTop - 180 + windowScrollTop,
      behavior: "smooth",
    });
  }
}
