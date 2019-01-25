export default function (timestamp) {
    const dateElement = document.body.querySelector('[data-js="addDate"]');

    const monthsLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const date = new Date(Number.parseInt(timestamp));
    const monthStr = monthsLong[date.getMonth()];
    const dayStr = `${date.getDate()}`.padStart(2, '0');
    const hoursStr = `${date.getUTCHours()}`.padStart(2, '0');
    const minutesStr = `${date.getUTCMinutes()}`.padStart(2, '0');
    const secondsStr = `${date.getUTCSeconds()}`.padStart(2, '0');

    const dateStr = `${monthStr} ${dayStr}, ${date.getFullYear()}, ${hoursStr}:${minutesStr}:${secondsStr} UTC`;
    dateElement.innerHTML = dateStr;

    return dateStr;
}
