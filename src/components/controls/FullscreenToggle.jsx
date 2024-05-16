import PropTypes from 'prop-types';

function FullscreenToggle({ onFullscreenToggle }) {
  return (
    <div className='fullscreen'>
      <i className='fas fa-expand' onClick={onFullscreenToggle}></i>
    </div>
  );
}

FullscreenToggle.propTypes = {
  onFullscreenToggle: PropTypes.func.isRequired,
};

export default FullscreenToggle;
