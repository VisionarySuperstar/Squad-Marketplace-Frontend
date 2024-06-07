import styled from "styled-components";

const FilterElement = styled.span`
  color: ${({ theme }) => theme.colors.chocolateMain};
  font-family: "Maxeville";
  font-size: 16px;
  font-style: normal;
  line-height: 24px; /* 133.333% */
  letter-spacing: 0.9px;
  text-transform: uppercase;
`;

export default FilterElement;
