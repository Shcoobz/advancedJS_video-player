import { useEffect, useRef, useState } from 'react';

import PlayControls from './controls/PlayControls';
import VolumeControls from './controls/VolumeControls';
import SpeedControls from './controls/SpeedControls';
import FullscreenToggle from './controls/FullscreenToggle';

const VIDEO_URL =
  'https://assets.mixkit.co/videos/preview/mixkit-a-couple-of-cats-in-the-snow-9949-large.mp4';

/**
 * Constants used within the Player component for time and volume calculations.
 */
const SECONDS_PER_MINUTE = 60;
const PERCENT_MAX = 100;
const VOLUME_LEVELS = {
  ZERO: 0,
  LOW: 0.1,
  MIDDLE: 0.5,
  HIGH: 0.9,
  MAX: 1,
};

/**
 * Player component that encapsulates video playback controls including play/pause, volume control, playback speed, and fullscreen toggle.
 */
function Player() {
  const videoRef = useRef(null);
  const [lastVolume, setLastVolume] = useState(VOLUME_LEVELS.MIDDLE);
  const [fullscreen, setFullscreen] = useState(false);

  /**
   * Toggles between play and pause icons and titles based on the action performed.
   * @param {string} icon - Current icon class to be replaced.
   * @param {string} action - New icon class to replace the old one.
   * @param {string} title - Title to set for the icon, reflecting the current state.
   */
  function toggleIcon(icon, action, title) {
    const playBtn = document.getElementById('play-btn');

    playBtn.classList.replace(`fa-${icon}`, `fa-${action}`);
    playBtn.setAttribute('title', title);
  }

  /**
   * Formats time in seconds into a minute:second string.
   * @param {number} time - Time in seconds to be formatted.
   * @returns {string} Formatted time as a string.
   */
  function displayTime(time) {
    const minutes = Math.floor(time / SECONDS_PER_MINUTE);
    const seconds = Math.floor(time % SECONDS_PER_MINUTE)
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}`;
  }

  /**
   * Updates the video progress bar and time display based on current playback position.
   */
  function updateProgress() {
    const PERCENT_MAX = 100;

    const video = videoRef.current;
    const progress = (video.currentTime / video.duration) * PERCENT_MAX;

    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${progress}%`;

    const currentTime = document.querySelector('.time-elapsed');
    currentTime.textContent = `${displayTime(video.currentTime)} / `;

    const duration = document.querySelector('.time-duration');
    duration.textContent = displayTime(video.duration);
  }

  /**
   * Handles play toggle functionality. Plays or pauses the video based on its current state and updates the UI accordingly.
   */
  function onPlayToggle() {
    const video = videoRef.current;

    if (video.paused) {
      video.play();
      toggleIcon('play', 'pause', 'Pause');
    } else {
      video.pause();
      toggleIcon('pause', 'play', 'Play');
    }
  }

  /**
   * Handles actions to take when video playback ends, such as resetting play icon.
   */
  function onVideoEnd() {
    toggleIcon('pause', 'play', 'Replay');
  }

  /**
   * Sets the video playback position based on user interaction with the progress bar.
   * @param {MouseEvent} e - The event triggered by mouse interaction with the progress bar.
   */
  function onProgressMouseDown(e) {
    const video = videoRef.current;
    const progressRange = e.currentTarget;
    const newTime = (e.nativeEvent.offsetX / progressRange.offsetWidth) * video.duration;

    video.currentTime = newTime;

    updateProgress();
  }

  /**
   * Updates the volume icon based on the current volume level.
   * @param {number} volume - Current volume level.
   */
  function updateVolumeIcon(volume) {
    const volumeIcon = document.getElementById('volume-icon');
    volumeIcon.className = '';

    if (volume > VOLUME_LEVELS.MIDDLE) {
      volumeIcon.classList.add('fas', 'fa-volume-up');
      volumeIcon.setAttribute('title', 'Mute');
    } else if (volume < VOLUME_LEVELS.MIDDLE && volume > VOLUME_LEVELS.ZERO) {
      volumeIcon.classList.add('fas', 'fa-volume-down');
      volumeIcon.setAttribute('title', 'Mute');
    } else if (volume === VOLUME_LEVELS.ZERO) {
      volumeIcon.classList.add('fas', 'fa-volume-mute');
      volumeIcon.setAttribute('title', 'Unmute');
    }
  }

  /**
   * Handles volume adjustments via the volume bar.
   * @param {MouseEvent} e - The event triggered by mouse interaction with the volume bar.
   */
  function onVolumeMouseDown(e) {
    const video = videoRef.current;
    const volumeRange = e.currentTarget;
    let volume = e.nativeEvent.offsetX / volumeRange.offsetWidth;

    volume = Math.min(Math.max(volume, VOLUME_LEVELS.ZERO), VOLUME_LEVELS.MAX);

    video.volume = volume;
    const volumeBar = document.querySelector('.volume-bar');
    volumeBar.style.width = `${volume * PERCENT_MAX}%`;

    updateVolumeIcon(volume);
  }

  /**
   * Toggles mute state based on current volume. Mutes or unmutes the video and updates the UI accordingly.
   */
  function onToggleMute() {
    const video = videoRef.current;
    const isMuted = video.volume === VOLUME_LEVELS.ZERO;

    if (isMuted) {
      video.volume = lastVolume;
      const volumeBar = document.querySelector('.volume-bar');
      volumeBar.style.width = `${lastVolume * PERCENT_MAX}%`;
    } else {
      setLastVolume(video.volume);
      video.volume = VOLUME_LEVELS.ZERO;
      const volumeBar = document.querySelector('.volume-bar');
      volumeBar.style.width = '0%';
    }

    updateVolumeIcon(video.volume);
  }

  /**
   * Updates video playback speed based on user selection from the speed controls dropdown.
   */
  function onSpeedChange() {
    const video = videoRef.current;
    const speed = document.querySelector('.player-speed');
    video.playbackRate = speed.value;
  }

  /**
   * Enters fullscreen mode for the player container.
   * @param {HTMLElement} elem - Element to display in fullscreen.
   */
  function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullscreen) {
      elem.mozRequestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }

    const video = videoRef.current;
    video.classList.add('video-fullscreen');
  }

  /**
   * Exits fullscreen mode and restores the player to its original state.
   */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullscreen) {
      document.mozCancelFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }

    const video = videoRef.current;
    video.classList.remove('video-fullscreen');
  }

  /**
   * Toggles fullscreen mode on and off.
   */
  function onFullscreenToggle() {
    setFullscreen(!fullscreen);

    const player = document.querySelector('.player');
    !fullscreen ? openFullscreen(player) : closeFullscreen();
  }

  return (
    <div className='player'>
      <video
        src={VIDEO_URL}
        className='video'
        playsInline
        ref={videoRef}
        onTimeUpdate={updateProgress}
        onCanPlay={updateProgress}
        onEnded={onVideoEnd}
        onClick={onPlayToggle}
      />
      <div className='show-controls'>
        <div className='controls-container'>
          <div className='progress-range' title='Seek' onClick={onProgressMouseDown}>
            <div className='progress-bar'></div>
          </div>
          <div className='control-group'>
            <div className='controls-left'>
              <PlayControls onPlayToggle={onPlayToggle} />
              <VolumeControls
                onToggleMute={onToggleMute}
                onVolumeMouseDown={onVolumeMouseDown}
              />
            </div>
            <div className='controls-right'>
              <SpeedControls onSpeedChange={onSpeedChange} />
              <div className='time'>
                <span className='time-elapsed'>00:00 / </span>
                <span className='time-duration'>2:38</span>
              </div>
              <FullscreenToggle onFullscreenToggle={onFullscreenToggle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
