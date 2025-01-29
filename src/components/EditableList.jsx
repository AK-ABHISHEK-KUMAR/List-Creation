import PropTypes from "prop-types";
import styled from "styled-components";

const ListContainer = styled.div`
  background-color: #e6f3ff;
  padding: 1rem;
  border-radius: 8px;
  min-width: 320px;
  max-height: 100vh;
  overflow-y: auto;
  flex: 1;
`;

const ListTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ListItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemDetails = styled.div`
  text-align: left;
`;

const ItemName = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
`;

const ItemDescription = styled.p`
  font-size: 0.9rem;
  color: #555;
`;

const Arrows = styled.div`
  display: flex;
  gap: 5px;
`;

const ArrowButton = styled.button`
  background-color: transparent;
  border: 1px solid #3b82f6;
  color: #3b82f6;
  font-size: 1rem;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #3b82f6;
    color: white;
  }
`;

const EditableList = ({ list, position, onMoveLeft, onMoveRight }) => (
    <ListContainer>
        <ListTitle>{`List ${list.list_number} (${list.items.length})`}</ListTitle>

        <ListItems>
            {list.items.map((item) => (
                <Card key={item.id}>
                    <ItemDetails>
                        <ItemName>{item.name}</ItemName>
                        <ItemDescription>{item.description}</ItemDescription>
                    </ItemDetails>

                    <Arrows>
                        {position !== "left" && <ArrowButton onClick={() => onMoveLeft(item.id)}>←</ArrowButton>}
                        {position !== "right" && <ArrowButton onClick={() => onMoveRight(item.id)}>→</ArrowButton>}
                    </Arrows>
                </Card>
            ))}
        </ListItems>
    </ListContainer>
);

EditableList.propTypes = {
    list: PropTypes.shape({
        list_number: PropTypes.number.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
    position: PropTypes.oneOf(["left", "right", "middle"]).isRequired,
    onMoveLeft: PropTypes.func.isRequired,
    onMoveRight: PropTypes.func.isRequired,
};

export default EditableList;