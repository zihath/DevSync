import styled from "styled-components";

export const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  /* Pure Black Background */
  background: #000000; /* Fallback */
  background: linear-gradient(
    135deg,
    #000000 25%,
    #080808 25%,
    #080808 50%,
    #000000 50%,
    #000000 75%,
    #080808 75%,
    #080808
  );
  background-size: 40px 40px;

  /* Deep Shadow Overlay for More Darkness */
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8); /* Extra dark overlay */
    z-index: 1;
  }

  /* Ensure content stays above overlay */
  h1 {
    position: relative;
    z-index: 2;
  }

  /* Animation */
  animation: move 4s linear infinite;

  @keyframes move {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 40px 40px;
    }
  }
`;
