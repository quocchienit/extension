var curentView = '';
var countCurentView;
window.onload = function() {
    livestream.intervalLiveStream();
    livestream.resetFirstTime();
};
var livestream = {
    getView: function() {
        var data = document.querySelectorAll('[data-store]');
        var view = data[0].getAttribute('data-store');
        var view = view.replace('{"viewerCount":', '');
        var view = view.replace('}', '');
        var d = new Date();
        var timeLive = livestream.formatDateLiveTime(d);
        var timeCount = livestream.formatDateCountTime(d);
        var valueLive = '{"date":"' + timeLive + '","value":' + view + '},';
        var valueCount = '{"date":"' + timeCount + '","value":' + view + '},';
        livestream.localStorageData('liveTimeData', valueLive);
        livestream.localStorageData('countTimeData', valueCount);
        livestream.checkReloadPage(view);
        console.log('running');
        return false;
    },
    download: function(filename, stringData, random) {
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
        return false;
    },
    formatDateLiveTime: function(date) {
        return date.getFullYear() + "-" + (parseInt(date.getMonth()) + 1) + '-' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    },
    formatDateCountTime: function(date) {
        firstTime = livestream.getFirstTime(date.getTime());
        var differentTime = date.getTime() - firstTime;
        var hours = livestream.converSecondsToHours(differentTime);
        return date.getFullYear() + "-" + (parseInt(date.getMonth()) + 1) + '-' + date.getDate() + ' ' + hours;
    },
    converSecondsToHours: function(differentTime) {
        hours = Math.floor(differentTime / 3600000), // 1 Hour = 36000 Milliseconds
            minutes = Math.floor((differentTime % 3600000) / 60000), // 1 Minutes = 60000 Milliseconds
            seconds = Math.floor(((differentTime % 360000) % 60000) / 1000) // 1 Second = 1000 Milliseconds
        return hours + ":" + minutes + ":" + seconds;
    },
    getFirstTime: function(firstTime) {
        if (localStorage.getItem("firstTime") === null) {
            alert('start get view');
            localStorage.setItem("firstTime", firstTime);
        } else {
            return localStorage.getItem("firstTime");
        }
        return false;
    },
    localStorageData: function(nameData, valueData) {
        if (localStorage.getItem(nameData) === null) {
            localStorage.setItem(nameData, valueData);
        } else {
            var getData = localStorage.getItem(nameData);
            getData += valueData;
            localStorage.setItem(nameData, getData);
        }
        return false;
    },
    checkReloadPage: function(view) {
        if (curentView == '' || curentView != view) {
            curentView = view;
            countCurentView = 1;
        } else if (curentView == view) {
            countCurentView++;
        }
        if (countCurentView == 10) {
            window.location.reload();
        }
        return false;
    },
    intervalLiveStream: function() {
        var intervalGetView = setInterval(livestream.getView, 1000);
        var intervalDownload = setInterval(function() {
            var random = Math.random();
            liveTimeData = localStorage.getItem('liveTimeData');
            countTimeData = localStorage.getItem('countTimeData');
            livestream.download('liveTimeData.txt', liveTimeData, random);
            livestream.download('countTimeData.txt', countTimeData, random);
        }, 30000);
        return false;
    },
    resetFirstTime: function() {
        var resetFirstTime = document.getElementById("resetFirstTime");
        if (resetFirstTime) {
            resetFirstTime.addEventListener("click", function() {
                if (localStorage.getItem("firstTime") === null) {
                    alert('Không tồn tại');
                } else {
                    localStorage.removeItem('firstTime');
                    alert('Đã reset first time');
                }
            });
        }
        return false;
    }
}