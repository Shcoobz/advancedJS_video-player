import PropTypes from 'prop-types';

/**
 * SpeedControls provides a dropdown select element for users to change the playback speed of media.
 * This component renders a select box with pre-defined speed options, which when changed, triggers a callback.
 * @param {Function} onSpeedChange - Callback function to be invoked when the playback speed is changed via the dropdown.
 */
function SpeedControls({ onSpeedChange }) {
  return (
    <div className='speed' title='Playback Rate'>
      <select name='playbackRate' className='player-speed' onChange={onSpeedChange}>
        <option value='0.5'>0.5x</option>
        <option value='0.75'>0.75x</option>
        <option value='1' defaultValue>
          1x
        </option>
        <option value='1.5'>1.5x</option>
        <option value='2'>2x</option>
      </select>
    </div>
  );
}

SpeedControls.propTypes = {
  onSpeedChange: PropTypes.func.isRequired,
};

export default SpeedControls;
