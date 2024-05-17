"use client";

import BellIcon from "@/components/svgs/bell_icon";
import { SyntheticEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";


import Pill from "./Pill";

const Nav = styled.nav<{ $active: boolean }>`
  background-color: ${({ $active, theme }) => $active ? theme.colors.chocolateMain : "transparent"};
  height: ${({ theme }) => theme.sizes.mobileNavbarHeight};
  padding-top: 75px;
  text-align: center;
  svg {
    display: inline;
  }
`;

const ConnectionIndicator = styled.span`
  background-color: ${({ theme }) => theme.colors.connectedGreen};
  border-radius: 50%;
  height: 20px;
  width: 20px;
  display: inline-block;
  vertical-align: middle;
`;

const MobileNavPage = styled.div<{ $active: boolean }>`
  display: ${({ $active }) => $active ? "block" : "none"};
  position: absolute;
  height: ${({ theme }) => `calc(100vh - ${theme.sizes.mobileNavbarHeight})`};
  top: ${({ theme }) => theme.sizes.mobileNavbarHeight};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.chocolateMain};
  z-index: 1000;
  padding: 0 20px;
  color: white;
  li {
    margin-bottom: 15px;
  }
`;


type NavbarLinkProps = {
  title: string;
  href: string;
};

const MobileNav = () => {
  const [active, setActive] = useState(false);
  const [activeTab, setActiveTab] = useState(-1);

  const handleClick = (index: number) => {
    setActive(true);
    setActiveTab(index);
  }

  const items = [
    { element: <>SQUAD</>, onClick: () => setActive(true) },
    { element: <>0.026 ETH</> },
    { element: <BellIcon /> },
    { element: <ConnectionIndicator />, pillProps: { $paddingX: "0.3rem" } }
  ];

  const getConnections = (index: number) => {
    const $connectedLeft = index !== 0 && activeTab !== index && activeTab !== index - 1;
    const $connectedRight = index !== items.length - 1 && activeTab !== index && activeTab !== index + 1;
    return { $connectedLeft, $connectedRight };
  };

  const close = (e?: SyntheticEvent) => {
    if (e) e.preventDefault();
    setActive(false);
    setActiveTab(-1);
  }

  const NavbarLink = ({ title, href }: NavbarLinkProps) => {
    return (
      <li><Link onClick={() => close()} href={href}>{title}</Link></li>)
  };


  return (
    <>
      <Nav $active={active}>
        {items.map((item, index) =>
          <Pill key={index} $active={active} {...getConnections(index)} {...item.pillProps}
            onClick={() => handleClick(index)}>{item.element}</Pill>
        )}
      </Nav>
      <MobileNavPage $active={active}>
        <div>
          <div className="text-right">
            <a href="#" className="text-gray-500 text-sm" onClick={close}>CLOSE</a>
          </div>
          <ul>
            <NavbarLink href="/discover" title="Discover" />
            <NavbarLink href="/marketplace" title="Marketplace" />
            <NavbarLink href="/groups" title="Groups" />
            <NavbarLink href="/about" title="About" />
            <NavbarLink href="/newsletter" title="Newsletter" />
            <NavbarLink href="/contact" title="Contact" />
            <NavbarLink href="/search" title="Search" />
          </ul>
        </div>

      </MobileNavPage>
    </>
  );
};

export default MobileNav;
