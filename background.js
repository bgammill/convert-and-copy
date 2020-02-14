browser.contextMenus.create({
    id: "copy-link-to-clipboard",
    title: "Convert and Copy",
    contexts: ["selection"],
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copy-link-to-clipboard") {
        const text = info.selectionText;
        const code = "copyToClipboard(" + JSON.stringify(text) + ");";

        browser.tabs.executeScript({
            code: "typeof copyToClipboard === 'function';",
        }).then((results) => {
            if (!results || results[0] !== true) {
                return browser.tabs.executeScript(tab.id, {
                    file: "clipboard-helper.js",
                });
            }
        }).then(() => {
            return browser.tabs.executeScript(tab.id, {
                code,
            });
        }).catch((error) => {
            console.error("Failed to copy text: " + error);
        });
    }
});