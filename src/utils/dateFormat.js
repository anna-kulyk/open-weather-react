function formatTime(unixTime, timezone) {
    let timezoneOffset = new Date().getTimezoneOffset() * 60;
    let date = new Date((unixTime + timezoneOffset + timezone) * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let time = hours + ":" + minutes.slice(-2);
    return time;
}

function formatTimeDay(unixTime, timezone) {
    let timezoneOffset = new Date().getTimezoneOffset() * 60;
    let date = new Date((unixTime + timezoneOffset + timezone) * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    const time = hours + ":" + minutes.slice(-2);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = date.getDay();
    let output = `${dayNames[day]} ${time}`;
    return output;
}

export { formatTime, formatTimeDay };