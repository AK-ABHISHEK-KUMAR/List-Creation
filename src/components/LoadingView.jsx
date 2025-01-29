import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffffff;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 255, 0.2);
  border-top: 5px solid #3b82f6;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #4a4a4a;
`;

const LoadingSpinner = () => {
    return (
        <LoadingContainer>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", }}>
                <Spinner />
                <LoadingText>Loading...</LoadingText>
            </div>
        </LoadingContainer>
    );
};

export default LoadingSpinner;
