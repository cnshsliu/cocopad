import Bowser from "../lib/bowser/bowser";

const cldb = {};

cldb.checkBrowser = function () {
    const browser = Bowser.getParser(window.navigator.userAgent);
    let isValidBrowser = browser.satisfies({
        // or in general
        chrome: ">70",
        edge: ">70",
    });
    return isValidBrowser;
};

let isValid = cldb.checkBrowser();
window.location.href="/browsernotsupport.html";

