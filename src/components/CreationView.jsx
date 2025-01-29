import PropTypes from "prop-types";
import styled from "styled-components";
import EditableList from "./EditableList";

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ListsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin: 0 10px;

  &.secondary {
    background-color: #6c757d;
    color: white;

    &:hover {
      background-color: #5a6268;
    }
  }

  &.primary {
    background-color: #3b82f6;
    color: white;

    &:hover {
      background-color: #2563eb;
    }
  }
`;

const CreationView = ({ leftList, middleList, rightList, onMoveItem, onCancel, onUpdate }) => (
  <Container>
    <Title>Create a New List</Title>

    <ListsContainer>
      <EditableList list={leftList} position="left" onMoveRight={(itemId) => onMoveItem("left", "middle", itemId)} />
      <EditableList
        list={middleList}
        position="middle"
        onMoveLeft={(itemId) => onMoveItem("middle", "left", itemId)}
        onMoveRight={(itemId) => onMoveItem("middle", "right", itemId)}
      />
      <EditableList list={rightList} position="right" onMoveLeft={(itemId) => onMoveItem("right", "middle", itemId)} />
    </ListsContainer>

    <ButtonContainer>
      <Button className="secondary" onClick={onCancel}>Cancel</Button>
      <Button className="primary" onClick={onUpdate}>Update</Button>
    </ButtonContainer>
  </Container>
);
CreationView.propTypes = {
  leftList: PropTypes.array.isRequired,
  middleList: PropTypes.array.isRequired,
  rightList: PropTypes.array.isRequired,
  onMoveItem: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CreationView;
