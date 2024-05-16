import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

/**
 * SpeedControls provides a dropdown select element for users to change the playback speed of media.
 * This component renders a select box with pre-defined speed options, which when changed, triggers a callback.
 * @param {Function} onSpeedChange - Callback function to be invoked when the playback speed is changed via the dropdown.
 */
function SpeedControls({ onSpeedChange }) {
  const [selectedSpeed, setSelectedSpeed] = useState('1');

  /**
   * React effect that updates the video playback speed whenever the `selectedSpeed` state or `onSpeedChange` callback changes.
   * It effectively simulates a change event to adjust the playback speed based on the selected option.
   */
  useEffect(() => {
    onSpeedChange({ target: { value: selectedSpeed } });
  }, [onSpeedChange, selectedSpeed]);

  /**
   * Handles changes to the speed selection dropdown.
   * Sets the new speed using the `setSelectedSpeed` state updater function and invokes the `onSpeedChange` callback.
   * @param {Event} e - The event object that includes the newly selected speed value.
   */
  function handleSpeedChange(e) {
    setSelectedSpeed(e.target.value);
    onSpeedChange(e);
  }

  return (
    <div className='speed' title='Playback Rate'>
      <select
        name='playbackRate'
        className='player-speed'
        onChange={handleSpeedChange}
        value={selectedSpeed}>
        <option value='0.5'>0.5x</option>
        <option value='0.75'>0.75x</option>
        <option value='1'>1x</option>
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
