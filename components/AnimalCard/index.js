
import PropTypes from 'prop-types'
import { Card, Button, Spin } from 'antd'
import ProgressiveImage from 'react-progressive-image'

function AnimalCard({
  id,
  petName,
  image,
  disabled,
  children,
}) {
  const RenderImage = () => {
    const dominantImageColor = '#ececec';
    const placeholder = (
      <div
        style={{
          backgroundColor: dominantImageColor,
          height: 352,
          width: 510,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin size="large" />
      </div>
    );
    return (
      <ProgressiveImage delay={1000} src={image} placeholder="">
        {(src, loading) => {
          return loading ? placeholder : <img src={src} alt={petName} />;
        }}
      </ProgressiveImage>
    );
  };
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
        <RenderImage />
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