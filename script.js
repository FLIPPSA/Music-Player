const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const louder = document.getElementById('arr_up');
const quieter = document.getElementById('arr_down');
const volumeNumber = document.querySelector('p');
const counter = document.getElementById('count');
let isPlaying = false;
// Current Song + Counter
let songIndex = 0;
let counterIndex = 1;

const songs = [
  {
    name: 'Sway',
    displayName: 'Sway',
    artist: 'Devang Goud'
  },
  {
    name: 'Good',
    displayName: 'I Feel Good',
    artist: 'Pablo López "Jahvel Johnson"'
  },
  {
    name: 'Maria',
    displayName: 'María, mi vida mi amor',
    artist: 'Uly Boy'
  },
  {
    name: 'Love',
    displayName: 'L O V E',
    artist: 'Michael Bublé'
  },
  {
    name: 'Shawn',
    displayName: 'SSHHAAAAAAAAWWNNN',
    artist: 'Onkel Traver'
  },
  {
    name: 'Natural',
    displayName: 'Natural - Hardstyle',
    artist: 'Imagine Dragons'
  }
]

function playSong(){
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

function pauseSong(){
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause()
}

// Update DOM
function loadSong(song){
  music.volume = 0.5;
  volumeNumber.textContent = `${Math.round(music.volume * 10)}`;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// On Load - Select First Song
loadSong(songs[songIndex]);
// Display Song counter
counter.textContent = `${1} / ${songs.length}`;

function prevSong(){
  if(counterIndex > 1){
    counterIndex--;
    counter.textContent = `${counterIndex} / ${songs.length}`;
  } else{
    counterIndex = songs.length;
    counter.textContent = `${counterIndex} / ${songs.length}`;
  }
  songIndex--;
  if(songIndex < 0){
    songIndex = songs.length -1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong(){
  if(counterIndex < songs.length){
    counterIndex++;
    counter.textContent = `${counterIndex} / ${songs.length}`;
  } else{
    counterIndex = 1;
    counter.textContent = `${counterIndex} / ${songs.length}`;
  }
  songIndex++;
  if(songIndex > songs.length -1){
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgressBar(e){
  if(isPlaying){
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) *100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display dor duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if(durationSeconds < 10){
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if(durationSeconds){
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display dor current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if(currentSeconds < 10){
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Updating Progress Bar
function setProgressBar(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width)*duration;
}

// Setting higher Volume
function setVolume_higher(){
  if(music.volume < 0.9){
    music.volume = music.volume + 0.1;
    volumeNumber.textContent = `${Math.round(music.volume * 10)}`;
  }if(Math.round(music.volume * 10) === 10){
    volumeNumber.classList.replace('volume-number', 'volume-number-10');
  }
}

// Setting lower Volume
function setVolume_lower(){
  if(music.volume > 0.1){
    music.volume = music.volume - 0.1;
    volumeNumber.textContent = `${Math.round(music.volume * 10)}`;
  }
  if(Math.round(music.volume * 10) < 10){
    volumeNumber.classList.replace('volume-number-10', 'volume-number');
  }
}

// Play or Pause EventListener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
// Previous / Next Song EventListeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
louder.addEventListener('click', setVolume_higher);
quieter.addEventListener('click', setVolume_lower);