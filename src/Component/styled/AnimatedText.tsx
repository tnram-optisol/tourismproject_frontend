import React from "react";
import styled, { keyframes } from "styled-components";

function blink() {
  return keyframes`
        0%{
          font-size:20px;
          font-weight:bolder;
          color:blue;
          text-shadow:2px 2px 2px yellow
        }
        100%{
          font-size:20px;
          font-weight:bolder;
          color:red;
        }
    `;
}

const AnimatedComponent = styled.h6`
  animation: ${blink} 1s infinite ease-in-out;
  color: red;
`;
export default function AnimatedText(props: {
  className?: string | any;
  data: string | number | any;
}) {
  return (
    <AnimatedComponent className={props.className}>
      {props.data}
    </AnimatedComponent>
  );
}
