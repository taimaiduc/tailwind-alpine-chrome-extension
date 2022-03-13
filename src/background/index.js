getLogs();
var pusher = new Pusher('52065127f654d2f9a3c8', {
    cluster: 'ap1'
});
var channel = pusher.subscribe('debug');
channel.bind('reload', function (data) {

    getLogs();
})

function getLogs() {
    fetch('https://d.toolup.dev/?logs=true')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            chrome.browserAction.setBadgeText({text: data.length + ''});
        });
}
