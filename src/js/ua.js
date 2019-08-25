var doc = document;
var win = window;
var userAgent = navigator.userAgent.toLowerCase();
var browser = navigator.appName;
/**
 * [ua ] 判断设备
 * @type {Object}
 */
exports.ua = {
  wechat: userAgent.indexOf('micromessenger') > -1,
  xinhuashe: userAgent.indexOf('xyapp') > -1,
  iOS: userAgent.indexOf('iphone') > -1,
  weibo: userAgent.match(/WeiBo/i) == 'weibo',
  iPhone: userAgent.indexOf('iphone') > -1,
  android: userAgent.indexOf('Android') > -1 || userAgent.indexOf('android') > -1 || userAgent.indexOf('Adr') > -1,
  isPc: function () {
    var nua = navigator.userAgent,
      isWindowsPhone = /(?:Windows Phone)/.test(nua),
      isSymbian = /(?:SymbianOS)/.test(nua) || isWindowsPhone,
      isAndroid = /(?:Android)/.test(nua),
      isFireFox = /(?:Firefox)/.test(nua),
      isChrome = /(?:Chrome|CriOS)/.test(nua),
      isTablet = /(?:iPad|PlayBook)/.test(nua) || (isAndroid && !/(?:Mobile)/.test(nua)) || (isFireFox && /(?:Tablet)/.test(nua)),
      isPhone = /(?:iPhone)/.test(nua) && !isTablet,
      isPc = !isPhone && !isAndroid && !isSymbian;
    return isPc;
  },
  isIE: function (ver) {

    var b = document.createElement('b')
    b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
    return b.getElementsByTagName('i').length === 1

  }
}
