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

export default VolumeControls;
