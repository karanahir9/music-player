const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById ('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


//Music
const songs = [
    {
        name: 'genxkavi-1',
        displayName: 'Biodiversity',
        artist: 'GenXKavi'
    },
    {
        name: 'genxkavi-2',
        displayName: 'Cockroach',
        artist: 'GenXKavi | Rsquare | J-Sha'
    },
    {
        name: 'genxkavi-3',
        displayName: 'GenXKavi',
        artist: 'GenXKavi | Rsquare | J-Sha'
    },
    {
        name: 'genxkavi-4',
        displayName: 'Self Doubt',
        artist: 'GenXKavi | Rsquare'
    },
    {
        name: 'genxkavi-5',
        displayName: 'Tabaah',
        artist: 'GenXKavi | Rsquare | J-Sha'
    }
]

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause' , 'fa-play' );
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

//Play or Pause
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.png`;
}

//Current Song
let songIndex = 0;

//Next Song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//Previous Song
function prevSong() {
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load select first song
loadSong(songs[songIndex]);

// Update progress bar
function updateProgressBar(e) {
    const { duration, currentTime } = e.srcElement;
    //Update progress bar width
    const progressBarPercent = ( currentTime / duration ) * 100;
    progress.style.width = `${progressBarPercent}%`;
    //Calculate duration for Display
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor( duration % 60);
    if(durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }

    // Delay switching duration element to avoid NaN
    if(durationSeconds) {
        durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //Calculate current for current time display
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor( currentTime % 60);
    if(currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    if(currentSeconds){
    currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
