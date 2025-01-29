import styled from "styled-components";
import PropTypes from 'prop-types';
import ListItemCard from "./ListItemCard";

const ListContainer = styled.div`
  background-color: #e6f3ff;
  padding: 1rem;
  border-radius: 8px;
  min-width: 320px;
  max-height: 100vh;
  overflow-y: auto;
`;

const ListTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;

  input {
    margin-right: 10px;
  }
`;

const ListItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SelectableList = ({ list, isSelected, onSelect }) => (
  <ListContainer>
    <ListTitle>
      <input type="checkbox" checked={isSelected} onChange={onSelect} />
      {`List ${list.list_number} (${list.items.length})`}
    </ListTitle>
    <ListItems>
      {list.items.map((item) => (
        <ListItemCard key={item.id} item={item} />
      ))}
    </ListItems>
  </ListContainer>
);

SelectableList.propTypes = {
  list: PropTypes.shape({
    list_number: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SelectableList;
