function argumentsToArray(args) {
    let result = [];
    for (let i = 0; i < args.length; i++) {
        result.push(args[i]);
    }
    return result;
}

function addMessage(msgType, args) {
    let messagesStr = sessionStorage.getItem("Messages");
    let messages = [];
    if (messagesStr) {
        messages = JSON.parse(messagesStr);
    }

    let message = `\n${messages.length} [${msgType}]: ${argumentsToArray(args).join(" | ")}`;
    messages.unshift(message);
    sessionStorage.setItem("Messages", JSON.stringify(messages));
    let messageDiv = document.getElementById("messages");
    if (messageDiv) {
        messageDiv.innerText = messages.slice(0, 12);
    }
}

function main() {
    if (window.console.newConsole) {
        return;
    }

    window.console.warn("window.tvMessages init");

    // define a new console
    var console = (function (oldCons) {
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
                // addMessage("WARN", arguments);
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
}

main();
