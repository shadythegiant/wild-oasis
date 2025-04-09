import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 4rem;
      font-weight: 400;
      text-transform: capitalize;
      letter-spacing: 5px;
      text-align: center;
      color: var(--color-brand-500);
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 400;
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1rem;
      font-weight: 400;
    `}

    line-height : 1.4;
`;

export default Heading;
