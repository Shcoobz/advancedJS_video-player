function PlayControls({ onPlayToggle }) {
  return (
    <div className='play-controls'>
      <i className='fas fa-play' title='Play' id='play-btn' onClick={onPlayToggle}></i>
    </div>
  );
}

export default PlayControls;
