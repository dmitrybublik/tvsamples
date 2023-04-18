function isSessionStorageAvailable() {
    try {
        const storage = window["sessionStorage"];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return false;
    }
}

function isLocalStorageAvailable() {
    try {
        const storage = window["localStorage"];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return false;
    }
}


function argumentsToArray(args) {
    let result = [];
    for (let i = 0; i < args.length; i++) {
        result.push(args[i]);
    }
    return result;
}

function addMessage(msgType, args) {
    let message = `\n${window.tvMessages.length} [${msgType}]: ${argumentsToArray(args).join(" | ")}`;
    window.tvMessages.unshift(message);
    let messageDiv = document.getElementById("messages");
    if (messageDiv) {
        messageDiv.innerText = window.tvMessages.slice(0, 16);
    }
}

function main() {
    if (window.console.newConsole) {
        return;
    }

    // define a new console
    let console = (function (oldCons) {
        return {
            log: function () {
                addMessage("LOG", arguments);
                oldCons.log.apply(this, arguments);
            },
            info: function (text) {
                addMessage("INFO", arguments);
                oldCons.info.apply(this, arguments);
            },
            warn: function () {
                addMessage("WARN", arguments);
                oldCons.warn.apply(this, arguments);
            },
            error: function () {
                addMessage("ERROR", arguments);
                oldCons.error.apply(this, arguments);
            },
            newConsole: true,
        };
    }(window.console));

    //Then redefine the old console
    window.console = console;
    window.tvMessages = [`\n*** Start messaging. localStorage available: ${isLocalStorageAvailable()} ***`];
}

main();
