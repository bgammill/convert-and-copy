function copyToClipboard(text, html) {
    function oncopy(event) {
        try {
            const link = window.atob(text);
            document.removeEventListener("copy", oncopy, true);
            event.stopImmediatePropagation();
            event.preventDefault();
            event.clipboardData.setData("text/plain", link);
        } catch (e) {
            console.log('not base64');
        }
    }

    document.addEventListener("copy", oncopy, true);
    document.execCommand("copy");
}
