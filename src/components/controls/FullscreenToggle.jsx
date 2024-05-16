import PropTypes from 'prop-types';

/**
 * FullscreenToggle provides a UI element for toggling full screen mode.
 * It renders an icon that, when clicked, will invoke the `onFullscreenToggle` callback.
 * @param {Function} onFullscreenToggle - Callback function to be called when the fullscreen toggle is activated.
 */
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
