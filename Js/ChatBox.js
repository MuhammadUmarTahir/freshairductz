function loadHTML(myDivId) {
  (htmlText = replaceHtmlDynamicProps(htmlText)),
    (document.getElementById(myDivId).innerHTML = htmlText);
  for (
    var allScripts = document
        .getElementById(myDivId)
        .getElementsByTagName("script"),
      n = 0;
    n < allScripts.length;
    n++
  )
    eval(allScripts[n].innerHTML);
}
function replaceHtmlDynamicProps(t) {
  return (
    (t = t.replace(
      "{{iframeSrc}}",
      fobiBaseLocation +
        fobiId +
        "?chatPrimary=" +
        encodeURI(chatPrimary).replace("#", "") +
        "&chatSecondary=" +
        encodeURI(chatSecondary).replace("#", "") +
        "&chatBotImg=" +
        encodeURI(chatBotImg).replace("#", "")
    )),
    (t = t.replace("{{headerBackground}}", headerBackground)),
    (t = t.replace("{{headerTitleColor}}", headerTitleColor)),
    (t = t.replace("{{headerIconColor}}", headerIconColor)),
    (t = t.replace("{{buttonOffset}}", buttonOffset)),
    (t = t.replace("{{chatboxOffset}}", chatboxOffset)),
    (t = t.replace("{{chatboxHeight}}", chatboxHeight)),
    (t = t.replace("{{chatboxWidth}}", chatboxWidth)),
    (t = replaceAll(t, "{{buttonImg}}", buttonImg)),
    (t = t.replace("{{buttonBackground}}", buttonBg)),
    (t = t.replace("{{botTitle}}", botTitle)),
    (t = t.replace(
      "{{heightMinus100}}",
      chatboxHeight.slice(0, -2) - 100 + "px"
    ))
  );
}
function replaceAll(t, e, n) {
  return t.replace(new RegExp(e, "g"), n);
}
function setInitPopupStatus() {
  "true" == popUpOpen.toLowerCase() && openPopup();
}
function closePopup() {
  var t = document.getElementById(conversationDiv),
    e = document.getElementById("fo-toggle-button-icon");
  removeClass(e, "animate"),
    addClass(e, "no-animate"),
    removeClass(t, "open"),
    (isPopupOpen = !1),
    localStorage.setItem("fobi-pop-up-open", "false");
}
function openPopup() {
  var t = document.getElementById(conversationDiv),
    e = document.getElementById("fo-toggle-button-icon");
  addClass(e, "animate"),
    removeClass(e, "no-animate"),
    addClass(t, "open"),
    (isPopupOpen = !0),
    localStorage.setItem("fobi-pop-up-open", "true");
}
function alterPopupStatus() {
  isPopupOpen ? closePopup() : openPopup();
}
function hasClass(t, e) {
  return t.classList
    ? t.classList.contains(e)
    : !!t.className.match(new RegExp("(\\s|^)" + e + "(\\s|$)"));
}
function addClass(t, e) {
  t.classList ? t.classList.add(e) : hasClass(t, e) || (t.className += " " + e);
}
function removeClass(t, e) {
  if (t.classList) t.classList.remove(e);
  else if (hasClass(t, e)) {
    var n = new RegExp("(\\s|^)" + e + "(\\s|$)");
    t.className = t.className.replace(n, " ");
  }
}
var fobiBaseLocation = "https://app.fobi.io/#/embedded/",
  injectDiv = "embed-fobi",
  conversationDiv = "fo-conversation-popup-wrapper",
  injectDivElement,
  fobiId,
  headerBackground,
  headerTitleColor,
  headerIconColor,
  chatPrimary,
  chatSecondary,
  chatBotImg,
  buttonOffset,
  chatboxOffset,
  buttonImg,
  buttonBg,
  htmlText =
    '<div id="fo-inner-wrap">\r\n    <style>\r\n        @import url(\'https://fonts.googleapis.com/css?family=Roboto\');\r\n       \r\n        #fo-conversation-popup-wrapper {\r\n            position: fixed;\r\n            bottom: 135px;\r\n            width: 365px;\r\n            height: {{heightMinus100}};\r\n            font-family: \'Roboto\', sans-serif;\r\n            border-radius: 8px;\r\n            opacity: 0;\r\n            transition: 0.5s;\r\n            z-index: -1;\r\n            display: block;\r\n        }\r\n    \r\n        #fo-conversation-popup-wrapper.open {\r\n            opacity: 1;\r\n            height: {{chatboxHeight}};\r\n            -webkit-box-shadow: 0 5px 40px rgba(0,0,0,.16)!important;\r\n            box-shadow: 0 5px 40px rgba(0,0,0,.16)!important;\r\n            z-index: 1000000 !important;\r\n        }\r\n    \r\n        #fo-iframe-wrapper {\r\n            height: 100%;\r\n        }\r\n    \r\n        #fo-iframe {\r\n            width: 100%;\r\n            height: calc(100% - 40px);\r\n            margin-bottom: 0;\r\n        }\r\n    \r\n        #fo-conversation-popup-header {\r\n            display: flex;\r\n            align-items: center;\r\n            font-size: 16px;\r\n            padding: 18px 15px;\r\n     box-sizing: border-box;\r\n       border-top-right-radius: 8px;\r\n            border-top-left-radius: 8px;\r\n            float: left;\r\n            width: 100%;\r\n        }\r\n    \r\n        #fo-conversation-popup-title {\r\n            flex: 1;\r\n            padding-left: 10px;\r\n        }\r\n    \r\n        #fo-conversation-popup-close {\r\n            width: 40px;\r\n            height: 40px;\r\n            display: flex;\r\n            justify-content: center;\r\n            align-items: center;\r\n            color: white;\r\n            cursor: pointer;\r\n            /*border-left: 1px solid rgba(255,255,255,0.1);*/\r\n        }\r\n    \r\n        .hidden {\r\n            visibility: hidden !important;\r\n        }\r\n    \r\n        #fo-toggle-button {\r\n            position: fixed;\r\n            bottom: 30px;\r\n            border-radius: 50%;\r\n            height: 63px;\r\n            width: 63px;\r\n            cursor: pointer;\r\n            -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);\r\n            box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);\r\n            z-index: 1000000 !important;\r\n            transition: 0.3s;\r\n        }\r\n    \r\n        #fo-toggle-button:hover {\r\n            z-index: 1000000 !important;\r\n            -webkit-box-shadow: 0 2px 8px rgba(0,0,0,.09),0 4px 40px rgba(0,0,0,.24)!important;\r\n            box-shadow: 0 2px 8px rgba(0,0,0,.09),0 4px 40px rgba(0,0,0,.24)!important;\r\n            opacity: 1;\r\n        }\r\n    \r\n        #fo-toggle-button .fo-icon {\r\n            height: 63px;\r\n            width: 63px;\r\n            background-size: 50% 50%;\r\n            background-position: 50% 50%;\r\n            background-repeat: no-repeat;\r\n        }\r\n    \r\n        #fo-toggle-button .fo-icon.animate {\r\n            animation: iconTurnIn 0.3s;\r\n            animation-fill-mode: forwards;\r\n        }\r\n    \r\n        #fo-toggle-button .fo-icon.no-animate {\r\n            animation: iconTurnOut 0.3s;\r\n            animation-fill-mode: forwards;\r\n        }\r\n    \r\n        @keyframes iconTurnIn {\r\n            0%   { background-image: url(\'{{buttonImg}}\'); transform: rotate(0) scale(1); opacity: 1  }\r\n            15%  { background-image: url(\'{{buttonImg}}\'); transform: rotate(15deg) scale(0.8); opacity: 0.9 }\r\n            50%  { background-image: url(\'{{buttonImg}}\'); transform: rotate(45deg) scale(0.3); opacity: 0.7  }\r\n            51%  { background-image: url(\'http://flaticons.net/gd/makefg.php?i=icons/Mobile%20Application/Close.png&r=255&g=255&b=255\'); transform: rotate(45deg) scale(0.1); opacity: 0.7  }\r\n            70%  { background-image: url(\'http://flaticons.net/gd/makefg.php?i=icons/Mobile%20Application/Close.png&r=255&g=255&b=255\'); transform: rotate(75deg) scale(0.2), ; opacity: 0.9 }\r\n            100% { background-image: url(\'http://flaticons.net/gd/makefg.php?i=icons/Mobile%20Application/Close.png&r=255&g=255&b=255\'); transform: rotate(90deg) scale(0.5); opacity: 1  }\r\n        }\r\n    \r\n        @keyframes iconTurnOut {\r\n            0%   { background-image: url(\'http://flaticons.net/gd/makefg.php?i=icons/Mobile%20Application/Close.png&r=255&g=255&b=255\'); transform: rotate(90deg) scale(0.5); opacity: 1  }\r\n            15%  { background-image: url(\'http://flaticons.net/gd/makefg.php?i=icons/Mobile%20Application/Close.png&r=255&g=255&b=255\'); transform: rotate(75deg) scale(0.2), ; opacity: 0.9 }\r\n            50%  { background-image: url(\'http://flaticons.net/gd/makefg.php?i=icons/Mobile%20Application/Close.png&r=255&g=255&b=255\'); transform: rotate(45deg) scale(0.1); opacity: 0.7  }\r\n            51%  { background-image: url(\'{{buttonImg}}\'); transform: rotate(45deg) scale(0.3); opacity: 0.7  }\r\n            70%  { background-image: url(\'{{buttonImg}}\'); transform: rotate(15deg) scale(0.8); opacity: 0.9 }\r\n            100% { background-image: url(\'{{buttonImg}}\'); transform: rotate(0) scale(1); opacity: 1  }\r\n        }\r\n    </style>\r\n    \r\n    <div id="fo-toggle-button" style="background-color: {{buttonBackground}} ; {{buttonOffset}}" onclick=" alterPopupStatus()">\r\n        <div id="fo-toggle-button-icon" class="fo-icon" style="background-image: url(\'{{buttonImg}}\');"></div>\r\n    </div>\r\n    \r\n    <div id="fo-conversation-popup-wrapper" class=" {{isPopupDefaultOpen}}" style="{{chatboxOffset}};  width: {{chatboxWidth}}">\r\n        <div id="fo-conversation-popup-header" style="background-color: {{headerBackground}};">\r\n            <div id="fo-conversation-popup-title" style="color: {{headerTitleColor}}">\r\n                {{botTitle}}\r\n            </div>\r\n        </div>\r\n        <div id="fo-iframe-wrapper">\r\n            <iframe id=\'fo-iframe\' frameBorder="0" src="{{iframeSrc}}"></iframe>\r\n        </div>\r\n    \r\n    </div>\r\n    \r\n    </div>',
  isPopupdefaultOpen = !0,
  isPopupOpen = !1,
  d_botTitle = "Chat",
  d_headerBackground = "#2980B9",
  d_headerTitleColor = "#fff",
  d_headerIconColor = "#fff",
  d_chatPrimary = "#3e6cb4",
  d_chatSecondary = "#fff",
  d_chatBotImg = "https://app.fobi.io/head.png",
  d_buttonOffset = "right: 30px;",
  d_chatboxOffset = "right: 30px;",
  d_chatboxHeight = "400px",
  d_chatboxWidth = "330px";
