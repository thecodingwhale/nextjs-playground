
import PropTypes from 'prop-types'
import { Card, Button } from 'antd'

function AnimalCard({
  id,
  petName,
  image,
  disabled,
  children,
}) {
  return (
    <Card
      hoverable
      extra={
        <Button
          type="primary"
          disabled={disabled}
        >
          Share
        </Button>
      }
      title={`${petName} -- #${id}`}
      cover={
        <img
          alt={petName}
          src={image}
        />
      }
    >
      {children}
    </Card>
  );
}

AnimalCard.defaultProps = {
  donated: false,
  disabled: true,
};

AnimalCard.propTypes = {
  id: PropTypes.number.isRequired,
  petName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default AnimalCard;