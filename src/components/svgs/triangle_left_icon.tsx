import theme from "@/constants/theme";

export default function TriangleLeftIcon({
  fill = theme.colors.chocolateMain,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
    >
      <path
        d="M7 7L13.2929 0.707105C13.9229 0.0771403 15 0.523309 15 1.41421V14C15 14.5523 14.5523 15 14 15H1.41421C0.523308 15 0.0771421 13.9229 0.707107 13.2929L7 7Z"
        fill={fill}
      />
    </svg>
  );
}
