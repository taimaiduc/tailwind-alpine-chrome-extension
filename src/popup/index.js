import Alpine from 'alpinejs'

window.Alpine = Alpine
Alpine.start()
Pusher.logToConsole = true;
var myPort;
var pusher = new Pusher('52065127f654d2f9a3c8', {
    cluster: 'ap1'
});
let app = new Vue({
    el: '#app',
    data: {
        activeTab: 'raw',
        logs: []
    },
    mounted: function () {
        this.getLogs();
    },
    methods: {
        getLogs: function () {
            fetch('https://d.toolup.dev/?logs=true')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    chrome.browserAction.setBadgeText({text: data.length + ''});
                    myPort = chrome.runtime.connect({name: "port-from-cs"});
                    myPort.postMessage({request: "doSomething"});
                    this.logs = data;
                });
        },
        delLogs: function () {
            fetch('https://d.toolup.dev/?delete=true')
                .then((response) => {
                    this.getLogs();
                })
        },
        highlighter(code, key) {
            return Prism.highlight(JSON.stringify(code, null, 2), Prism.languages.json, 'json')
        },
    }
});

// Enable pusher logging - don't include this in production
//Pusher.logToConsole = true;

var pusher = new Pusher('52065127f654d2f9a3c8', {
    cluster: 'ap1'
});

var channel = pusher.subscribe('debug');
channel.bind('reload', function (data) {
    app.getLogs();
})
