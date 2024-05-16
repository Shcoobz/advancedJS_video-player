function FullscreenToggle({ onFullscreenToggle }) {
  return (
    <div className='fullscreen'>
      <i className='fas fa-expand' onClick={onFullscreenToggle}></i>
    </div>
  );
}

export default FullscreenToggle;
