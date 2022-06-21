import React from "react";
import styled, { keyframes } from "styled-components";

function blink() {
  return keyframes`
        50%{
            opacity:1;
        }
    `;
}

const AnimatedComponent = styled.h6`
  animation: ${blink} 1s infinite ease-in-out;
`;
export default function AnimatedText(props: { className?: string | any; data: string | number | any; }) {
  return <AnimatedComponent className={props.className}>{props.data}</AnimatedComponent>;
}
