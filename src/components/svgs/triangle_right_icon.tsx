import theme from "@/constants/theme";

export default function TriangleRightIcon({
  fill = theme.colors.chocolateMain,
}) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 7L1.70711 0.707105C1.07714 0.0771403 0 0.523309 0 1.41421V14C0 14.5523 0.447715 15 1 15H13.5858C14.4767 15 14.9229 13.9229 14.2929 13.2929L8 7Z"
        fill={fill}
      />
    </svg>
  );
}
