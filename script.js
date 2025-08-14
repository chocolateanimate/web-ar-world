function openWeb() {
    window.location.href = "https://lens.snap.com/experience/3551b071-c9aa-4a81-a798-262fe59ffe68";
}

function openSnapchat() {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    let snapchatURL = "snapchat://lens?sharedLensId=3551b071-c9aa-4a81-a798-262fe59ffe68";
    let playStoreURL = "https://play.google.com/store/apps/details?id=com.snapchat.android";
    let appStoreURL = "https://apps.apple.com/app/snapchat/id447188370";

    if (/android/i.test(userAgent)) {
        window.location.href = snapchatURL;
        setTimeout(() => {
            window.location.href = playStoreURL;
        }, 2000);
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.location.href = snapchatURL;
        setTimeout(() => {
            window.location.href = appStoreURL;
        }, 2000);
    } else {
        alert("Snapchat is only available on mobile devices.");
    }
}
