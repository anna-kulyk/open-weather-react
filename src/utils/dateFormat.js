function convertUnixTimeToDate(unixTime, timezone) {
    let timezoneOffset = new Date().getTimezoneOffset() * 60;
    let date = new Date((unixTime + timezoneOffset + timezone) * 1000);
    return date;
}

function formatTime(unixTime, timezone) {
    let date = convertUnixTimeToDate(unixTime, timezone);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let time = hours + ":" + minutes.slice(-2);
    return time;
}

function formatTimeDay(unixTime, timezone) {
    let date = convertUnixTimeToDate(unixTime, timezone);
    let time = formatTime(unixTime, timezone);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = date.getDay();
    let output = `${dayNames[day]} ${time}`;
    return output;
}

export { formatTime, formatTimeDay };