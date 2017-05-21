var liveTimeData = "";
var countTimeData = "";

function getView() {
    var data = document.querySelectorAll('[data-store]');
    var view = data[0].getAttribute('data-store');
    var view = view.replace('{"viewerCount":', '');
    var view = view.replace('}', '');
    var d = new Date();
    var timeLive = formatDateLiveTime(d);
    var timeCount = formatDateCountTime(d);
    var valueLive = '{"date":"' + timeLive + '","value":' + view + '},';
    var valueCount = '{"date":"' + timeCount + '","value":' + view + '},';
    liveTimeData += valueLive;
    countTimeData += valueCount;
}

function download(filename, stringData, random) {
    filename = random + filename;
    var newStr = stringData.substring(0, stringData.length - 1);
    newStr = '[' + newStr + ']';
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(newStr));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function formatDateLiveTime(date) {
    return date.getFullYear() + "-" + (parseInt(date.getMonth()) + 1) + '-' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function formatDateCountTime(date) {
    firstTime = getFirstTime(date.getTime());
    var differentTime = date.getTime() - firstTime;
    var hours = converSecondsToHours(differentTime);
    return date.getFullYear() + "-" + (parseInt(date.getMonth()) + 1) + '-' + date.getDate() + ' ' + hours;
}

function converSecondsToHours(differentTime) {
    hours = Math.floor(differentTime / 3600000), // 1 Hour = 36000 Milliseconds
        minutes = Math.floor((differentTime % 3600000) / 60000), // 1 Minutes = 60000 Milliseconds
        seconds = Math.floor(((differentTime % 360000) % 60000) / 1000) // 1 Second = 1000 Milliseconds
    return hours + ":" + minutes + ":" + seconds;
}

function getFirstTime(firstTime) {
    if (localStorage.getItem("firstTime") === null) {
        localStorage.setItem("firstTime", firstTime);
    } else {
        return localStorage.getItem("firstTime");
    }
}
setInterval(getView, 1000);
setInterval(function(){
    var random = Math.random();
    download('liveTimeData.txt',liveTimeData,random);
    download('countTimeData.txt',countTimeData,random);
}, 30000);