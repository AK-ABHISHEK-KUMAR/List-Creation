import PropTypes from "prop-types";
import styled from "styled-components";

const Card = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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

const ListItemCard = ({ item }) => (
  <Card>
    <ItemName>{item.name}</ItemName>
    <ItemDescription>{item.description}</ItemDescription>
  </Card>
);
ListItemCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ListItemCard;
