const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progressBar = player.querySelector('.progress__filled');
const progress = player.querySelector('.progress');
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay(){
    if(video.paused)
        video.play();
    else
        video.pause();
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon;
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubeTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubeTime;
}

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
skipButtons.forEach(button => button.addEventListener('click', skip));
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);
toggle.addEventListener('click', togglePlay);
window.addEventListener('keypress', (e) => {
    if(e.keyCode === 32)
        togglePlay();
})