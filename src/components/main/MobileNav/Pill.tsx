"use client";

import styled from "styled-components";

type PillProps = {
  $active: boolean;
  $paddingX?: string;
  $connectedLeft: boolean;
  $connectedRight: boolean;
};

const computeBorderRadius = (
  connectedLeft: boolean,
  connectedRight: boolean
): string => {
  const leftRadius = connectedLeft ? "0" : "100px";
  const rightRadius = connectedRight ? "0" : "100px";
  return `${leftRadius} ${rightRadius} ${rightRadius} ${leftRadius}`;
};

const Pill = styled.button<PillProps>`
  background-color: ${({ $active, theme }) =>
    $active ? "white" : theme.colors.chocolateMain};
  color: ${({ $active }) => ($active ? "black" : "white")};
  display: inline-block;
  padding: ${({ $paddingX }) => `0 ${$paddingX || "20px"}`};
  border-radius: ${({ $connectedLeft, $connectedRight }) =>
    computeBorderRadius($connectedLeft, $connectedRight)};
  margin: ${({ $connectedLeft, $connectedRight }) =>
    `0 ${$connectedRight ? "0" : "5px"} 0 ${$connectedLeft ? "0" : "5px"}`};
  height: 30px;
  line-height: 30px;
`;

export default Pill;
