
var common = {
  in_array: function(stringToSearch, arrayToSearch) {
    for (s = 0; s < arrayToSearch.length; s++) {
      thisEntry = arrayToSearch[s].toString();
      if (thisEntry == stringToSearch) {
        return true;
      }
    }
    return false;
  },
  storage: function(name, value) {
    if (value == undefined) {
      return localStorage[name] || '';
    }
    localStorage[name] = value;
  },
  cookie: function(key, value, options) {
    var days, time, result, decode

    // A key and value were given. Set cookie.
    if (arguments.length > 1 && String(value) !== "[object Object]") {
      // Enforce object
      options = $.extend({}, options)

      if (value === null || value === undefined) options.expires = -1

      if (typeof options.expires === 'number') {
        days = (options.expires * 24 * 60 * 60 * 1000)
        time = options.expires = new Date()

        time.setTime(time.getTime() + days)
      }

      value = String(value)

      return (document.cookie = [
        encodeURIComponent(key), '=',
        options.raw ? value : encodeURIComponent(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '',
        options.path ? '; path=' + options.path : '',
        options.domain ? '; domain=' + options.domain : '',
        options.secure ? '; secure' : ''
      ].join(''))
    }

    // Key and possibly options given, get cookie
    options = value || {}

    decode = options.raw ? function(s) {
      return s
    } : decodeURIComponent

    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null
  },
  /**
   * 获得当前url的参数
   *
   * @param {String} href url地址（默认取location.href）
   * @param {String} type 取值类型： "?"、 "#" （默认值为"?"）
   * @return {Object} Object 参数对象
   *            @example
   *            var url = MX.parseUrl();
   *
   *            var url = MX.parseUrl('http://t.qq.com/xhlv?setTheme=1');
   *
   *            var hashValue = MX.parseUrl('','#');
   *
   *            var hashValue = MX.parseUrl('http://t.qq.com/xhlv#setTheme=1','#');
   *
   */
  parseUrl: function(href, type) {
    var url = href || document.location.href,
      v = {},
      str, i, len, value;
    type = type || '?';
    if (url.indexOf(type) == -1) {
      return v;
    }
    str = url.split(type)[1].split('&');
    for (i = 0, len = str.length; i < len; i++) {
      value = str[i].replace(/#.*$/g, '').split('=');
      if (!value[1]) {
        value[1] = '';
      }
      v[value[0]] = value[1];
    }
    return v;
  }
}

export default common