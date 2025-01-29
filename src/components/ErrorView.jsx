import styled from "styled-components";
import PropTypes from 'prop-types';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  font-family: "Arial", sans-serif;
`;

const ErrorImage = styled.img`
  width: 350px;
  margin-bottom: 20px;
`;

const ErrorText = styled.p`
  font-size: 18px;
  color: #4a4a4a;
  margin-bottom: 20px;
`;

const RetryButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  
  &:hover {
    background-color: #2563eb;
  }
`;

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <ErrorContainer>

      <ErrorImage
        src="/error-image.png"
        alt="Error illustration"
      />

      <ErrorText>{message || "Something went wrong. Please try again"}</ErrorText>

      <RetryButton onClick={onRetry}>Try Again</RetryButton>
    </ErrorContainer>
  );
};
ErrorMessage.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
};

export default ErrorMessage;
