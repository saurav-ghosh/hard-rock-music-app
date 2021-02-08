const displaySongs = () => {
    const findSongs = document.getElementById('find-songs').value;
    const url = `https://api.lyrics.ovh/suggest/${findSongs}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayAllSong(data.data))
        .catch(error => showError('Something went wrong!!! Please try again!!'))
}

// display all songs
const displayAllSong = songs => {
    const songContainer = document.getElementById('songs-container');
    songContainer.innerHTML = '';
    document.getElementById('song-lyrics').innerText = '';

    songs.forEach(song => {
        const searchResult = document.createElement('div');
        searchResult.className = 'single-result row align-items-center my-3 p-3';
        const songInfo = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/ogg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="showLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        searchResult.innerHTML = songInfo;
        songContainer.appendChild(searchResult);
        document.getElementById('find-songs').value = "";
    })
}

//display lyrics
const showLyrics = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLyrics(data.lyrics))
}

const displayLyrics = (lyrics) => {
    const displayLyrics = document.getElementById('song-lyrics');
    displayLyrics.innerText = lyrics;
    
}

const showError = error => {
    const displayError = document.getElementById('display-error');
    displayError.innerText = error;
}