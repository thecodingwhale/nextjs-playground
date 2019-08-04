
import PropTypes from 'prop-types'
import { Card, Button, Divider } from 'antd'

function CustomCard({
  id,
  name,
  image,
  date,
  gift,
  price,
  donated,
  disabled,
  onClickDonate,
}) {
  return (
    <Card
      hoverable
      extra={
        <Button type="primary" disabled={disabled}>
          Share
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
        <strong>Lost</strong>
        <span style={{ float: 'right' }}>{date}</span>
      </div>
      <div>
        <strong>Gift</strong>
        <span style={{ float: 'right' }}>{gift}</span>
      </div>
      <div>
        <strong>Location</strong>
        <span style={{ float: 'right' }}>Faro</span>
      </div>
      <Divider />
      <div>
        <strong>${price}</strong>
        <span style={{ float: 'right' }}>
          {donated ? (
            <Button type='primary' disabled>
              Donated
            </Button>
          ) : (
            <Button type='primary' onClick={onClickDonate} disabled={disabled}>
              {disabled ? 'Donating...' : 'Donate'}
            </Button>
          )}

        </span>
      </div>
      <Divider />
      <Button block type='primary' size='large' disabled={disabled}>
        Phone
      </Button>
    </Card>
  );
}

CustomCard.defaultProps = {
  donated: false,
  disabled: true,
};

CustomCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  gift: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  donated: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default CustomCard;