(d_buttonImg = "https://app.fobi.io/icon.png"),
  (d_buttonBg = "#3e6cb4"),
  (d_popUpOpen = "");
document.addEventListener("DOMContentLoaded", function (t) {
  (injectDivElement = document.getElementById(injectDiv)),
    (fobiId = injectDivElement.getAttribute("data-fobi-id")),
    (botTitle = injectDivElement.hasAttribute("data-bot-title")
      ? injectDivElement.getAttribute("data-bot-title")
      : d_botTitle),
    (popUpOpen = injectDivElement.getAttribute("data-pop-up-open")
      ? injectDivElement.getAttribute("data-pop-up-open")
      : d_popUpOpen),
    (headerBackground = injectDivElement.getAttribute("data-hd-bg")
      ? injectDivElement.getAttribute("data-hd-bg")
      : d_headerBackground),
    (headerTitleColor = injectDivElement.getAttribute("data-hd-ti-clr")
      ? injectDivElement.getAttribute("data-hd-ti-clr")
      : d_headerTitleColor),
    (headerIconColor = injectDivElement.getAttribute("data-hd-ico-clr")
      ? injectDivElement.getAttribute("data-hd-ico-clr")
      : d_headerIconColor),
    (chatPrimary = injectDivElement.getAttribute("data-ct-pm")
      ? injectDivElement.getAttribute("data-ct-pm")
      : d_chatPrimary),
    (chatSecondary = injectDivElement.getAttribute("data-ct-sc")
      ? injectDivElement.getAttribute("data-ct-sc")
      : d_chatSecondary),
    (chatBotImg = injectDivElement.getAttribute("data-ct-bot-img")
      ? injectDivElement.getAttribute("data-ct-bot-img")
      : d_chatBotImg),
    (buttonOffset = injectDivElement.getAttribute("data-btn-offset")
      ? injectDivElement.getAttribute("data-btn-offset")
      : d_buttonOffset),
    (chatboxHeight = injectDivElement.getAttribute("data-cb-height")
      ? injectDivElement.getAttribute("data-cb-height")
      : d_chatboxHeight),
    (chatboxWidth = injectDivElement.getAttribute("data-cb-width")
      ? injectDivElement.getAttribute("data-cb-width")
      : d_chatboxWidth),
    (chatboxOffset = injectDivElement.getAttribute("data-cb-offset")
      ? injectDivElement.getAttribute("data-cb-offset")
      : d_chatboxOffset),
    (buttonImg = injectDivElement.getAttribute("data-btn-img")
      ? injectDivElement.getAttribute("data-btn-img")
      : d_buttonImg),
    (buttonBg = injectDivElement.getAttribute("data-btn-bg")
      ? injectDivElement.getAttribute("data-btn-bg")
      : d_buttonBg),
    loadHTML(injectDiv),
    setInitPopupStatus();
});
