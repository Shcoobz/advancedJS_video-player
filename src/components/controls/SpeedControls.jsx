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

export default SpeedControls;
