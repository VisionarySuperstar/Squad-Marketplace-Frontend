import styled from "styled-components";

const FilterElement = styled.span`
  color: ${({ theme }) => theme.colors.chocolateMain};
  font-family: ${({ theme }) => theme.fonts.maxevilleMono};
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 133.333% */
  letter-spacing: 0.9px;
  text-transform: uppercase;
`;

export default FilterElement;
