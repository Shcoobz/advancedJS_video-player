import PropTypes from 'prop-types';

/**
 * PlayControls provides an interactive play button that allows users to toggle play and pause states of media.
 * It displays an icon that, when clicked, will invoke the `onPlayToggle` callback to change the playback state.
 * @param {Function} onPlayToggle - Callback function to be called when the play button is activated.
 */
function PlayControls({ onPlayToggle }) {
  return (
    <div className='play-controls'>
      <i className='fas fa-play' title='Play' id='play-btn' onClick={onPlayToggle}></i>
    </div>
  );
}

PlayControls.propTypes = {
  onPlayToggle: PropTypes.func.isRequired,
};

export default PlayControls;
