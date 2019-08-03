
import PropTypes from 'prop-types'
import { Card, Button, Divider } from 'antd'

// Phartilhar - Share
// Doar - Donate
// Já doou - Donated
// Perdido - Lost
// Dono - Gift
// LIGAR - Phone

function CustomCard({
  id,
  name,
  image,
  date,
  gift,
  price,
  donated,
  onClickDonate,
}) {
  return (
    <Card
      hoverable
      extra={
        <Button type="primary">
          Phartilhar
        </Button>
      }
      title={`${name} -- #${id}`}
      cover={
        <img
          alt={name}
          src={image}
        />
      }
    >
      <div>
        <strong>Perdido</strong>
        <span style={{ float: 'right' }}>{date}</span>
      </div>
      <div>
        <strong>Dono</strong>
        <span style={{ float: 'right' }}>{gift}</span>
      </div>
      <div>
        <strong>Localidade</strong>
        <span style={{ float: 'right' }}>Faro</span>
      </div>
      <Divider />
      <div>
        <strong>${price}</strong>
        <span style={{ float: 'right' }}>
          {donated ? (
            <Button type='primary' disabled>
              Já doou
            </Button>
          ) : (
            <Button type='primary' onClick={onClickDonate}>
              Doar
            </Button>
          )}

        </span>
      </div>
      <Divider />
      <Button block type='primary' size='large'>
        LIGAR
      </Button>
    </Card>
  );
}

CustomCard.defaultProps = {
  donated: false,
};

CustomCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  gift: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default CustomCard;