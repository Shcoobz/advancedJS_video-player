import PropTypes from 'prop-types';

/**
 * VolumeControls component offers UI elements for controlling the media volume.
 * It includes a mute/unmute icon and a volume slider for precise control.
 * @param {Function} onToggleMute - Callback function triggered when the mute/unmute icon is clicked.
 * @param {Function} onVolumeMouseDown - Callback function triggered when the user interacts with the volume slider.
 */
function VolumeControls({ onToggleMute, onVolumeMouseDown }) {
  return (
    <div className='volume'>
      <div className='volume-icon'>
        <i
          className='fas fa-volume-up'
          title='Mute'
          id='volume-icon'
          onClick={onToggleMute}></i>
      </div>
      <div className='volume-range' title='Change Volume' onClick={onVolumeMouseDown}>
        <div className='volume-bar'></div>
      </div>
    </div>
  );
}

VolumeControls.propTypes = {
  onToggleMute: PropTypes.func.isRequired,
  onVolumeMouseDown: PropTypes.func.isRequired,
};

export default VolumeControls;
