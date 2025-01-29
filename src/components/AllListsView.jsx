import PropTypes from "prop-types";
import styled from "styled-components";
import SelectableList from "./SelectableList";

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

const Button = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #2563eb;
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 1rem;
  margin-top: 1rem;
`;

const ListsContainer = styled.div`
  display: flex;
  justify-content: start;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const AllListsView = ({ lists, selectedListIds, onSelectList, errorMessage, onCreateNewList }) => (
  <Container>
    <Title>List Creation</Title>
    <Button onClick={onCreateNewList}>Create a new list</Button>
    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

    <ListsContainer>
      {lists.map((list) => (
        <SelectableList
          key={list.id}
          list={list}
          isSelected={selectedListIds.includes(list.id)}
          onSelect={() => onSelectList(list.id)}
        />
      ))}
    </ListsContainer>
  </Container>
);
AllListsView.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedListIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSelectList: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  onCreateNewList: PropTypes.func.isRequired,
};

export default AllListsView;
