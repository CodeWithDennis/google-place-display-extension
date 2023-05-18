chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.place) {
        chrome.action.setBadgeText({ text: message.place });
        chrome.action.setBadgeBackgroundColor({ color: 'whitesmoke' });
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { place: message.place });
        });
    }
});