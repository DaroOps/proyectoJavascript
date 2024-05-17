function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${minutes > 0 ? formattedMinutes : '0:'}${minutes > 0 ? ':' : ''}${formattedSeconds}`;
}

export {formatTime}