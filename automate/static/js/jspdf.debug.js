(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }
  (function (global) {
    if (_typeof(global.console) !== "object") {
      global.console = {};
      var con = global.console;
      var prop, method;

      var dummy = function dummy() {};

      var properties = ['memory'];
      var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' + 'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' + 'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');

      while (prop = properties.pop()) {
        if (!con[prop]) con[prop] = {};
      }

      while (method = methods.pop()) {
        if (!con[method]) con[method] = dummy;
      }
    }

    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    if (typeof global.btoa === 'undefined') {
      global.btoa = function (data) {
        var o1,
            o2,
            o3,
            h1,
            h2,
            h3,
            h4,
            bits,
            i = 0,
            ac = 0,
            enc = '',
            tmp_arr = [];

        if (!data) {
          return data;
        }

        do {
          o1 = data.charCodeAt(i++);
          o2 = data.charCodeAt(i++);
          o3 = data.charCodeAt(i++);
          bits = o1 << 16 | o2 << 8 | o3;
          h1 = bits >> 18 & 0x3f;
          h2 = bits >> 12 & 0x3f;
          h3 = bits >> 6 & 0x3f;
          h4 = bits & 0x3f;
          tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        } while (i < data.length);

        enc = tmp_arr.join('');
        var r = data.length % 3;
        return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
      };
    }

    if (typeof global.atob === 'undefined') {
      global.atob = function (data) {
        var o1,
            o2,
            o3,
            h1,
            h2,
            h3,
            h4,
            bits,
            i = 0,
            ac = 0,
            dec = '',
            tmp_arr = [];

        if (!data) {
          return data;
        }

        data += '';

        do {
          h1 = b64.indexOf(data.charAt(i++));
          h2 = b64.indexOf(data.charAt(i++));
          h3 = b64.indexOf(data.charAt(i++));
          h4 = b64.indexOf(data.charAt(i++));
          bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
          o1 = bits >> 16 & 0xff;
          o2 = bits >> 8 & 0xff;
          o3 = bits & 0xff;

          if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
          } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
          } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
          }
        } while (i < data.length);

        dec = tmp_arr.join('');
        return dec;
      };
    }

    if (!Array.prototype.map) {
      Array.prototype.map = function (fun
      ) {
        if (this === void 0 || this === null || typeof fun !== "function") throw new TypeError();
        var t = Object(this),
            len = t.length >>> 0,
            res = new Array(len);
        var thisArg = arguments.length > 1 ? arguments[1] : void 0;

        for (var i = 0; i < len; i++) {
          if (i in t) res[i] = fun.call(thisArg, t[i], i, t);
        }

        return res;
      };
    }

    if (!Array.isArray) {
      Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
      };
    }

    if (!Array.prototype.forEach) {
      Array.prototype.forEach = function (fun, thisArg) {

        if (this === void 0 || this === null || typeof fun !== "function") throw new TypeError();
        var t = Object(this),
            len = t.length >>> 0;

        for (var i = 0; i < len; i++) {
          if (i in t) fun.call(thisArg, t[i], i, t);
        }
      };
    }


    if (!Array.prototype.find) {
      Object.defineProperty(Array.prototype, 'find', {
        value: function value(predicate) {
          if (this == null) {
            throw new TypeError('"this" is null or not defined');
          }

          var o = Object(this);

          var len = o.length >>> 0;

          if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
          }
          var thisArg = arguments[1];
          var k = 0;
          while (k < len) {
            var kValue = o[k];
            if (predicate.call(thisArg, kValue, k, o)) {
              return kValue;
            }
            k++;
          }
          return undefined;
        },
        configurable: true,
        writable: true
      });
    }

    if (!Object.keys) {
      Object.keys = function () {
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !{
          toString: null
        }.propertyIsEnumerable('toString'),
            dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
            dontEnumsLength = dontEnums.length;
        return function (obj) {
          if (_typeof(obj) !== 'object' && (typeof obj !== 'function' || obj === null)) {
            throw new TypeError();
          }
          var result = [],
              prop,
              i;
          for (prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
              result.push(prop);
            }
          }
          if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i++) {
              if (hasOwnProperty.call(obj, dontEnums[i])) {
                result.push(dontEnums[i]);
              }
            }
          }
          return result;
        };
      }();
    }

    if (typeof Object.assign != 'function') {
      Object.assign = function (target) {

        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }

        target = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var source = arguments[index];

          if (source != null) {
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
        }

        return target;
      };
    }

    if (!String.prototype.trim) {
      String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
      };
    }

    if (!String.prototype.trimLeft) {
      String.prototype.trimLeft = function () {
        return this.replace(/^\s+/g, "");
      };
    }

    if (!String.prototype.trimRight) {
      String.prototype.trimRight = function () {
        return this.replace(/\s+$/g, "");
      };
    }

    Number.isInteger = Number.isInteger || function (value) {
      return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    };
  })(typeof self !== "undefined" && self || typeof window !== "undefined" && window || typeof global !== "undefined" && global || Function('return typeof this === "object" && this.content')() || Function('return this')());
  var jsPDF = function (global) {
    function PubSub(context) {
      if (_typeof(context) !== 'object') {
        throw new Error('Invalid Context passed to initialize PubSub (jsPDF-module)');
      }

      var topics = {};

      this.subscribe = function (topic, callback, once) {
        once = once || false;

        if (typeof topic !== 'string' || typeof callback !== 'function' || typeof once !== 'boolean') {
          throw new Error('Invalid arguments passed to PubSub.subscribe (jsPDF-module)');
        }

        if (!topics.hasOwnProperty(topic)) {
          topics[topic] = {};
        }

        var token = Math.random().toString(35);
        topics[topic][token] = [callback, !!once];
        return token;
      };

      this.unsubscribe = function (token) {
        for (var topic in topics) {
          if (topics[topic][token]) {
            delete topics[topic][token];

            if (Object.keys(topics[topic]).length === 0) {
              delete topics[topic];
            }

            return true;
          }
        }

        return false;
      };

      this.publish = function (topic) {
        if (topics.hasOwnProperty(topic)) {
          var args = Array.prototype.slice.call(arguments, 1),
              tokens = [];

          for (var token in topics[topic]) {
            var sub = topics[topic][token];

            try {
              sub[0].apply(context, args);
            } catch (ex) {
              if (global.console) {
                console.error('jsPDF PubSub Error', ex.message, ex);
              }
            }

            if (sub[1]) tokens.push(token);
          }

          if (tokens.length) tokens.forEach(this.unsubscribe);
        }
      };

      this.getTopics = function () {
        return topics;
      };
    }
    function jsPDF(orientation, unit, format, compressPdf) {
      var options = {};
      var filters = [];
      var userUnit = 1.0;

      if (_typeof(orientation) === 'object') {
        options = orientation;
        orientation = options.orientation;
        unit = options.unit || unit;
        format = options.format || format;
        compressPdf = options.compress || options.compressPdf || compressPdf;
        filters = options.filters || (compressPdf === true ? ['FlateEncode'] : filters);
        userUnit = typeof options.userUnit === "number" ? Math.abs(options.userUnit) : 1.0;
      }

      unit = unit || 'mm';
      orientation = ('' + (orientation || 'P')).toLowerCase();
      var putOnlyUsedFonts = options.putOnlyUsedFonts || true;
      var usedFonts = {};
      var API = {
        internal: {},
        __private__: {}
      };
      API.__private__.PubSub = PubSub;
      var pdfVersion = '1.3';

      var getPdfVersion = API.__private__.getPdfVersion = function () {
        return pdfVersion;
      };

      var setPdfVersion = API.__private__.setPdfVersion = function (value) {
        pdfVersion = value;
      };
      var pageFormats = {
        'a0': [2383.94, 3370.39],
        'a1': [1683.78, 2383.94],
        'a2': [1190.55, 1683.78],
        'a3': [841.89, 1190.55],
        'a4': [595.28, 841.89],
        'a5': [419.53, 595.28],
        'a6': [297.64, 419.53],
        'a7': [209.76, 297.64],
        'a8': [147.40, 209.76],
        'a9': [104.88, 147.40],
        'a10': [73.70, 104.88],
        'b0': [2834.65, 4008.19],
        'b1': [2004.09, 2834.65],
        'b2': [1417.32, 2004.09],
        'b3': [1000.63, 1417.32],
        'b4': [708.66, 1000.63],
        'b5': [498.90, 708.66],
        'b6': [354.33, 498.90],
        'b7': [249.45, 354.33],
        'b8': [175.75, 249.45],
        'b9': [124.72, 175.75],
        'b10': [87.87, 124.72],
        'c0': [2599.37, 3676.54],
        'c1': [1836.85, 2599.37],
        'c2': [1298.27, 1836.85],
        'c3': [918.43, 1298.27],
        'c4': [649.13, 918.43],
        'c5': [459.21, 649.13],
        'c6': [323.15, 459.21],
        'c7': [229.61, 323.15],
        'c8': [161.57, 229.61],
        'c9': [113.39, 161.57],
        'c10': [79.37, 113.39],
        'dl': [311.81, 623.62],
        'letter': [612, 792],
        'government-letter': [576, 756],
        'legal': [612, 1008],
        'junior-legal': [576, 360],
        'ledger': [1224, 792],
        'tabloid': [792, 1224],
        'credit-card': [153, 243]
      };

      var getPageFormats = API.__private__.getPageFormats = function () {
        return pageFormats;
      };

      var getPageFormat = API.__private__.getPageFormat = function (value) {
        return pageFormats[value];
      };

      if (typeof format === "string") {
        format = getPageFormat(format);
      }

      format = format || getPageFormat('a4');

      var f2 = API.f2 = API.__private__.f2 = function (number) {
        if (isNaN(number)) {
          throw new Error('Invalid argument passed to jsPDF.f2');
        }

        return number.toFixed(2); // Ie, %.2f
      };

      var f3 = API.__private__.f3 = function (number) {
        if (isNaN(number)) {
          throw new Error('Invalid argument passed to jsPDF.f3');
        }

        return number.toFixed(3); // Ie, %.3f
      };

      var fileId = '00000000000000000000000000000000';

      var getFileId = API.__private__.getFileId = function () {
        return fileId;
      };

      var setFileId = API.__private__.setFileId = function (value) {
        value = value || "12345678901234567890123456789012".split('').map(function () {
          return "ABCDEF0123456789".charAt(Math.floor(Math.random() * 16));
        }).join('');
        fileId = value;
        return fileId;
      };
      API.setFileId = function (value) {
        setFileId(value);
        return this;
      };
      API.getFileId = function () {
        return getFileId();
      };

      var creationDate;

      var convertDateToPDFDate = API.__private__.convertDateToPDFDate = function (parmDate) {
        var result = '';
        var tzoffset = parmDate.getTimezoneOffset(),
            tzsign = tzoffset < 0 ? '+' : '-',
            tzhour = Math.floor(Math.abs(tzoffset / 60)),
            tzmin = Math.abs(tzoffset % 60),
            timeZoneString = [tzsign, padd2(tzhour), "'", padd2(tzmin), "'"].join('');
        result = ['D:', parmDate.getFullYear(), padd2(parmDate.getMonth() + 1), padd2(parmDate.getDate()), padd2(parmDate.getHours()), padd2(parmDate.getMinutes()), padd2(parmDate.getSeconds()), timeZoneString].join('');
        return result;
      };

      var convertPDFDateToDate = API.__private__.convertPDFDateToDate = function (parmPDFDate) {
        var year = parseInt(parmPDFDate.substr(2, 4), 10);
        var month = parseInt(parmPDFDate.substr(6, 2), 10) - 1;
        var date = parseInt(parmPDFDate.substr(8, 2), 10);
        var hour = parseInt(parmPDFDate.substr(10, 2), 10);
        var minutes = parseInt(parmPDFDate.substr(12, 2), 10);
        var seconds = parseInt(parmPDFDate.substr(14, 2), 10);
        var timeZoneHour = parseInt(parmPDFDate.substr(16, 2), 10);
        var timeZoneMinutes = parseInt(parmPDFDate.substr(20, 2), 10);
        var resultingDate = new Date(year, month, date, hour, minutes, seconds, 0);
        return resultingDate;
      };

      var setCreationDate = API.__private__.setCreationDate = function (date) {
        var tmpCreationDateString;
        var regexPDFCreationDate = /^D:(20[0-2][0-9]|203[0-7]|19[7-9][0-9])(0[0-9]|1[0-2])([0-2][0-9]|3[0-1])(0[0-9]|1[0-9]|2[0-3])(0[0-9]|[1-5][0-9])(0[0-9]|[1-5][0-9])(\+0[0-9]|\+1[0-4]|\-0[0-9]|\-1[0-1])\'(0[0-9]|[1-5][0-9])\'?$/;

        if (typeof date === "undefined") {
          date = new Date();
        }

        if (_typeof(date) === "object" && Object.prototype.toString.call(date) === "[object Date]") {
          tmpCreationDateString = convertDateToPDFDate(date);
        } else if (regexPDFCreationDate.test(date)) {
          tmpCreationDateString = date;
        } else {
          throw new Error('Invalid argument passed to jsPDF.setCreationDate');
        }

        creationDate = tmpCreationDateString;
        return creationDate;
      };

      var getCreationDate = API.__private__.getCreationDate = function (type) {
        var result = creationDate;

        if (type === "jsDate") {
          result = convertPDFDateToDate(creationDate);
        }

        return result;
      };
      API.setCreationDate = function (date) {
        setCreationDate(date);
        return this;
      };
      API.getCreationDate = function (type) {
        return getCreationDate(type);
      };

      var padd2 = API.__private__.padd2 = function (number) {
        return ('0' + parseInt(number)).slice(-2);
      };

      var outToPages = !1;
      var pages = [];
      var content = [];
      var currentPage;
      var content_length = 0;
      var customOutputDestination;

      var setOutputDestination = API.__private__.setCustomOutputDestination = function (destination) {
        customOutputDestination = destination;
      };

      var resetOutputDestination = API.__private__.resetCustomOutputDestination = function (destination) {
        customOutputDestination = undefined;
      };

      var out = API.__private__.out = function (string) {
        var writeArray;
        string = typeof string === "string" ? string : string.toString();

        if (typeof customOutputDestination === "undefined") {
          writeArray = outToPages ? pages[currentPage] : content;
        } else {
          writeArray = customOutputDestination;
        }

        writeArray.push(string);

        if (!outToPages) {
          content_length += string.length + 1;
        }

        return writeArray;
      };

      var write = API.__private__.write = function (value) {
        return out(arguments.length === 1 ? value.toString() : Array.prototype.join.call(arguments, ' '));
      };

      var getArrayBuffer = API.__private__.getArrayBuffer = function (data) {
        var len = data.length,
            ab = new ArrayBuffer(len),
            u8 = new Uint8Array(ab);

        while (len--) {
          u8[len] = data.charCodeAt(len);
        }

        return ab;
      };

      var standardFonts = [['Helvetica', "helvetica", "normal", 'WinAnsiEncoding'], ['Helvetica-Bold', "helvetica", "bold", 'WinAnsiEncoding'], ['Helvetica-Oblique', "helvetica", "italic", 'WinAnsiEncoding'], ['Helvetica-BoldOblique', "helvetica", "bolditalic", 'WinAnsiEncoding'], ['Courier', "courier", "normal", 'WinAnsiEncoding'], ['Courier-Bold', "courier", "bold", 'WinAnsiEncoding'], ['Courier-Oblique', "courier", "italic", 'WinAnsiEncoding'], ['Courier-BoldOblique', "courier", "bolditalic", 'WinAnsiEncoding'], ['Times-Roman', "times", "normal", 'WinAnsiEncoding'], ['Times-Bold', "times", "bold", 'WinAnsiEncoding'], ['Times-Italic', "times", "italic", 'WinAnsiEncoding'], ['Times-BoldItalic', "times", "bolditalic", 'WinAnsiEncoding'], ['ZapfDingbats', "zapfdingbats", "normal", null], ['Symbol', "symbol", "normal", null]];

      var getStandardFonts = API.__private__.getStandardFonts = function (data) {
        return standardFonts;
      };

      var activeFontSize = options.fontSize || 16;
      var setFontSize = API.__private__.setFontSize = API.setFontSize = function (size) {
        activeFontSize = size;
        return this;
      };
      var getFontSize = API.__private__.getFontSize = API.getFontSize = function () {
        return activeFontSize;
      };

      var R2L = options.R2L || false;
      var setR2L = API.__private__.setR2L = API.setR2L = function (value) {
        R2L = value;
        return this;
      };
      var getR2L = API.__private__.getR2L = API.getR2L = function (value) {
        return R2L;
      };

      var zoomMode;
      var setZoomMode = API.__private__.setZoomMode = function (zoom) {
        var validZoomModes = [undefined, null, 'fullwidth', 'fullheight', 'fullpage', 'original'];
        if (/^\d*\.?\d*\%$/.test(zoom)) {
          zoomMode = zoom;
        } else if (!isNaN(zoom)) {
          zoomMode = parseInt(zoom, 10);
        } else if (validZoomModes.indexOf(zoom) !== -1) {
          zoomMode = zoom;
        } else {
          throw new Error('zoom must be Integer (e.g. 2), a percentage Value (e.g. 300%) or fullwidth, fullheight, fullpage, original. "' + zoom + '" is not recognized.');
        }
      };

      var getZoomMode = API.__private__.getZoomMode = function () {
        return zoomMode;
      };

      var pageMode;

      var setPageMode = API.__private__.setPageMode = function (pmode) {
        var validPageModes = [undefined, null, 'UseNone', 'UseOutlines', 'UseThumbs', 'FullScreen'];

        if (validPageModes.indexOf(pmode) == -1) {
          throw new Error('Page mode must be one of UseNone, UseOutlines, UseThumbs, or FullScreen. "' + pmode + '" is not recognized.');
        }

        pageMode = pmode;
      };

      var getPageMode = API.__private__.getPageMode = function () {
        return pageMode;
      };

      var layoutMode;

      var setLayoutMode = API.__private__.setLayoutMode = function (layout) {
        var validLayoutModes = [undefined, null, 'continuous', 'single', 'twoleft', 'tworight', 'two'];

        if (validLayoutModes.indexOf(layout) == -1) {
          throw new Error('Layout mode must be one of continuous, single, twoleft, tworight. "' + layout + '" is not recognized.');
        }

        layoutMode = layout;
      };

      var getLayoutMode = API.__private__.getLayoutMode = function () {
        return layoutMode;
      };
      var setDisplayMode = API.__private__.setDisplayMode = API.setDisplayMode = function (zoom, layout, pmode) {
        setZoomMode(zoom);
        setLayoutMode(layout);
        setPageMode(pmode);
        return this;
      };

      var documentProperties = {
        'title': '',
        'subject': '',
        'author': '',
        'keywords': '',
        'creator': ''
      };

      var getDocumentProperty = API.__private__.getDocumentProperty = function (key) {
        if (Object.keys(documentProperties).indexOf(key) === -1) {
          throw new Error('Invalid argument passed to jsPDF.getDocumentProperty');
        }

        return documentProperties[key];
      };

      var getDocumentProperties = API.__private__.getDocumentProperties = function (properties) {
        return documentProperties;
      };
      var setDocumentProperties = API.__private__.setDocumentProperties = API.setProperties = API.setDocumentProperties = function (properties) {
        for (var property in documentProperties) {
          if (documentProperties.hasOwnProperty(property) && properties[property]) {
            documentProperties[property] = properties[property];
          }
        }

        return this;
      };

      var setDocumentProperty = API.__private__.setDocumentProperty = function (key, value) {
        if (Object.keys(documentProperties).indexOf(key) === -1) {
          throw new Error('Invalid arguments passed to jsPDF.setDocumentProperty');
        }

        return documentProperties[key] = value;
      };

      var objectNumber = 0;
      var offsets = [];
      var fonts = {};
      var fontmap = {};
      var activeFontKey;
      var k;
      var page = 0;
      var pagesContext = [];
      var additionalObjects = [];
      var events = new PubSub(API);
      var hotfixes = options.hotfixes || [];
      var newObject = API.__private__.newObject = function () {
        var oid = newObjectDeferred();
        newObjectDeferredBegin(oid, true);
        return oid;
      };
      var newObjectDeferred = API.__private__.newObjectDeferred = function () {
        objectNumber++;
        offsets[objectNumber] = function () {
          return content_length;
        };
        return objectNumber;
      };

      var newObjectDeferredBegin = function newObjectDeferredBegin(oid, doOutput) {
        doOutput = typeof doOutput === 'boolean' ? doOutput : false;
        offsets[oid] = content_length;
        if (doOutput) {
          out(oid + ' 0 obj');
        }
        return oid;
      };
      var newAdditionalObject = API.__private__.newAdditionalObject = function () {
        var objId = newObjectDeferred();
        var obj = {
          objId: objId,
          content: ''
        };
        additionalObjects.push(obj);
        return obj;
      };
      var rootDictionaryObjId = newObjectDeferred();
      var resourceDictionaryObjId = newObjectDeferred();
      var decodeColorString = API.__private__.decodeColorString = function (color) {
        var colorEncoded = color.split(' ');
        if (colorEncoded.length === 2 && (colorEncoded[1] === 'g' || colorEncoded[1] === 'G')) {
          var floatVal = parseFloat(colorEncoded[0]);
          colorEncoded = [floatVal, floatVal, floatVal, 'r'];
        }
        var colorAsRGB = '#';
        for (var i = 0; i < 3; i++) {
          colorAsRGB += ('0' + Math.floor(parseFloat(colorEncoded[i]) * 255).toString(16)).slice(-2);
        }
        return colorAsRGB;
      };
      var encodeColorString = API.__private__.encodeColorString = function (options) {
        var color;
        if (typeof options === "string") {
          options = {
            ch1: options
          };
        }

        var ch1 = options.ch1;
        var ch2 = options.ch2;
        var ch3 = options.ch3;
        var ch4 = options.ch4;
        var precision = options.precision;
        var letterArray = options.pdfColorType === "draw" ? ['G', 'RG', 'K'] : ['g', 'rg', 'k'];

        if (typeof ch1 === "string" && ch1.charAt(0) !== '#') {
          var rgbColor = new RGBColor(ch1);

          if (rgbColor.ok) {
            ch1 = rgbColor.toHex();
          } else if (!/^\d*\.?\d*$/.test(ch1)) {
            throw new Error('Invalid color "' + ch1 + '" passed to jsPDF.encodeColorString.');
          }
        }
        if (typeof ch1 === "string" && /^#[0-9A-Fa-f]{3}$/.test(ch1)) {
          ch1 = '#' + ch1[1] + ch1[1] + ch1[2] + ch1[2] + ch1[3] + ch1[3];
        }

        if (typeof ch1 === "string" && /^#[0-9A-Fa-f]{6}$/.test(ch1)) {
          var hex = parseInt(ch1.substr(1), 16);
          ch1 = hex >> 16 & 255;
          ch2 = hex >> 8 & 255;
          ch3 = hex & 255;
        }

        if (typeof ch2 === "undefined" || typeof ch4 === "undefined" && ch1 === ch2 && ch2 === ch3) {
          // Gray color space.
          if (typeof ch1 === "string") {
            color = ch1 + " " + letterArray[0];
          } else {
            switch (options.precision) {
              case 2:
                color = f2(ch1 / 255) + " " + letterArray[0];
                break;

              case 3:
              default:
                color = f3(ch1 / 255) + " " + letterArray[0];
            }
          }
        } else if (typeof ch4 === "undefined" || _typeof(ch4) === "object") {
          if (ch4 && !isNaN(ch4.a)) {
            if (ch4.a === 0) {
              color = ['1.000', '1.000', '1.000', letterArray[1]].join(" ");
              return color;
            }
          }
          if (typeof ch1 === "string") {
            color = [ch1, ch2, ch3, letterArray[1]].join(" ");
          } else {
            switch (options.precision) {
              case 2:
                color = [f2(ch1 / 255), f2(ch2 / 255), f2(ch3 / 255), letterArray[1]].join(" ");
                break;

              default:
              case 3:
                color = [f3(ch1 / 255), f3(ch2 / 255), f3(ch3 / 255), letterArray[1]].join(" ");
            }
          }
        } else {
          if (typeof ch1 === 'string') {
            color = [ch1, ch2, ch3, ch4, letterArray[2]].join(" ");
          } else {
            switch (options.precision) {
              case 2:
                color = [f2(ch1 / 255), f2(ch2 / 255), f2(ch3 / 255), f2(ch4 / 255), letterArray[2]].join(" ");
                break;

              case 3:
              default:
                color = [f3(ch1 / 255), f3(ch2 / 255), f3(ch3 / 255), f3(ch4 / 255), letterArray[2]].join(" ");
            }
          }
        }

        return color;
      };

      var getFilters = API.__private__.getFilters = function () {
        return filters;
      };

      var putStream = API.__private__.putStream = function (options) {
        options = options || {};
        var data = options.data || '';
        var filters = options.filters || getFilters();
        var alreadyAppliedFilters = options.alreadyAppliedFilters || [];
        var addLength1 = options.addLength1 || false;
        var valueOfLength1 = data.length;
        var processedData = {};

        if (filters === true) {
          filters = ['FlateEncode'];
        }

        var keyValues = options.additionalKeyValues || [];

        if (typeof jsPDF.API.processDataByFilters !== 'undefined') {
          processedData = jsPDF.API.processDataByFilters(data, filters);
        } else {
          processedData = {
            data: data,
            reverseChain: []
          };
        }

        var filterAsString = processedData.reverseChain + (Array.isArray(alreadyAppliedFilters) ? alreadyAppliedFilters.join(' ') : alreadyAppliedFilters.toString());

        if (processedData.data.length !== 0) {
          keyValues.push({
            key: 'Length',
            value: processedData.data.length
          });

          if (addLength1 === true) {
            keyValues.push({
              key: 'Length1',
              value: valueOfLength1
            });
          }
        }

        if (filterAsString.length != 0) {
          if (filterAsString.split('/').length - 1 === 1) {
            keyValues.push({
              key: 'Filter',
              value: filterAsString
            });
          } else {
            keyValues.push({
              key: 'Filter',
              value: '[' + filterAsString + ']'
            });
          }
        }

        out('<<');

        for (var i = 0; i < keyValues.length; i++) {
          out('/' + keyValues[i].key + ' ' + keyValues[i].value);
        }

        out('>>');

        if (processedData.data.length !== 0) {
          out('stream');
          out(processedData.data);
          out('endstream');
        }
      };

      var putPage = API.__private__.putPage = function (page) {
        var mediaBox = page.mediaBox;
        var pageNumber = page.number;
        var data = page.data;
        var pageObjectNumber = page.objId;
        var pageContentsObjId = page.contentsObjId;
        newObjectDeferredBegin(pageObjectNumber, true);
        var wPt = pagesContext[currentPage].mediaBox.topRightX - pagesContext[currentPage].mediaBox.bottomLeftX;
        var hPt = pagesContext[currentPage].mediaBox.topRightY - pagesContext[currentPage].mediaBox.bottomLeftY;
        out('<</Type /Page');
        out('/Parent ' + page.rootDictionaryObjId + ' 0 R');
        out('/Resources ' + page.resourceDictionaryObjId + ' 0 R');
        out('/MediaBox [' + parseFloat(f2(page.mediaBox.bottomLeftX)) + ' ' + parseFloat(f2(page.mediaBox.bottomLeftY)) + ' ' + f2(page.mediaBox.topRightX) + ' ' + f2(page.mediaBox.topRightY) + ']');

        if (page.cropBox !== null) {
          out('/CropBox [' + f2(page.cropBox.bottomLeftX) + ' ' + f2(page.cropBox.bottomLeftY) + ' ' + f2(page.cropBox.topRightX) + ' ' + f2(page.cropBox.topRightY) + ']');
        }

        if (page.bleedBox !== null) {
          out('/BleedBox [' + f2(page.bleedBox.bottomLeftX) + ' ' + f2(page.bleedBox.bottomLeftY) + ' ' + f2(page.bleedBox.topRightX) + ' ' + f2(page.bleedBox.topRightY) + ']');
        }

        if (page.trimBox !== null) {
          out('/TrimBox [' + f2(page.trimBox.bottomLeftX) + ' ' + f2(page.trimBox.bottomLeftY) + ' ' + f2(page.trimBox.topRightX) + ' ' + f2(page.trimBox.topRightY) + ']');
        }

        if (page.artBox !== null) {
          out('/ArtBox [' + f2(page.artBox.bottomLeftX) + ' ' + f2(page.artBox.bottomLeftY) + ' ' + f2(page.artBox.topRightX) + ' ' + f2(page.artBox.topRightY) + ']');
        }

        if (typeof page.userUnit === "number" && page.userUnit !== 1.0) {
          out('/UserUnit ' + page.userUnit);
        }

        events.publish('putPage', {
          objId: pageObjectNumber,
          pageContext: pagesContext[pageNumber],
          pageNumber: pageNumber,
          page: data
        });
        out('/Contents ' + pageContentsObjId + ' 0 R');
        out('>>');
        out('endobj');
        var pageContent = data.join('\n');
        newObjectDeferredBegin(pageContentsObjId, true);
        putStream({
          data: pageContent,
          filters: getFilters()
        });
        out('endobj');
        return pageObjectNumber;
      };

      var putPages = API.__private__.putPages = function () {
        var n,
            i,
            pageObjectNumbers = [];

        for (n = 1; n <= page; n++) {
          pagesContext[n].objId = newObjectDeferred();
          pagesContext[n].contentsObjId = newObjectDeferred();
        }

        for (n = 1; n <= page; n++) {
          pageObjectNumbers.push(putPage({
            number: n,
            data: pages[n],
            objId: pagesContext[n].objId,
            contentsObjId: pagesContext[n].contentsObjId,
            mediaBox: pagesContext[n].mediaBox,
            cropBox: pagesContext[n].cropBox,
            bleedBox: pagesContext[n].bleedBox,
            trimBox: pagesContext[n].trimBox,
            artBox: pagesContext[n].artBox,
            userUnit: pagesContext[n].userUnit,
            rootDictionaryObjId: rootDictionaryObjId,
            resourceDictionaryObjId: resourceDictionaryObjId
          }));
        }

        newObjectDeferredBegin(rootDictionaryObjId, true);
        out('<</Type /Pages');
        var kids = '/Kids [';

        for (i = 0; i < page; i++) {
          kids += pageObjectNumbers[i] + ' 0 R ';
        }

        out(kids + ']');
        out('/Count ' + page);
        out('>>');
        out('endobj');
        events.publish('postPutPages');
      };

      var putFont = function putFont(font) {
        events.publish('putFont', {
          font: font,
          out: out,
          newObject: newObject,
          putStream: putStream
        });

        if (font.isAlreadyPutted !== true) {
          font.objectNumber = newObject();
          out('<<');
          out('/Type /Font');
          out('/BaseFont /' + font.postScriptName);
          out('/Subtype /Type1');

          if (typeof font.encoding === 'string') {
            out('/Encoding /' + font.encoding);
          }

          out('/FirstChar 32');
          out('/LastChar 255');
          out('>>');
          out('endobj');
        }
      };

      var putFonts = function putFonts() {
        for (var fontKey in fonts) {
          if (fonts.hasOwnProperty(fontKey)) {
            if (putOnlyUsedFonts === false || putOnlyUsedFonts === true && usedFonts.hasOwnProperty(fontKey)) {
              putFont(fonts[fontKey]);
            }
          }
        }
      };

      var putResourceDictionary = function putResourceDictionary() {
        out('/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]');
        out('/Font <<');
        for (var fontKey in fonts) {
          if (fonts.hasOwnProperty(fontKey)) {
            if (putOnlyUsedFonts === false || putOnlyUsedFonts === true && usedFonts.hasOwnProperty(fontKey)) {
              out('/' + fontKey + ' ' + fonts[fontKey].objectNumber + ' 0 R');
            }
          }
        }

        out('>>');
        out('/XObject <<');
        events.publish('putXobjectDict');
        out('>>');
      };

      var putResources = function putResources() {
        putFonts();
        events.publish('putResources');
        newObjectDeferredBegin(resourceDictionaryObjId, true);
        out('<<');
        putResourceDictionary();
        out('>>');
        out('endobj');
        events.publish('postPutResources');
      };

      var putAdditionalObjects = function putAdditionalObjects() {
        events.publish('putAdditionalObjects');

        for (var i = 0; i < additionalObjects.length; i++) {
          var obj = additionalObjects[i];
          newObjectDeferredBegin(obj.objId, true);
          out(obj.content);
          out('endobj');
        }

        events.publish('postPutAdditionalObjects');
      };

      var addToFontDictionary = function addToFontDictionary(fontKey, fontName, fontStyle) {
        if (!fontmap.hasOwnProperty(fontName)) {
          fontmap[fontName] = {};
        }

        fontmap[fontName][fontStyle] = fontKey;
      };

      var addFont = function addFont(postScriptName, fontName, fontStyle, encoding, isStandardFont) {
        isStandardFont = isStandardFont || false;
        var fontKey = 'F' + (Object.keys(fonts).length + 1).toString(10),
        font = {
          'id': fontKey,
          'postScriptName': postScriptName,
          'fontName': fontName,
          'fontStyle': fontStyle,
          'encoding': encoding,
          'isStandardFont': isStandardFont,
          'metadata': {}
        };
        var instance = this;
        events.publish('addFont', {
          font: font,
          instance: instance
        });

        if (fontKey !== undefined) {
          fonts[fontKey] = font;
          addToFontDictionary(fontKey, fontName, fontStyle);
        }

        return fontKey;
      };

      var addFonts = function addFonts(arrayOfFonts) {
        for (var i = 0, l = standardFonts.length; i < l; i++) {
          var fontKey = addFont(arrayOfFonts[i][0], arrayOfFonts[i][1], arrayOfFonts[i][2], standardFonts[i][3], true);
          usedFonts[fontKey] = true;
          var parts = arrayOfFonts[i][0].split('-');
          addToFontDictionary(fontKey, parts[0], parts[1] || '');
        }

        events.publish('addFonts', {
          fonts: fonts,
          dictionary: fontmap
        });
      };

      var SAFE = function __safeCall(fn) {
        fn.foo = function __safeCallWrapper() {
          try {
            return fn.apply(this, arguments);
          } catch (e) {
            var stack = e.stack || '';
            if (~stack.indexOf(' at ')) stack = stack.split(" at ")[1];
            var m = "Error in function " + stack.split("\n")[0].split('<')[0] + ": " + e.message;

            if (global.console) {
              global.console.error(m, e);
              if (global.alert) alert(m);
            } else {
              throw new Error(m);
            }
          }
        };

        fn.foo.bar = fn;
        return fn.foo;
      };

      var to8bitStream = function to8bitStream(text, flags) {
        var i, l, sourceEncoding, encodingBlock, outputEncoding, newtext, isUnicode, ch, bch;
        flags = flags || {};
        sourceEncoding = flags.sourceEncoding || 'Unicode';
        outputEncoding = flags.outputEncoding;
        if ((flags.autoencode || outputEncoding) && fonts[activeFontKey].metadata && fonts[activeFontKey].metadata[sourceEncoding] && fonts[activeFontKey].metadata[sourceEncoding].encoding) {
          encodingBlock = fonts[activeFontKey].metadata[sourceEncoding].encoding;
          if (!outputEncoding && fonts[activeFontKey].encoding) {
            outputEncoding = fonts[activeFontKey].encoding;
          }
          if (!outputEncoding && encodingBlock.codePages) {
            outputEncoding = encodingBlock.codePages[0];
          }

          if (typeof outputEncoding === 'string') {
            outputEncoding = encodingBlock[outputEncoding];
          }
          if (outputEncoding) {
            isUnicode = false;
            newtext = [];
            for (i = 0, l = text.length; i < l; i++) {
              ch = outputEncoding[text.charCodeAt(i)];

              if (ch) {
                newtext.push(String.fromCharCode(ch));
              } else {
                newtext.push(text[i]);
              }
              if (newtext[i].charCodeAt(0) >> 8) {
                isUnicode = true;
              }
            }

            text = newtext.join('');
          }
        }

        i = text.length;
        while (isUnicode === undefined && i !== 0) {
          if (text.charCodeAt(i - 1) >> 8) {
            isUnicode = true;
          }

          i--;
        }

        if (!isUnicode) {
          return text;
        }

        newtext = flags.noBOM ? [] : [254, 255];

        for (i = 0, l = text.length; i < l; i++) {
          ch = text.charCodeAt(i);
          bch = ch >> 8;
          if (bch >> 8) {
            throw new Error("Character at position " + i + " of string '" + text + "' exceeds 16bits. Cannot be encoded into UCS-2 BE");
          }

          newtext.push(bch);
          newtext.push(ch - (bch << 8));
        }

        return String.fromCharCode.apply(undefined, newtext);
      };

      var pdfEscape = API.__private__.pdfEscape = API.pdfEscape = function (text, flags) {
        return to8bitStream(text, flags).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
      };

      var beginPage = API.__private__.beginPage = function (width, height) {
        var tmp;

        var orientation = typeof height === 'string' && height.toLowerCase();

        if (typeof width === 'string') {
          if (tmp = getPageFormat(width.toLowerCase())) {
            width = tmp[0];
            height = tmp[1];
          }
        }

        if (Array.isArray(width)) {
          height = width[1];
          width = width[0];
        }

        if (isNaN(width) || isNaN(height)) {
          width = format[0];
          height = format[1];
        }

        if (orientation) {
          switch (orientation.substr(0, 1)) {
            case 'l':
              if (height > width) orientation = 's';
              break;

            case 'p':
              if (width > height) orientation = 's';
              break;
          }

          if (orientation === 's') {
            tmp = width;
            width = height;
            height = tmp;
          }
        }

        if (width > 14400 || height > 14400) {
          console.warn('A page in a PDF can not be wider or taller than 14400 userUnit. jsPDF limits the width/height to 14400');
          width = Math.min(14400, width);
          height = Math.min(14400, height);
        }

        format = [width, height];
        outToPages = true;
        pages[++page] = [];
        pagesContext[page] = {
          objId: 0,
          contentsObjId: 0,
          userUnit: Number(userUnit),
          artBox: null,
          bleedBox: null,
          cropBox: null,
          trimBox: null,
          mediaBox: {
            bottomLeftX: 0,
            bottomLeftY: 0,
            topRightX: Number(width),
            topRightY: Number(height)
          }
        };

        _setPage(page);
      };

      var _addPage = function _addPage() {
        beginPage.apply(this, arguments);

        setLineWidth(lineWidth);

        out(strokeColor);

        if (lineCapID !== 0) {
          out(lineCapID + ' J');
        }

        if (lineJoinID !== 0) {
          out(lineJoinID + ' j');
        }

        events.publish('addPage', {
          pageNumber: page
        });
      };

      var _deletePage = function _deletePage(n) {
        if (n > 0 && n <= page) {
          pages.splice(n, 1);
          page--;

          if (currentPage > page) {
            currentPage = page;
          }

          this.setPage(currentPage);
        }
      };

      var _setPage = function _setPage(n) {
        if (n > 0 && n <= page) {
          currentPage = n;
        }
      };

      var getNumberOfPages = API.__private__.getNumberOfPages = API.getNumberOfPages = function () {
        return pages.length - 1;
      };
      var _getFont = function getFont(fontName, fontStyle, options) {
        var key = undefined,
            fontNameLowerCase;
        options = options || {};
        fontName = fontName !== undefined ? fontName : fonts[activeFontKey].fontName;
        fontStyle = fontStyle !== undefined ? fontStyle : fonts[activeFontKey].fontStyle;
        fontNameLowerCase = fontName.toLowerCase();

        if (fontmap[fontNameLowerCase] !== undefined && fontmap[fontNameLowerCase][fontStyle] !== undefined) {
          key = fontmap[fontNameLowerCase][fontStyle];
        } else if (fontmap[fontName] !== undefined && fontmap[fontName][fontStyle] !== undefined) {
          key = fontmap[fontName][fontStyle];
        } else {
          if (options.disableWarning === false) {
            console.warn("Unable to look up font label for font '" + fontName + "', '" + fontStyle + "'. Refer to getFontList() for available fonts.");
          }
        }

        if (!key && !options.noFallback) {
          key = fontmap['times'][fontStyle];

          if (key == null) {
            key = fontmap['times']['normal'];
          }
        }

        return key;
      };

      var putInfo = API.__private__.putInfo = function () {
        newObject();
        out('<<');
        out('/Producer (jsPDF ' + jsPDF.version + ')');

        for (var key in documentProperties) {
          if (documentProperties.hasOwnProperty(key) && documentProperties[key]) {
            out('/' + key.substr(0, 1).toUpperCase() + key.substr(1) + ' (' + pdfEscape(documentProperties[key]) + ')');
          }
        }

        out('/CreationDate (' + creationDate + ')');
        out('>>');
        out('endobj');
      };

      var putCatalog = API.__private__.putCatalog = function (options) {
        options = options || {};
        var tmpRootDictionaryObjId = options.rootDictionaryObjId || rootDictionaryObjId;
        newObject();
        out('<<');
        out('/Type /Catalog');
        out('/Pages ' + tmpRootDictionaryObjId + ' 0 R');

        if (!zoomMode) zoomMode = 'fullwidth';

        switch (zoomMode) {
          case 'fullwidth':
            out('/OpenAction [3 0 R /FitH null]');
            break;

          case 'fullheight':
            out('/OpenAction [3 0 R /FitV null]');
            break;

          case 'fullpage':
            out('/OpenAction [3 0 R /Fit]');
            break;

          case 'original':
            out('/OpenAction [3 0 R /XYZ null null 1]');
            break;

          default:
            var pcn = '' + zoomMode;
            if (pcn.substr(pcn.length - 1) === '%') zoomMode = parseInt(zoomMode) / 100;

            if (typeof zoomMode === 'number') {
              out('/OpenAction [3 0 R /XYZ null null ' + f2(zoomMode) + ']');
            }

        }

        if (!layoutMode) layoutMode = 'continuous';

        switch (layoutMode) {
          case 'continuous':
            out('/PageLayout /OneColumn');
            break;

          case 'single':
            out('/PageLayout /SinglePage');
            break;

          case 'two':
          case 'twoleft':
            out('/PageLayout /TwoColumnLeft');
            break;

          case 'tworight':
            out('/PageLayout /TwoColumnRight');
            break;
        }

        if (pageMode) {
          out('/PageMode /' + pageMode);
        }

        events.publish('putCatalog');
        out('>>');
        out('endobj');
      };

      var putTrailer = API.__private__.putTrailer = function () {
        out('trailer');
        out('<<');
        out('/Size ' + (objectNumber + 1));
        out('/Root ' + objectNumber + ' 0 R');
        out('/Info ' + (objectNumber - 1) + ' 0 R');
        out("/ID [ <" + fileId + "> <" + fileId + "> ]");
        out('>>');
      };

      var putHeader = API.__private__.putHeader = function () {
        out('%PDF-' + pdfVersion);
        out("%\xBA\xDF\xAC\xE0");
      };

      var putXRef = API.__private__.putXRef = function () {
        var i = 1;
        var p = "0000000000";
        out('xref');
        out('0 ' + (objectNumber + 1));
        out('0000000000 65535 f ');

        for (i = 1; i <= objectNumber; i++) {
          var offset = offsets[i];

          if (typeof offset === 'function') {
            out((p + offsets[i]()).slice(-10) + ' 00000 n ');
          } else {
            if (typeof offsets[i] !== "undefined") {
              out((p + offsets[i]).slice(-10) + ' 00000 n ');
            } else {
              out('0000000000 00000 n ');
            }
          }
        }
      };

      var buildDocument = API.__private__.buildDocument = function () {
        outToPages = false;
        objectNumber = 0;
        content_length = 0;
        content = [];
        offsets = [];
        additionalObjects = [];
        rootDictionaryObjId = newObjectDeferred();
        resourceDictionaryObjId = newObjectDeferred();
        events.publish('buildDocument');
        putHeader();
        putPages();
        putAdditionalObjects();
        putResources();
        putInfo();
        putCatalog();
        var offsetOfXRef = content_length;
        putXRef();
        putTrailer();
        out('startxref');
        out('' + offsetOfXRef);
        out('%%EOF');
        outToPages = true;
        return content.join('\n');
      };

      var getBlob = API.__private__.getBlob = function (data) {
        return new Blob([getArrayBuffer(data)], {
          type: "application/pdf"
        });
      };
      var output = API.output = API.__private__.output = SAFE(function output(type, options) {
        options = options || {};
        var pdfDocument = buildDocument();

        if (typeof options === "string") {
          options = {
            filename: options
          };
        } else {
          options.filename = options.filename || 'generated.pdf';
        }

        switch (type) {
          case undefined:
            return pdfDocument;

          case 'save':
            API.save(options.filename);
            break;

          case 'arraybuffer':
            return getArrayBuffer(pdfDocument);

          case 'blob':
            return getBlob(pdfDocument);

          case 'bloburi':
          case 'bloburl':
            if (typeof global.URL !== "undefined" && typeof global.URL.createObjectURL === "function") {
              return global.URL && global.URL.createObjectURL(getBlob(pdfDocument)) || void 0;
            } else {
              console.warn('bloburl is not supported by your system, because URL.createObjectURL is not supported by your browser.');
            }

            break;

          case 'datauristring':
          case 'dataurlstring':
            return 'data:application/pdf;filename=' + options.filename + ';base64,' + btoa(pdfDocument);

          case 'dataurlnewwindow':
            var htmlForNewWindow = '<html>' + '<style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style>' + '<body>' + '<iframe src="' + this.output('datauristring') + '"></iframe>' + '</body></html>';
            var nW = global.open();

            if (nW !== null) {
              nW.document.write(htmlForNewWindow);
            }

            if (nW || typeof safari === "undefined") return nW;

          case 'datauri':
          case 'dataurl':
            return global.document.location.href = 'data:application/pdf;filename=' + options.filename + ';base64,' + btoa(pdfDocument);

          default:
            return null;
        }
      });
      var hasHotfix = function hasHotfix(hotfixName) {
        return Array.isArray(hotfixes) === true && hotfixes.indexOf(hotfixName) > -1;
      };

      switch (unit) {
        case 'pt':
          k = 1;
          break;

        case 'mm':
          k = 72 / 25.4;
          break;

        case 'cm':
          k = 72 / 2.54;
          break;

        case 'in':
          k = 72;
          break;

        case 'px':
          if (hasHotfix('px_scaling') == true) {
            k = 72 / 96;
          } else {
            k = 96 / 72;
          }

          break;

        case 'pc':
          k = 12;
          break;

        case 'em':
          k = 12;
          break;

        case 'ex':
          k = 6;
          break;

        default:
          throw new Error('Invalid unit: ' + unit);
      }

      setCreationDate();
      setFileId();
      var getPageInfo = API.__private__.getPageInfo = function (pageNumberOneBased) {
        if (isNaN(pageNumberOneBased) || pageNumberOneBased % 1 !== 0) {
          throw new Error('Invalid argument passed to jsPDF.getPageInfo');
        }

        var objId = pagesContext[pageNumberOneBased].objId;
        return {
          objId: objId,
          pageNumber: pageNumberOneBased,
          pageContext: pagesContext[pageNumberOneBased]
        };
      };

      var getPageInfoByObjId = API.__private__.getPageInfoByObjId = function (objId) {

        for (var pageNumber in pagesContext) {
          if (pagesContext[pageNumber].objId === objId) {
            break;
          }
        }

        if (isNaN(objId) || objId % 1 !== 0) {
          throw new Error('Invalid argument passed to jsPDF.getPageInfoByObjId');
        }

        return getPageInfo(pageNumber);
      };

      var getCurrentPageInfo = API.__private__.getCurrentPageInfo = function () {
        return {
          objId: pagesContext[currentPage].objId,
          pageNumber: currentPage,
          pageContext: pagesContext[currentPage]
        };
      };

      API.addPage = function () {
        _addPage.apply(this, arguments);

        return this;
      };

      API.setPage = function () {
        _setPage.apply(this, arguments);

        return this;
      };
      API.insertPage = function (beforePage) {
        this.addPage();
        this.movePage(currentPage, beforePage);
        return this;
      };
      API.movePage = function (targetPage, beforePage) {
        if (targetPage > beforePage) {
          var tmpPages = pages[targetPage];
          var tmpPagesContext = pagesContext[targetPage];

          for (var i = targetPage; i > beforePage; i--) {
            pages[i] = pages[i - 1];
            pagesContext[i] = pagesContext[i - 1];
          }

          pages[beforePage] = tmpPages;
          pagesContext[beforePage] = tmpPagesContext;
          this.setPage(beforePage);
        } else if (targetPage < beforePage) {
          var tmpPages = pages[targetPage];
          var tmpPagesContext = pagesContext[targetPage];

          for (var i = targetPage; i < beforePage; i++) {
            pages[i] = pages[i + 1];
            pagesContext[i] = pagesContext[i + 1];
          }

          pages[beforePage] = tmpPages;
          pagesContext[beforePage] = tmpPagesContext;
          this.setPage(beforePage);
        }

        return this;
      };
      API.deletePage = function () {
        _deletePage.apply(this, arguments);

        return this;
      };
      var text = API.__private__.text = API.text = function (text, x, y, options) {
        var tmp;
        if (typeof text === 'number' && typeof x === 'number' && (typeof y === 'string' || Array.isArray(y))) {
          tmp = y;
          y = x;
          x = text;
          text = tmp;
        }

        var flags = arguments[3];
        var angle = arguments[4];
        var align = arguments[5];

        if (_typeof(flags) !== "object" || flags === null) {
          if (typeof angle === 'string') {
            align = angle;
            angle = null;
          }

          if (typeof flags === 'string') {
            align = flags;
            flags = null;
          }

          if (typeof flags === 'number') {
            angle = flags;
            flags = null;
          }

          options = {
            flags: flags,
            angle: angle,
            align: align
          };
        }

        flags = flags || {};
        flags.noBOM = flags.noBOM || true;
        flags.autoencode = flags.autoencode || true;

        if (isNaN(x) || isNaN(y) || typeof text === "undefined" || text === null) {
          throw new Error('Invalid arguments passed to jsPDF.text');
        }

        if (text.length === 0) {
          return scope;
        }

        var xtra = '';
        var isHex = false;
        var lineHeight = typeof options.lineHeightFactor === 'number' ? options.lineHeightFactor : lineHeightFactor;
        var scope = options.scope || this;

        function ESC(s) {
          s = s.split("\t").join(Array(options.TabLen || 9).join(" "));
          return pdfEscape(s, flags);
        }

        function transformTextToSpecialArray(text) {
          var sa = text.concat();
          var da = [];
          var len = sa.length;
          var curDa;

          while (len--) {
            curDa = sa.shift();

            if (typeof curDa === "string") {
              da.push(curDa);
            } else {
              if (Array.isArray(text) && curDa.length === 1) {
                da.push(curDa[0]);
              } else {
                da.push([curDa[0], curDa[1], curDa[2]]);
              }
            }
          }

          return da;
        }

        function processTextByFunction(text, processingFunction) {
          var result;

          if (typeof text === 'string') {
            result = processingFunction(text)[0];
          } else if (Array.isArray(text)) {
            var sa = text.concat();
            var da = [];
            var len = sa.length;
            var curDa;
            var tmpResult;
            while (len--) {
              curDa = sa.shift();

              if (typeof curDa === "string") {
                da.push(processingFunction(curDa)[0]);
              } else if (Array.isArray(curDa) && curDa[0] === "string") {
                tmpResult = processingFunction(curDa[0], curDa[1], curDa[2]);
                da.push([tmpResult[0], tmpResult[1], tmpResult[2]]);
              }
            }

            result = da;
          }

          return result;
        }
        var textIsOfTypeString = false;
        var tmpTextIsOfTypeString = true;
        if (typeof text === 'string') {
          textIsOfTypeString = true;
        } else if (Array.isArray(text)) {
          var sa = text.concat();
          var da = [];
          var len = sa.length;
          var curDa;
          while (len--) {
            curDa = sa.shift();
            if (typeof curDa !== "string" || Array.isArray(curDa) && typeof curDa[0] !== "string") {
              tmpTextIsOfTypeString = false;
            }
          }

          textIsOfTypeString = tmpTextIsOfTypeString;
        }

        if (textIsOfTypeString === false) {
          throw new Error('Type of text must be string or Array. "' + text + '" is not recognized.');
        }
        var activeFontEncoding = fonts[activeFontKey].encoding;
        if (activeFontEncoding === "WinAnsiEncoding" || activeFontEncoding === "StandardEncoding") {
          text = processTextByFunction(text, function (text, posX, posY) {
            return [ESC(text), posX, posY];
          });
        }
        if (typeof text === 'string') {
          if (text.match(/[\r?\n]/)) {
            text = text.split(/\r\n|\r|\n/g);
          } else {
            text = [text];
          }
        }
        var height = activeFontSize / scope.internal.scaleFactor;
        var descent = height * (lineHeightFactor - 1);

        switch (options.baseline) {
          case 'bottom':
            y -= descent;
            break;

          case 'top':
            y += height - descent;
            break;

          case 'hanging':
            y += height - 2 * descent;
            break;

          case 'middle':
            y += height / 2 - descent;
            break;

          case 'ideographic':
          case 'alphabetic':
          default:
            break;
        }
        var maxWidth = options.maxWidth || 0;

        if (maxWidth > 0) {
          if (typeof text === 'string') {
            text = scope.splitTextToSize(text, maxWidth);
          } else if (Object.prototype.toString.call(text) === '[object Array]') {
            text = scope.splitTextToSize(text.join(" "), maxWidth);
          }
        }
        var payload = {
          text: text,
          x: x,
          y: y,
          options: options,
          mutex: {
            pdfEscape: pdfEscape,
            activeFontKey: activeFontKey,
            fonts: fonts,
            activeFontSize: activeFontSize
          }
        };
        events.publish('preProcessText', payload);
        text = payload.text;
        options = payload.options;
        var angle = options.angle;
        var k = scope.internal.scaleFactor;
        var transformationMatrix = [];

        if (angle) {
          angle *= Math.PI / 180;
          var c = Math.cos(angle),
              s = Math.sin(angle);
          transformationMatrix = [f2(c), f2(s), f2(s * -1), f2(c)];
        }
        var charSpace = options.charSpace;

        if (typeof charSpace !== 'undefined') {
          xtra += f3(charSpace * k) + " Tc\n";
        }
        var lang = options.lang;
        var tmpRenderingMode = -1;
        var parmRenderingMode = typeof options.renderingMode !== "undefined" ? options.renderingMode : options.stroke;
        var pageContext = scope.internal.getCurrentPageInfo().pageContext;

        switch (parmRenderingMode) {
          case 0:
          case false:
          case 'fill':
            tmpRenderingMode = 0;
            break;

          case 1:
          case true:
          case 'stroke':
            tmpRenderingMode = 1;
            break;

          case 2:
          case 'fillThenStroke':
            tmpRenderingMode = 2;
            break;

          case 3:
          case 'invisible':
            tmpRenderingMode = 3;
            break;

          case 4:
          case 'fillAndAddForClipping':
            tmpRenderingMode = 4;
            break;

          case 5:
          case 'strokeAndAddPathForClipping':
            tmpRenderingMode = 5;
            break;

          case 6:
          case 'fillThenStrokeAndAddToPathForClipping':
            tmpRenderingMode = 6;
            break;

          case 7:
          case 'addToPathForClipping':
            tmpRenderingMode = 7;
            break;
        }

        var usedRenderingMode = typeof pageContext.usedRenderingMode !== 'undefined' ? pageContext.usedRenderingMode : -1;

        if (tmpRenderingMode !== -1) {
          xtra += tmpRenderingMode + " Tr\n";
        } else if (usedRenderingMode !== -1) {
          xtra += "0 Tr\n";
        }

        if (tmpRenderingMode !== -1) {
          pageContext.usedRenderingMode = tmpRenderingMode;
        }
        var align = options.align || 'left';
        var leading = activeFontSize * lineHeight;
        var pageWidth = scope.internal.pageSize.getWidth();
        var k = scope.internal.scaleFactor;
        var activeFont = fonts[activeFontKey];
        var charSpace = options.charSpace || activeCharSpace;
        var maxWidth = options.maxWidth || 0;
        var lineWidths;
        var flags = {};
        var wordSpacingPerLine = [];

        if (Object.prototype.toString.call(text) === '[object Array]') {
          var da = transformTextToSpecialArray(text);
          var newY;
          var maxLineLength;
          var lineWidths;

          if (align !== "left") {
            lineWidths = da.map(function (v) {
              return scope.getStringUnitWidth(v, {
                font: activeFont,
                charSpace: charSpace,
                fontSize: activeFontSize
              }) * activeFontSize / k;
            });
          }

          var maxLineLength = Math.max.apply(Math, lineWidths);
          var prevWidth = 0;
          var delta;
          var newX;

          if (align === "right") {
            x -= lineWidths[0];
            text = [];

            for (var i = 0, len = da.length; i < len; i++) {
              delta = maxLineLength - lineWidths[i];

              if (i === 0) {
                newX = getHorizontalCoordinate(x);
                newY = getVerticalCoordinate(y);
              } else {
                newX = (prevWidth - lineWidths[i]) * k;
                newY = -leading;
              }

              text.push([da[i], newX, newY]);
              prevWidth = lineWidths[i];
            }
          } else if (align === "center") {
            x -= lineWidths[0] / 2;
            text = [];

            for (var i = 0, len = da.length; i < len; i++) {
              delta = (maxLineLength - lineWidths[i]) / 2;

              if (i === 0) {
                newX = getHorizontalCoordinate(x);
                newY = getVerticalCoordinate(y);
              } else {
                newX = (prevWidth - lineWidths[i]) / 2 * k;
                newY = -leading;
              }

              text.push([da[i], newX, newY]);
              prevWidth = lineWidths[i];
            }
          } else if (align === "left") {
            text = [];

            for (var i = 0, len = da.length; i < len; i++) {
              newY = i === 0 ? getVerticalCoordinate(y) : -leading;
              newX = i === 0 ? getHorizontalCoordinate(x) : 0;
              text.push(da[i]);
            }
          } else if (align === "justify") {
            text = [];
            var maxWidth = maxWidth !== 0 ? maxWidth : pageWidth;

            for (var i = 0, len = da.length; i < len; i++) {
              newY = i === 0 ? getVerticalCoordinate(y) : -leading;
              newX = i === 0 ? getHorizontalCoordinate(x) : 0;

              if (i < len - 1) {
                wordSpacingPerLine.push(((maxWidth - lineWidths[i]) / (da[i].split(" ").length - 1) * k).toFixed(2));
              }

              text.push([da[i], newX, newY]);
            }
          } else {
            throw new Error('Unrecognized alignment option, use "left", "center", "right" or "justify".');
          }
        }
        var doReversing = typeof options.R2L === "boolean" ? options.R2L : R2L;

        if (doReversing === true) {
          text = processTextByFunction(text, function (text, posX, posY) {
            return [text.split("").reverse().join(""), posX, posY];
          });
        }
        var payload = {
          text: text,
          x: x,
          y: y,
          options: options,
          mutex: {
            pdfEscape: pdfEscape,
            activeFontKey: activeFontKey,
            fonts: fonts,
            activeFontSize: activeFontSize
          }
        };
        events.publish('postProcessText', payload);
        text = payload.text;
        isHex = payload.mutex.isHex;
        var da = transformTextToSpecialArray(text);
        text = [];
        var variant = 0;
        var len = da.length;
        var posX;
        var posY;
        var content;
        var wordSpacing = '';

        for (var i = 0; i < len; i++) {
          wordSpacing = '';

          if (!Array.isArray(da[i])) {
            posX = getHorizontalCoordinate(x);
            posY = getVerticalCoordinate(y);
            content = (isHex ? "<" : "(") + da[i] + (isHex ? ">" : ")");
          } else {
            posX = parseFloat(da[i][1]);
            posY = parseFloat(da[i][2]);
            content = (isHex ? "<" : "(") + da[i][0] + (isHex ? ">" : ")");
            variant = 1;
          }

          if (wordSpacingPerLine !== undefined && wordSpacingPerLine[i] !== undefined) {
            wordSpacing = wordSpacingPerLine[i] + " Tw\n";
          }

          if (transformationMatrix.length !== 0 && i === 0) {
            text.push(wordSpacing + transformationMatrix.join(" ") + " " + posX.toFixed(2) + " " + posY.toFixed(2) + " Tm\n" + content);
          } else if (variant === 1 || variant === 0 && i === 0) {
            text.push(wordSpacing + posX.toFixed(2) + " " + posY.toFixed(2) + " Td\n" + content);
          } else {
            text.push(wordSpacing + content);
          }
        }

        if (variant === 0) {
          text = text.join(" Tj\nT* ");
        } else {
          text = text.join(" Tj\n");
        }

        text += " Tj\n";
        var result = 'BT\n/' + activeFontKey + ' ' + activeFontSize + ' Tf\n' +
        (activeFontSize * lineHeight).toFixed(2) + ' TL\n' +
        textColor + '\n';
        result += xtra;
        result += text;
        result += "ET";
        out(result);
        usedFonts[activeFontKey] = true;
        return scope;
      };
      var lstext = API.__private__.lstext = API.lstext = function (text, x, y, charSpace) {
        console.warn('jsPDF.lstext is deprecated');
        return this.text(text, x, y, {
          charSpace: charSpace
        });
      };
      var clip = API.__private__.clip = API.clip = function (rule) {
        if ('evenodd' === rule) {
          out('W*');
        } else {
          out('W');
        }
        out('n');
      };
      var clip_fixed = API.__private__.clip_fixed = API.clip_fixed = function (rule) {
        console.log("clip_fixed is deprecated");
        API.clip(rule);
      };

      var isValidStyle = API.__private__.isValidStyle = function (style) {
        var validStyleVariants = [undefined, null, 'S', 'F', 'DF', 'FD', 'f', 'f*', 'B', 'B*'];
        var result = false;

        if (validStyleVariants.indexOf(style) !== -1) {
          result = true;
        }

        return result;
      };

      var getStyle = API.__private__.getStyle = function (style) {
        var op = 'S';
        if (style === 'F') {
          op = 'f';
        } else if (style === 'FD' || style === 'DF') {
          op = 'B';
        } else if (style === 'f' || style === 'f*' || style === 'B' || style === 'B*') {
          op = style;
        }

        return op;
      };
      var line = API.__private__.line = API.line = function (x1, y1, x2, y2) {
        if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
          throw new Error('Invalid arguments passed to jsPDF.line');
        }

        return this.lines([[x2 - x1, y2 - y1]], x1, y1);
      };
      var lines = API.__private__.lines = API.lines = function (lines, x, y, scale, style, closed) {
        var scalex, scaley, i, l, leg, x2, y2, x3, y3, x4, y4, tmp;
        if (typeof lines === 'number') {
          tmp = y;
          y = x;
          x = lines;
          lines = tmp;
        }

        scale = scale || [1, 1];
        closed = closed || false;

        if (isNaN(x) || isNaN(y) || !Array.isArray(lines) || !Array.isArray(scale) || !isValidStyle(style) || typeof closed !== 'boolean') {
          throw new Error('Invalid arguments passed to jsPDF.lines');
        }
        out(f3(getHorizontalCoordinate(x)) + ' ' + f3(getVerticalCoordinate(y)) + ' m ');
        scalex = scale[0];
        scaley = scale[1];
        l = lines.length;
        x4 = x;
        y4 = y;
        for (i = 0; i < l; i++) {
          leg = lines[i];
          if (leg.length === 2) {
            x4 = leg[0] * scalex + x4;
            y4 = leg[1] * scaley + y4;
            out(f3(getHorizontalCoordinate(x4)) + ' ' + f3(getVerticalCoordinate(y4)) + ' l');
          } else {
            x2 = leg[0] * scalex + x4;
            y2 = leg[1] * scaley + y4;
            x3 = leg[2] * scalex + x4;
            y3 = leg[3] * scaley + y4;
            x4 = leg[4] * scalex + x4;
            y4 = leg[5] * scaley + y4;
            out(f3(getHorizontalCoordinate(x2)) + ' ' + f3(getVerticalCoordinate(y2)) + ' ' + f3(getHorizontalCoordinate(x3)) + ' ' + f3(getVerticalCoordinate(y3)) + ' ' + f3(getHorizontalCoordinate(x4)) + ' ' + f3(getVerticalCoordinate(y4)) + ' c');
          }
        }

        if (closed) {
          out(' h');
        }
        if (style !== null) {
          out(getStyle(style));
        }

        return this;
      };
      var rect = API.__private__.rect = API.rect = function (x, y, w, h, style) {
        if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h) || !isValidStyle(style)) {
          throw new Error('Invalid arguments passed to jsPDF.rect');
        }

        out([f2(getHorizontalCoordinate(x)), f2(getVerticalCoordinate(y)), f2(w * k), f2(-h * k), 're'].join(' '));

        if (style !== null) {
          out(getStyle(style));
        }

        return this;
      };
      var triangle = API.__private__.triangle = API.triangle = function (x1, y1, x2, y2, x3, y3, style) {
        if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(x3) || isNaN(y3) || !isValidStyle(style)) {
          throw new Error('Invalid arguments passed to jsPDF.triangle');
        }

        this.lines([[x2 - x1, y2 - y1],
        [x3 - x2, y3 - y2],
        [x1 - x3, y1 - y3]
        ], x1, y1,
        [1, 1], style, true);
        return this;
      };
      var roundedRect = API.__private__.roundedRect = API.roundedRect = function (x, y, w, h, rx, ry, style) {
        if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h) || isNaN(rx) || isNaN(ry) || !isValidStyle(style)) {
          throw new Error('Invalid arguments passed to jsPDF.roundedRect');
        }

        var MyArc = 4 / 3 * (Math.SQRT2 - 1);
        this.lines([[w - 2 * rx, 0], [rx * MyArc, 0, rx, ry - ry * MyArc, rx, ry], [0, h - 2 * ry], [0, ry * MyArc, -(rx * MyArc), ry, -rx, ry], [-w + 2 * rx, 0], [-(rx * MyArc), 0, -rx, -(ry * MyArc), -rx, -ry], [0, -h + 2 * ry], [0, -(ry * MyArc), rx * MyArc, -ry, rx, -ry]], x + rx, y, // start of path
        [1, 1], style);
        return this;
      };
      var ellise = API.__private__.ellipse = API.ellipse = function (x, y, rx, ry, style) {
        if (isNaN(x) || isNaN(y) || isNaN(rx) || isNaN(ry) || !isValidStyle(style)) {
          throw new Error('Invalid arguments passed to jsPDF.ellipse');
        }

        var lx = 4 / 3 * (Math.SQRT2 - 1) * rx,
            ly = 4 / 3 * (Math.SQRT2 - 1) * ry;
        out([f2(getHorizontalCoordinate(x + rx)), f2(getVerticalCoordinate(y)), 'm', f2(getHorizontalCoordinate(x + rx)), f2(getVerticalCoordinate(y - ly)), f2(getHorizontalCoordinate(x + lx)), f2(getVerticalCoordinate(y - ry)), f2(getHorizontalCoordinate(x)), f2(getVerticalCoordinate(y - ry)), 'c'].join(' '));
        out([f2(getHorizontalCoordinate(x - lx)), f2(getVerticalCoordinate(y - ry)), f2(getHorizontalCoordinate(x - rx)), f2(getVerticalCoordinate(y - ly)), f2(getHorizontalCoordinate(x - rx)), f2(getVerticalCoordinate(y)), 'c'].join(' '));
        out([f2(getHorizontalCoordinate(x - rx)), f2(getVerticalCoordinate(y + ly)), f2(getHorizontalCoordinate(x - lx)), f2(getVerticalCoordinate(y + ry)), f2(getHorizontalCoordinate(x)), f2(getVerticalCoordinate(y + ry)), 'c'].join(' '));
        out([f2(getHorizontalCoordinate(x + lx)), f2(getVerticalCoordinate(y + ry)), f2(getHorizontalCoordinate(x + rx)), f2(getVerticalCoordinate(y + ly)), f2(getHorizontalCoordinate(x + rx)), f2(getVerticalCoordinate(y)), 'c'].join(' '));

        if (style !== null) {
          out(getStyle(style));
        }

        return this;
      };
      var circle = API.__private__.circle = API.circle = function (x, y, r, style) {
        if (isNaN(x) || isNaN(y) || isNaN(r) || !isValidStyle(style)) {
          throw new Error('Invalid arguments passed to jsPDF.circle');
        }

        return this.ellipse(x, y, r, r, style);
      };
      API.setFont = function (fontName, fontStyle) {
        activeFontKey = _getFont(fontName, fontStyle, {
          disableWarning: false
        });
        return this;
      };
      API.setFontStyle = API.setFontType = function (style) {
        activeFontKey = _getFont(undefined, style);
        return this;
      };
      var getFontList = API.__private__.getFontList = API.getFontList = function () {
        var list = {},
            fontName,
            fontStyle,
            tmp;

        for (fontName in fontmap) {
          if (fontmap.hasOwnProperty(fontName)) {
            list[fontName] = tmp = [];

            for (fontStyle in fontmap[fontName]) {
              if (fontmap[fontName].hasOwnProperty(fontStyle)) {
                tmp.push(fontStyle);
              }
            }
          }
        }

        return list;
      };
      API.addFont = function (postScriptName, fontName, fontStyle, encoding) {
        encoding = encoding || 'Identity-H';
        addFont.call(this, postScriptName, fontName, fontStyle, encoding);
      };

      var lineWidth = options.lineWidth || 0.200025;
      var setLineWidth = API.__private__.setLineWidth = API.setLineWidth = function (width) {
        out((width * k).toFixed(2) + ' w');
        return this;
      };
      var setLineDash = API.__private__.setLineDash = jsPDF.API.setLineDash = function (dashArray, dashPhase) {
        dashArray = dashArray || [];
        dashPhase = dashPhase || 0;

        if (isNaN(dashPhase) || !Array.isArray(dashArray)) {
          throw new Error('Invalid arguments passed to jsPDF.setLineDash');
        }

        dashArray = dashArray.map(function (x) {
          return (x * k).toFixed(3);
        }).join(' ');
        dashPhase = parseFloat((dashPhase * k).toFixed(3));
        out('[' + dashArray + '] ' + dashPhase + ' d');
        return this;
      };

      var lineHeightFactor;

      var getLineHeight = API.__private__.getLineHeight = API.getLineHeight = function () {
        return activeFontSize * lineHeightFactor;
      };

      var lineHeightFactor;

      var getLineHeight = API.__private__.getLineHeight = API.getLineHeight = function () {
        return activeFontSize * lineHeightFactor;
      };
      var setLineHeightFactor = API.__private__.setLineHeightFactor = API.setLineHeightFactor = function (value) {
        value = value || 1.15;

        if (typeof value === "number") {
          lineHeightFactor = value;
        }

        return this;
      };
      var getLineHeightFactor = API.__private__.getLineHeightFactor = API.getLineHeightFactor = function () {
        return lineHeightFactor;
      };

      setLineHeightFactor(options.lineHeight);

      var getHorizontalCoordinate = API.__private__.getHorizontalCoordinate = function (value) {
        return value * k;
      };

      var getVerticalCoordinate = API.__private__.getVerticalCoordinate = function (value) {
        return pagesContext[currentPage].mediaBox.topRightY - pagesContext[currentPage].mediaBox.bottomLeftY - value * k;
      };

      var getHorizontalCoordinateString = API.__private__.getHorizontalCoordinateString = function (value) {
        return f2(value * k);
      };

      var getVerticalCoordinateString = API.__private__.getVerticalCoordinateString = function (value) {
        return f2(pagesContext[currentPage].mediaBox.topRightY - pagesContext[currentPage].mediaBox.bottomLeftY - value * k);
      };

      var strokeColor = options.strokeColor || '0 G';
      var getStrokeColor = API.__private__.getStrokeColor = API.getDrawColor = function () {
        return decodeColorString(strokeColor);
      };
      var setStrokeColor = API.__private__.setStrokeColor = API.setDrawColor = function (ch1, ch2, ch3, ch4) {
        var options = {
          "ch1": ch1,
          "ch2": ch2,
          "ch3": ch3,
          "ch4": ch4,
          "pdfColorType": "draw",
          "precision": 2
        };
        strokeColor = encodeColorString(options);
        out(strokeColor);
        return this;
      };

      var fillColor = options.fillColor || '0 g';

      var getFillColor = API.__private__.getFillColor = API.getFillColor = function () {
        return decodeColorString(fillColor);
      };
      var setFillColor = API.__private__.setFillColor = API.setFillColor = function (ch1, ch2, ch3, ch4) {
        var options = {
          "ch1": ch1,
          "ch2": ch2,
          "ch3": ch3,
          "ch4": ch4,
          "pdfColorType": "fill",
          "precision": 2
        };
        fillColor = encodeColorString(options);
        out(fillColor);
        return this;
      };

      var textColor = options.textColor || '0 g';
      var getTextColor = API.__private__.getTextColor = API.getTextColor = function () {
        return decodeColorString(textColor);
      };
      var setTextColor = API.__private__.setTextColor = API.setTextColor = function (ch1, ch2, ch3, ch4) {
        var options = {
          "ch1": ch1,
          "ch2": ch2,
          "ch3": ch3,
          "ch4": ch4,
          "pdfColorType": "text",
          "precision": 3
        };
        textColor = encodeColorString(options);
        return this;
      };

      var activeCharSpace = options.charSpace || 0;
      var getCharSpace = API.__private__.getCharSpace = API.getCharSpace = function () {
        return activeCharSpace;
      };
      var setCharSpace = API.__private__.setCharSpace = API.setCharSpace = function (charSpace) {
        if (isNaN(charSpace)) {
          throw new Error('Invalid argument passed to jsPDF.setCharSpace');
        }

        activeCharSpace = charSpace;
        return this;
      };

      var lineCapID = 0;
      API.CapJoinStyles = {
        0: 0,
        'butt': 0,
        'but': 0,
        'miter': 0,
        1: 1,
        'round': 1,
        'rounded': 1,
        'circle': 1,
        2: 2,
        'projecting': 2,
        'project': 2,
        'square': 2,
        'bevel': 2
      };
      var setLineCap = API.__private__.setLineCap = API.setLineCap = function (style) {
        var id = API.CapJoinStyles[style];

        if (id === undefined) {
          throw new Error("Line cap style of '" + style + "' is not recognized. See or extend .CapJoinStyles property for valid styles");
        }

        lineCapID = id;
        out(id + ' J');
        return this;
      };

      var lineJoinID = 0;

      var setLineJoin = API.__private__.setLineJoin = API.setLineJoin = function (style) {
        var id = API.CapJoinStyles[style];

        if (id === undefined) {
          throw new Error("Line join style of '" + style + "' is not recognized. See or extend .CapJoinStyles property for valid styles");
        }

        lineJoinID = id;
        out(id + ' j');
        return this;
      };

      var miterLimit;

      var setMiterLimit = API.__private__.setMiterLimit = API.setMiterLimit = function (length) {
        length = length || 0;

        if (isNaN(length)) {
          throw new Error('Invalid argument passed to jsPDF.setMiterLimit');
        }

        miterLimit = parseFloat(f2(length * k));
        out(miterLimit + ' M');
        return this;
      };

      API.save = function (filename, options) {
        filename = filename || 'generated.pdf';
        options = options || {};
        options.returnPromise = options.returnPromise || false;

        if (options.returnPromise === false) {
          saveAs(getBlob(buildDocument()), filename);

          if (typeof saveAs.unload === 'function') {
            if (global.setTimeout) {
              setTimeout(saveAs.unload, 911);
            }
          }
        } else {
          return new Promise(function (resolve, reject) {
            try {
              var result = saveAs(getBlob(buildDocument()), filename);

              if (typeof saveAs.unload === 'function') {
                if (global.setTimeout) {
                  setTimeout(saveAs.unload, 911);
                }
              }

              resolve(result);
            } catch (e) {
              reject(e.message);
            }
          });
        }
      };


      for (var plugin in jsPDF.API) {
        if (jsPDF.API.hasOwnProperty(plugin)) {
          if (plugin === 'events' && jsPDF.API.events.length) {
            (function (events, newEvents) {
              var eventname, handler_and_args, i;
              for (i = newEvents.length - 1; i !== -1; i--) {
                eventname = newEvents[i][0];
                handler_and_args = newEvents[i][1];
                events.subscribe.apply(events, [eventname].concat(typeof handler_and_args === 'function' ? [handler_and_args] : handler_and_args));
              }
            })(events, jsPDF.API.events);
          } else {
            API[plugin] = jsPDF.API[plugin];
          }
        }
      }
      API.internal = {
        'pdfEscape': pdfEscape,
        'getStyle': getStyle,
        'getFont': function getFont() {
          return fonts[_getFont.apply(API, arguments)];
        },
        'getFontSize': getFontSize,
        'getCharSpace': getCharSpace,
        'getTextColor': getTextColor,
        'getLineHeight': getLineHeight,
        'getLineHeightFactor': getLineHeightFactor,
        'write': write,
        'getHorizontalCoordinate': getHorizontalCoordinate,
        'getVerticalCoordinate': getVerticalCoordinate,
        'getCoordinateString': getHorizontalCoordinateString,
        'getVerticalCoordinateString': getVerticalCoordinateString,
        'collections': {},
        'newObject': newObject,
        'newAdditionalObject': newAdditionalObject,
        'newObjectDeferred': newObjectDeferred,
        'newObjectDeferredBegin': newObjectDeferredBegin,
        'getFilters': getFilters,
        'putStream': putStream,
        'events': events,
        'scaleFactor': k,
        'pageSize': {
          getWidth: function getWidth() {
            return (pagesContext[currentPage].mediaBox.topRightX - pagesContext[currentPage].mediaBox.bottomLeftX) / k;
          },
          setWidth: function setWidth(value) {
            pagesContext[currentPage].mediaBox.topRightX = value * k + pagesContext[currentPage].mediaBox.bottomLeftX;
          },
          getHeight: function getHeight() {
            return (pagesContext[currentPage].mediaBox.topRightY - pagesContext[currentPage].mediaBox.bottomLeftY) / k;
          },
          setHeight: function setHeight(value) {
            pagesContext[currentPage].mediaBox.topRightY = value * k + pagesContext[currentPage].mediaBox.bottomLeftY;
          }
        },
        'output': output,
        'getNumberOfPages': getNumberOfPages,
        'pages': pages,
        'out': out,
        'f2': f2,
        'f3': f3,
        'getPageInfo': getPageInfo,
        'getPageInfoByObjId': getPageInfoByObjId,
        'getCurrentPageInfo': getCurrentPageInfo,
        'getPDFVersion': getPdfVersion,
        'hasHotfix': hasHotfix

      };
      Object.defineProperty(API.internal.pageSize, 'width', {
        get: function get() {
          return (pagesContext[currentPage].mediaBox.topRightX - pagesContext[currentPage].mediaBox.bottomLeftX) / k;
        },
        set: function set(value) {
          pagesContext[currentPage].mediaBox.topRightX = value * k + pagesContext[currentPage].mediaBox.bottomLeftX;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(API.internal.pageSize, 'height', {
        get: function get() {
          return (pagesContext[currentPage].mediaBox.topRightY - pagesContext[currentPage].mediaBox.bottomLeftY) / k;
        },
        set: function set(value) {
          pagesContext[currentPage].mediaBox.topRightY = value * k + pagesContext[currentPage].mediaBox.bottomLeftY;
        },
        enumerable: true,
        configurable: true
      });
      addFonts(standardFonts);
      activeFontKey = 'F1';

      _addPage(format, orientation);

      events.publish('initialized');
      return API;
    }
    jsPDF.API = {
      events: []
    };
    jsPDF.version = '1.5.3';

    if (typeof define === 'function' && define.amd) {
      define('jsPDF', function () {
        return jsPDF;
      });
    } else if (typeof module !== 'undefined' && module.exports) {
      module.exports = jsPDF;
      module.exports.jsPDF = jsPDF;
    } else {
      global.jsPDF = jsPDF;
    }

    return jsPDF;
  }(typeof self !== "undefined" && self || typeof window !== "undefined" && window || typeof global !== "undefined" && global || Function('return typeof this === "object" && this.content')() || Function('return this')());
  window.tmp = jsPDF;
  (function (jsPDFAPI, globalObj) {

    var scope;
    var scaleFactor = 1;

    var pdfEscape = function pdfEscape(value) {
      return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    };

    var pdfUnescape = function pdfUnescape(value) {
      return value.replace(/\\\\/g, '\\').replace(/\\\(/g, '(').replace(/\\\)/g, ')');
    };

    var f2 = function f2(number) {
      if (isNaN(number)) {
        throw new Error('Invalid argument passed to jsPDF.f2');
      }

      return number.toFixed(2);
    };

    var f5 = function f5(number) {
      if (isNaN(number)) {
        throw new Error('Invalid argument passed to jsPDF.f2');
      }

      return number.toFixed(5);
    };

    jsPDFAPI.__acroform__ = {};

    var inherit = function inherit(child, parent) {

      child.prototype = Object.create(parent.prototype);
      child.prototype.constructor = child;
    };

    var scale = function scale(x) {
      return x * scaleFactor;
    };

    var antiScale = function antiScale(x) {
      return x / scaleFactor;
    };

    var createFormXObject = function createFormXObject(formObject) {
      var xobj = new AcroFormXObject();
      var height = AcroFormAppearance.internal.getHeight(formObject) || 0;
      var width = AcroFormAppearance.internal.getWidth(formObject) || 0;
      xobj.BBox = [0, 0, Number(f2(width)), Number(f2(height))];
      return xobj;
    };
    var setBit = jsPDFAPI.__acroform__.setBit = function (number, bitPosition) {
      number = number || 0;
      bitPosition = bitPosition || 0;

      if (isNaN(number) || isNaN(bitPosition)) {
        throw new Error('Invalid arguments passed to jsPDF.API.__acroform__.setBit');
      }

      var bitMask = 1 << bitPosition;
      number |= bitMask;
      return number;
    };

    var clearBit = jsPDFAPI.__acroform__.clearBit = function (number, bitPosition) {
      number = number || 0;
      bitPosition = bitPosition || 0;

      if (isNaN(number) || isNaN(bitPosition)) {
        throw new Error('Invalid arguments passed to jsPDF.API.__acroform__.clearBit');
      }

      var bitMask = 1 << bitPosition;
      number &= ~bitMask;
      return number;
    };

    var getBit = jsPDFAPI.__acroform__.getBit = function (number, bitPosition) {
      if (isNaN(number) || isNaN(bitPosition)) {
        throw new Error('Invalid arguments passed to jsPDF.API.__acroform__.getBit');
      }

      return (number & 1 << bitPosition) === 0 ? 0 : 1;
    };
    var getBitForPdf = jsPDFAPI.__acroform__.getBitForPdf = function (number, bitPosition) {
      if (isNaN(number) || isNaN(bitPosition)) {
        throw new Error('Invalid arguments passed to jsPDF.API.__acroform__.getBitForPdf');
      }

      return getBit(number, bitPosition - 1);
    };

    var setBitForPdf = jsPDFAPI.__acroform__.setBitForPdf = function (number, bitPosition) {
      if (isNaN(number) || isNaN(bitPosition)) {
        throw new Error('Invalid arguments passed to jsPDF.API.__acroform__.setBitForPdf');
      }

      return setBit(number, bitPosition - 1);
    };

    var clearBitForPdf = jsPDFAPI.__acroform__.clearBitForPdf = function (number, bitPosition, value) {
      if (isNaN(number) || isNaN(bitPosition)) {
        throw new Error('Invalid arguments passed to jsPDF.API.__acroform__.clearBitForPdf');
      }

      return clearBit(number, bitPosition - 1);
    };

    var calculateCoordinates = jsPDFAPI.__acroform__.calculateCoordinates = function (args) {
      var getHorizontalCoordinate = this.internal.getHorizontalCoordinate;
      var getVerticalCoordinate = this.internal.getVerticalCoordinate;
      var x = args[0];
      var y = args[1];
      var w = args[2];
      var h = args[3];
      var coordinates = {};
      coordinates.lowerLeft_X = getHorizontalCoordinate(x) || 0;
      coordinates.lowerLeft_Y = getVerticalCoordinate(y + h) || 0;
      coordinates.upperRight_X = getHorizontalCoordinate(x + w) || 0;
      coordinates.upperRight_Y = getVerticalCoordinate(y) || 0;
      return [Number(f2(coordinates.lowerLeft_X)), Number(f2(coordinates.lowerLeft_Y)), Number(f2(coordinates.upperRight_X)), Number(f2(coordinates.upperRight_Y))];
    };

    var calculateAppearanceStream = function calculateAppearanceStream(formObject) {
      if (formObject.appearanceStreamContent) {
        return formObject.appearanceStreamContent;
      }

      if (!formObject.V && !formObject.DV) {
        return;
      }
      var stream = [];
      var text = formObject.V || formObject.DV;
      var calcRes = calculateX(formObject, text);
      var fontKey = scope.internal.getFont(formObject.fontName, formObject.fontStyle).id;
      stream.push('/Tx BMC');
      stream.push('q');
      stream.push('BT');
      stream.push(scope.__private__.encodeColorString(formObject.color));
      stream.push('/' + fontKey + ' ' + f2(calcRes.fontSize) + ' Tf');
      stream.push('1 0 0 1 0 0 Tm');
      stream.push(calcRes.text);
      stream.push('ET');
      stream.push('Q');
      stream.push('EMC');
      var appearanceStreamContent = new createFormXObject(formObject);
      appearanceStreamContent.stream = stream.join("\n");
      return appearanceStreamContent;
    };

    var calculateX = function calculateX(formObject, text) {
      var maxFontSize = formObject.maxFontSize || 12;
      var font = formObject.fontName;
      var returnValue = {
        text: "",
        fontSize: ""
      };
      text = text.substr(0, 1) == '(' ? text.substr(1) : text;
      text = text.substr(text.length - 1) == ')' ? text.substr(0, text.length - 1) : text;
      var textSplit = text.split(' ');

      var color = scope.__private__.encodeColorString(formObject.color);

      var fontSize = maxFontSize;
      var lineSpacing = 2;
      var borderPadding = 2;
      var height = AcroFormAppearance.internal.getHeight(formObject) || 0;
      height = height < 0 ? -height : height;
      var width = AcroFormAppearance.internal.getWidth(formObject) || 0;
      width = width < 0 ? -width : width;

      var isSmallerThanWidth = function isSmallerThanWidth(i, lastLine, fontSize) {
        if (i + 1 < textSplit.length) {
          var tmp = lastLine + " " + textSplit[i + 1];
          var TextWidth = calculateFontSpace(tmp, formObject, fontSize).width;
          var FieldWidth = width - 2 * borderPadding;
          return TextWidth <= FieldWidth;
        } else {
          return false;
        }
      };

      fontSize++;

      FontSize: while (true) {
        var text = "";
        fontSize--;
        var textHeight = calculateFontSpace("3", formObject, fontSize).height;
        var startY = formObject.multiline ? height - fontSize : (height - textHeight) / 2;
        startY += lineSpacing;
        var startX = -borderPadding;
        var lastY = startY;
        var firstWordInLine = 0,
            lastWordInLine = 0;
        var lastLength = 0;

        if (fontSize <= 0) {
          fontSize = 12;
          text = "(...) Tj\n";
          text += "% Width of Text: " + calculateFontSpace(text, formObject, fontSize).width + ", FieldWidth:" + width + "\n";
          break;
        }

        lastLength = calculateFontSpace(textSplit[0] + " ", formObject, fontSize).width;
        var lastLine = "";
        var lineCount = 0;

        Line: for (var i in textSplit) {
          if (textSplit.hasOwnProperty(i)) {
            lastLine += textSplit[i] + " ";
            lastLine = lastLine.substr(lastLine.length - 1) == " " ? lastLine.substr(0, lastLine.length - 1) : lastLine;
            var key = parseInt(i);
            lastLength = calculateFontSpace(lastLine + " ", formObject, fontSize).width;
            var nextLineIsSmaller = isSmallerThanWidth(key, lastLine, fontSize);
            var isLastWord = i >= textSplit.length - 1;

            if (nextLineIsSmaller && !isLastWord) {
              lastLine += " ";
              continue;
            } else if (!nextLineIsSmaller && !isLastWord) {
              if (!formObject.multiline) {
                continue FontSize;
              } else {
                if ((textHeight + lineSpacing) * (lineCount + 2) + lineSpacing > height) {
                  continue FontSize;
                }

                lastWordInLine = key;
              }
            } else if (isLastWord) {
              lastWordInLine = key;
            } else {
              if (formObject.multiline && (textHeight + lineSpacing) * (lineCount + 2) + lineSpacing > height) {
                continue FontSize;
              }
            }

            var line = '';

            for (var x = firstWordInLine; x <= lastWordInLine; x++) {
              line += textSplit[x] + ' ';
            }
            line = line.substr(line.length - 1) == " " ? line.substr(0, line.length - 1) : line;
            lastLength = calculateFontSpace(line, formObject, fontSize).width;
            switch (formObject.textAlign) {
              case 'right':
                startX = width - lastLength - borderPadding;
                break;

              case 'center':
                startX = (width - lastLength) / 2;
                break;

              case 'left':
              default:
                startX = borderPadding;
                break;
            }

            text += f2(startX) + ' ' + f2(lastY) + ' Td\n';
            text += '(' + pdfEscape(line) + ') Tj\n';
            text += -f2(startX) + ' 0 Td\n';
            lastY = -(fontSize + lineSpacing);

            lastLength = 0;
            firstWordInLine = lastWordInLine + 1;
            lineCount++;
            lastLine = "";
            continue Line;
          }
        }

        break;
      }

      returnValue.text = text;
      returnValue.fontSize = fontSize;
      return returnValue;
    };
    var calculateFontSpace = function calculateFontSpace(text, formObject, fontSize) {
      var font = scope.internal.getFont(formObject.fontName, formObject.fontStyle);
      var width = scope.getStringUnitWidth(text, {
        font: font,
        fontSize: parseFloat(fontSize),
        charSpace: 0
      }) * parseFloat(fontSize);
      var height = scope.getStringUnitWidth("3", {
        font: font,
        fontSize: parseFloat(fontSize),
        charSpace: 0
      }) * parseFloat(fontSize) * 1.5;
      return {
        height: height,
        width: width
      };
    };

    var acroformPluginTemplate = {
      fields: [],
      xForms: [],
      printedOut: false,
      internal: null,
      isInitialized: false
    };

    var annotReferenceCallback = function annotReferenceCallback() {
      scope.internal.acroformPlugin.acroFormDictionaryRoot.objId = undefined;
      var fields = scope.internal.acroformPlugin.acroFormDictionaryRoot.Fields;

      for (var i in fields) {
        if (fields.hasOwnProperty(i)) {
          var formObject = fields[i];
          formObject.objId = undefined;
          if (formObject.hasAnnotation) {
            createAnnotationReference.call(scope, formObject);
          }
        }
      }
    };

    var putForm = function putForm(formObject) {
      if (scope.internal.acroformPlugin.printedOut) {
        scope.internal.acroformPlugin.printedOut = false;
        scope.internal.acroformPlugin.acroFormDictionaryRoot = null;
      }

      if (!scope.internal.acroformPlugin.acroFormDictionaryRoot) {
        initializeAcroForm.call(scope);
      }

      scope.internal.acroformPlugin.acroFormDictionaryRoot.Fields.push(formObject);
    };
    var createAnnotationReference = function createAnnotationReference(object) {
      var options = {
        type: 'reference',
        object: object
      };

      var findEntry = function findEntry(entry) {
        return entry.type === options.type && entry.object === options.object;
      };

      if (scope.internal.getPageInfo(object.page).pageContext.annotations.find(findEntry) === undefined) {
        scope.internal.getPageInfo(object.page).pageContext.annotations.push(options);
      }
    };

    var putCatalogCallback = function putCatalogCallback() {
      if (typeof scope.internal.acroformPlugin.acroFormDictionaryRoot != 'undefined') {
        scope.internal.write('/AcroForm ' + scope.internal.acroformPlugin.acroFormDictionaryRoot.objId + ' ' + 0 + ' R');
      } else {
        throw new Error('putCatalogCallback: Root missing.');
      }
    };
    var AcroFormDictionaryCallback = function AcroFormDictionaryCallback() {
      scope.internal.events.unsubscribe(scope.internal.acroformPlugin.acroFormDictionaryRoot._eventID);
      delete scope.internal.acroformPlugin.acroFormDictionaryRoot._eventID;
      scope.internal.acroformPlugin.printedOut = true;
    };
    var createFieldCallback = function createFieldCallback(fieldArray) {
      var standardFields = !fieldArray;

      if (!fieldArray) {
        scope.internal.newObjectDeferredBegin(scope.internal.acroformPlugin.acroFormDictionaryRoot.objId, true);
        scope.internal.acroformPlugin.acroFormDictionaryRoot.putStream();
      }

      var fieldArray = fieldArray || scope.internal.acroformPlugin.acroFormDictionaryRoot.Kids;

      for (var i in fieldArray) {
        if (fieldArray.hasOwnProperty(i)) {
          var fieldObject = fieldArray[i];
          var keyValueList = [];
          var oldRect = fieldObject.Rect;

          if (fieldObject.Rect) {
            fieldObject.Rect = calculateCoordinates.call(this, fieldObject.Rect);
          }
          scope.internal.newObjectDeferredBegin(fieldObject.objId, true);
          fieldObject.DA = AcroFormAppearance.createDefaultAppearanceStream(fieldObject);

          if (_typeof(fieldObject) === "object" && typeof fieldObject.getKeyValueListForStream === "function") {
            keyValueList = fieldObject.getKeyValueListForStream();
          }

          fieldObject.Rect = oldRect;

          if (fieldObject.hasAppearanceStream && !fieldObject.appearanceStreamContent) {
            var appearance = calculateAppearanceStream.call(this, fieldObject);
            keyValueList.push({
              key: 'AP',
              value: "<</N " + appearance + ">>"
            });
            scope.internal.acroformPlugin.xForms.push(appearance);
          }
          if (fieldObject.appearanceStreamContent) {
            var appearanceStreamString = "";
            for (var k in fieldObject.appearanceStreamContent) {
              if (fieldObject.appearanceStreamContent.hasOwnProperty(k)) {
                var value = fieldObject.appearanceStreamContent[k];
                appearanceStreamString += "/" + k + " ";
                appearanceStreamString += "<<";

                if (Object.keys(value).length >= 1 || Array.isArray(value)) {
                  for (var i in value) {
                    if (value.hasOwnProperty(i)) {
                      var obj = value[i];
                      if (typeof obj === 'function') {
                        obj = obj.call(this, fieldObject);
                      }

                      appearanceStreamString += "/" + i + " " + obj + " ";

                      if (!(scope.internal.acroformPlugin.xForms.indexOf(obj) >= 0)) scope.internal.acroformPlugin.xForms.push(obj);
                    }
                  }
                } else {
                  var obj = value;

                  if (typeof obj === 'function') {
                    obj = obj.call(this, fieldObject);
                  }

                  appearanceStreamString += "/" + i + " " + obj;
                  if (!(scope.internal.acroformPlugin.xForms.indexOf(obj) >= 0)) scope.internal.acroformPlugin.xForms.push(obj);
                }

                appearanceStreamString += ">>";
              }
            }
            keyValueList.push({
              key: 'AP',
              value: "<<\n" + appearanceStreamString + ">>"
            });
          }

          scope.internal.putStream({
            additionalKeyValues: keyValueList
          });
          scope.internal.out("endobj");
        }
      }

      if (standardFields) {
        createXFormObjectCallback.call(this, scope.internal.acroformPlugin.xForms);
      }
    };

    var createXFormObjectCallback = function createXFormObjectCallback(fieldArray) {
      for (var i in fieldArray) {
        if (fieldArray.hasOwnProperty(i)) {
          var key = i;
          var fieldObject = fieldArray[i];
          scope.internal.newObjectDeferredBegin(fieldObject && fieldObject.objId, true);

          if (_typeof(fieldObject) === "object" && typeof fieldObject.putStream === "function") {
            fieldObject.putStream();
          }

          delete fieldArray[key];
        }
      }
    };

    var initializeAcroForm = function initializeAcroForm() {
      if (this.internal !== undefined && (this.internal.acroformPlugin === undefined || this.internal.acroformPlugin.isInitialized === false)) {
        scope = this;
        AcroFormField.FieldNum = 0;
        this.internal.acroformPlugin = JSON.parse(JSON.stringify(acroformPluginTemplate));

        if (this.internal.acroformPlugin.acroFormDictionaryRoot) {
          throw new Error("Exception while creating AcroformDictionary");
        }

        scaleFactor = scope.internal.scaleFactor;
        scope.internal.acroformPlugin.acroFormDictionaryRoot = new AcroFormDictionary();
        scope.internal.acroformPlugin.acroFormDictionaryRoot._eventID = scope.internal.events.subscribe('postPutResources', AcroFormDictionaryCallback);
        scope.internal.events.subscribe('buildDocument', annotReferenceCallback);
        scope.internal.events.subscribe('putCatalog', putCatalogCallback);
        scope.internal.events.subscribe('postPutPages', createFieldCallback);
        scope.internal.acroformPlugin.isInitialized = true;
      }
    };

    var arrayToPdfArray = jsPDFAPI.__acroform__.arrayToPdfArray = function (array) {
      if (Array.isArray(array)) {
        var content = '[';

        for (var i = 0; i < array.length; i++) {
          if (i !== 0) {
            content += ' ';
          }

          switch (_typeof(array[i])) {
            case 'boolean':
            case 'number':
            case 'object':
              content += array[i].toString();
              break;

            case 'string':
              if (array[i].substr(0, 1) !== '/') {
                content += '(' + pdfEscape(array[i].toString()) + ')';
              } else {
                content += array[i].toString();
              }

              break;
          }
        }

        content += ']';
        return content;
      }

      throw new Error('Invalid argument passed to jsPDF.__acroform__.arrayToPdfArray');
    };

    function getMatches(string, regex, index) {
      index || (index = 1);
      var matches = [];
      var match;

      while (match = regex.exec(string)) {
        matches.push(match[index]);
      }

      return matches;
    }

    var pdfArrayToStringArray = function pdfArrayToStringArray(array) {
      var result = [];

      if (typeof array === "string") {
        result = getMatches(array, /\((.*?)\)/g);
      }

      return result;
    };

    var toPdfString = function toPdfString(string) {
      string = string || "";
      string.toString();
      string = '(' + pdfEscape(string) + ')';
      return string;
    };
    var AcroFormPDFObject = function AcroFormPDFObject() {
      var _objId;
      Object.defineProperty(this, 'objId', {
        configurable: true,
        get: function get() {
          if (!_objId) {
            _objId = scope.internal.newObjectDeferred();
          }

          if (!_objId) {
            throw new Error("AcroFormPDFObject: Couldn't create Object ID");
          }

          return _objId;
        },
        set: function set(value) {
          _objId = value;
        }
      });
    };
    AcroFormPDFObject.prototype.toString = function () {
      return this.objId + " 0 R";
    };

    AcroFormPDFObject.prototype.putStream = function () {
      var keyValueList = this.getKeyValueListForStream();
      scope.internal.putStream({
        data: this.stream,
        additionalKeyValues: keyValueList
      });
      scope.internal.out("endobj");
    };
    AcroFormPDFObject.prototype.getKeyValueListForStream = function () {
      var createKeyValueListFromFieldObject = function createKeyValueListFromFieldObject(fieldObject) {
        var keyValueList = [];
        var keys = Object.getOwnPropertyNames(fieldObject).filter(function (key) {
          return key != 'content' && key != 'appearanceStreamContent' && key.substring(0, 1) != "_";
        });

        for (var i in keys) {
          if (Object.getOwnPropertyDescriptor(fieldObject, keys[i]).configurable === false) {
            var key = keys[i];
            var value = fieldObject[key];

            if (value) {
              if (Array.isArray(value)) {
                keyValueList.push({
                  key: key,
                  value: arrayToPdfArray(value)
                });
              } else if (value instanceof AcroFormPDFObject) {
                keyValueList.push({
                  key: key,
                  value: value.objId + " 0 R"
                });
              } else if (typeof value !== "function") {
                keyValueList.push({
                  key: key,
                  value: value
                });
              }
            }
          }
        }

        return keyValueList;
      };

      return createKeyValueListFromFieldObject(this);
    };

    var AcroFormXObject = function AcroFormXObject() {
      AcroFormPDFObject.call(this);
      Object.defineProperty(this, 'Type', {
        value: "/XObject",
        configurable: false,
        writeable: true
      });
      Object.defineProperty(this, 'Subtype', {
        value: "/Form",
        configurable: false,
        writeable: true
      });
      Object.defineProperty(this, 'FormType', {
        value: 1,
        configurable: false,
        writeable: true
      });
      var _BBox = [];
      Object.defineProperty(this, 'BBox', {
        configurable: false,
        writeable: true,
        get: function get() {
          return _BBox;
        },
        set: function set(value) {
          _BBox = value;
        }
      });
      Object.defineProperty(this, 'Resources', {
        value: "2 0 R",
        configurable: false,
        writeable: true
      });

      var _stream;

      Object.defineProperty(this, 'stream', {
        enumerable: false,
        configurable: true,
        set: function set(value) {
          _stream = value.trim();
        },
        get: function get() {
          if (_stream) {
            return _stream;
          } else {
            return null;
          }
        }
      });
    };

    inherit(AcroFormXObject, AcroFormPDFObject);

    var AcroFormDictionary = function AcroFormDictionary() {
      AcroFormPDFObject.call(this);
      var _Kids = [];
      Object.defineProperty(this, 'Kids', {
        enumerable: false,
        configurable: true,
        get: function get() {
          if (_Kids.length > 0) {
            return _Kids;
          } else {
            return;
          }
        }
      });
      Object.defineProperty(this, 'Fields', {
        enumerable: false,
        configurable: false,
        get: function get() {
          return _Kids;
        }
      });
      var _DA;

      Object.defineProperty(this, 'DA', {
        enumerable: false,
        configurable: false,
        get: function get() {
          if (!_DA) {
            return;
          }

          return '(' + _DA + ')';
        },
        set: function set(value) {
          _DA = value;
        }
      });
    };

    inherit(AcroFormDictionary, AcroFormPDFObject);

    var AcroFormField = function AcroFormField() {
      AcroFormPDFObject.call(this);
      var _F = 4;
      Object.defineProperty(this, 'F', {
        enumerable: false,
        configurable: false,
        get: function get() {
          return _F;
        },
        set: function set(value) {
          if (!isNaN(value)) {
            _F = value;
          } else {
            throw new Error('Invalid value "' + value + '" for attribute F supplied.');
          }
        }
      });
      Object.defineProperty(this, 'showWhenPrinted', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return Boolean(getBitForPdf(_F, 3));
        },
        set: function set(value) {
          if (Boolean(value) === true) {
            this.F = setBitForPdf(_F, 3);
          } else {
            this.F = clearBitForPdf(_F, 3);
          }
        }
      });
      var _Ff = 0;
      Object.defineProperty(this, 'Ff', {
        enumerable: false,
        configurable: false,
        get: function get() {
          return _Ff;
        },
        set: function set(value) {
          if (!isNaN(value)) {
            _Ff = value;
          } else {
            throw new Error('Invalid value "' + value + '" for attribute Ff supplied.');
          }
        }
      });
      var _Rect = [];
      Object.defineProperty(this, 'Rect', {
        enumerable: false,
        configurable: false,
        get: function get() {
          if (_Rect.length === 0) {
            return;
          }

          return _Rect;
        },
        set: function set(value) {
          if (typeof value !== "undefined") {
            _Rect = value;
          } else {
            _Rect = [];
          }
        }
      });
      Object.defineProperty(this, 'x', {
        enumerable: true,
        configurable: true,
        get: function get() {
          if (!_Rect || isNaN(_Rect[0])) {
            return 0;
          }

          return antiScale(_Rect[0]);
        },
        set: function set(value) {
          _Rect[0] = scale(value);
        }
      });

      Object.defineProperty(this, 'y', {
        enumerable: true,
        configurable: true,
        get: function get() {
          if (!_Rect || isNaN(_Rect[1])) {
            return 0;
          }

          return antiScale(_Rect[1]);
        },
        set: function set(value) {
          _Rect[1] = scale(value);
        }
      });

      Object.defineProperty(this, 'width', {
        enumerable: true,
        configurable: true,
        get: function get() {
          if (!_Rect || isNaN(_Rect[2])) {
            return 0;
          }

          return antiScale(_Rect[2]);
        },
        set: function set(value) {
          _Rect[2] = scale(value);
        }
      });

      Object.defineProperty(this, 'height', {
        enumerable: true,
        configurable: true,
        get: function get() {
          if (!_Rect || isNaN(_Rect[3])) {
            return 0;
          }

          return antiScale(_Rect[3]);
        },
        set: function set(value) {
          _Rect[3] = scale(value);
        }
      });
      var _FT = "";
      Object.defineProperty(this, 'FT', {
        enumerable: true,
        configurable: false,
        get: function get() {
          return _FT;
        },
        set: function set(value) {
          switch (value) {
            case '/Btn':
            case '/Tx':
            case '/Ch':
            case '/Sig':
              _FT = value;
              break;

            default:
              throw new Error('Invalid value "' + value + '" for attribute FT supplied.');
          }
        }
      });
      var _T = null;
      Object.defineProperty(this, 'T', {
        enumerable: true,
        configurable: false,
        get: function get() {
          if (!_T || _T.length < 1) {
            if (this instanceof AcroFormChildClass) {
              return;
            }

            _T = "FieldObject" + AcroFormField.FieldNum++;
          }

          return '(' + pdfEscape(_T) + ')';
        },
        set: function set(value) {
          _T = value.toString();
        }
      });

      Object.defineProperty(this, 'fieldName', {
        configurable: true,
        enumerable: true,
        get: function get() {
          return _T;
        },
        set: function set(value) {
          _T = value;
        }
      });
      var _fontName = 'helvetica';

      Object.defineProperty(this, 'fontName', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return _fontName;
        },
        set: function set(value) {
          _fontName = value;
        }
      });
      var _fontStyle = 'normal';

      Object.defineProperty(this, 'fontStyle', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return _fontStyle;
        },
        set: function set(value) {
          _fontStyle = value;
        }
      });
      var _fontSize = 0;

      Object.defineProperty(this, 'fontSize', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return antiScale(_fontSize);
        },
        set: function set(value) {
          _fontSize = scale(value);
        }
      });
      var _maxFontSize = 50;

      Object.defineProperty(this, 'maxFontSize', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return antiScale(_maxFontSize);
        },
        set: function set(value) {
          _maxFontSize = scale(value);
        }
      });
      var _color = 'black';

      Object.defineProperty(this, 'color', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return _color;
        },
        set: function set(value) {
          _color = value;
        }
      });
      var _DA = '/F1 0 Tf 0 g';
      Object.defineProperty(this, 'DA', {
        enumerable: true,
        configurable: false,
        get: function get() {
          if (!_DA || this instanceof AcroFormChildClass || this instanceof AcroFormTextField) {
            return;
          }

          return toPdfString(_DA);
        },
        set: function set(value) {
          value = value.toString();
          _DA = value;
        }
      });
      var _DV = null;
      Object.defineProperty(this, 'DV', {
        enumerable: false,
        configurable: false,
        get: function get() {
          if (!_DV) {
            return;
          }

          if (this instanceof AcroFormButton === false) {
            return toPdfString(_DV);
          }

          return _DV;
        },
        set: function set(value) {
          value = value.toString();

          if (this instanceof AcroFormButton === false) {
            if (value.substr(0, 1) === '(') {
              _DV = pdfUnescape(value.substr(1, value.length - 2));
            } else {
              _DV = pdfUnescape(value);
            }
          } else {
            _DV = value;
          }
        }
      });
      Object.defineProperty(this, 'defaultValue', {
        enumerable: true,
        configurable: true,
        get: function get() {
          if (this instanceof AcroFormButton === true) {
            return pdfUnescape(_DV.substr(1, _DV.length - 1));
          } else {
            return _DV;
          }
        },
        set: function set(value) {
          value = value.toString();

          if (this instanceof AcroFormButton === true) {
            _DV = '/' + value;
          } else {
            _DV = value;
          }
        }
      });
      var _V = null;
      Object.defineProperty(this, 'V', {
        enumerable: false,
        configurable: false,
        get: function get() {
          if (!_V) {
            return;
          }

          if (this instanceof AcroFormButton === false) {
            return toPdfString(_V);
          }

          return _V;
        },
        set: function set(value) {
          value = value.toString();

          if (this instanceof AcroFormButton === false) {
            if (value.substr(0, 1) === '(') {
              _V = pdfUnescape(value.substr(1, value.length - 2));
            } else {
              _V = pdfUnescape(value);
            }
          } else {
            _V = value;
          }
        }
      });

      Object.defineProperty(this, 'value', {
        enumerable: true,
        configurable: true,
        get: function get() {
          if (this instanceof AcroFormButton === true) {
            return pdfUnescape(_V.substr(1, _V.length - 1));
          } else {
            return _V;
          }
        },
        set: function set(value) {
          value = value.toString();

          if (this instanceof AcroFormButton === true) {
            _V = '/' + value;
          } else {
            _V = value;
          }
        }
      });

      Object.defineProperty(this, 'hasAnnotation', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return this.Rect;
        }
      });
      Object.defineProperty(this, 'Type', {
        enumerable: true,
        configurable: false,
        get: function get() {
          return this.hasAnnotation ? "/Annot" : null;
        }
      });
      Object.defineProperty(this, 'Subtype', {
        enumerable: true,
        configurable: false,
        get: function get() {
          return this.hasAnnotation ? "/Widget" : null;
        }
      });
      var _hasAppearanceStream = false;

      Object.defineProperty(this, 'hasAppearanceStream', {
        enumerable: true,
        configurable: true,
        writeable: true,
        get: function get() {
          return _hasAppearanceStream;
        },
        set: function set(value) {
          value = Boolean(value);
          _hasAppearanceStream = value;
        }
      });

      var _page;

      Object.defineProperty(this, 'page', {
        enumerable: true,
        configurable: true,
        writeable: true,
        get: function get() {
          if (!_page) {
            return;
          }

          return _page;
        },
        set: function set(value) {
          _page = value;
        }
      });

      Object.defineProperty(this, 'readOnly', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return Boolean(getBitForPdf(this.Ff, 1));
        },
        set: function set(value) {
          if (Boolean(value) === true) {
            this.Ff = setBitForPdf(this.Ff, 1);
          } else {
            this.Ff = clearBitForPdf(this.Ff, 1);
          }
        }
      });
      Object.defineProperty(this, 'required', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return Boolean(getBitForPdf(this.Ff, 2));
        },
        set: function set(value) {
          if (Boolean(value) === true) {
            this.Ff = setBitForPdf(this.Ff, 2);
          } else {
            this.Ff = clearBitForPdf(this.Ff, 2);
          }
        }
      });

      Object.defineProperty(this, 'noExport', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return Boolean(getBitForPdf(this.Ff, 3));
        },
        set: function set(value) {
          if (Boolean(value) === true) {
            this.Ff = setBitForPdf(this.Ff, 3);
          } else {
            this.Ff = clearBitForPdf(this.Ff, 3);
          }
        }
      });
      var _Q = null;
      Object.defineProperty(this, 'Q', {
        enumerable: true,
        configurable: false,
        get: function get() {
          if (_Q === null) {
            return;
          }

          return _Q;
        },
        set: function set(value) {
          if ([0, 1, 2].indexOf(value) !== -1) {
            _Q = value;
          } else {
            throw new Error('Invalid value "' + value + '" for attribute Q supplied.');
          }
        }
      });

      Object.defineProperty(this, 'textAlign', {
        get: function get() {
          var result = 'left';

          switch (_Q) {
            case 0:
            default:
              result = 'left';
              break;

            case 1:
              result = 'center';
              break;

            case 2:
              result = 'right';
              break;
          }

          return result;
        },
        configurable: true,
        enumerable: true,
        set: function set(value) {
          switch (value) {
            case 'right':
            case 2:
              _Q = 2;
              break;

            case 'center':
            case 1:
              _Q = 1;
              break;

            case 'left':
            case 0:
            default:
              _Q = 0;
          }
        }
      });
    };

    inherit(AcroFormField, AcroFormPDFObject);

    var AcroFormChoiceField = function AcroFormChoiceField() {
      AcroFormField.call(this);

      this.FT = "/Ch";

      this.V = '()';
      this.fontName = 'zapfdingbats';

      var _TI = 0;
      Object.defineProperty(this, 'TI', {
        enumerable: true,
        configurable: false,
        get: function get() {
          return _TI;
        },
        set: function set(value) {
          _TI = value;
        }
      });

      Object.defineProperty(this, 'topIndex', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return _TI;
        },
        set: function set(value) {
          _TI = value;
        }
      });
      var _Opt = [];
      Object.defineProperty(this, 'Opt', {
        enumerable: true,
        configurable: false,
        get: function get() {
          return arrayToPdfArray(_Opt);
        },
        set: function set(value) {
          _Opt = pdfArrayToStringArray(value);
        }
      });

      this.getOptions = function () {
        return _Opt;
      };
      this.setOptions = function (value) {
        _Opt = value;

        if (this.sort) {
          _Opt.sort();
        }
      };
      this.addOption = function (value) {
        value = value || "";
        value = value.toString();

        _Opt.push(value);

        if (this.sort) {
          _Opt.sort();
        }
      };
      this.removeOption = function (value, allEntries) {
        allEntries = allEntries || false;
        value = value || "";
        value = value.toString();

        while (_Opt.indexOf(value) !== -1) {
          _Opt.splice(_Opt.indexOf(value), 1);

          if (allEntries === false) {
            break;
          }
        }
      };
      Object.defineProperty(this, 'combo', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return Boolean(getBitForPdf(this.Ff, 18));
        },
        set: function set(value) {
          if (Boolean(value) === true) {
            this.Ff = setBitForPdf(this.Ff, 18);
          } else {
            this.Ff = clearBitForPdf(this.Ff, 18);
          }
        }
      });
      Object.defineProperty(this, 'edit', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return Boolean(getBitForPdf(this.Ff, 19));
        },
        set: function set(value) {
          if (this.combo === true) {
            if (Boolean(value) === true) {
              this.Ff = setBitForPdf(this.Ff, 19);
            } else {
              this.Ff = clearBitForPdf(this.Ff, 19);
            }
          }
        }
      });

      Object.defineProperty(this, 'sort', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return Boolean(getBitForPdf(this.Ff, 20));
        },
        set: function set(value) {
          if (Boolean(value) === true) {
            this.Ff = setBitForPdf(this.Ff, 20);

            _Opt.sort();
          } else {
            this.Ff = clearBitForPdf(this.Ff, 20);
          }
        }
      });

      Object.defineProperty(this, 'multiSelect', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return Boolean(getBitForPdf(this.Ff, 22));
        },
        set: function set(value) {
          if (Boolean(value) === true) {
            this.Ff = setBitForPdf(this.Ff, 22);
          } else {
            this.Ff = clearBitForPdf(this.Ff, 22);
          }
        }
      });

      Object.defineProperty(this, 'doNotSpellCheck', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return Boolean(getBitForPdf(this.Ff, 23));
        },
        set: function set(value) {
          if (Boolean(value) === true) {
            this.Ff = setBitForPdf(this.Ff, 23);
          } else {
            this.Ff = clearBitForPdf(this.Ff, 23);
          }
        }
      });

      Object.defineProperty(this, 'commitOnSelChange', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return Boolean(getBitForPdf(this.Ff, 27));
        },
        set: function set(value) {
          if (Boolean(value) === true) {
            this.Ff = setBitForPdf(this.Ff, 27);
          } else {
            this.Ff = clearBitForPdf(this.Ff, 27);
          }
        }
      });
      this.hasAppearanceStream = false;
    };

    inherit(AcroFormChoiceField, AcroFormField);

    var AcroFormListBox = function AcroFormListBox() {
      AcroFormChoiceField.call(this);
      this.fontName = 'helvetica';

      this.combo = false;
    };

    inherit(AcroFormListBox, AcroFormChoiceField);

    var AcroFormComboBox = function AcroFormComboBox() {
      AcroFormListBox.call(this);
      this.combo = true;
    };

    inherit(AcroFormComboBox, AcroFormListBox);

    var AcroFormEditBox = function AcroFormEditBox() {
      AcroFormComboBox.call(this);
      this.edit = true;
    };

    inherit(AcroFormEditBox, AcroFormComboBox);

    var AcroFormButton = function AcroFormButton() {
      AcroFormField.call(this);
      this.FT = "/Btn";

      Object.defineProperty(this, 'noToggleToOff', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return Boolean(getBitForPdf(this.Ff, 15));
        },
        set: function set(value) {
          if (Boolean(value) === true) {
            this.Ff = setBitForPdf(this.Ff, 15);
          } else {
            this.Ff = clearBitForPdf(this.Ff, 15);
          }
        }
      });

      Object.defineProperty(this, 'radio', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return Boolean(getBitForPdf(this.Ff, 16));
        },
        set: function set(value) {
          if (Boolean(value) === true) {
            this.Ff = setBitForPdf(this.Ff, 16);
          } else {
            this.Ff = clearBitForPdf(this.Ff, 16);
          }
        }
      });

      Object.defineProperty(this, 'pushButton', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return Boolean(getBitForPdf(this.Ff, 17));
        },
        set: function set(value) {
          if (Boolean(value) === true) {
            this.Ff = setBitForPdf(this.Ff, 17);
          } else {
            this.Ff = clearBitForPdf(this.Ff, 17);
          }
        }
      });

      Object.defineProperty(this, 'radioIsUnison', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return Boolean(getBitForPdf(this.Ff, 26));
        },
        set: function set(value) {
          if (Boolean(value) === true) {
            this.Ff = setBitForPdf(this.Ff, 26);
          } else {
            this.Ff = clearBitForPdf(this.Ff, 26);
          }
        }
      });
      var _MK = {};
      Object.defineProperty(this, 'MK', {
        enumerable: false,
        configurable: false,
        get: function get() {
          if (Object.keys(_MK).length !== 0) {
            var result = [];
            result.push('<<');
            var key;

            for (key in _MK) {
              result.push('/' + key + ' (' + _MK[key] + ')');
            }

            result.push('>>');
            return result.join('\n');
          }

          return;
        },
        set: function set(value) {
          if (_typeof(value) === "object") {
            _MK = value;
          }
        }
      });

      Object.defineProperty(this, 'caption', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return _MK.CA || '';
        },
        set: function set(value) {
          if (typeof value === "string") {
            _MK.CA = value;
          }
        }
      });

      var _AS;

      Object.defineProperty(this, 'AS', {
        enumerable: false,
        configurable: false,
        get: function get() {
          return _AS;
        },
        set: function set(value) {
          _AS = value;
        }
      });

      Object.defineProperty(this, 'appearanceState', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return _AS.substr(1, _AS.length - 1);
        },
        set: function set(value) {
          _AS = '/' + value;
        }
      });
    };

    inherit(AcroFormButton, AcroFormField);

    var AcroFormPushButton = function AcroFormPushButton() {
      AcroFormButton.call(this);
      this.pushButton = true;
    };

    inherit(AcroFormPushButton, AcroFormButton);

    var AcroFormRadioButton = function AcroFormRadioButton() {
      AcroFormButton.call(this);
      this.radio = true;
      this.pushButton = false;
      var _Kids = [];
      Object.defineProperty(this, 'Kids', {
        enumerable: true,
        configurable: false,
        get: function get() {
          return _Kids;
        },
        set: function set(value) {
          if (typeof value !== "undefined") {
            _Kids = value;
          } else {
            _Kids = [];
          }
        }
      });
    };

    inherit(AcroFormRadioButton, AcroFormButton);

    var AcroFormChildClass = function AcroFormChildClass() {
      AcroFormField.call(this);

      var _parent;

      Object.defineProperty(this, 'Parent', {
        enumerable: false,
        configurable: false,
        get: function get() {
          return _parent;
        },
        set: function set(value) {
          _parent = value;
        }
      });

      var _optionName;

      Object.defineProperty(this, 'optionName', {
        enumerable: false,
        configurable: true,
        get: function get() {
          return _optionName;
        },
        set: function set(value) {
          _optionName = value;
        }
      });
      var _MK = {};
      Object.defineProperty(this, 'MK', {
        enumerable: false,
        configurable: false,
        get: function get() {
          var result = [];
          result.push('<<');
          var key;

          for (key in _MK) {
            result.push('/' + key + ' (' + _MK[key] + ')');
          }

          result.push('>>');
          return result.join('\n');
        },
        set: function set(value) {
          if (_typeof(value) === "object") {
            _MK = value;
          }
        }
      });

      Object.defineProperty(this, 'caption', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return _MK.CA || '';
        },
        set: function set(value) {
          if (typeof value === "string") {
            _MK.CA = value;
          }
        }
      });

      var _AS;

      Object.defineProperty(this, 'AS', {
        enumerable: false,
        configurable: false,
        get: function get() {
          return _AS;
        },
        set: function set(value) {
          _AS = value;
        }
      });

      Object.defineProperty(this, 'appearanceState', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return _AS.substr(1, _AS.length - 1);
        },
        set: function set(value) {
          _AS = '/' + value;
        }
      });
      this.optionName = name;
      this.caption = 'l';
      this.appearanceState = 'Off';

      this._AppearanceType = AcroFormAppearance.RadioButton.Circle;

      this.appearanceStreamContent = this._AppearanceType.createAppearanceStream(name);
    };

    inherit(AcroFormChildClass, AcroFormField);

    AcroFormRadioButton.prototype.setAppearance = function (appearance) {
      if (!('createAppearanceStream' in appearance && 'getCA' in appearance)) {
        throw new Error("Couldn't assign Appearance to RadioButton. Appearance was Invalid!");
        return;
      }

      for (var objId in this.Kids) {
        if (this.Kids.hasOwnProperty(objId)) {
          var child = this.Kids[objId];
          child.appearanceStreamContent = appearance.createAppearanceStream(child.optionName);
          child.caption = appearance.getCA();
        }
      }
    };

    AcroFormRadioButton.prototype.createOption = function (name) {
      var kidCount = this.Kids.length;

      var child = new AcroFormChildClass();
      child.Parent = this;
      child.optionName = name;

      this.Kids.push(child);
      addField.call(this, child);
      return child;
    };


    var AcroFormCheckBox = function AcroFormCheckBox() {
      AcroFormButton.call(this);
      this.fontName = 'zapfdingbats';
      this.caption = '3';
      this.appearanceState = 'On';
      this.value = "On";
      this.textAlign = 'center';
      this.appearanceStreamContent = AcroFormAppearance.CheckBox.createAppearanceStream();
    };

    inherit(AcroFormCheckBox, AcroFormButton);

    var AcroFormTextField = function AcroFormTextField() {
      AcroFormField.call(this);
      this.FT = '/Tx';

      Object.defineProperty(this, 'multiline', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return Boolean(getBitForPdf(this.Ff, 13));
        },
        set: function set(value) {
          if (Boolean(value) === true) {
            this.Ff = setBitForPdf(this.Ff, 13);
          } else {
            this.Ff = clearBitForPdf(this.Ff, 13);
          }
        }
      });

      Object.defineProperty(this, 'fileSelect', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return Boolean(getBitForPdf(this.Ff, 21));
        },
        set: function set(value) {
          if (Boolean(value) === true) {
            this.Ff = setBitForPdf(this.Ff, 21);
          } else {
            this.Ff = clearBitForPdf(this.Ff, 21);
          }
        }
      });

      Object.defineProperty(this, 'doNotSpellCheck', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return Boolean(getBitForPdf(this.Ff, 23));
        },
        set: function set(value) {
          if (Boolean(value) === true) {
            this.Ff = setBitForPdf(this.Ff, 23);
          } else {
            this.Ff = clearBitForPdf(this.Ff, 23);
          }
        }
      });

      Object.defineProperty(this, 'doNotScroll', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return Boolean(getBitForPdf(this.Ff, 24));
        },
        set: function set(value) {
          if (Boolean(value) === true) {
            this.Ff = setBitForPdf(this.Ff, 24);
          } else {
            this.Ff = clearBitForPdf(this.Ff, 24);
          }
        }
      });

      Object.defineProperty(this, 'comb', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return Boolean(getBitForPdf(this.Ff, 25));
        },
        set: function set(value) {
          if (Boolean(value) === true) {
            this.Ff = setBitForPdf(this.Ff, 25);
          } else {
            this.Ff = clearBitForPdf(this.Ff, 25);
          }
        }
      });

      Object.defineProperty(this, 'richText', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return Boolean(getBitForPdf(this.Ff, 26));
        },
        set: function set(value) {
          if (Boolean(value) === true) {
            this.Ff = setBitForPdf(this.Ff, 26);
          } else {
            this.Ff = clearBitForPdf(this.Ff, 26);
          }
        }
      });
      var _MaxLen = null;
      Object.defineProperty(this, 'MaxLen', {
        enumerable: true,
        configurable: false,
        get: function get() {
          return _MaxLen;
        },
        set: function set(value) {
          _MaxLen = value;
        }
      });

      Object.defineProperty(this, 'maxLength', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return _MaxLen;
        },
        set: function set(value) {
          if (Number.isInteger(value)) {
            _MaxLen = value;
          }
        }
      });
      Object.defineProperty(this, 'hasAppearanceStream', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return this.V || this.DV;
        }
      });
    };

    inherit(AcroFormTextField, AcroFormField);

    var AcroFormPasswordField = function AcroFormPasswordField() {
      AcroFormTextField.call(this);

      Object.defineProperty(this, 'password', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return Boolean(getBitForPdf(this.Ff, 14));
        },
        set: function set(value) {
          if (Boolean(value) === true) {
            this.Ff = setBitForPdf(this.Ff, 14);
          } else {
            this.Ff = clearBitForPdf(this.Ff, 14);
          }
        }
      });
      this.password = true;
    };

    inherit(AcroFormPasswordField, AcroFormTextField);

    var AcroFormAppearance = {
      CheckBox: {
        createAppearanceStream: function createAppearanceStream() {
          var appearance = {
            N: {
              On: AcroFormAppearance.CheckBox.YesNormal
            },
            D: {
              On: AcroFormAppearance.CheckBox.YesPushDown,
              Off: AcroFormAppearance.CheckBox.OffPushDown
            }
          };
          return appearance;
        },
        YesPushDown: function YesPushDown(formObject) {
          var xobj = createFormXObject(formObject);
          var stream = [];
          var fontKey = scope.internal.getFont(formObject.fontName, formObject.fontStyle).id;

          var encodedColor = scope.__private__.encodeColorString(formObject.color);

          var calcRes = calculateX(formObject, formObject.caption);
          stream.push("0.749023 g");
          stream.push("0 0 " + f2(AcroFormAppearance.internal.getWidth(formObject)) + " " + f2(AcroFormAppearance.internal.getHeight(formObject)) + " re");
          stream.push("f");
          stream.push("BMC");
          stream.push("q");
          stream.push("0 0 1 rg");
          stream.push("/" + fontKey + " " + f2(calcRes.fontSize) + " Tf " + encodedColor);
          stream.push("BT");
          stream.push(calcRes.text);
          stream.push("ET");
          stream.push("Q");
          stream.push("EMC");
          xobj.stream = stream.join("\n");
          return xobj;
        },
        YesNormal: function YesNormal(formObject) {
          var xobj = createFormXObject(formObject);
          var fontKey = scope.internal.getFont(formObject.fontName, formObject.fontStyle).id;

          var encodedColor = scope.__private__.encodeColorString(formObject.color);

          var stream = [];
          var height = AcroFormAppearance.internal.getHeight(formObject);
          var width = AcroFormAppearance.internal.getWidth(formObject);
          var calcRes = calculateX(formObject, formObject.caption);
          stream.push("1 g");
          stream.push("0 0 " + f2(width) + " " + f2(height) + " re");
          stream.push("f");
          stream.push("q");
          stream.push("0 0 1 rg");
          stream.push("0 0 " + f2(width - 1) + " " + f2(height - 1) + " re");
          stream.push("W");
          stream.push("n");
          stream.push("0 g");
          stream.push("BT");
          stream.push("/" + fontKey + " " + f2(calcRes.fontSize) + " Tf " + encodedColor);
          stream.push(calcRes.text);
          stream.push("ET");
          stream.push("Q");
          xobj.stream = stream.join("\n");
          return xobj;
        },
        OffPushDown: function OffPushDown(formObject) {
          var xobj = createFormXObject(formObject);
          var stream = [];
          stream.push("0.749023 g");
          stream.push("0 0 " + f2(AcroFormAppearance.internal.getWidth(formObject)) + " " + f2(AcroFormAppearance.internal.getHeight(formObject)) + " re");
          stream.push("f");
          xobj.stream = stream.join("\n");
          return xobj;
        }
      },
      RadioButton: {
        Circle: {
          createAppearanceStream: function createAppearanceStream(name) {
            var appearanceStreamContent = {
              D: {
                'Off': AcroFormAppearance.RadioButton.Circle.OffPushDown
              },
              N: {}
            };
            appearanceStreamContent.N[name] = AcroFormAppearance.RadioButton.Circle.YesNormal;
            appearanceStreamContent.D[name] = AcroFormAppearance.RadioButton.Circle.YesPushDown;
            return appearanceStreamContent;
          },
          getCA: function getCA() {
            return 'l';
          },
          YesNormal: function YesNormal(formObject) {
            var xobj = createFormXObject(formObject);
            var stream = [];

            var DotRadius = AcroFormAppearance.internal.getWidth(formObject) <= AcroFormAppearance.internal.getHeight(formObject) ? AcroFormAppearance.internal.getWidth(formObject) / 4 : AcroFormAppearance.internal.getHeight(formObject) / 4; // The Borderpadding...

            DotRadius = Number((DotRadius * 0.9).toFixed(5));
            var c = AcroFormAppearance.internal.Bezier_C;
            var DotRadiusBezier = Number((DotRadius * c).toFixed(5));
            stream.push("q");
            stream.push("1 0 0 1 " + f5(AcroFormAppearance.internal.getWidth(formObject) / 2) + " " + f5(AcroFormAppearance.internal.getHeight(formObject) / 2) + " cm");
            stream.push(DotRadius + " 0 m");
            stream.push(DotRadius + " " + DotRadiusBezier + " " + DotRadiusBezier + " " + DotRadius + " 0 " + DotRadius + " c");
            stream.push("-" + DotRadiusBezier + " " + DotRadius + " -" + DotRadius + " " + DotRadiusBezier + " -" + DotRadius + " 0 c");
            stream.push("-" + DotRadius + " -" + DotRadiusBezier + " -" + DotRadiusBezier + " -" + DotRadius + " 0 -" + DotRadius + " c");
            stream.push(DotRadiusBezier + " -" + DotRadius + " " + DotRadius + " -" + DotRadiusBezier + " " + DotRadius + " 0 c");
            stream.push("f");
            stream.push("Q");
            xobj.stream = stream.join("\n");
            return xobj;
          },
          YesPushDown: function YesPushDown(formObject) {
            var xobj = createFormXObject(formObject);
            var stream = [];
            var DotRadius = AcroFormAppearance.internal.getWidth(formObject) <= AcroFormAppearance.internal.getHeight(formObject) ? AcroFormAppearance.internal.getWidth(formObject) / 4 : AcroFormAppearance.internal.getHeight(formObject) / 4; // The Borderpadding...

            var DotRadius = Number((DotRadius * 0.9).toFixed(5));
            var k = Number((DotRadius * 2).toFixed(5));
            var kc = Number((k * AcroFormAppearance.internal.Bezier_C).toFixed(5));
            var dc = Number((DotRadius * AcroFormAppearance.internal.Bezier_C).toFixed(5));
            stream.push("0.749023 g");
            stream.push("q");
            stream.push("1 0 0 1 " + f5(AcroFormAppearance.internal.getWidth(formObject) / 2) + " " + f5(AcroFormAppearance.internal.getHeight(formObject) / 2) + " cm");
            stream.push(k + " 0 m");
            stream.push(k + " " + kc + " " + kc + " " + k + " 0 " + k + " c");
            stream.push("-" + kc + " " + k + " -" + k + " " + kc + " -" + k + " 0 c");
            stream.push("-" + k + " -" + kc + " -" + kc + " -" + k + " 0 -" + k + " c");
            stream.push(kc + " -" + k + " " + k + " -" + kc + " " + k + " 0 c");
            stream.push("f");
            stream.push("Q");
            stream.push("0 g");
            stream.push("q");
            stream.push("1 0 0 1 " + f5(AcroFormAppearance.internal.getWidth(formObject) / 2) + " " + f5(AcroFormAppearance.internal.getHeight(formObject) / 2) + " cm");
            stream.push(DotRadius + " 0 m");
            stream.push("" + DotRadius + " " + dc + " " + dc + " " + DotRadius + " 0 " + DotRadius + " c");
            stream.push("-" + dc + " " + DotRadius + " -" + DotRadius + " " + dc + " -" + DotRadius + " 0 c");
            stream.push("-" + DotRadius + " -" + dc + " -" + dc + " -" + DotRadius + " 0 -" + DotRadius + " c");
            stream.push(dc + " -" + DotRadius + " " + DotRadius + " -" + dc + " " + DotRadius + " 0 c");
            stream.push("f");
            stream.push("Q");
            xobj.stream = stream.join("\n");
            return xobj;
          },
          OffPushDown: function OffPushDown(formObject) {
            var xobj = createFormXObject(formObject);
            var stream = [];
            var DotRadius = AcroFormAppearance.internal.getWidth(formObject) <= AcroFormAppearance.internal.getHeight(formObject) ? AcroFormAppearance.internal.getWidth(formObject) / 4 : AcroFormAppearance.internal.getHeight(formObject) / 4; // The Borderpadding...

            var DotRadius = Number((DotRadius * 0.9).toFixed(5));

            var k = Number((DotRadius * 2).toFixed(5));
            var kc = Number((k * AcroFormAppearance.internal.Bezier_C).toFixed(5));
            stream.push("0.749023 g");
            stream.push("q");
            stream.push("1 0 0 1 " + f5(AcroFormAppearance.internal.getWidth(formObject) / 2) + " " + f5(AcroFormAppearance.internal.getHeight(formObject) / 2) + " cm");
            stream.push(k + " 0 m");
            stream.push(k + " " + kc + " " + kc + " " + k + " 0 " + k + " c");
            stream.push("-" + kc + " " + k + " -" + k + " " + kc + " -" + k + " 0 c");
            stream.push("-" + k + " -" + kc + " -" + kc + " -" + k + " 0 -" + k + " c");
            stream.push(kc + " -" + k + " " + k + " -" + kc + " " + k + " 0 c");
            stream.push("f");
            stream.push("Q");
            xobj.stream = stream.join("\n");
            return xobj;
          }
        },
        Cross: {
          createAppearanceStream: function createAppearanceStream(name) {
            var appearanceStreamContent = {
              D: {
                'Off': AcroFormAppearance.RadioButton.Cross.OffPushDown
              },
              N: {}
            };
            appearanceStreamContent.N[name] = AcroFormAppearance.RadioButton.Cross.YesNormal;
            appearanceStreamContent.D[name] = AcroFormAppearance.RadioButton.Cross.YesPushDown;
            return appearanceStreamContent;
          },
          getCA: function getCA() {
            return '8';
          },
          YesNormal: function YesNormal(formObject) {
            var xobj = createFormXObject(formObject);
            var stream = [];
            var cross = AcroFormAppearance.internal.calculateCross(formObject);
            stream.push("q");
            stream.push("1 1 " + f2(AcroFormAppearance.internal.getWidth(formObject) - 2) + " " + f2(AcroFormAppearance.internal.getHeight(formObject) - 2) + " re");
            stream.push("W");
            stream.push("n");
            stream.push(f2(cross.x1.x) + " " + f2(cross.x1.y) + " m");
            stream.push(f2(cross.x2.x) + " " + f2(cross.x2.y) + " l");
            stream.push(f2(cross.x4.x) + " " + f2(cross.x4.y) + " m");
            stream.push(f2(cross.x3.x) + " " + f2(cross.x3.y) + " l");
            stream.push("s");
            stream.push("Q");
            xobj.stream = stream.join("\n");
            return xobj;
          },
          YesPushDown: function YesPushDown(formObject) {
            var xobj = createFormXObject(formObject);
            var cross = AcroFormAppearance.internal.calculateCross(formObject);
            var stream = [];
            stream.push("0.749023 g");
            stream.push("0 0 " + f2(AcroFormAppearance.internal.getWidth(formObject)) + " " + f2(AcroFormAppearance.internal.getHeight(formObject)) + " re");
            stream.push("f");
            stream.push("q");
            stream.push("1 1 " + f2(AcroFormAppearance.internal.getWidth(formObject) - 2) + " " + f2(AcroFormAppearance.internal.getHeight(formObject) - 2) + " re");
            stream.push("W");
            stream.push("n");
            stream.push(f2(cross.x1.x) + " " + f2(cross.x1.y) + " m");
            stream.push(f2(cross.x2.x) + " " + f2(cross.x2.y) + " l");
            stream.push(f2(cross.x4.x) + " " + f2(cross.x4.y) + " m");
            stream.push(f2(cross.x3.x) + " " + f2(cross.x3.y) + " l");
            stream.push("s");
            stream.push("Q");
            xobj.stream = stream.join("\n");
            return xobj;
          },
          OffPushDown: function OffPushDown(formObject) {
            var xobj = createFormXObject(formObject);
            var stream = [];
            stream.push("0.749023 g");
            stream.push("0 0 " + f2(AcroFormAppearance.internal.getWidth(formObject)) + " " + f2(AcroFormAppearance.internal.getHeight(formObject)) + " re");
            stream.push("f");
            xobj.stream = stream.join("\n");
            return xobj;
          }
        }
      },
      createDefaultAppearanceStream: function createDefaultAppearanceStream(formObject) {
        var fontKey = scope.internal.getFont(formObject.fontName, formObject.fontStyle).id;

        var encodedColor = scope.__private__.encodeColorString(formObject.color);

        var fontSize = formObject.fontSize;
        var result = '/' + fontKey + ' ' + fontSize + ' Tf ' + encodedColor;
        return result;
      }
    };
    AcroFormAppearance.internal = {
      Bezier_C: 0.551915024494,
      calculateCross: function calculateCross(formObject) {
        var width = AcroFormAppearance.internal.getWidth(formObject);
        var height = AcroFormAppearance.internal.getHeight(formObject);
        var a = Math.min(width, height);

        var cross = {
          x1: {
            x: (width - a) / 2,
            y: (height - a) / 2 + a

          },
          x2: {
            x: (width - a) / 2 + a,
            y: (height - a) / 2

          },
          x3: {
            x: (width - a) / 2,
            y: (height - a) / 2

          },
          x4: {
            x: (width - a) / 2 + a,
            y: (height - a) / 2 + a

          }
        };
        return cross;
      }
    };

    AcroFormAppearance.internal.getWidth = function (formObject) {
      var result = 0;

      if (_typeof(formObject) === "object") {
        result = scale(formObject.Rect[2]);
      }

      return result;
    };

    AcroFormAppearance.internal.getHeight = function (formObject) {
      var result = 0;

      if (_typeof(formObject) === "object") {
        result = scale(formObject.Rect[3]);
      }

      return result;
    };

    var addField = jsPDFAPI.addField = function (fieldObject) {
      initializeAcroForm.call(this);

      if (fieldObject instanceof AcroFormField) {
        putForm.call(this, fieldObject);
      } else {
        throw new Error('Invalid argument passed to jsPDF.addField.');
      }

      fieldObject.page = scope.internal.getCurrentPageInfo().pageNumber;
      return this;
    };
    var addButton = jsPDFAPI.addButton = function (button) {
      if (button instanceof AcroFormButton === false) {
        throw new Error('Invalid argument passed to jsPDF.addButton.');
      }

      return addField.call(this, button);
    };
    var addTextField = jsPDFAPI.addTextField = function (textField) {
      if (textField instanceof AcroFormTextField === false) {
        throw new Error('Invalid argument passed to jsPDF.addTextField.');
      }

      return addField.call(this, textField);
    };
    var addChoiceField = jsPDFAPI.addChoiceField = function (choiceField) {
      if (choiceField instanceof AcroFormChoiceField === false) {
        throw new Error('Invalid argument passed to jsPDF.addChoiceField.');
      }

      return addField.call(this, choiceField);
    };

    if (_typeof(globalObj) == "object" && typeof globalObj["ChoiceField"] === "undefined" && typeof globalObj["ListBox"] === "undefined" && typeof globalObj["ComboBox"] === "undefined" && typeof globalObj["EditBox"] === "undefined" && typeof globalObj["Button"] === "undefined" && typeof globalObj["PushButton"] === "undefined" && typeof globalObj["RadioButton"] === "undefined" && typeof globalObj["CheckBox"] === "undefined" && typeof globalObj["TextField"] === "undefined" && typeof globalObj["PasswordField"] === "undefined") {
      globalObj["ChoiceField"] = AcroFormChoiceField;
      globalObj["ListBox"] = AcroFormListBox;
      globalObj["ComboBox"] = AcroFormComboBox;
      globalObj["EditBox"] = AcroFormEditBox;
      globalObj["Button"] = AcroFormButton;
      globalObj["PushButton"] = AcroFormPushButton;
      globalObj["RadioButton"] = AcroFormRadioButton;
      globalObj["CheckBox"] = AcroFormCheckBox;
      globalObj["TextField"] = AcroFormTextField;
      globalObj["PasswordField"] = AcroFormPasswordField;

      globalObj["AcroForm"] = {
        Appearance: AcroFormAppearance
      };
    } else {
      console.warn("AcroForm-Classes are not populated into global-namespace, because the class-Names exist already.");
    }

    jsPDFAPI.AcroFormChoiceField = AcroFormChoiceField;
    jsPDFAPI.AcroFormListBox = AcroFormListBox;
    jsPDFAPI.AcroFormComboBox = AcroFormComboBox;
    jsPDFAPI.AcroFormEditBox = AcroFormEditBox;
    jsPDFAPI.AcroFormButton = AcroFormButton;
    jsPDFAPI.AcroFormPushButton = AcroFormPushButton;
    jsPDFAPI.AcroFormRadioButton = AcroFormRadioButton;
    jsPDFAPI.AcroFormCheckBox = AcroFormCheckBox;
    jsPDFAPI.AcroFormTextField = AcroFormTextField;
    jsPDFAPI.AcroFormPasswordField = AcroFormPasswordField;
    jsPDFAPI.AcroFormAppearance = AcroFormAppearance;
    jsPDFAPI.AcroForm = {
      ChoiceField: AcroFormChoiceField,
      ListBox: AcroFormListBox,
      ComboBox: AcroFormComboBox,
      EditBox: AcroFormEditBox,
      Button: AcroFormButton,
      PushButton: AcroFormPushButton,
      RadioButton: AcroFormRadioButton,
      CheckBox: AcroFormCheckBox,
      TextField: AcroFormTextField,
      PasswordField: AcroFormPasswordField,
      Appearance: AcroFormAppearance
    };
  })(jsPDF.API, typeof window !== "undefined" && window || typeof global !== "undefined" && global);
  (function (jsPDFAPI) {

    var namespace = 'addImage_';
    var imageFileTypeHeaders = {
      PNG: [[0x89, 0x50, 0x4e, 0x47]],
      TIFF: [[0x4D, 0x4D, 0x00, 0x2A],
      [0x49, 0x49, 0x2A, 0x00]
      ],
      JPEG: [[0xFF, 0xD8, 0xFF, 0xE0, undefined, undefined, 0x4A, 0x46, 0x49, 0x46, 0x00],
      [0xFF, 0xD8, 0xFF, 0xE1, undefined, undefined, 0x45, 0x78, 0x69, 0x66, 0x00, 0x00]
      ],
      JPEG2000: [[0x00, 0x00, 0x00, 0x0C, 0x6A, 0x50, 0x20, 0x20]],
      GIF87a: [[0x47, 0x49, 0x46, 0x38, 0x37, 0x61]],
      GIF89a: [[0x47, 0x49, 0x46, 0x38, 0x39, 0x61]],
      BMP: [[0x42, 0x4D],
      [0x42, 0x41],
      [0x43, 0x49],
      [0x43, 0x50],
      [0x49, 0x43],
      [0x50, 0x54]
      ]
    };
    var getImageFileTypeByImageData = jsPDFAPI.getImageFileTypeByImageData = function (imageData, fallbackFormat) {
      fallbackFormat = fallbackFormat || 'UNKNOWN';
      var i;
      var j;
      var result = 'UNKNOWN';
      var headerSchemata;
      var compareResult;
      var fileType;

      if (jsPDFAPI.isArrayBufferView(imageData)) {
        imageData = jsPDFAPI.arrayBufferToBinaryString(imageData);
      }

      for (fileType in imageFileTypeHeaders) {
        headerSchemata = imageFileTypeHeaders[fileType];

        for (i = 0; i < headerSchemata.length; i += 1) {
          compareResult = true;

          for (j = 0; j < headerSchemata[i].length; j += 1) {
            if (headerSchemata[i][j] === undefined) {
              continue;
            }

            if (headerSchemata[i][j] !== imageData.charCodeAt(j)) {
              compareResult = false;
              break;
            }
          }

          if (compareResult === true) {
            result = fileType;
            break;
          }
        }
      }

      if (result === 'UNKNOWN' && fallbackFormat !== 'UNKNOWN') {
        console.warn('FileType of Image not recognized. Processing image as "' + fallbackFormat + '".');
        result = fallbackFormat;
      }

      return result;
    };

    var putImage = function putImage(img) {
      var objectNumber = this.internal.newObject(),
          out = this.internal.write,
          putStream = this.internal.putStream,
          getFilters = this.internal.getFilters;
      var filters = getFilters();

      while (filters.indexOf('FlateEncode') !== -1) {
        filters.splice(filters.indexOf('FlateEncode'), 1);
      }

      img['n'] = objectNumber;
      var additionalKeyValues = [];
      additionalKeyValues.push({
        key: 'Type',
        value: '/XObject'
      });
      additionalKeyValues.push({
        key: 'Subtype',
        value: '/Image'
      });
      additionalKeyValues.push({
        key: 'Width',
        value: img['w']
      });
      additionalKeyValues.push({
        key: 'Height',
        value: img['h']
      });

      if (img['cs'] === this.color_spaces.INDEXED) {
        additionalKeyValues.push({
          key: 'ColorSpace',
          value: '[/Indexed /DeviceRGB '
          + (img['pal'].length / 3 - 1) + ' ' + ('smask' in img ? objectNumber + 2 : objectNumber + 1) + ' 0 R]'
        });
      } else {
        additionalKeyValues.push({
          key: 'ColorSpace',
          value: '/' + img['cs']
        });

        if (img['cs'] === this.color_spaces.DEVICE_CMYK) {
          additionalKeyValues.push({
            key: 'Decode',
            value: '[1 0 1 0 1 0 1 0]'
          });
        }
      }

      additionalKeyValues.push({
        key: 'BitsPerComponent',
        value: img['bpc']
      });

      if ('dp' in img) {
        additionalKeyValues.push({
          key: 'DecodeParms',
          value: '<<' + img['dp'] + '>>'
        });
      }

      if ('trns' in img && img['trns'].constructor == Array) {
        var trns = '',
            i = 0,
            len = img['trns'].length;

        for (; i < len; i++) {
          trns += img['trns'][i] + ' ' + img['trns'][i] + ' ';
        }

        additionalKeyValues.push({
          key: 'Mask',
          value: '[' + trns + ']'
        });
      }

      if ('smask' in img) {
        additionalKeyValues.push({
          key: 'SMask',
          value: objectNumber + 1 + ' 0 R'
        });
      }

      var alreadyAppliedFilters = typeof img['f'] !== "undefined" ? ['/' + img['f']] : undefined;
      putStream({
        data: img['data'],
        additionalKeyValues: additionalKeyValues,
        alreadyAppliedFilters: alreadyAppliedFilters
      });
      out('endobj');

      if ('smask' in img) {
        var dp = '/Predictor ' + img['p'] + ' /Colors 1 /BitsPerComponent ' + img['bpc'] + ' /Columns ' + img['w'];
        var smask = {
          'w': img['w'],
          'h': img['h'],
          'cs': 'DeviceGray',
          'bpc': img['bpc'],
          'dp': dp,
          'data': img['smask']
        };
        if ('f' in img) smask.f = img['f'];
        putImage.call(this, smask);
      }


      if (img['cs'] === this.color_spaces.INDEXED) {
        this.internal.newObject();

        putStream({
          data: this.arrayBufferToBinaryString(new Uint8Array(img['pal']))
        });
        out('endobj');
      }
    },
        putResourcesCallback = function putResourcesCallback() {
      var images = this.internal.collections[namespace + 'images'];

      for (var i in images) {
        putImage.call(this, images[i]);
      }
    },
        putXObjectsDictCallback = function putXObjectsDictCallback() {
      var images = this.internal.collections[namespace + 'images'],
          out = this.internal.write,
          image;

      for (var i in images) {
        image = images[i];
        out('/I' + image['i'], image['n'], '0', 'R');
      }
    },
        checkCompressValue = function checkCompressValue(value) {
      if (value && typeof value === 'string') value = value.toUpperCase();
      return value in jsPDFAPI.image_compression ? value : jsPDFAPI.image_compression.NONE;
    },
        getImages = function getImages() {
      var images = this.internal.collections[namespace + 'images'];

      if (!images) {
        this.internal.collections[namespace + 'images'] = images = {};
        this.internal.events.subscribe('putResources', putResourcesCallback);
        this.internal.events.subscribe('putXobjectDict', putXObjectsDictCallback);
      }

      return images;
    },
        getImageIndex = function getImageIndex(images) {
      var imageIndex = 0;

      if (images) {
        imageIndex = Object.keys ? Object.keys(images).length : function (o) {
          var i = 0;

          for (var e in o) {
            if (o.hasOwnProperty(e)) {
              i++;
            }
          }

          return i;
        }(images);
      }

      return imageIndex;
    },
        notDefined = function notDefined(value) {
      return typeof value === 'undefined' || value === null || value.length === 0;
    },
        generateAliasFromImageData = function generateAliasFromImageData(imageData) {
      if (typeof imageData === 'string') {
        return jsPDFAPI.sHashCode(imageData);
      }

      if (jsPDFAPI.isArrayBufferView(imageData)) {
        return jsPDFAPI.sHashCode(jsPDFAPI.arrayBufferToBinaryString(imageData));
      }

      return null;
    },
        isImageTypeSupported = function isImageTypeSupported(type) {
      return typeof jsPDFAPI["process" + type.toUpperCase()] === "function";
    },
        isDOMElement = function isDOMElement(object) {
      return _typeof(object) === 'object' && object.nodeType === 1;
    },
        createDataURIFromElement = function createDataURIFromElement(element, format) {
      if (element.nodeName === 'IMG' && element.hasAttribute('src')) {
        var src = '' + element.getAttribute('src');

        if (src.indexOf('data:image/') === 0) {
          return unescape(src);
        }


        var tmpImageData = jsPDFAPI.loadFile(src);

        if (tmpImageData !== undefined) {
          return btoa(tmpImageData);
        }
      }

      if (element.nodeName === 'CANVAS') {
        var canvas = element;
        return element.toDataURL('image/jpeg', 1.0);
      }


      var canvas = document.createElement('canvas');
      canvas.width = element.clientWidth || element.width;
      canvas.height = element.clientHeight || element.height;
      var ctx = canvas.getContext('2d');

      if (!ctx) {
        throw 'addImage requires canvas to be supported by browser.';
      }

      ctx.drawImage(element, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL(('' + format).toLowerCase() == 'png' ? 'image/png' : 'image/jpeg');
    },
        checkImagesForAlias = function checkImagesForAlias(alias, images) {
      var cached_info;

      if (images) {
        for (var e in images) {
          if (alias === images[e].alias) {
            cached_info = images[e];
            break;
          }
        }
      }

      return cached_info;
    },
        determineWidthAndHeight = function determineWidthAndHeight(w, h, info) {
      if (!w && !h) {
        w = -96;
        h = -96;
      }

      if (w < 0) {
        w = -1 * info['w'] * 72 / w / this.internal.scaleFactor;
      }

      if (h < 0) {
        h = -1 * info['h'] * 72 / h / this.internal.scaleFactor;
      }

      if (w === 0) {
        w = h * info['w'] / info['h'];
      }

      if (h === 0) {
        h = w * info['h'] / info['w'];
      }

      return [w, h];
    },
        writeImageToPDF = function writeImageToPDF(x, y, w, h, info, index, images, rotation) {
      var dims = determineWidthAndHeight.call(this, w, h, info),
          coord = this.internal.getCoordinateString,
          vcoord = this.internal.getVerticalCoordinateString;
      w = dims[0];
      h = dims[1];
      images[index] = info;

      if (rotation) {
        rotation *= Math.PI / 180;
        var c = Math.cos(rotation);
        var s = Math.sin(rotation);

        var f4 = function f4(number) {
          return number.toFixed(4);
        };

        var rotationTransformationMatrix = [f4(c), f4(s), f4(s * -1), f4(c), 0, 0, 'cm'];
      }

      this.internal.write('q');

      if (rotation) {
        this.internal.write([1, '0', '0', 1, coord(x), vcoord(y + h), 'cm'].join(' '));

        this.internal.write(rotationTransformationMatrix.join(' '));

        this.internal.write([coord(w), '0', '0', coord(h), '0', '0', 'cm'].join(' '));
      } else {
        this.internal.write([coord(w), '0', '0', coord(h), coord(x), vcoord(y + h), 'cm'].join(' '));
      }

      this.internal.write('/I' + info['i'] + ' Do');

      this.internal.write('Q');
    };
    jsPDFAPI.color_spaces = {
      DEVICE_RGB: 'DeviceRGB',
      DEVICE_GRAY: 'DeviceGray',
      DEVICE_CMYK: 'DeviceCMYK',
      CAL_GREY: 'CalGray',
      CAL_RGB: 'CalRGB',
      LAB: 'Lab',
      ICC_BASED: 'ICCBased',
      INDEXED: 'Indexed',
      PATTERN: 'Pattern',
      SEPARATION: 'Separation',
      DEVICE_N: 'DeviceN'
    };

    jsPDFAPI.decode = {
      DCT_DECODE: 'DCTDecode',
      FLATE_DECODE: 'FlateDecode',
      LZW_DECODE: 'LZWDecode',
      JPX_DECODE: 'JPXDecode',
      JBIG2_DECODE: 'JBIG2Decode',
      ASCII85_DECODE: 'ASCII85Decode',
      ASCII_HEX_DECODE: 'ASCIIHexDecode',
      RUN_LENGTH_DECODE: 'RunLengthDecode',
      CCITT_FAX_DECODE: 'CCITTFaxDecode'
    };

    jsPDFAPI.image_compression = {
      NONE: 'NONE',
      FAST: 'FAST',
      MEDIUM: 'MEDIUM',
      SLOW: 'SLOW'
    };

    jsPDFAPI.sHashCode = function (str) {
      str = str || "";
      var hash = 0,
          i,
          chr;
      if (str.length === 0) return hash;

      for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
      }

      return hash;
    };
    jsPDFAPI.isString = function (object) {
      return typeof object === 'string';
    };
    jsPDFAPI.validateStringAsBase64 = function (possibleBase64String) {
      possibleBase64String = possibleBase64String || '';
      possibleBase64String.toString().trim();
      var result = true;

      if (possibleBase64String.length === 0) {
        result = false;
      }

      if (possibleBase64String.length % 4 !== 0) {
        result = false;
      }

      if (/^[A-Za-z0-9+\/]+$/.test(possibleBase64String.substr(0, possibleBase64String.length - 2)) === false) {
        result = false;
      }

      if (/^[A-Za-z0-9\/][A-Za-z0-9+\/]|[A-Za-z0-9+\/]=|==$/.test(possibleBase64String.substr(-2)) === false) {
        result = false;
      }

      return result;
    };
    jsPDFAPI.extractInfoFromBase64DataURI = function (dataURI) {
      return /^data:([\w]+?\/([\w]+?));\S*;*base64,(.+)$/g.exec(dataURI);
    };
    jsPDFAPI.extractImageFromDataUrl = function (dataUrl) {
      dataUrl = dataUrl || '';
      var dataUrlParts = dataUrl.split('base64,');
      var result = null;

      if (dataUrlParts.length === 2) {
        var extractedInfo = /^data:(\w*\/\w*);*(charset=[\w=-]*)*;*$/.exec(dataUrlParts[0]);

        if (Array.isArray(extractedInfo)) {
          result = {
            mimeType: extractedInfo[1],
            charset: extractedInfo[2],
            data: dataUrlParts[1]
          };
        }
      }

      return result;
    };
    jsPDFAPI.supportsArrayBuffer = function () {
      return typeof ArrayBuffer !== 'undefined' && typeof Uint8Array !== 'undefined';
    };
    jsPDFAPI.isArrayBuffer = function (object) {
      if (!this.supportsArrayBuffer()) return false;
      return object instanceof ArrayBuffer;
    };
    jsPDFAPI.isArrayBufferView = function (object) {
      if (!this.supportsArrayBuffer()) return false;
      if (typeof Uint32Array === 'undefined') return false;
      return object instanceof Int8Array || object instanceof Uint8Array || typeof Uint8ClampedArray !== 'undefined' && object instanceof Uint8ClampedArray || object instanceof Int16Array || object instanceof Uint16Array || object instanceof Int32Array || object instanceof Uint32Array || object instanceof Float32Array || object instanceof Float64Array;
    };
    jsPDFAPI.binaryStringToUint8Array = function (binary_string) {
      var len = binary_string.length;
      var bytes = new Uint8Array(len);

      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }

      return bytes;
    };
    jsPDFAPI.arrayBufferToBinaryString = function (buffer) {
      if (typeof atob === "function") {
        return atob(this.arrayBufferToBase64(buffer));
      }
    };

    jsPDFAPI.arrayBufferToBase64 = function (arrayBuffer) {
      var base64 = '';
      var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      var bytes = new Uint8Array(arrayBuffer);
      var byteLength = bytes.byteLength;
      var byteRemainder = byteLength % 3;
      var mainLength = byteLength - byteRemainder;
      var a, b, c, d;
      var chunk;

      for (var i = 0; i < mainLength; i = i + 3) {
        chunk = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];

        a = (chunk & 16515072) >> 18;

        b = (chunk & 258048) >> 12;

        c = (chunk & 4032) >> 6;

        d = chunk & 63;

        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
      }


      if (byteRemainder == 1) {
        chunk = bytes[mainLength];
        a = (chunk & 252) >> 2;

        b = (chunk & 3) << 4;

        base64 += encodings[a] + encodings[b] + '==';
      } else if (byteRemainder == 2) {
        chunk = bytes[mainLength] << 8 | bytes[mainLength + 1];
        a = (chunk & 64512) >> 10;

        b = (chunk & 1008) >> 4;

        c = (chunk & 15) << 2;

        base64 += encodings[a] + encodings[b] + encodings[c] + '=';
      }

      return base64;
    };

    jsPDFAPI.createImageInfo = function (data, wd, ht, cs, bpc, f, imageIndex, alias, dp, trns, pal, smask, p) {
      var info = {
        alias: alias,
        w: wd,
        h: ht,
        cs: cs,
        bpc: bpc,
        i: imageIndex,
        data: data

      };
      if (f) info.f = f;
      if (dp) info.dp = dp;
      if (trns) info.trns = trns;
      if (pal) info.pal = pal;
      if (smask) info.smask = smask;
      if (p) info.p = p;

      return info;
    };

    jsPDFAPI.addImage = function (imageData, format, x, y, w, h, alias, compression, rotation) {

      var tmpImageData = '';

      if (typeof format !== 'string') {
        var tmp = h;
        h = w;
        w = y;
        y = x;
        x = format;
        format = tmp;
      }

      if (_typeof(imageData) === 'object' && !isDOMElement(imageData) && "imageData" in imageData) {
        var options = imageData;
        imageData = options.imageData;
        format = options.format || format || 'UNKNOWN';
        x = options.x || x || 0;
        y = options.y || y || 0;
        w = options.w || w;
        h = options.h || h;
        alias = options.alias || alias;
        compression = options.compression || compression;
        rotation = options.rotation || options.angle || rotation;
      }


      var filters = this.internal.getFilters();

      if (compression === undefined && filters.indexOf('FlateEncode') !== -1) {
        compression = 'SLOW';
      }

      if (typeof imageData === "string") {
        imageData = unescape(imageData);
      }

      if (isNaN(x) || isNaN(y)) {
        console.error('jsPDF.addImage: Invalid coordinates', arguments);
        throw new Error('Invalid coordinates passed to jsPDF.addImage');
      }

      var images = getImages.call(this),
          info,
          dataAsBinaryString;

      if (!(info = checkImagesForAlias(imageData, images))) {
        if (isDOMElement(imageData)) imageData = createDataURIFromElement(imageData, format);
        if (notDefined(alias)) alias = generateAliasFromImageData(imageData);

        if (!(info = checkImagesForAlias(alias, images))) {
          if (this.isString(imageData)) {
            tmpImageData = this.convertStringToImageData(imageData);

            if (tmpImageData !== '') {
              imageData = tmpImageData;
            } else {
              tmpImageData = jsPDFAPI.loadFile(imageData);

              if (tmpImageData !== undefined) {
                imageData = tmpImageData;
              }
            }
          }

          format = this.getImageFileTypeByImageData(imageData, format);
          if (!isImageTypeSupported(format)) throw new Error('addImage does not support files of type \'' + format + '\', please ensure that a plugin for \'' + format + '\' support is added.');

          if (this.supportsArrayBuffer()) {
            if (!(imageData instanceof Uint8Array)) {
              dataAsBinaryString = imageData;
              imageData = this.binaryStringToUint8Array(imageData);
            }
          }

          info = this['process' + format.toUpperCase()](imageData, getImageIndex(images), alias, checkCompressValue(compression), dataAsBinaryString);

          if (!info) {
            throw new Error('An unknown error occurred whilst processing the image');
          }
        }
      }

      writeImageToPDF.call(this, x, y, w, h, info, info.i, images, rotation);
      return this;
    };

    jsPDFAPI.convertStringToImageData = function (stringData) {
      var base64Info;
      var imageData = '';
      var rawData;

      if (this.isString(stringData)) {
        var base64Info = this.extractImageFromDataUrl(stringData);
        rawData = base64Info !== null ? base64Info.data : stringData;

        try {
          imageData = atob(rawData);
        } catch (e) {
          if (!jsPDFAPI.validateStringAsBase64(rawData)) {
            throw new Error('Supplied Data is not a valid base64-String jsPDF.convertStringToImageData ');
          } else {
            throw new Error('atob-Error in jsPDF.convertStringToImageData ' + e.message);
          }
        }
      }

      return imageData;
    };

    var getJpegSize = function getJpegSize(imgData) {

      var width, height, numcomponents;

      if (getImageFileTypeByImageData(imgData) !== 'JPEG') {
        throw new Error('getJpegSize requires a binary string jpeg file');
      }

      var blockLength = imgData.charCodeAt(4) * 256 + imgData.charCodeAt(5);
      var i = 4,
          len = imgData.length;

      while (i < len) {
        i += blockLength;

        if (imgData.charCodeAt(i) !== 0xff) {
          throw new Error('getJpegSize could not find the size of the image');
        }

        if (imgData.charCodeAt(i + 1) === 0xc0 ||
        imgData.charCodeAt(i + 1) === 0xc1 ||
        imgData.charCodeAt(i + 1) === 0xc2 ||
        imgData.charCodeAt(i + 1) === 0xc3 ||
        imgData.charCodeAt(i + 1) === 0xc4 ||
        imgData.charCodeAt(i + 1) === 0xc5 ||
        imgData.charCodeAt(i + 1) === 0xc6 ||
        imgData.charCodeAt(i + 1) === 0xc7) {
          height = imgData.charCodeAt(i + 5) * 256 + imgData.charCodeAt(i + 6);
          width = imgData.charCodeAt(i + 7) * 256 + imgData.charCodeAt(i + 8);
          numcomponents = imgData.charCodeAt(i + 9);
          return [width, height, numcomponents];
        } else {
          i += 2;
          blockLength = imgData.charCodeAt(i) * 256 + imgData.charCodeAt(i + 1);
        }
      }
    },
        getJpegSizeFromBytes = function getJpegSizeFromBytes(data) {
      var hdr = data[0] << 8 | data[1];
      if (hdr !== 0xFFD8) throw new Error('Supplied data is not a JPEG');
      var len = data.length,
          block = (data[4] << 8) + data[5],
          pos = 4,
          bytes,
          width,
          height,
          numcomponents;

      while (pos < len) {
        pos += block;
        bytes = readBytes(data, pos);
        block = (bytes[2] << 8) + bytes[3];

        if ((bytes[1] === 0xC0 || bytes[1] === 0xC2) && bytes[0] === 0xFF && block > 7) {
          bytes = readBytes(data, pos + 5);
          width = (bytes[2] << 8) + bytes[3];
          height = (bytes[0] << 8) + bytes[1];
          numcomponents = bytes[4];
          return {
            width: width,
            height: height,
            numcomponents: numcomponents
          };
        }

        pos += 2;
      }

      throw new Error('getJpegSizeFromBytes could not find the size of the image');
    },
        readBytes = function readBytes(data, offset) {
      return data.subarray(offset, offset + 5);
    };

    jsPDFAPI.processJPEG = function (data, index, alias, compression, dataAsBinaryString, colorSpace) {

      var filter = this.decode.DCT_DECODE,
          bpc = 8,
          dims;

      if (!this.isString(data) && !this.isArrayBuffer(data) && !this.isArrayBufferView(data)) {
        return null;
      }

      if (this.isString(data)) {
        dims = getJpegSize(data);
      }

      if (this.isArrayBuffer(data)) {
        data = new Uint8Array(data);
      }

      if (this.isArrayBufferView(data)) {
        dims = getJpegSizeFromBytes(data);

        data = dataAsBinaryString || this.arrayBufferToBinaryString(data);
      }

      if (colorSpace === undefined) {
        switch (dims.numcomponents) {
          case 1:
            colorSpace = this.color_spaces.DEVICE_GRAY;
            break;

          case 4:
            colorSpace = this.color_spaces.DEVICE_CMYK;
            break;

          default:
          case 3:
            colorSpace = this.color_spaces.DEVICE_RGB;
            break;
        }
      }

      return this.createImageInfo(data, dims.width, dims.height, colorSpace, bpc, filter, index, alias);
    };


    jsPDFAPI.processJPG = function ()
    {
      return this.processJPEG.apply(this, arguments);
    };
    jsPDFAPI.getImageProperties = function (imageData) {
      var info;
      var tmpImageData = '';
      var format;

      if (isDOMElement(imageData)) {
        imageData = createDataURIFromElement(imageData);
      }

      if (this.isString(imageData)) {
        tmpImageData = this.convertStringToImageData(imageData);

        if (tmpImageData !== '') {
          imageData = tmpImageData;
        } else {
          tmpImageData = jsPDFAPI.loadFile(imageData);

          if (tmpImageData !== undefined) {
            imageData = tmpImageData;
          }
        }
      }

      format = this.getImageFileTypeByImageData(imageData);

      if (!isImageTypeSupported(format)) {
        throw new Error('addImage does not support files of type \'' + format + '\', please ensure that a plugin for \'' + format + '\' support is added.');
      }

      if (this.supportsArrayBuffer()) {
        if (!(imageData instanceof Uint8Array)) {
          imageData = this.binaryStringToUint8Array(imageData);
        }
      }

      info = this['process' + format.toUpperCase()](imageData);

      if (!info) {
        throw new Error('An unknown error occurred whilst processing the image');
      }

      return {
        fileType: format,
        width: info.w,
        height: info.h,
        colorSpace: info.cs,
        compressionMode: info.f,
        bitsPerComponent: info.bpc
      };
    };
  })(jsPDF.API);
  (function (jsPDFAPI) {

    jsPDF.API.events.push(['addPage', function (addPageData) {
      var pageInfo = this.internal.getPageInfo(addPageData.pageNumber);
      pageInfo.pageContext.annotations = [];
    }]);
    jsPDFAPI.events.push(['putPage', function (putPageData) {
      var pageInfo = this.internal.getPageInfoByObjId(putPageData.objId);
      var pageAnnos = putPageData.pageContext.annotations;

      var notEmpty = function notEmpty(obj) {
        if (typeof obj != 'undefined') {
          if (obj != '') {
            return true;
          }
        }
      };

      var found = false;

      for (var a = 0; a < pageAnnos.length && !found; a++) {
        var anno = pageAnnos[a];

        switch (anno.type) {
          case 'link':
            if (notEmpty(anno.options.url) || notEmpty(anno.options.pageNumber)) {
              found = true;
              break;
            }

          case 'reference':
          case 'text':
          case 'freetext':
            found = true;
            break;
        }
      }

      if (found == false) {
        return;
      }

      this.internal.write("/Annots [");
      var pageHeight = this.internal.pageSize.height;
      var getHorizontalCoordinateString = this.internal.getCoordinateString;
      var getVerticalCoordinateString = this.internal.getVerticalCoordinateString;

      for (var a = 0; a < pageAnnos.length; a++) {
        var anno = pageAnnos[a];

        switch (anno.type) {
          case 'reference':
            this.internal.write(' ' + anno.object.objId + ' 0 R ');
            break;

          case 'text':
            var objText = this.internal.newAdditionalObject();
            var objPopup = this.internal.newAdditionalObject();
            var title = anno.title || 'Note';
            var rect = "/Rect [" + getHorizontalCoordinateString(anno.bounds.x) + " " + getVerticalCoordinateString(anno.bounds.y + anno.bounds.h) + " " + getHorizontalCoordinateString(anno.bounds.x + anno.bounds.w) + " " + getVerticalCoordinateString(anno.bounds.y) + "] ";
            line = '<</Type /Annot /Subtype /' + 'Text' + ' ' + rect + '/Contents (' + anno.contents + ')';
            line += ' /Popup ' + objPopup.objId + " 0 R";
            line += ' /P ' + pageInfo.objId + " 0 R";
            line += ' /T (' + title + ') >>';
            objText.content = line;
            var parent = objText.objId + ' 0 R';
            var popoff = 30;
            var rect = "/Rect [" + getHorizontalCoordinateString(anno.bounds.x + popoff) + " " + getVerticalCoordinateString(anno.bounds.y + anno.bounds.h) + " " + getHorizontalCoordinateString(anno.bounds.x + anno.bounds.w + popoff) + " " + getVerticalCoordinateString(anno.bounds.y) + "] ";
            line = '<</Type /Annot /Subtype /' + 'Popup' + ' ' + rect + ' /Parent ' + parent;

            if (anno.open) {
              line += ' /Open true';
            }

            line += ' >>';
            objPopup.content = line;
            this.internal.write(objText.objId, '0 R', objPopup.objId, '0 R');
            break;

          case 'freetext':
            var rect = "/Rect [" + getHorizontalCoordinateString(anno.bounds.x) + " " + getVerticalCoordinateString(anno.bounds.y) + " " + getHorizontalCoordinateString(anno.bounds.x + anno.bounds.w) + " " + getVerticalCoordinateString(anno.bounds.y + anno.bounds.h) + "] ";
            var color = anno.color || '#000000';
            line = '<</Type /Annot /Subtype /' + 'FreeText' + ' ' + rect + '/Contents (' + anno.contents + ')';
            line += ' /DS(font: Helvetica,sans-serif 12.0pt; text-align:left; color:#' + color + ')';
            line += ' /Border [0 0 0]';
            line += ' >>';
            this.internal.write(line);
            break;

          case 'link':
            if (anno.options.name) {
              var loc = this.annotations._nameMap[anno.options.name];
              anno.options.pageNumber = loc.page;
              anno.options.top = loc.y;
            } else {
              if (!anno.options.top) {
                anno.options.top = 0;
              }
            }

            var rect = "/Rect [" + getHorizontalCoordinateString(anno.x) + " " + getVerticalCoordinateString(anno.y) + " " + getHorizontalCoordinateString(anno.x + anno.w) + " " + getVerticalCoordinateString(anno.y + anno.h) + "] ";
            var line = '';

            if (anno.options.url) {
              line = '<</Type /Annot /Subtype /Link ' + rect + '/Border [0 0 0] /A <</S /URI /URI (' + anno.options.url + ') >>';
            } else if (anno.options.pageNumber) {
              // first page is 0
              var info = this.internal.getPageInfo(anno.options.pageNumber);
              line = '<</Type /Annot /Subtype /Link ' + rect + '/Border [0 0 0] /Dest [' + info.objId + " 0 R";
              anno.options.magFactor = anno.options.magFactor || "XYZ";

              switch (anno.options.magFactor) {
                case 'Fit':
                  line += ' /Fit]';
                  break;

                case 'FitH':
                  line += ' /FitH ' + anno.options.top + ']';
                  break;

                case 'FitV':
                  anno.options.left = anno.options.left || 0;
                  line += ' /FitV ' + anno.options.left + ']';
                  break;

                case 'XYZ':
                default:
                  var top = getVerticalCoordinateString(anno.options.top);
                  anno.options.left = anno.options.left || 0;

                  if (typeof anno.options.zoom === 'undefined') {
                    anno.options.zoom = 0;
                  }

                  line += ' /XYZ ' + anno.options.left + ' ' + top + ' ' + anno.options.zoom + ']';
                  break;
              }
            }

            if (line != '') {
              line += " >>";
              this.internal.write(line);
            }

            break;
        }
      }

      this.internal.write("]");
    }]);

    jsPDFAPI.createAnnotation = function (options) {
      var pageInfo = this.internal.getCurrentPageInfo();

      switch (options.type) {
        case 'link':
          this.link(options.bounds.x, options.bounds.y, options.bounds.w, options.bounds.h, options);
          break;

        case 'text':
        case 'freetext':
          pageInfo.pageContext.annotations.push(options);
          break;
      }
    };

    jsPDFAPI.link = function (x, y, w, h, options) {
      var pageInfo = this.internal.getCurrentPageInfo();
      pageInfo.pageContext.annotations.push({
        x: x,
        y: y,
        w: w,
        h: h,
        options: options,
        type: 'link'
      });
    };

    jsPDFAPI.textWithLink = function (text, x, y, options) {
      var width = this.getTextWidth(text);
      var height = this.internal.getLineHeight() / this.internal.scaleFactor;
      this.text(text, x, y);

      y += height * .2;
      this.link(x, y - height, width, height, options);
      return width;
    };

    jsPDFAPI.getTextWidth = function (text) {
      var fontSize = this.internal.getFontSize();
      var txtWidth = this.getStringUnitWidth(text) * fontSize / this.internal.scaleFactor;
      return txtWidth;
    };

    return this;
  })(jsPDF.API);

  (function (jsPDFAPI) {

    var arabicSubstitionA = {
      0x0621: [0xFE80],
      0x0622: [0xFE81, 0xFE82],
      0x0623: [0xFE83, 0xFE84],
      0x0624: [0xFE85, 0xFE86],
      0x0625: [0xFE87, 0xFE88],
      0x0626: [0xFE89, 0xFE8A, 0xFE8B, 0xFE8C],
      0x0627: [0xFE8D, 0xFE8E],
      0x0628: [0xFE8F, 0xFE90, 0xFE91, 0xFE92],
      0x0629: [0xFE93, 0xFE94],
      0x062A: [0xFE95, 0xFE96, 0xFE97, 0xFE98],
      0x062B: [0xFE99, 0xFE9A, 0xFE9B, 0xFE9C],
      0x062C: [0xFE9D, 0xFE9E, 0xFE9F, 0xFEA0],
      0x062D: [0xFEA1, 0xFEA2, 0xFEA3, 0xFEA4],
      0x062E: [0xFEA5, 0xFEA6, 0xFEA7, 0xFEA8],
      0x062F: [0xFEA9, 0xFEAA],
      0x0630: [0xFEAB, 0xFEAC],
      0x0631: [0xFEAD, 0xFEAE],
      0x0632: [0xFEAF, 0xFEB0],
      0x0633: [0xFEB1, 0xFEB2, 0xFEB3, 0xFEB4],
      0x0634: [0xFEB5, 0xFEB6, 0xFEB7, 0xFEB8],
      0x0635: [0xFEB9, 0xFEBA, 0xFEBB, 0xFEBC],
      0x0636: [0xFEBD, 0xFEBE, 0xFEBF, 0xFEC0],
      0x0637: [0xFEC1, 0xFEC2, 0xFEC3, 0xFEC4],
      0x0638: [0xFEC5, 0xFEC6, 0xFEC7, 0xFEC8],
      0x0639: [0xFEC9, 0xFECA, 0xFECB, 0xFECC],
      0x063A: [0xFECD, 0xFECE, 0xFECF, 0xFED0],
      0x0641: [0xFED1, 0xFED2, 0xFED3, 0xFED4],
      0x0642: [0xFED5, 0xFED6, 0xFED7, 0xFED8],
      0x0643: [0xFED9, 0xFEDA, 0xFEDB, 0xFEDC],
      0x0644: [0xFEDD, 0xFEDE, 0xFEDF, 0xFEE0],
      0x0645: [0xFEE1, 0xFEE2, 0xFEE3, 0xFEE4],
      0x0646: [0xFEE5, 0xFEE6, 0xFEE7, 0xFEE8],
      0x0647: [0xFEE9, 0xFEEA, 0xFEEB, 0xFEEC],
      0x0648: [0xFEED, 0xFEEE],
      0x0649: [0xFEEF, 0xFEF0, 64488, 64489],
      0x064A: [0xFEF1, 0xFEF2, 0xFEF3, 0xFEF4],
      0x0671: [0xFB50, 0xFB51],
      0x0677: [0xFBDD],
      0x0679: [0xFB66, 0xFB67, 0xFB68, 0xFB69],
      0x067A: [0xFB5E, 0xFB5F, 0xFB60, 0xFB61],
      0x067B: [0xFB52, 0xFB53, 0xFB54, 0xFB55],
      0x067E: [0xFB56, 0xFB57, 0xFB58, 0xFB59],
      0x067F: [0xFB62, 0xFB63, 0xFB64, 0xFB65],
      0x0680: [0xFB5A, 0xFB5B, 0xFB5C, 0xFB5D],
      0x0683: [0xFB76, 0xFB77, 0xFB78, 0xFB79],
      0x0684: [0xFB72, 0xFB73, 0xFB74, 0xFB75],
      0x0686: [0xFB7A, 0xFB7B, 0xFB7C, 0xFB7D],
      0x0687: [0xFB7E, 0xFB7F, 0xFB80, 0xFB81],
      0x0688: [0xFB88, 0xFB89],
      0x068C: [0xFB84, 0xFB85],
      0x068D: [0xFB82, 0xFB83],
      0x068E: [0xFB86, 0xFB87],
      0x0691: [0xFB8C, 0xFB8D],
      0x0698: [0xFB8A, 0xFB8B],
      0x06A4: [0xFB6A, 0xFB6B, 0xFB6C, 0xFB6D],
      0x06A6: [0xFB6E, 0xFB6F, 0xFB70, 0xFB71],
      0x06A9: [0xFB8E, 0xFB8F, 0xFB90, 0xFB91],
      0x06AD: [0xFBD3, 0xFBD4, 0xFBD5, 0xFBD6],
      0x06AF: [0xFB92, 0xFB93, 0xFB94, 0xFB95],
      0x06B1: [0xFB9A, 0xFB9B, 0xFB9C, 0xFB9D],
      0x06B3: [0xFB96, 0xFB97, 0xFB98, 0xFB99],
      0x06BA: [0xFB9E, 0xFB9F],
      0x06BB: [0xFBA0, 0xFBA1, 0xFBA2, 0xFBA3],
      0x06BE: [0xFBAA, 0xFBAB, 0xFBAC, 0xFBAD],
      0x06C0: [0xFBA4, 0xFBA5],
      0x06C1: [0xFBA6, 0xFBA7, 0xFBA8, 0xFBA9],
      0x06C5: [0xFBE0, 0xFBE1],
      0x06C6: [0xFBD9, 0xFBDA],
      0x06C7: [0xFBD7, 0xFBD8],
      0x06C8: [0xFBDB, 0xFBDC],
      0x06C9: [0xFBE2, 0xFBE3],
      0x06CB: [0xFBDE, 0xFBDF],
      0x06CC: [0xFBFC, 0xFBFD, 0xFBFE, 0xFBFF],
      0x06D0: [0xFBE4, 0xFBE5, 0xFBE6, 0xFBE7],
      0x06D2: [0xFBAE, 0xFBAF],
      0x06D3: [0xFBB0, 0xFBB1]

    };
    var ligatures = {
      0xFEDF: {
        0xFE82: 0xFEF5,
        0xFE84: 0xFEF7,
        0xFE88: 0xFEF9,
        0xFE8E: 0xFEFB

      },
      0xFEE0: {
        0xFE82: 0xFEF6,
        0xFE84: 0xFEF8,
        0xFE88: 0xFEFA,
        0xFE8E: 0xFEFC

      },
      0xFE8D: {
        0xFEDF: {
          0xFEE0: {
            0xFEEA: 0xFDF2
          }
        }
      },
      0x0651: {
        0x064C: 0xFC5E,
        0x064D: 0xFC5F,
        0x064E: 0xFC60,
        0x064F: 0xFC61,
        0x0650: 0xFC62

      }
    };
    var arabic_diacritics = {
      1612: 64606,
      1613: 64607,
      1614: 64608,
      1615: 64609,
      1616: 64610

    };
    var alfletter = [1570, 1571, 1573, 1575];
    var noChangeInForm = -1;
    var isolatedForm = 0;
    var finalForm = 1;
    var initialForm = 2;
    var medialForm = 3;
    jsPDFAPI.__arabicParser__ = {};

    var isInArabicSubstitutionA = jsPDFAPI.__arabicParser__.isInArabicSubstitutionA = function (letter) {
      return typeof arabicSubstitionA[letter.charCodeAt(0)] !== "undefined";
    };

    var isArabicLetter = jsPDFAPI.__arabicParser__.isArabicLetter = function (letter) {
      return typeof letter === "string" && /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+$/.test(letter);
    };

    var isArabicEndLetter = jsPDFAPI.__arabicParser__.isArabicEndLetter = function (letter) {
      return isArabicLetter(letter) && isInArabicSubstitutionA(letter) && arabicSubstitionA[letter.charCodeAt(0)].length <= 2;
    };

    var isArabicAlfLetter = jsPDFAPI.__arabicParser__.isArabicAlfLetter = function (letter) {
      return isArabicLetter(letter) && alfletter.indexOf(letter.charCodeAt(0)) >= 0;
    };

    var arabicLetterHasIsolatedForm = jsPDFAPI.__arabicParser__.arabicLetterHasIsolatedForm = function (letter) {
      return isArabicLetter(letter) && isInArabicSubstitutionA(letter) && arabicSubstitionA[letter.charCodeAt(0)].length >= 1;
    };

    var arabicLetterHasFinalForm = jsPDFAPI.__arabicParser__.arabicLetterHasFinalForm = function (letter) {
      return isArabicLetter(letter) && isInArabicSubstitutionA(letter) && arabicSubstitionA[letter.charCodeAt(0)].length >= 2;
    };

    var arabicLetterHasInitialForm = jsPDFAPI.__arabicParser__.arabicLetterHasInitialForm = function (letter) {
      return isArabicLetter(letter) && isInArabicSubstitutionA(letter) && arabicSubstitionA[letter.charCodeAt(0)].length >= 3;
    };

    var arabicLetterHasMedialForm = jsPDFAPI.__arabicParser__.arabicLetterHasMedialForm = function (letter) {
      return isArabicLetter(letter) && isInArabicSubstitutionA(letter) && arabicSubstitionA[letter.charCodeAt(0)].length == 4;
    };

    var resolveLigatures = jsPDFAPI.__arabicParser__.resolveLigatures = function (letters) {
      var i = 0;
      var tmpLigatures = ligatures;
      var position = isolatedForm;
      var result = '';
      var effectedLetters = 0;

      for (i = 0; i < letters.length; i += 1) {
        if (typeof tmpLigatures[letters.charCodeAt(i)] !== "undefined") {
          effectedLetters++;
          tmpLigatures = tmpLigatures[letters.charCodeAt(i)];

          if (typeof tmpLigatures === "number") {
            position = getCorrectForm(letters.charAt(i), letters.charAt(i - effectedLetters), letters.charAt(i + 1));
            position = position !== -1 ? position : 0;
            result += String.fromCharCode(tmpLigatures);
            tmpLigatures = ligatures;
            effectedLetters = 0;
          }

          if (i === letters.length - 1) {
            tmpLigatures = ligatures;
            result += letters.charAt(i - (effectedLetters - 1));
            i = i - (effectedLetters - 1);
            effectedLetters = 0;
          }
        } else {
          tmpLigatures = ligatures;
          result += letters.charAt(i - effectedLetters);
          i = i - effectedLetters;
          effectedLetters = 0;
        }
      }

      return result;
    };

    var isArabicDiacritic = jsPDFAPI.__arabicParser__.isArabicDiacritic = function (letter) {
      return letter !== undefined && arabic_diacritics[letter.charCodeAt(0)] !== undefined;
    };

    var getCorrectForm = jsPDFAPI.__arabicParser__.getCorrectForm = function (currentChar, beforeChar, nextChar) {

      if (!isArabicLetter(currentChar)) {
        return -1;
      }

      if (isInArabicSubstitutionA(currentChar) === false) {
        return noChangeInForm;
      }

      if (!arabicLetterHasFinalForm(currentChar) || !isArabicLetter(beforeChar) && !isArabicLetter(nextChar) || !isArabicLetter(nextChar) && isArabicEndLetter(beforeChar) || isArabicEndLetter(currentChar) && !isArabicLetter(beforeChar) || isArabicEndLetter(currentChar) && isArabicAlfLetter(beforeChar) || isArabicEndLetter(currentChar) && isArabicEndLetter(beforeChar)) {
        return isolatedForm;
      }

      if (arabicLetterHasMedialForm(currentChar) && isArabicLetter(beforeChar) && !isArabicEndLetter(beforeChar) && isArabicLetter(nextChar) && arabicLetterHasFinalForm(nextChar)) {
        return medialForm;
      }

      if (isArabicEndLetter(currentChar) || !isArabicLetter(nextChar)) {
        return finalForm;
      }

      return initialForm;
    };

    var processArabic = jsPDFAPI.__arabicParser__.processArabic = jsPDFAPI.processArabic = function (text) {
      text = text || "";
      var result = "";
      var i = 0;
      var j = 0;
      var position = 0;
      var currentLetter = "";
      var prevLetter = "";
      var nextLetter = "";
      var words = text.split("\\s+");
      var newWords = [];

      for (i = 0; i < words.length; i += 1) {
        newWords.push('');

        for (j = 0; j < words[i].length; j += 1) {
          currentLetter = words[i][j];
          prevLetter = words[i][j - 1];
          nextLetter = words[i][j + 1];

          if (isArabicLetter(currentLetter)) {
            position = getCorrectForm(currentLetter, prevLetter, nextLetter);

            if (position !== -1) {
              newWords[i] += String.fromCharCode(arabicSubstitionA[currentLetter.charCodeAt(0)][position]);
            } else {
              newWords[i] += currentLetter;
            }
          } else {
            newWords[i] += currentLetter;
          }
        }

        newWords[i] = resolveLigatures(newWords[i]);
      }

      result = newWords.join(' ');
      return result;
    };

    var arabicParserFunction = function arabicParserFunction(args) {
      var text = args.text;
      var x = args.x;
      var y = args.y;
      var options = args.options || {};
      var mutex = args.mutex || {};
      var lang = options.lang;
      var tmpText = [];

      if (Object.prototype.toString.call(text) === '[object Array]') {
        var i = 0;
        tmpText = [];

        for (i = 0; i < text.length; i += 1) {
          if (Object.prototype.toString.call(text[i]) === '[object Array]') {
            tmpText.push([processArabic(text[i][0]), text[i][1], text[i][2]]);
          } else {
            tmpText.push([processArabic(text[i])]);
          }
        }

        args.text = tmpText;
      } else {
        args.text = processArabic(text);
      }
    };

    jsPDFAPI.events.push(['preProcessText', arabicParserFunction]);
  })(jsPDF.API);

  (function (jsPDFAPI) {

    jsPDFAPI.autoPrint = function (options) {

      var refAutoPrintTag;
      options = options || {};
      options.variant = options.variant || 'non-conform';

      switch (options.variant) {
        case 'javascript':
          this.addJS('print({});');
          break;

        case 'non-conform':
        default:
          this.internal.events.subscribe('postPutResources', function () {
            refAutoPrintTag = this.internal.newObject();
            this.internal.out("<<");
            this.internal.out("/S /Named");
            this.internal.out("/Type /Action");
            this.internal.out("/N /Print");
            this.internal.out(">>");
            this.internal.out("endobj");
          });
          this.internal.events.subscribe("putCatalog", function () {
            this.internal.out("/OpenAction " + refAutoPrintTag + " 0 R");
          });
          break;
      }

      return this;
    };
  })(jsPDF.API);

  (function (jsPDFAPI) {

    var Canvas = function Canvas() {
      var jsPdfInstance = undefined;
      Object.defineProperty(this, 'pdf', {
        get: function get() {
          return jsPdfInstance;
        },
        set: function set(value) {
          jsPdfInstance = value;
        }
      });
      var _width = 150

      Object.defineProperty(this, 'width', {
        get: function get() {
          return _width;
        },
        set: function set(value) {
          if (isNaN(value) || Number.isInteger(value) === false || value < 0) {
            _width = 150;
          } else {
            _width = value;
          }

          if (this.getContext('2d').pageWrapXEnabled) {
            this.getContext('2d').pageWrapX = _width + 1;
          }
        }
      });
      var _height = 300;

      Object.defineProperty(this, 'height', {
        get: function get() {
          return _height;
        },
        set: function set(value) {
          if (isNaN(value) || Number.isInteger(value) === false || value < 0) {
            _height = 300;
          } else {
            _height = value;
          }

          if (this.getContext('2d').pageWrapYEnabled) {
            this.getContext('2d').pageWrapY = _height + 1;
          }
        }
      });
      var _childNodes = [];
      Object.defineProperty(this, 'childNodes', {
        get: function get() {
          return _childNodes;
        },
        set: function set(value) {
          _childNodes = value;
        }
      });
      var _style = {};
      Object.defineProperty(this, 'style', {
        get: function get() {
          return _style;
        },
        set: function set(value) {
          _style = value;
        }
      });
      Object.defineProperty(this, 'parentNode', {
        get: function get() {
          return false;
        }
      });
    };

    Canvas.prototype.getContext = function (contextType, contextAttributes) {
      contextType = contextType || '2d';
      var key;

      if (contextType !== '2d') {
        return null;
      }

      for (key in contextAttributes) {
        if (this.pdf.context2d.hasOwnProperty(key)) {
          this.pdf.context2d[key] = contextAttributes[key];
        }
      }

      this.pdf.context2d._canvas = this;
      return this.pdf.context2d;
    };
    Canvas.prototype.toDataURL = function () {
      throw new Error('toDataURL is not implemented.');
    };

    jsPDFAPI.events.push(['initialized', function () {
      this.canvas = new Canvas();
      this.canvas.pdf = this;
    }]);
    return this;
  })(jsPDF.API);

  (function (jsPDFAPI) {

    var padding = 3,
        margin = 13,
        headerFunction,
        lastCellPos = {
      x: undefined,
      y: undefined,
      w: undefined,
      h: undefined,
      ln: undefined
    },
        pages = 1,
        setLastCellPosition = function setLastCellPosition(x, y, w, h, ln) {
      lastCellPos = {
        'x': x,
        'y': y,
        'w': w,
        'h': h,
        'ln': ln
      };
    },
        getLastCellPosition = function getLastCellPosition() {
      return lastCellPos;
    },
        NO_MARGINS = {
      left: 0,
      top: 0,
      bottom: 0
    };

    jsPDFAPI.setHeaderFunction = function (func) {
      headerFunction = func;
    };

    jsPDFAPI.getTextDimensions = function (text, options) {
      var fontSize = this.table_font_size || this.internal.getFontSize();
      var fontStyle = this.internal.getFont().fontStyle;
      options = options || {};
      var scaleFactor = options.scaleFactor || this.internal.scaleFactor;
      var width = 0;
      var amountOfLines = 0;
      var height = 0;
      var tempWidth = 0;

      if (typeof text === 'string') {
        width = this.getStringUnitWidth(text) * fontSize;

        if (width !== 0) {
          amountOfLines = 1;
        }
      } else if (Object.prototype.toString.call(text) === '[object Array]') {
        for (var i = 0; i < text.length; i++) {
          tempWidth = this.getStringUnitWidth(text[i]) * fontSize;

          if (width < tempWidth) {
            width = tempWidth;
          }
        }

        if (width !== 0) {
          amountOfLines = text.length;
        }
      } else {
        throw new Error('getTextDimensions expects text-parameter to be of type String or an Array of Strings.');
      }

      width = width / scaleFactor;
      height = Math.max((amountOfLines * fontSize * this.getLineHeightFactor() - fontSize * (this.getLineHeightFactor() - 1)) / scaleFactor, 0);
      return {
        w: width,
        h: height
      };
    };

    jsPDFAPI.cellAddPage = function () {
      var margins = this.margins || NO_MARGINS;
      this.addPage();
      setLastCellPosition(margins.left, margins.top, undefined, undefined); //setLastCellPosition(undefined, undefined, undefined, undefined, undefined);

      pages += 1;
    };

    jsPDFAPI.cellInitialize = function () {
      lastCellPos = {
        x: undefined,
        y: undefined,
        w: undefined,
        h: undefined,
        ln: undefined
      };
      pages = 1;
    };

    jsPDFAPI.cell = function (x, y, w, h, txt, ln, align) {
      var curCell = getLastCellPosition();
      var pgAdded = false;

      if (curCell.ln !== undefined) {
        if (curCell.ln === ln) {
          x = curCell.x + curCell.w;
          y = curCell.y;
        } else {
          var margins = this.margins || NO_MARGINS;

          if (curCell.y + curCell.h + h + margin >= this.internal.pageSize.getHeight() - margins.bottom) {
            this.cellAddPage();
            pgAdded = true;

            if (this.printHeaders && this.tableHeaderRow) {
              this.printHeaderRow(ln, true);
            }
          }

          y = getLastCellPosition().y + getLastCellPosition().h;
          if (pgAdded) y = margin + 10;
        }
      }

      if (txt[0] !== undefined) {
        if (this.printingHeaderRow) {
          this.rect(x, y, w, h, 'FD');
        } else {
          this.rect(x, y, w, h);
        }

        if (align === 'right') {
          if (!(txt instanceof Array)) {
            txt = [txt];
          }

          for (var i = 0; i < txt.length; i++) {
            var currentLine = txt[i];
            var textSize = this.getStringUnitWidth(currentLine) * this.internal.getFontSize() / this.internal.scaleFactor;
            this.text(currentLine, x + w - textSize - padding, y + this.internal.getLineHeight() * (i + 1));
          }
        } else {
          this.text(txt, x + padding, y + this.internal.getLineHeight());
        }
      }

      setLastCellPosition(x, y, w, h, ln);
      return this;
    };

    jsPDFAPI.arrayMax = function (array, comparisonFn) {
      var max = array[0],
          i,
          ln,
          item;

      for (i = 0, ln = array.length; i < ln; i += 1) {
        item = array[i];

        if (comparisonFn) {
          if (comparisonFn(max, item) === -1) {
            max = item;
          }
        } else {
          if (item > max) {
            max = item;
          }
        }
      }

      return max;
    };


    jsPDFAPI.table = function (x, y, data, headers, config) {
      if (!data) {
        throw 'No data for PDF table';
      }

      var headerNames = [],
          headerPrompts = [],
          header,
          i,
          ln,
          cln,
          columnMatrix = {},
          columnWidths = {},
          columnData,
          column,
          columnMinWidths = [],
          j,
          tableHeaderConfigs = [],
          model,
          jln,
          func,
      autoSize = false,
          printHeaders = true,
          fontSize = 12,
          margins = NO_MARGINS;
      margins.width = this.internal.pageSize.getWidth();

      if (config) {
        if (config.autoSize === true) {
          autoSize = true;
        }

        if (config.printHeaders === false) {
          printHeaders = false;
        }

        if (config.fontSize) {
          fontSize = config.fontSize;
        }

        if (config.css && typeof config.css['font-size'] !== "undefined") {
          fontSize = config.css['font-size'] * 16;
        }

        if (config.margins) {
          margins = config.margins;
        }
      }

      this.lnMod = 0;
      lastCellPos = {
        x: undefined,
        y: undefined,
        w: undefined,
        h: undefined,
        ln: undefined
      }, pages = 1;
      this.printHeaders = printHeaders;
      this.margins = margins;
      this.setFontSize(fontSize);
      this.table_font_size = fontSize;

      if (headers === undefined || headers === null) {
        headerNames = Object.keys(data[0]);
      } else if (headers[0] && typeof headers[0] !== 'string') {
        var px2pt = 0.264583 * 72 / 25.4;

        for (i = 0, ln = headers.length; i < ln; i += 1) {
          header = headers[i];
          headerNames.push(header.name);
          headerPrompts.push(header.prompt);
          columnWidths[header.name] = header.width * px2pt;
        }
      } else {
        headerNames = headers;
      }

      if (autoSize) {
        func = function func(rec) {
          return rec[header];
        };

        for (i = 0, ln = headerNames.length; i < ln; i += 1) {
          header = headerNames[i];
          columnMatrix[header] = data.map(func);

          columnMinWidths.push(this.getTextDimensions(headerPrompts[i] || header, {
            scaleFactor: 1
          }).w);
          column = columnMatrix[header];

          for (j = 0, cln = column.length; j < cln; j += 1) {
            columnData = column[j];
            columnMinWidths.push(this.getTextDimensions(columnData, {
              scaleFactor: 1
            }).w);
          }

          columnWidths[header] = jsPDFAPI.arrayMax(columnMinWidths);

          columnMinWidths = [];
        }
      }

      if (printHeaders) {
        var lineHeight = this.calculateLineHeight(headerNames, columnWidths, headerPrompts.length ? headerPrompts : headerNames);

        for (i = 0, ln = headerNames.length; i < ln; i += 1) {
          header = headerNames[i];
          tableHeaderConfigs.push([x, y, columnWidths[header], lineHeight, String(headerPrompts.length ? headerPrompts[i] : header)]);
        }

        this.setTableHeaderRow(tableHeaderConfigs);

        this.printHeaderRow(1, false);
      }

      for (i = 0, ln = data.length; i < ln; i += 1) {
        var lineHeight;
        model = data[i];
        lineHeight = this.calculateLineHeight(headerNames, columnWidths, model);

        for (j = 0, jln = headerNames.length; j < jln; j += 1) {
          header = headerNames[j];
          this.cell(x, y, columnWidths[header], lineHeight, model[header], i + 2, header.align);
        }
      }

      this.lastCellPos = lastCellPos;
      this.table_x = x;
      this.table_y = y;
      return this;
    };

    jsPDFAPI.calculateLineHeight = function (headerNames, columnWidths, model) {
      var header,
          lineHeight = 0;

      for (var j = 0; j < headerNames.length; j++) {
        header = headerNames[j];
        model[header] = this.splitTextToSize(String(model[header]), columnWidths[header] - padding);
        var h = this.internal.getLineHeight() * model[header].length + padding;
        if (h > lineHeight) lineHeight = h;
      }

      return lineHeight;
    };

    jsPDFAPI.setTableHeaderRow = function (config) {
      this.tableHeaderRow = config;
    };

    jsPDFAPI.printHeaderRow = function (lineNumber, new_page) {
      if (!this.tableHeaderRow) {
        throw 'Property tableHeaderRow does not exist.';
      }

      var tableHeaderCell, tmpArray, i, ln;
      this.printingHeaderRow = true;

      if (headerFunction !== undefined) {
        var position = headerFunction(this, pages);
        setLastCellPosition(position[0], position[1], position[2], position[3], -1);
      }

      this.setFontStyle('bold');
      var tempHeaderConf = [];

      for (i = 0, ln = this.tableHeaderRow.length; i < ln; i += 1) {
        this.setFillColor(200, 200, 200);
        tableHeaderCell = this.tableHeaderRow[i];

        if (new_page) {
          this.margins.top = margin;
          tableHeaderCell[1] = this.margins && this.margins.top || 0;
          tempHeaderConf.push(tableHeaderCell);
        }

        tmpArray = [].concat(tableHeaderCell);
        this.cell.apply(this, tmpArray.concat(lineNumber));
      }

      if (tempHeaderConf.length > 0) {
        this.setTableHeaderRow(tempHeaderConf);
      }

      this.setFontStyle('normal');
      this.printingHeaderRow = false;
    };
  })(jsPDF.API);

  (function (jsPDFAPI, globalObj) {

    var ContextLayer = function ContextLayer(ctx) {
      ctx = ctx || {};
      this.isStrokeTransparent = ctx.isStrokeTransparent || false;
      this.strokeOpacity = ctx.strokeOpacity || 1;
      this.strokeStyle = ctx.strokeStyle || '#000000';
      this.fillStyle = ctx.fillStyle || '#000000';
      this.isFillTransparent = ctx.isFillTransparent || false;
      this.fillOpacity = ctx.fillOpacity || 1;
      this.font = ctx.font || '10px sans-serif';
      this.textBaseline = ctx.textBaseline || 'alphabetic';
      this.textAlign = ctx.textAlign || 'left';
      this.lineWidth = ctx.lineWidth || 1;
      this.lineJoin = ctx.lineJoin || 'miter';
      this.lineCap = ctx.lineCap || 'butt';
      this.path = ctx.path || [];
      this.transform = typeof ctx.transform !== 'undefined' ? ctx.transform.clone() : new Matrix();
      this.globalCompositeOperation = ctx.globalCompositeOperation || 'normal';
      this.globalAlpha = ctx.globalAlpha || 1.0;
      this.clip_path = ctx.clip_path || [];
      this.currentPoint = ctx.currentPoint || new Point();
      this.miterLimit = ctx.miterLimit || 10.0;
      this.lastPoint = ctx.lastPoint || new Point();
      this.ignoreClearRect = typeof ctx.ignoreClearRect === "boolean" ? ctx.ignoreClearRect : true;
      return this;
    };


    var f2, f3, getHorizontalCoordinateString, getVerticalCoordinateString, getHorizontalCoordinate, getVerticalCoordinate;
    jsPDFAPI.events.push(['initialized', function () {
      this.context2d = new Context2D(this);
      f2 = this.internal.f2;
      f3 = this.internal.f3;
      getHorizontalCoordinateString = this.internal.getCoordinateString;
      getVerticalCoordinateString = this.internal.getVerticalCoordinateString;
      getHorizontalCoordinate = this.internal.getHorizontalCoordinate;
      getVerticalCoordinate = this.internal.getVerticalCoordinate;
    }]);

    var Context2D = function Context2D(pdf) {
      Object.defineProperty(this, 'canvas', {
        get: function get() {
          return {
            parentNode: false,
            style: false
          };
        }
      });
      Object.defineProperty(this, 'pdf', {
        get: function get() {
          return pdf;
        }
      });
      var _pageWrapXEnabled = false

      Object.defineProperty(this, 'pageWrapXEnabled', {
        get: function get() {
          return _pageWrapXEnabled;
        },
        set: function set(value) {
          _pageWrapXEnabled = Boolean(value);
        }
      });
      var _pageWrapYEnabled = false;

      Object.defineProperty(this, 'pageWrapYEnabled', {
        get: function get() {
          return _pageWrapYEnabled;
        },
        set: function set(value) {
          _pageWrapYEnabled = Boolean(value);
        }
      });
      var _posX = 0;

      Object.defineProperty(this, 'posX', {
        get: function get() {
          return _posX;
        },
        set: function set(value) {
          if (!isNaN(value)) {
            _posX = value;
          }
        }
      });
      var _posY = 0;

      Object.defineProperty(this, 'posY', {
        get: function get() {
          return _posY;
        },
        set: function set(value) {
          if (!isNaN(value)) {
            _posY = value;
          }
        }
      });
      var _autoPaging = false;

      Object.defineProperty(this, 'autoPaging', {
        get: function get() {
          return _autoPaging;
        },
        set: function set(value) {
          _autoPaging = Boolean(value);
        }
      });
      var lastBreak = 0;

      Object.defineProperty(this, 'lastBreak', {
        get: function get() {
          return lastBreak;
        },
        set: function set(value) {
          lastBreak = value;
        }
      });
      var pageBreaks = [];

      Object.defineProperty(this, 'pageBreaks', {
        get: function get() {
          return pageBreaks;
        },
        set: function set(value) {
          pageBreaks = value;
        }
      });

      var _ctx = new ContextLayer();

      Object.defineProperty(this, 'ctx', {
        get: function get() {
          return _ctx;
        },
        set: function set(value) {
          if (value instanceof ContextLayer) {
            _ctx = value;
          }
        }
      });

      Object.defineProperty(this, 'path', {
        get: function get() {
          return _ctx.path;
        },
        set: function set(value) {
          _ctx.path = value;
        }
      });

      var _ctxStack = [];
      Object.defineProperty(this, 'ctxStack', {
        get: function get() {
          return _ctxStack;
        },
        set: function set(value) {
          _ctxStack = value;
        }
      });

      Object.defineProperty(this, 'fillStyle', {
        get: function get() {
          return this.ctx.fillStyle;
        },
        set: function set(value) {
          var rgba;
          rgba = getRGBA(value);
          this.ctx.fillStyle = rgba.style;
          this.ctx.isFillTransparent = rgba.a === 0;
          this.ctx.fillOpacity = rgba.a;
          this.pdf.setFillColor(rgba.r, rgba.g, rgba.b, {
            a: rgba.a
          });
          this.pdf.setTextColor(rgba.r, rgba.g, rgba.b, {
            a: rgba.a
          });
        }
      });

      Object.defineProperty(this, 'strokeStyle', {
        get: function get() {
          return this.ctx.strokeStyle;
        },
        set: function set(value) {
          var rgba = getRGBA(value);
          this.ctx.strokeStyle = rgba.style;
          this.ctx.isStrokeTransparent = rgba.a === 0;
          this.ctx.strokeOpacity = rgba.a;

          if (rgba.a === 0) {
            this.pdf.setDrawColor(255, 255, 255);
          } else if (rgba.a === 1) {
            this.pdf.setDrawColor(rgba.r, rgba.g, rgba.b);
          } else {
            this.pdf.setDrawColor(rgba.r, rgba.g, rgba.b);
          }
        }
      });

      Object.defineProperty(this, 'lineCap', {
        get: function get() {
          return this.ctx.lineCap;
        },
        set: function set(value) {
          if (['butt', 'round', 'square'].indexOf(value) !== -1) {
            this.ctx.lineCap = value;
            this.pdf.setLineCap(value);
          }
        }
      });

      Object.defineProperty(this, 'lineWidth', {
        get: function get() {
          return this.ctx.lineWidth;
        },
        set: function set(value) {
          if (!isNaN(value)) {
            this.ctx.lineWidth = value;
            this.pdf.setLineWidth(value);
          }
        }
      });

      Object.defineProperty(this, 'lineJoin', {
        get: function get() {
          return this.ctx.lineJoin;
        },
        set: function set(value) {
          if (['bevel', 'round', 'miter'].indexOf(value) !== -1) {
            this.ctx.lineJoin = value;
            this.pdf.setLineJoin(value);
          }
        }
      });

      Object.defineProperty(this, 'miterLimit', {
        get: function get() {
          return this.ctx.miterLimit;
        },
        set: function set(value) {
          if (!isNaN(value)) {
            this.ctx.miterLimit = value;
            this.pdf.setMiterLimit(value);
          }
        }
      });
      Object.defineProperty(this, 'textBaseline', {
        get: function get() {
          return this.ctx.textBaseline;
        },
        set: function set(value) {
          this.ctx.textBaseline = value;
        }
      });
      Object.defineProperty(this, 'textAlign', {
        get: function get() {
          return this.ctx.textAlign;
        },
        set: function set(value) {
          if (['right', 'end', 'center', 'left', 'start'].indexOf(value) !== -1) {
            this.ctx.textAlign = value;
          }
        }
      });
      Object.defineProperty(this, 'font', {
        get: function get() {
          return this.ctx.font;
        },
        set: function set(value) {
          this.ctx.font = value;
          var rx, matches;

          rx = /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-_,\"\'\sa-z]+?)\s*$/i;
          matches = rx.exec(value);

          if (matches !== null) {
            var fontStyle = matches[1];
            var fontVariant = matches[2];
            var fontWeight = matches[3];
            var fontSize = matches[4];
            var fontSizeUnit = matches[5];
            var fontFamily = matches[6];
          } else {
            return;
          }

          if ('px' === fontSizeUnit) {
            fontSize = Math.floor(parseFloat(fontSize));
          } else if ('em' === fontSizeUnit) {
            fontSize = Math.floor(parseFloat(fontSize) * this.pdf.getFontSize());
          } else {
            fontSize = Math.floor(parseFloat(fontSize));
          }

          this.pdf.setFontSize(fontSize);
          var style = '';

          if (fontWeight === 'bold' || parseInt(fontWeight, 10) >= 700 || fontStyle === 'bold') {
            style = 'bold';
          }

          if (fontStyle === 'italic') {
            style += 'italic';
          }

          if (style.length === 0) {
            style = 'normal';
          }

          var jsPdfFontName = '';
          var parts = fontFamily.toLowerCase().replace(/"|'/g, '').split(/\s*,\s*/);
          var fallbackFonts = {
            arial: 'Helvetica',
            verdana: 'Helvetica',
            helvetica: 'Helvetica',
            'sans-serif': 'Helvetica',
            fixed: 'Courier',
            monospace: 'Courier',
            terminal: 'Courier',
            courier: 'Courier',
            times: 'Times',
            cursive: 'Times',
            fantasy: 'Times',
            serif: 'Times'
          };

          for (var i = 0; i < parts.length; i++) {
            if (this.pdf.internal.getFont(parts[i], style, {
              noFallback: true,
              disableWarning: true
            }) !== undefined) {
              jsPdfFontName = parts[i];
              break;
            } else if (style === 'bolditalic' && this.pdf.internal.getFont(parts[i], 'bold', {
              noFallback: true,
              disableWarning: true
            }) !== undefined) {
              jsPdfFontName = parts[i];
              style = 'bold';
            } else if (this.pdf.internal.getFont(parts[i], 'normal', {
              noFallback: true,
              disableWarning: true
            }) !== undefined) {
              jsPdfFontName = parts[i];
              style = 'normal';
              break;
            }
          }

          if (jsPdfFontName === '') {
            for (var i = 0; i < parts.length; i++) {
              if (fallbackFonts[parts[i]]) {
                jsPdfFontName = fallbackFonts[parts[i]];
                break;
              }
            }
          }

          jsPdfFontName = jsPdfFontName === '' ? 'Times' : jsPdfFontName;
          this.pdf.setFont(jsPdfFontName, style);
        }
      });
      Object.defineProperty(this, 'globalCompositeOperation', {
        get: function get() {
          return this.ctx.globalCompositeOperation;
        },
        set: function set(value) {
          this.ctx.globalCompositeOperation = value;
        }
      });
      Object.defineProperty(this, 'globalAlpha', {
        get: function get() {
          return this.ctx.globalAlpha;
        },
        set: function set(value) {
          this.ctx.globalAlpha = value;
        }
      });

      Object.defineProperty(this, 'ignoreClearRect', {
        get: function get() {
          return this.ctx.ignoreClearRect;
        },
        set: function set(value) {
          this.ctx.ignoreClearRect = Boolean(value);
        }
      });
    };

    Context2D.prototype.fill = function () {
      pathPreProcess.call(this, 'fill', false);
    };

    Context2D.prototype.stroke = function () {
      pathPreProcess.call(this, 'stroke', false);
    };

    Context2D.prototype.beginPath = function () {
      this.path = [{
        type: 'begin'
      }];
    };

    Context2D.prototype.moveTo = function (x, y) {
      if (isNaN(x) || isNaN(y)) {
        console.error('jsPDF.context2d.moveTo: Invalid arguments', arguments);
        throw new Error('Invalid arguments passed to jsPDF.context2d.moveTo');
      }

      var pt = this.ctx.transform.applyToPoint(new Point(x, y));
      this.path.push({
        type: 'mt',
        x: pt.x,
        y: pt.y
      });
      this.ctx.lastPoint = new Point(x, y);
    };

    Context2D.prototype.closePath = function () {
      var pathBegin = new Point(0, 0);
      var i = 0;

      for (i = this.path.length - 1; i !== -1; i--) {
        if (this.path[i].type === 'begin') {
          if (_typeof(this.path[i + 1]) === 'object' && typeof this.path[i + 1].x === 'number') {
            pathBegin = new Point(this.path[i + 1].x, this.path[i + 1].y);
            this.path.push({
              type: 'lt',
              x: pathBegin.x,
              y: pathBegin.y
            });
            break;
          }
        }
      }

      if (_typeof(this.path[i + 2]) === 'object' && typeof this.path[i + 2].x === 'number') {
        this.path.push(JSON.parse(JSON.stringify(this.path[i + 2])));
      }

      this.path.push({
        type: 'close'
      });
      this.ctx.lastPoint = new Point(pathBegin.x, pathBegin.y);
    };

    Context2D.prototype.lineTo = function (x, y) {
      if (isNaN(x) || isNaN(y)) {
        console.error('jsPDF.context2d.lineTo: Invalid arguments', arguments);
        throw new Error('Invalid arguments passed to jsPDF.context2d.lineTo');
      }

      var pt = this.ctx.transform.applyToPoint(new Point(x, y));
      this.path.push({
        type: 'lt',
        x: pt.x,
        y: pt.y
      });
      this.ctx.lastPoint = new Point(pt.x, pt.y);
    };

    Context2D.prototype.clip = function () {
      this.ctx.clip_path = JSON.parse(JSON.stringify(this.path));
      pathPreProcess.call(this, null, true);
    };

    Context2D.prototype.quadraticCurveTo = function (cpx, cpy, x, y) {
      if (isNaN(x) || isNaN(y) || isNaN(cpx) || isNaN(cpy)) {
        console.error('jsPDF.context2d.quadraticCurveTo: Invalid arguments', arguments);
        throw new Error('Invalid arguments passed to jsPDF.context2d.quadraticCurveTo');
      }

      var pt0 = this.ctx.transform.applyToPoint(new Point(x, y));
      var pt1 = this.ctx.transform.applyToPoint(new Point(cpx, cpy));
      this.path.push({
        type: 'qct',
        x1: pt1.x,
        y1: pt1.y,
        x: pt0.x,
        y: pt0.y
      });
      this.ctx.lastPoint = new Point(pt0.x, pt0.y);
    };

    Context2D.prototype.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) {
      if (isNaN(x) || isNaN(y) || isNaN(cp1x) || isNaN(cp1y) || isNaN(cp2x) || isNaN(cp2y)) {
        console.error('jsPDF.context2d.bezierCurveTo: Invalid arguments', arguments);
        throw new Error('Invalid arguments passed to jsPDF.context2d.bezierCurveTo');
      }

      var pt0 = this.ctx.transform.applyToPoint(new Point(x, y));
      var pt1 = this.ctx.transform.applyToPoint(new Point(cp1x, cp1y));
      var pt2 = this.ctx.transform.applyToPoint(new Point(cp2x, cp2y));
      this.path.push({
        type: 'bct',
        x1: pt1.x,
        y1: pt1.y,
        x2: pt2.x,
        y2: pt2.y,
        x: pt0.x,
        y: pt0.y
      });
      this.ctx.lastPoint = new Point(pt0.x, pt0.y);
    };

    Context2D.prototype.arc = function (x, y, radius, startAngle, endAngle, counterclockwise) {
      if (isNaN(x) || isNaN(y) || isNaN(radius) || isNaN(startAngle) || isNaN(endAngle)) {
        console.error('jsPDF.context2d.arc: Invalid arguments', arguments);
        throw new Error('Invalid arguments passed to jsPDF.context2d.arc');
      }

      counterclockwise = Boolean(counterclockwise);

      if (!this.ctx.transform.isIdentity) {
        var xpt = this.ctx.transform.applyToPoint(new Point(x, y));
        x = xpt.x;
        y = xpt.y;
        var x_radPt = this.ctx.transform.applyToPoint(new Point(0, radius));
        var x_radPt0 = this.ctx.transform.applyToPoint(new Point(0, 0));
        radius = Math.sqrt(Math.pow(x_radPt.x - x_radPt0.x, 2) + Math.pow(x_radPt.y - x_radPt0.y, 2));
      }

      if (Math.abs(endAngle - startAngle) >= 2 * Math.PI) {
        startAngle = 0;
        endAngle = 2 * Math.PI;
      }

      this.path.push({
        type: 'arc',
        x: x,
        y: y,
        radius: radius,
        startAngle: startAngle,
        endAngle: endAngle,
        counterclockwise: counterclockwise
      });
    };

    Context2D.prototype.arcTo = function (x1, y1, x2, y2, radius) {
      throw new Error('arcTo not implemented.');
    };

    Context2D.prototype.rect = function (x, y, w, h) {
      if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) {
        console.error('jsPDF.context2d.rect: Invalid arguments', arguments);
        throw new Error('Invalid arguments passed to jsPDF.context2d.rect');
      }

      this.moveTo(x, y);
      this.lineTo(x + w, y);
      this.lineTo(x + w, y + h);
      this.lineTo(x, y + h);
      this.lineTo(x, y);
      this.lineTo(x + w, y);
      this.lineTo(x, y);
    };

    Context2D.prototype.fillRect = function (x, y, w, h) {
      if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) {
        console.error('jsPDF.context2d.fillRect: Invalid arguments', arguments);
        throw new Error('Invalid arguments passed to jsPDF.context2d.fillRect');
      }

      if (isFillTransparent.call(this)) {
        return;
      }

      var tmp = {};

      if (this.lineCap !== 'butt') {
        tmp.lineCap = this.lineCap;
        this.lineCap = 'butt';
      }

      if (this.lineJoin !== 'miter') {
        tmp.lineJoin = this.lineJoin;
        this.lineJoin = 'miter';
      }

      this.beginPath();
      this.rect(x, y, w, h);
      this.fill();

      if (tmp.hasOwnProperty('lineCap')) {
        this.lineCap = tmp.lineCap;
      }

      if (tmp.hasOwnProperty('lineJoin')) {
        this.lineJoin = tmp.lineJoin;
      }
    };

    Context2D.prototype.strokeRect = function strokeRect(x, y, w, h) {
      if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) {
        console.error('jsPDF.context2d.strokeRect: Invalid arguments', arguments);
        throw new Error('Invalid arguments passed to jsPDF.context2d.strokeRect');
      }

      if (isStrokeTransparent.call(this)) {
        return;
      }

      this.beginPath();
      this.rect(x, y, w, h);
      this.stroke();
    };

    Context2D.prototype.clearRect = function (x, y, w, h) {
      if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) {
        console.error('jsPDF.context2d.clearRect: Invalid arguments', arguments);
        throw new Error('Invalid arguments passed to jsPDF.context2d.clearRect');
      }

      if (this.ignoreClearRect) {
        return;
      }

      this.fillStyle = '#ffffff';
      this.fillRect(x, y, w, h);
    };

    Context2D.prototype.save = function (doStackPush) {
      doStackPush = typeof doStackPush === 'boolean' ? doStackPush : true;
      var tmpPageNumber = this.pdf.internal.getCurrentPageInfo().pageNumber;

      for (var i = 0; i < this.pdf.internal.getNumberOfPages(); i++) {
        this.pdf.setPage(i + 1);
        this.pdf.internal.out('q');
      }

      this.pdf.setPage(tmpPageNumber);

      if (doStackPush) {
        this.ctx.fontSize = this.pdf.internal.getFontSize();
        var ctx = new ContextLayer(this.ctx);
        this.ctxStack.push(this.ctx);
        this.ctx = ctx;
      }
    };

    Context2D.prototype.restore = function (doStackPop) {
      doStackPop = typeof doStackPop === 'boolean' ? doStackPop : true;
      var tmpPageNumber = this.pdf.internal.getCurrentPageInfo().pageNumber;

      for (var i = 0; i < this.pdf.internal.getNumberOfPages(); i++) {
        this.pdf.setPage(i + 1);
        this.pdf.internal.out('Q');
      }

      this.pdf.setPage(tmpPageNumber);

      if (doStackPop && this.ctxStack.length !== 0) {
        this.ctx = this.ctxStack.pop();
        this.fillStyle = this.ctx.fillStyle;
        this.strokeStyle = this.ctx.strokeStyle;
        this.font = this.ctx.font;
        this.lineCap = this.ctx.lineCap;
        this.lineWidth = this.ctx.lineWidth;
        this.lineJoin = this.ctx.lineJoin;
      }
    };
    Context2D.prototype.toDataURL = function () {
      throw new Error('toDataUrl not implemented.');
    };

    var getRGBA = function getRGBA(style) {
      var rxRgb = /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
      var rxRgba = /rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d\.]+)\s*\)/;
      var rxTransparent = /transparent|rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*0+\s*\)/;
      var r, g, b, a;

      if (style.isCanvasGradient === true) {
        style = style.getColor();
      }

      if (!style) {
        return {
          r: 0,
          g: 0,
          b: 0,
          a: 0,
          style: style
        };
      }

      if (rxTransparent.test(style)) {
        r = 0;
        g = 0;
        b = 0;
        a = 0;
      } else {
        var matches = rxRgb.exec(style);

        if (matches !== null) {
          r = parseInt(matches[1]);
          g = parseInt(matches[2]);
          b = parseInt(matches[3]);
          a = 1;
        } else {
          matches = rxRgba.exec(style);

          if (matches !== null) {
            r = parseInt(matches[1]);
            g = parseInt(matches[2]);
            b = parseInt(matches[3]);
            a = parseFloat(matches[4]);
          } else {
            a = 1;

            if (typeof style === "string" && style.charAt(0) !== '#') {
              var rgbColor = new RGBColor(style);

              if (rgbColor.ok) {
                style = rgbColor.toHex();
              } else {
                style = '#000000';
              }
            }

            if (style.length === 4) {
              r = style.substring(1, 2);
              r += r;
              g = style.substring(2, 3);
              g += g;
              b = style.substring(3, 4);
              b += b;
            } else {
              r = style.substring(1, 3);
              g = style.substring(3, 5);
              b = style.substring(5, 7);
            }

            r = parseInt(r, 16);
            g = parseInt(g, 16);
            b = parseInt(b, 16);
          }
        }
      }

      return {
        r: r,
        g: g,
        b: b,
        a: a,
        style: style
      };
    };

    var isFillTransparent = function isFillTransparent() {
      return this.ctx.isFillTransparent || this.globalAlpha == 0;
    };

    var isStrokeTransparent = function isStrokeTransparent() {
      return Boolean(this.ctx.isStrokeTransparent || this.globalAlpha == 0);
    };

    Context2D.prototype.fillText = function (text, x, y, maxWidth) {
      if (isNaN(x) || isNaN(y) || typeof text !== 'string') {
        console.error('jsPDF.context2d.fillText: Invalid arguments', arguments);
        throw new Error('Invalid arguments passed to jsPDF.context2d.fillText');
      }

      maxWidth = isNaN(maxWidth) ? undefined : maxWidth;

      if (isFillTransparent.call(this)) {
        return;
      }

      y = getBaseline.call(this, y);
      var degs = rad2deg(this.ctx.transform.rotation);

      var scale = this.ctx.transform.scaleX;
      putText.call(this, {
        text: text,
        x: x,
        y: y,
        scale: scale,
        angle: degs,
        align: this.textAlign,
        maxWidth: maxWidth
      });
    };

    Context2D.prototype.strokeText = function (text, x, y, maxWidth) {
      if (isNaN(x) || isNaN(y) || typeof text !== 'string') {
        console.error('jsPDF.context2d.strokeText: Invalid arguments', arguments);
        throw new Error('Invalid arguments passed to jsPDF.context2d.strokeText');
      }

      if (isStrokeTransparent.call(this)) {
        return;
      }

      maxWidth = isNaN(maxWidth) ? undefined : maxWidth;
      y = getBaseline.call(this, y);
      var degs = rad2deg(this.ctx.transform.rotation);
      var scale = this.ctx.transform.scaleX;
      putText.call(this, {
        text: text,
        x: x,
        y: y,
        scale: scale,
        renderingMode: 'stroke',
        angle: degs,
        align: this.textAlign,
        maxWidth: maxWidth
      });
    };

    Context2D.prototype.measureText = function (text) {
      if (typeof text !== 'string') {
        console.error('jsPDF.context2d.measureText: Invalid arguments', arguments);
        throw new Error('Invalid arguments passed to jsPDF.context2d.measureText');
      }

      var pdf = this.pdf;
      var k = this.pdf.internal.scaleFactor;
      var fontSize = pdf.internal.getFontSize();
      var txtWidth = pdf.getStringUnitWidth(text) * fontSize / pdf.internal.scaleFactor;
      txtWidth *= Math.round(k * 96 / 72 * 10000) / 10000;

      var TextMetrics = function TextMetrics(options) {
        options = options || {};

        var _width = options.width || 0;

        Object.defineProperty(this, 'width', {
          get: function get() {
            return _width;
          }
        });
        return this;
      };

      return new TextMetrics({
        width: txtWidth
      });
    };

    Context2D.prototype.scale = function (scalewidth, scaleheight) {
      if (isNaN(scalewidth) || isNaN(scaleheight)) {
        console.error('jsPDF.context2d.scale: Invalid arguments', arguments);
        throw new Error('Invalid arguments passed to jsPDF.context2d.scale');
      }

      var matrix = new Matrix(scalewidth, 0.0, 0.0, scaleheight, 0.0, 0.0);
      this.ctx.transform = this.ctx.transform.multiply(matrix);
    };

    Context2D.prototype.rotate = function (angle) {
      if (isNaN(angle)) {
        console.error('jsPDF.context2d.rotate: Invalid arguments', arguments);
        throw new Error('Invalid arguments passed to jsPDF.context2d.rotate');
      }

      var matrix = new Matrix(Math.cos(angle), Math.sin(angle), -Math.sin(angle), Math.cos(angle), 0.0, 0.0);
      this.ctx.transform = this.ctx.transform.multiply(matrix);
    };

    Context2D.prototype.translate = function (x, y) {
      if (isNaN(x) || isNaN(y)) {
        console.error('jsPDF.context2d.translate: Invalid arguments', arguments);
        throw new Error('Invalid arguments passed to jsPDF.context2d.translate');
      }

      var matrix = new Matrix(1.0, 0.0, 0.0, 1.0, x, y);
      this.ctx.transform = this.ctx.transform.multiply(matrix);
    };

    Context2D.prototype.transform = function (a, b, c, d, e, f) {
      if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(e) || isNaN(f)) {
        console.error('jsPDF.context2d.transform: Invalid arguments', arguments);
        throw new Error('Invalid arguments passed to jsPDF.context2d.transform');
      }

      var matrix = new Matrix(a, b, c, d, e, f);
      this.ctx.transform = this.ctx.transform.multiply(matrix);
    };

    Context2D.prototype.setTransform = function (a, b, c, d, e, f) {
      a = isNaN(a) ? 1 : a;
      b = isNaN(b) ? 0 : b;
      c = isNaN(c) ? 0 : c;
      d = isNaN(d) ? 1 : d;
      e = isNaN(e) ? 0 : e;
      f = isNaN(f) ? 0 : f;
      this.ctx.transform = new Matrix(a, b, c, d, e, f);
    };

    Context2D.prototype.drawImage = function (img, sx, sy, swidth, sheight, x, y, width, height) {
      var imageProperties = this.pdf.getImageProperties(img);
      var factorX = 1;
      var factorY = 1;
      var clipFactorX = 1;
      var clipFactorY = 1;
      var scaleFactorX = 1;

      if (typeof swidth !== 'undefined' && typeof width !== 'undefined') {
        clipFactorX = width / swidth;
        clipFactorY = height / sheight;
        factorX = imageProperties.width / swidth * width / swidth;
        factorY = imageProperties.height / sheight * height / sheight;
      }


      if (typeof x === 'undefined') {
        x = sx;
        y = sy;
        sx = 0;
        sy = 0;
      }

      if (typeof swidth !== 'undefined' && typeof width === 'undefined') {
        width = swidth;
        height = sheight;
      }

      if (typeof swidth === 'undefined' && typeof width === 'undefined') {
        width = imageProperties.width;
        height = imageProperties.height;
      }

      var decomposedTransformationMatrix = this.ctx.transform.decompose();
      var angle = rad2deg(decomposedTransformationMatrix.rotate.shx);
      scaleFactorX = decomposedTransformationMatrix.scale.sx;
      scaleFactorX = decomposedTransformationMatrix.scale.sy;
      var matrix = new Matrix();
      matrix = matrix.multiply(decomposedTransformationMatrix.translate);
      matrix = matrix.multiply(decomposedTransformationMatrix.skew);
      matrix = matrix.multiply(decomposedTransformationMatrix.scale);
      var mP = matrix.applyToPoint(new Point(width, height));
      var xRect = matrix.applyToRectangle(new Rectangle(x - sx * clipFactorX, y - sy * clipFactorY, swidth * factorX, sheight * factorY));
      var pageArray = getPagesByPath.call(this, xRect);
      var pages = [];

      for (var ii = 0; ii < pageArray.length; ii += 1) {
        if (pages.indexOf(pageArray[ii]) === -1) {
          pages.push(pageArray[ii]);
        }
      }

      pages.sort();
      var clipPath;

      if (this.autoPaging) {
        var min = pages[0];
        var max = pages[pages.length - 1];

        for (var i = min; i < max + 1; i++) {
          this.pdf.setPage(i);

          if (this.ctx.clip_path.length !== 0) {
            var tmpPaths = this.path;
            clipPath = JSON.parse(JSON.stringify(this.ctx.clip_path));
            this.path = pathPositionRedo(clipPath, this.posX, -1 * this.pdf.internal.pageSize.height * (i - 1) + this.posY);
            drawPaths.call(this, 'fill', true);
            this.path = tmpPaths;
          }

          var tmpRect = JSON.parse(JSON.stringify(xRect));
          tmpRect = pathPositionRedo([tmpRect], this.posX, -1 * this.pdf.internal.pageSize.height * (i - 1) + this.posY)[0];
          this.pdf.addImage(img, 'jpg', tmpRect.x, tmpRect.y, tmpRect.w, tmpRect.h, null, null, angle);
        }
      } else {
        this.pdf.addImage(img, 'jpg', xRect.x, xRect.y, xRect.w, xRect.h, null, null, angle);
      }
    };

    var getPagesByPath = function getPagesByPath(path, pageWrapX, pageWrapY) {
      var result = [];
      pageWrapX = pageWrapX || this.pdf.internal.pageSize.width;
      pageWrapY = pageWrapY || this.pdf.internal.pageSize.height;

      switch (path.type) {
        default:
        case 'mt':
        case 'lt':
          result.push(Math.floor((path.y + this.posY) / pageWrapY) + 1);
          break;

        case 'arc':
          result.push(Math.floor((path.y + this.posY - path.radius) / pageWrapY) + 1);
          result.push(Math.floor((path.y + this.posY + path.radius) / pageWrapY) + 1);
          break;

        case 'qct':
          var rectOfQuadraticCurve = getQuadraticCurveBoundary(this.ctx.lastPoint.x, this.ctx.lastPoint.y, path.x1, path.y1, path.x, path.y);
          result.push(Math.floor(rectOfQuadraticCurve.y / pageWrapY) + 1);
          result.push(Math.floor((rectOfQuadraticCurve.y + rectOfQuadraticCurve.h) / pageWrapY) + 1);
          break;

        case 'bct':
          var rectOfBezierCurve = getBezierCurveBoundary(this.ctx.lastPoint.x, this.ctx.lastPoint.y, path.x1, path.y1, path.x2, path.y2, path.x, path.y);
          result.push(Math.floor(rectOfBezierCurve.y / pageWrapY) + 1);
          result.push(Math.floor((rectOfBezierCurve.y + rectOfBezierCurve.h) / pageWrapY) + 1);
          break;

        case 'rect':
          result.push(Math.floor((path.y + this.posY) / pageWrapY) + 1);
          result.push(Math.floor((path.y + path.h + this.posY) / pageWrapY) + 1);
      }

      for (var i = 0; i < result.length; i += 1) {
        while (this.pdf.internal.getNumberOfPages() < result[i]) {
          addPage.call(this);
        }
      }

      return result;
    };

    var addPage = function addPage() {
      var fillStyle = this.fillStyle;
      var strokeStyle = this.strokeStyle;
      var font = this.font;
      var lineCap = this.lineCap;
      var lineWidth = this.lineWidth;
      var lineJoin = this.lineJoin;
      this.pdf.addPage();
      this.fillStyle = fillStyle;
      this.strokeStyle = strokeStyle;
      this.font = font;
      this.lineCap = lineCap;
      this.lineWidth = lineWidth;
      this.lineJoin = lineJoin;
    };

    var pathPositionRedo = function pathPositionRedo(paths, x, y) {
      for (var i = 0; i < paths.length; i++) {
        switch (paths[i].type) {
          case 'bct':
            paths[i].x2 += x;
            paths[i].y2 += y;

          case 'qct':
            paths[i].x1 += x;
            paths[i].y1 += y;

          case 'mt':
          case 'lt':
          case 'arc':
          default:
            paths[i].x += x;
            paths[i].y += y;
        }
      }

      return paths;
    };

    var pathPreProcess = function pathPreProcess(rule, isClip) {
      var fillStyle = this.fillStyle;
      var strokeStyle = this.strokeStyle;
      var font = this.font;
      var lineCap = this.lineCap;
      var lineWidth = this.lineWidth;
      var lineJoin = this.lineJoin;
      var origPath = JSON.parse(JSON.stringify(this.path));
      var xPath = JSON.parse(JSON.stringify(this.path));
      var clipPath;
      var tmpPath;
      var pages = [];

      for (var i = 0; i < xPath.length; i++) {
        if (typeof xPath[i].x !== "undefined") {
          var page = getPagesByPath.call(this, xPath[i]);

          for (var ii = 0; ii < page.length; ii += 1) {
            if (pages.indexOf(page[ii]) === -1) {
              pages.push(page[ii]);
            }
          }
        }
      }

      for (var i = 0; i < pages.length; i++) {
        while (this.pdf.internal.getNumberOfPages() < pages[i]) {
          addPage.call(this);
        }
      }

      pages.sort();

      if (this.autoPaging) {
        var min = pages[0];
        var max = pages[pages.length - 1];

        for (var i = min; i < max + 1; i++) {
          this.pdf.setPage(i);
          this.fillStyle = fillStyle;
          this.strokeStyle = strokeStyle;
          this.lineCap = lineCap;
          this.lineWidth = lineWidth;
          this.lineJoin = lineJoin;

          if (this.ctx.clip_path.length !== 0) {
            var tmpPaths = this.path;
            clipPath = JSON.parse(JSON.stringify(this.ctx.clip_path));
            this.path = pathPositionRedo(clipPath, this.posX, -1 * this.pdf.internal.pageSize.height * (i - 1) + this.posY);
            drawPaths.call(this, rule, true);
            this.path = tmpPaths;
          }

          tmpPath = JSON.parse(JSON.stringify(origPath));
          this.path = pathPositionRedo(tmpPath, this.posX, -1 * this.pdf.internal.pageSize.height * (i - 1) + this.posY);

          if (isClip === false || i === 0) {
            drawPaths.call(this, rule, isClip);
          }
        }
      } else {
        drawPaths.call(this, rule, isClip);
      }

      this.path = origPath;
    };

    var drawPaths = function drawPaths(rule, isClip) {
      if (rule === 'stroke' && !isClip && isStrokeTransparent.call(this)) {
        return;
      }

      if (rule !== 'stroke' && !isClip && isFillTransparent.call(this)) {
        return;
      }

      var moves = [];
      var alpha = this.ctx.globalAlpha;

      if (this.ctx.fillOpacity < 1) {
        alpha = this.ctx.fillOpacity;
      }

      var xPath = this.path;

      for (var i = 0; i < xPath.length; i++) {
        var pt = xPath[i];

        switch (pt.type) {
          case 'begin':
            moves.push({
              begin: true
            });
            break;

          case 'close':
            moves.push({
              close: true
            });
            break;

          case 'mt':
            moves.push({
              start: pt,
              deltas: [],
              abs: []
            });
            break;

          case 'lt':
            var iii = moves.length;

            if (!isNaN(xPath[i - 1].x)) {
              var delta = [pt.x - xPath[i - 1].x, pt.y - xPath[i - 1].y];

              if (iii > 0) {
                for (iii; iii >= 0; iii--) {
                  if (moves[iii - 1].close !== true && moves[iii - 1].begin !== true) {
                    moves[iii - 1].deltas.push(delta);
                    moves[iii - 1].abs.push(pt);
                    break;
                  }
                }
              }
            }

            break;

          case 'bct':
            var delta = [pt.x1 - xPath[i - 1].x, pt.y1 - xPath[i - 1].y, pt.x2 - xPath[i - 1].x, pt.y2 - xPath[i - 1].y, pt.x - xPath[i - 1].x, pt.y - xPath[i - 1].y];
            moves[moves.length - 1].deltas.push(delta);
            break;

          case 'qct':
            var x1 = xPath[i - 1].x + 2.0 / 3.0 * (pt.x1 - xPath[i - 1].x);
            var y1 = xPath[i - 1].y + 2.0 / 3.0 * (pt.y1 - xPath[i - 1].y);
            var x2 = pt.x + 2.0 / 3.0 * (pt.x1 - pt.x);
            var y2 = pt.y + 2.0 / 3.0 * (pt.y1 - pt.y);
            var x3 = pt.x;
            var y3 = pt.y;
            var delta = [x1 - xPath[i - 1].x, y1 - xPath[i - 1].y, x2 - xPath[i - 1].x, y2 - xPath[i - 1].y, x3 - xPath[i - 1].x, y3 - xPath[i - 1].y];
            moves[moves.length - 1].deltas.push(delta);
            break;

          case 'arc':
            moves.push({
              deltas: [],
              abs: [],
              arc: true
            });

            if (Array.isArray(moves[moves.length - 1].abs)) {
              moves[moves.length - 1].abs.push(pt);
            }

            break;
        }
      }

      var style;

      if (!isClip) {
        if (rule === 'stroke') {
          style = 'stroke';
        } else {
          style = 'fill';
        }
      } else {
        style = null;
      }

      for (var i = 0; i < moves.length; i++) {
        if (moves[i].arc) {
          var arcs = moves[i].abs;

          for (var ii = 0; ii < arcs.length; ii++) {
            var arc = arcs[ii];

            if (typeof arc.startAngle !== 'undefined') {
              var start = rad2deg(arc.startAngle);
              var end = rad2deg(arc.endAngle);
              var x = arc.x;
              var y = arc.y;
              drawArc.call(this, x, y, arc.radius, start, end, arc.counterclockwise, style, isClip);
            } else {
              drawLine.call(this, arc.x, arc.y);
            }
          }
        }

        if (!moves[i].arc) {
          if (moves[i].close !== true && moves[i].begin !== true) {
            var x = moves[i].start.x;
            var y = moves[i].start.y;
            drawLines.call(this, moves[i].deltas, x, y, null, null);
          }
        }
      }

      if (style) {
        putStyle.call(this, style);
      }

      if (isClip) {
        doClip.call(this);
      }
    };

    var getBaseline = function getBaseline(y) {
      var height = this.pdf.internal.getFontSize() / this.pdf.internal.scaleFactor;
      var descent = height * (this.pdf.internal.getLineHeightFactor() - 1);

      switch (this.ctx.textBaseline) {
        case 'bottom':
          return y - descent;

        case 'top':
          return y + height - descent;

        case 'hanging':
          return y + height - 2 * descent;

        case 'middle':
          return y + height / 2 - descent;

        case 'ideographic':
          return y;

        case 'alphabetic':
        default:
          return y;
      }
    };

    Context2D.prototype.createLinearGradient = function createLinearGradient() {
      var canvasGradient = function canvasGradient() {};

      canvasGradient.colorStops = [];

      canvasGradient.addColorStop = function (offset, color) {
        this.colorStops.push([offset, color]);
      };

      canvasGradient.getColor = function () {
        if (this.colorStops.length === 0) {
          return '#000000';
        }

        return this.colorStops[0][1];
      };

      canvasGradient.isCanvasGradient = true;
      return canvasGradient;
    };

    Context2D.prototype.createPattern = function createPattern() {
      return this.createLinearGradient();
    };

    Context2D.prototype.createRadialGradient = function createRadialGradient() {
      return this.createLinearGradient();
    };

    var drawArc = function drawArc(x, y, r, a1, a2, counterclockwise, style, isClip) {
      var k = this.pdf.internal.scaleFactor;
      var a1r = deg2rad(a1);
      var a2r = deg2rad(a2);
      var curves = createArc.call(this, r, a1r, a2r, counterclockwise);

      for (var i = 0; i < curves.length; i++) {
        var curve = curves[i];

        if (i === 0) {
          doMove.call(this, curve.x1 + x, curve.y1 + y);
        }
        drawCurve.call(this, x, y, curve.x2, curve.y2, curve.x3, curve.y3, curve.x4, curve.y4);
      }

      if (!isClip) {
        putStyle.call(this, style);
      } else {
        doClip.call(this);
      }
    };

    var putStyle = function putStyle(style) {
      switch (style) {
        case 'stroke':
          this.pdf.internal.out('S');
          break;

        case 'fill':
          this.pdf.internal.out('f');
          break;
      }
    };

    var doClip = function doClip() {
      this.pdf.clip();
    };

    var doMove = function doMove(x, y) {
      this.pdf.internal.out(getHorizontalCoordinateString(x) + ' ' + getVerticalCoordinateString(y) + ' m');
    };

    var putText = function putText(options) {
      var textAlign;

      switch (options.align) {
        case 'right':
        case 'end':
          textAlign = 'right';
          break;

        case 'center':
          textAlign = 'center';
          break;

        case 'left':
        case 'start':
        default:
          textAlign = 'left';
          break;
      }

      var pt = this.ctx.transform.applyToPoint(new Point(options.x, options.y));
      var decomposedTransformationMatrix = this.ctx.transform.decompose();
      var matrix = new Matrix();
      matrix = matrix.multiply(decomposedTransformationMatrix.translate);
      matrix = matrix.multiply(decomposedTransformationMatrix.skew);
      matrix = matrix.multiply(decomposedTransformationMatrix.scale);
      var textDimensions = this.pdf.getTextDimensions(options.text);
      var textRect = this.ctx.transform.applyToRectangle(new Rectangle(options.x, options.y, textDimensions.w, textDimensions.h));
      var textXRect = matrix.applyToRectangle(new Rectangle(options.x, options.y - textDimensions.h, textDimensions.w, textDimensions.h));
      var pageArray = getPagesByPath.call(this, textXRect);
      var pages = [];

      for (var ii = 0; ii < pageArray.length; ii += 1) {
        if (pages.indexOf(pageArray[ii]) === -1) {
          pages.push(pageArray[ii]);
        }
      }

      pages.sort();
      var clipPath;

      if (this.autoPaging === true) {
        var min = pages[0];
        var max = pages[pages.length - 1];

        for (var i = min; i < max + 1; i++) {
          this.pdf.setPage(i);

          if (this.ctx.clip_path.length !== 0) {
            var tmpPaths = this.path;
            clipPath = JSON.parse(JSON.stringify(this.ctx.clip_path));
            this.path = pathPositionRedo(clipPath, this.posX, -1 * this.pdf.internal.pageSize.height * (i - 1) + this.posY);
            drawPaths.call(this, 'fill', true);
            this.path = tmpPaths;
          }

          var tmpRect = JSON.parse(JSON.stringify(textRect));
          tmpRect = pathPositionRedo([tmpRect], this.posX, -1 * this.pdf.internal.pageSize.height * (i - 1) + this.posY)[0];

          if (options.scale >= 0.01) {
            var oldSize = this.pdf.internal.getFontSize();
            this.pdf.setFontSize(oldSize * options.scale);
          }

          this.pdf.text(options.text, tmpRect.x, tmpRect.y, {
            angle: options.angle,
            align: textAlign,
            renderingMode: options.renderingMode,
            maxWidth: options.maxWidth
          });

          if (options.scale >= 0.01) {
            this.pdf.setFontSize(oldSize);
          }
        }
      } else {
        if (options.scale >= 0.01) {
          var oldSize = this.pdf.internal.getFontSize();
          this.pdf.setFontSize(oldSize * options.scale);
        }

        this.pdf.text(options.text, pt.x + this.posX, pt.y + this.posY, {
          angle: options.angle,
          align: textAlign,
          renderingMode: options.renderingMode,
          maxWidth: options.maxWidth
        });

        if (options.scale >= 0.01) {
          this.pdf.setFontSize(oldSize);
        }
      }
    };

    var drawLine = function drawLine(x, y, prevX, prevY) {
      prevX = prevX || 0;
      prevY = prevY || 0;
      this.pdf.internal.out(getHorizontalCoordinateString(x + prevX) + ' ' + getVerticalCoordinateString(y + prevY) + ' l');
    };

    var drawLines = function drawLines(lines, x, y) {
      return this.pdf.lines(lines, x, y, null, null);
    };

    var drawCurve = function drawCurve(x, y, x1, y1, x2, y2, x3, y3) {
      this.pdf.internal.out([f2(getHorizontalCoordinate(x1 + x)), f2(getVerticalCoordinate(y1 + y)), f2(getHorizontalCoordinate(x2 + x)), f2(getVerticalCoordinate(y2 + y)), f2(getHorizontalCoordinate(x3 + x)), f2(getVerticalCoordinate(y3 + y)), 'c'].join(' '));
    };
    var createArc = function createArc(radius, startAngle, endAngle, anticlockwise) {
      var EPSILON = 0.00001;

      var twoPI = Math.PI * 2;
      var startAngleN = startAngle;

      if (startAngleN < twoPI || startAngleN > twoPI) {
        startAngleN = startAngleN % twoPI;
      }

      var endAngleN = endAngle;

      if (endAngleN < twoPI || endAngleN > twoPI) {
        endAngleN = endAngleN % twoPI;
      }

      var curves = [];
      var piOverTwo = Math.PI / 2.0;
      var sgn = anticlockwise ? -1 : +1;
      var a1 = startAngle;
      for (var totalAngle = Math.min(twoPI, Math.abs(endAngleN - startAngleN)); totalAngle > EPSILON;) {
        var a2 = a1 + sgn * Math.min(totalAngle, piOverTwo);
        curves.push(createSmallArc.call(this, radius, a1, a2));
        totalAngle -= Math.abs(a2 - a1);
        a1 = a2;
      }

      return curves;
    };

    var createSmallArc = function createSmallArc(r, a1, a2) {
      var a = (a2 - a1) / 2.0;
      var x4 = r * Math.cos(a);
      var y4 = r * Math.sin(a);
      var x1 = x4;
      var y1 = -y4;
      var q1 = x1 * x1 + y1 * y1;
      var q2 = q1 + x1 * x4 + y1 * y4;
      var k2 = 4 / 3 * (Math.sqrt(2 * q1 * q2) - q2) / (x1 * y4 - y1 * x4);
      var x2 = x1 - k2 * y1;
      var y2 = y1 + k2 * x1;
      var x3 = x2;
      var y3 = -y2;
      var ar = a + a1;
      var cos_ar = Math.cos(ar);
      var sin_ar = Math.sin(ar);
      return {
        x1: r * Math.cos(a1),
        y1: r * Math.sin(a1),
        x2: x2 * cos_ar - y2 * sin_ar,
        y2: x2 * sin_ar + y2 * cos_ar,
        x3: x3 * cos_ar - y3 * sin_ar,
        y3: x3 * sin_ar + y3 * cos_ar,
        x4: r * Math.cos(a2),
        y4: r * Math.sin(a2)
      };
    };

    var rad2deg = function rad2deg(value) {
      return value * 180 / Math.PI;
    };

    var deg2rad = function deg2rad(deg) {
      return deg * Math.PI / 180;
    };

    var getQuadraticCurveBoundary = function getQuadraticCurveBoundary(sx, sy, cpx, cpy, ex, ey) {
      var midX1 = sx + (cpx - sx) * 0.50;
      var midY1 = sy + (cpy - sy) * 0.50;
      var midX2 = ex + (cpx - ex) * 0.50;
      var midY2 = ey + (cpy - ey) * 0.50;
      var resultX1 = Math.min(sx, ex, midX1, midX2);
      var resultX2 = Math.max(sx, ex, midX1, midX2);
      var resultY1 = Math.min(sy, ey, midY1, midY2);
      var resultY2 = Math.max(sy, ey, midY1, midY2);
      return new Rectangle(resultX1, resultY1, resultX2 - resultX1, resultY2 - resultY1);
    };

    var getBezierCurveBoundary = function getBezierCurveBoundary(ax, ay, bx, by, cx, cy, dx, dy) {
      var tobx = bx - ax;
      var toby = by - ay;
      var tocx = cx - bx;
      var tocy = cy - by;
      var todx = dx - cx;
      var tody = dy - cy;
      var precision = 40;
      var d, px, py, qx, qy, rx, ry, tx, ty, sx, sy, x, y, i, minx, miny, maxx, maxy, toqx, toqy, torx, tory, totx, toty;
      for (var i = 0; i < precision + 1; i++) {
        d = i / precision;
        px = ax + d * tobx;
        py = ay + d * toby;
        qx = bx + d * tocx;
        qy = by + d * tocy;
        rx = cx + d * todx;
        ry = cy + d * tody;
        toqx = qx - px;
        toqy = qy - py;
        torx = rx - qx;
        tory = ry - qy;
        sx = px + d * toqx;
        sy = py + d * toqy;
        tx = qx + d * torx;
        ty = qy + d * tory;
        totx = tx - sx;
        toty = ty - sy;
        x = sx + d * totx;
        y = sy + d * toty;
        if (i == 0) {
          minx = x;
          miny = y;
          maxx = x;
          maxy = y;
        } else {
          minx = Math.min(minx, x);
          miny = Math.min(miny, y);
          maxx = Math.max(maxx, x);
          maxy = Math.max(maxy, y);
        }
      }

      return new Rectangle(Math.round(minx), Math.round(miny), Math.round(maxx - minx), Math.round(maxy - miny));
    };

    var Point = function Point(x, y) {
      var _x = x || 0;

      Object.defineProperty(this, 'x', {
        enumerable: true,
        get: function get() {
          return _x;
        },
        set: function set(value) {
          if (!isNaN(value)) {
            _x = parseFloat(value);
          }
        }
      });

      var _y = y || 0;

      Object.defineProperty(this, 'y', {
        enumerable: true,
        get: function get() {
          return _y;
        },
        set: function set(value) {
          if (!isNaN(value)) {
            _y = parseFloat(value);
          }
        }
      });
      var _type = 'pt';
      Object.defineProperty(this, 'type', {
        enumerable: true,
        get: function get() {
          return _type;
        },
        set: function set(value) {
          _type = value.toString();
        }
      });
      return this;
    };

    var Rectangle = function Rectangle(x, y, w, h) {
      Point.call(this, x, y);
      this.type = 'rect';

      var _w = w || 0;

      Object.defineProperty(this, 'w', {
        enumerable: true,
        get: function get() {
          return _w;
        },
        set: function set(value) {
          if (!isNaN(value)) {
            _w = parseFloat(value);
          }
        }
      });

      var _h = h || 0;

      Object.defineProperty(this, 'h', {
        enumerable: true,
        get: function get() {
          return _h;
        },
        set: function set(value) {
          if (!isNaN(value)) {
            _h = parseFloat(value);
          }
        }
      });
      return this;
    };

    var Matrix = function Matrix(sx, shy, shx, sy, tx, ty) {
      var _matrix = [];
      Object.defineProperty(this, 'sx', {
        get: function get() {
          return _matrix[0];
        },
        set: function set(value) {
          _matrix[0] = Math.round(value * 100000) / 100000;
        }
      });
      Object.defineProperty(this, 'shy', {
        get: function get() {
          return _matrix[1];
        },
        set: function set(value) {
          _matrix[1] = Math.round(value * 100000) / 100000;
        }
      });
      Object.defineProperty(this, 'shx', {
        get: function get() {
          return _matrix[2];
        },
        set: function set(value) {
          _matrix[2] = Math.round(value * 100000) / 100000;
        }
      });
      Object.defineProperty(this, 'sy', {
        get: function get() {
          return _matrix[3];
        },
        set: function set(value) {
          _matrix[3] = Math.round(value * 100000) / 100000;
        }
      });
      Object.defineProperty(this, 'tx', {
        get: function get() {
          return _matrix[4];
        },
        set: function set(value) {
          _matrix[4] = Math.round(value * 100000) / 100000;
        }
      });
      Object.defineProperty(this, 'ty', {
        get: function get() {
          return _matrix[5];
        },
        set: function set(value) {
          _matrix[5] = Math.round(value * 100000) / 100000;
        }
      });
      Object.defineProperty(this, 'rotation', {
        get: function get() {
          return Math.atan2(this.shx, this.sx);
        }
      });
      Object.defineProperty(this, 'scaleX', {
        get: function get() {
          return this.decompose().scale.sx;
        }
      });
      Object.defineProperty(this, 'scaleY', {
        get: function get() {
          return this.decompose().scale.sy;
        }
      });
      Object.defineProperty(this, 'isIdentity', {
        get: function get() {
          if (this.sx !== 1) {
            return false;
          }

          if (this.shy !== 0) {
            return false;
          }

          if (this.shx !== 0) {
            return false;
          }

          if (this.sy !== 1) {
            return false;
          }

          if (this.tx !== 0) {
            return false;
          }

          if (this.ty !== 0) {
            return false;
          }

          return true;
        }
      });
      this.sx = !isNaN(sx) ? sx : 1;
      this.shy = !isNaN(shy) ? shy : 0;
      this.shx = !isNaN(shx) ? shx : 0;
      this.sy = !isNaN(sy) ? sy : 1;
      this.tx = !isNaN(tx) ? tx : 0;
      this.ty = !isNaN(ty) ? ty : 0;
      return this;
    };

    Matrix.prototype.multiply = function (matrix) {
      var sx = matrix.sx * this.sx + matrix.shy * this.shx;
      var shy = matrix.sx * this.shy + matrix.shy * this.sy;
      var shx = matrix.shx * this.sx + matrix.sy * this.shx;
      var sy = matrix.shx * this.shy + matrix.sy * this.sy;
      var tx = matrix.tx * this.sx + matrix.ty * this.shx + this.tx;
      var ty = matrix.tx * this.shy + matrix.ty * this.sy + this.ty;
      return new Matrix(sx, shy, shx, sy, tx, ty);
    };

    Matrix.prototype.decompose = function () {
      var a = this.sx;
      var b = this.shy;
      var c = this.shx;
      var d = this.sy;
      var e = this.tx;
      var f = this.ty;
      var scaleX = Math.sqrt(a * a + b * b);
      a /= scaleX;
      b /= scaleX;
      var shear = a * c + b * d;
      c -= a * shear;
      d -= b * shear;
      var scaleY = Math.sqrt(c * c + d * d);
      c /= scaleY;
      d /= scaleY;
      shear /= scaleY;

      if (a * d < b * c) {
        a = -a;
        b = -b;
        shear = -shear;
        scaleX = -scaleX;
      }

      return {
        scale: new Matrix(scaleX, 0, 0, scaleY, 0, 0),
        translate: new Matrix(1, 0, 0, 1, e, f),
        rotate: new Matrix(a, b, -b, a, 0, 0),
        skew: new Matrix(1, 0, shear, 1, 0, 0)
      };
    };

    Matrix.prototype.applyToPoint = function (pt) {
      var x = pt.x * this.sx + pt.y * this.shx + this.tx;
      var y = pt.x * this.shy + pt.y * this.sy + this.ty;
      return new Point(x, y);
    };

    Matrix.prototype.applyToRectangle = function (rect) {
      var pt1 = this.applyToPoint(rect);
      var pt2 = this.applyToPoint(new Point(rect.x + rect.w, rect.y + rect.h));
      return new Rectangle(pt1.x, pt1.y, pt2.x - pt1.x, pt2.y - pt1.y);
    };

    Matrix.prototype.clone = function () {
      var sx = this.sx;
      var shy = this.shy;
      var shx = this.shx;
      var sy = this.sy;
      var tx = this.tx;
      var ty = this.ty;
      return new Matrix(sx, shy, shx, sy, tx, ty);
    };
  })(jsPDF.API, typeof self !== 'undefined' && self || typeof window !== 'undefined' && window || typeof global !== 'undefined' && global || Function('return typeof this === "object" && this.content')() || Function('return this')());
  (function (jsPDFAPI) {

    var ASCII85Encode = function ASCII85Encode(a) {
      var b, c, d, e, f, g, h, i, j, k;

      for (!/[^\x00-\xFF]/.test(a), b = "\x00\x00\x00\x00".slice(a.length % 4 || 4), a += b, c = [], d = 0, e = a.length; e > d; d += 4) {
        f = (a.charCodeAt(d) << 24) + (a.charCodeAt(d + 1) << 16) + (a.charCodeAt(d + 2) << 8) + a.charCodeAt(d + 3), 0 !== f ? (k = f % 85, f = (f - k) / 85, j = f % 85, f = (f - j) / 85, i = f % 85, f = (f - i) / 85, h = f % 85, f = (f - h) / 85, g = f % 85, c.push(g + 33, h + 33, i + 33, j + 33, k + 33)) : c.push(122);
      }

      return function (a, b) {
        for (var c = b; c > 0; c--) {
          a.pop();
        }
      }(c, b.length), String.fromCharCode.apply(String, c) + "~>";
    };

    var ASCII85Decode = function ASCII85Decode(a) {
      var c,
          d,
          e,
          f,
          g,
          h = String,
          l = "length",
          w = 255,
          x = "charCodeAt",
          y = "slice",
          z = "replace";

      for ("~>" === a[y](-2), a = a[y](0, -2)[z](/\s/g, "")[z]("z", "!!!!!"), c = "uuuuu"[y](a[l] % 5 || 5), a += c, e = [], f = 0, g = a[l]; g > f; f += 5) {
        d = 52200625 * (a[x](f) - 33) + 614125 * (a[x](f + 1) - 33) + 7225 * (a[x](f + 2) - 33) + 85 * (a[x](f + 3) - 33) + (a[x](f + 4) - 33), e.push(w & d >> 24, w & d >> 16, w & d >> 8, w & d);
      }

      return function (a, b) {
        for (var c = b; c > 0; c--) {
          a.pop();
        }
      }(e, c[l]), h.fromCharCode.apply(h, e);
    }

    var ASCIIHexEncode = function ASCIIHexEncode(value) {
      var result = '';
      var i;

      for (var i = 0; i < value.length; i += 1) {
        result += ("0" + value.charCodeAt(i).toString(16)).slice(-2);
      }

      result += '>';
      return result;
    };

    var ASCIIHexDecode = function ASCIIHexDecode(value) {
      var regexCheckIfHex = new RegExp(/^([0-9A-Fa-f]{2})+$/);
      value = value.replace(/\s/g, '');

      if (value.indexOf(">") !== -1) {
        value = value.substr(0, value.indexOf(">"));
      }

      if (value.length % 2) {
        value += "0";
      }

      if (regexCheckIfHex.test(value) === false) {
        return "";
      }

      var result = '';
      var i;

      for (var i = 0; i < value.length; i += 2) {
        result += String.fromCharCode("0x" + (value[i] + value[i + 1]));
      }

      return result;
    };

    var FlateEncode = function FlateEncode(data, options) {
      options = Object.assign({
        predictor: 1,
        colors: 1,
        bitsPerComponent: 8,
        columns: 1
      }, options);
      var arr = [];
      var i = data.length;
      var adler32;
      var deflater;

      while (i--) {
        arr[i] = data.charCodeAt(i);
      }

      adler32 = jsPDFAPI.adler32cs.from(data);
      deflater = new Deflater(6);
      deflater.append(new Uint8Array(arr));
      data = deflater.flush();
      arr = new Uint8Array(data.length + 6);
      arr.set(new Uint8Array([120, 156])), arr.set(data, 2);
      arr.set(new Uint8Array([adler32 & 0xFF, adler32 >> 8 & 0xFF, adler32 >> 16 & 0xFF, adler32 >> 24 & 0xFF]), data.length + 2);
      data = String.fromCharCode.apply(null, arr);
      return data;
    };

    jsPDFAPI.processDataByFilters = function (origData, filterChain) {

      var i = 0;
      var data = origData || '';
      var reverseChain = [];
      filterChain = filterChain || [];

      if (typeof filterChain === "string") {
        filterChain = [filterChain];
      }

      for (i = 0; i < filterChain.length; i += 1) {
        switch (filterChain[i]) {
          case "ASCII85Decode":
          case "/ASCII85Decode":
            data = ASCII85Decode(data);
            reverseChain.push("/ASCII85Encode");
            break;

          case "ASCII85Encode":
          case "/ASCII85Encode":
            data = ASCII85Encode(data);
            reverseChain.push("/ASCII85Decode");
            break;

          case "ASCIIHexDecode":
          case "/ASCIIHexDecode":
            data = ASCIIHexDecode(data);
            reverseChain.push("/ASCIIHexEncode");
            break;

          case "ASCIIHexEncode":
          case "/ASCIIHexEncode":
            data = ASCIIHexEncode(data);
            reverseChain.push("/ASCIIHexDecode");
            break;

          case "FlateEncode":
          case "/FlateEncode":
            data = FlateEncode(data);
            reverseChain.push("/FlateDecode");
            break;
          default:
            throw "The filter: \"" + filterChain[i] + "\" is not implemented";
        }
      }

      return {
        data: data,
        reverseChain: reverseChain.reverse().join(" ")
      };
    };
  })(jsPDF.API);
  (function (jsPDFAPI) {

    jsPDFAPI.loadFile = function (url, sync, callback) {
      sync = sync || true;
      callback = callback || function () {};
      var result;
      var xhr = function xhr(url, sync, callback) {
        var req = new XMLHttpRequest();
        var byteArray = [];
        var i = 0;
        var sanitizeUnicode = function sanitizeUnicode(data) {
          var dataLength = data.length;
          var StringFromCharCode = String.fromCharCode;
          for (i = 0; i < dataLength; i += 1) {
            byteArray.push(StringFromCharCode(data.charCodeAt(i) & 0xff));
          }
          return byteArray.join("");
        };
        req.open('GET', url, !sync);
        req.overrideMimeType('text\/plain; charset=x-user-defined');
        if (sync === false) {
          req.onload = function () {
            return sanitizeUnicode(this.responseText);
          };
        }
        req.send(null);
        if (req.status !== 200) {
          console.warn('Unable to load file "' + url + '"');
          return;
        }
        if (sync) {
          return sanitizeUnicode(req.responseText);
        }
      };
      try {
        result = xhr(url, sync, callback);
      } catch (e) {
        result = undefined;
      }

      return result;
    };
    jsPDFAPI.loadImageFile = jsPDFAPI.loadFile;
  })(jsPDF.API);
  (function (jsPDFAPI, global) {
    var objType = function objType(obj) {
      var type = _typeof(obj);
      if (type === 'undefined') return 'undefined';else if (type === 'string' || obj instanceof String) return 'string';else if (type === 'number' || obj instanceof Number) return 'number';else if (type === 'function' || obj instanceof Function) return 'function';else if (!!obj && obj.constructor === Array) return 'array';else if (obj && obj.nodeType === 1) return 'element';else if (type === 'object') return 'object';else return 'unknown';
    };

    var createElement = function createElement(tagName, opt) {
      var el = document.createElement(tagName);
      if (opt.className) el.className = opt.className;

      if (opt.innerHTML) {
        el.innerHTML = opt.innerHTML;
        var scripts = el.getElementsByTagName('script');

        for (var i = scripts.length; i-- > 0; null) {
          scripts[i].parentNode.removeChild(scripts[i]);
        }
      }

      for (var key in opt.style) {
        el.style[key] = opt.style[key];
      }

      return el;
    };

    var cloneNode = function cloneNode(node, javascriptEnabled) {
      var clone = node.nodeType === 3 ? document.createTextNode(node.nodeValue) : node.cloneNode(false);
      for (var child = node.firstChild; child; child = child.nextSibling) {
        if (javascriptEnabled === true || child.nodeType !== 1 || child.nodeName !== 'SCRIPT') {
          clone.appendChild(cloneNode(child, javascriptEnabled));
        }
      }
      if (node.nodeType === 1) {
        if (node.nodeName === 'CANVAS') {
          clone.width = node.width;
          clone.height = node.height;
          clone.getContext('2d').drawImage(node, 0, 0);
        } else if (node.nodeName === 'TEXTAREA' || node.nodeName === 'SELECT') {
          clone.value = node.value;
        }
        clone.addEventListener('load', function () {
          clone.scrollTop = node.scrollTop;
          clone.scrollLeft = node.scrollLeft;
        }, true);
      }
      return clone;
    };
    var Worker = function Worker(opt) {
      var root = Object.assign(Worker.convert(Promise.resolve()), JSON.parse(JSON.stringify(Worker.template)));
      var self = Worker.convert(Promise.resolve(), root);
      self = self.setProgress(1, Worker, 1, [Worker]);
      self = self.set(opt);
      return self;
    };
    Worker.prototype = Object.create(Promise.prototype);
    Worker.prototype.constructor = Worker;
    Worker.convert = function convert(promise, inherit) {
      promise.__proto__ = inherit || Worker.prototype;
      return promise;
    };
    Worker.template = {
      prop: {
        src: null,
        container: null,
        overlay: null,
        canvas: null,
        img: null,
        pdf: null,
        pageSize: null,
        callback: function callback() {}
      },
      progress: {
        val: 0,
        state: null,
        n: 0,
        stack: []
      },
      opt: {
        filename: 'file.pdf',
        margin: [0, 0, 0, 0],
        enableLinks: true,
        x: 0,
        y: 0,
        html2canvas: {},
        jsPDF: {}
      }
    };
    Worker.prototype.from = function from(src, type) {
      function getType(src) {
        switch (objType(src)) {
          case 'string':
            return 'string';
          case 'element':
            return src.nodeName.toLowerCase === 'canvas' ? 'canvas' : 'element';
          default:
            return 'unknown';
        }
      }
      return this.then(function from_main() {
        type = type || getType(src);
        switch (type) {
          case 'string':
            return this.set({
              src: createElement('div', {
                innerHTML: src
              })
            });
          case 'element':
            return this.set({
              src: src
            });
          case 'canvas':
            return this.set({
              canvas: src
            });
          case 'img':
            return this.set({
              img: src
            });
          default:
            return this.error('Unknown source type.');
        }
      });
    };
    Worker.prototype.to = function to(target) {
      switch (target) {
        case 'container':
          return this.toContainer();
        case 'canvas':
          return this.toCanvas();
        case 'img':
          return this.toImg();
        case 'pdf':
          return this.toPdf();
        default:
          return this.error('Invalid target.');
      }
    };
    Worker.prototype.toContainer = function toContainer() {
      var prereqs = [function checkSrc() {
        return this.prop.src || this.error('Cannot duplicate - no source HTML.');
      }, function checkPageSize() {
        return this.prop.pageSize || this.setPageSize();
      }];
      return this.thenList(prereqs).then(function toContainer_main() {
        var overlayCSS = {
          position: 'fixed',
          overflow: 'hidden',
          zIndex: 1000,
          left: '-100000px',
          right: 0,
          bottom: 0,
          top: 0
        };
        var containerCSS = {
          position: 'relative',
          display: 'inline-block',
          width: Math.max(this.prop.src.clientWidth, this.prop.src.scrollWidth, this.prop.src.offsetWidth) + 'px',
          left: 0,
          right: 0,
          top: 0,
          margin: 'auto',
          backgroundColor: 'white'
        };
        var source = cloneNode(this.prop.src, this.opt.html2canvas.javascriptEnabled);
        if (source.tagName === 'BODY') {
          containerCSS.height = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) + 'px';
        }
        this.prop.overlay = createElement('div', {
          className: 'html2pdf__overlay',
          style: overlayCSS
        });
        this.prop.container = createElement('div', {
          className: 'html2pdf__container',
          style: containerCSS
        });
        this.prop.container.appendChild(source);
        this.prop.container.firstChild.appendChild(createElement('div', {
          style: {
            clear: 'both',
            border: '0 none transparent',
            margin: 0,
            padding: 0,
            height: 0
          }
        }));
        this.prop.container.style.float = 'none';
        this.prop.overlay.appendChild(this.prop.container);
        document.body.appendChild(this.prop.overlay);
        this.prop.container.firstChild.style.position = 'relative';
        this.prop.container.height = Math.max(this.prop.container.firstChild.clientHeight, this.prop.container.firstChild.scrollHeight, this.prop.container.firstChild.offsetHeight) + 'px';
      });
    };

    Worker.prototype.toCanvas = function toCanvas() {
      var prereqs = [function checkContainer() {
        return document.body.contains(this.prop.container) || this.toContainer();
      }];
      return this.thenList(prereqs).then(function toCanvas_main() {
        var options = Object.assign({}, this.opt.html2canvas);
        delete options.onrendered;
        if (!this.isHtml2CanvasLoaded()) {
          return;
        }
        return html2canvas(this.prop.container, options);
      }).then(function toCanvas_post(canvas) {
        var onRendered = this.opt.html2canvas.onrendered || function () {};
        onRendered(canvas);
        this.prop.canvas = canvas;
        document.body.removeChild(this.prop.overlay);
      });
    };
    Worker.prototype.toContext2d = function toContext2d() {
      var prereqs = [function checkContainer() {
        return document.body.contains(this.prop.container) || this.toContainer();
      }];
      return this.thenList(prereqs).then(function toContext2d_main() {
        var pdf = this.opt.jsPDF;
        var options = Object.assign({
          async: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          imageTimeout: 15000,
          logging: true,
          proxy: null,
          removeContainer: true,
          foreignObjectRendering: false,
          useCORS: false
        }, this.opt.html2canvas);
        delete options.onrendered;
        pdf.context2d.autoPaging = true;
        pdf.context2d.posX = this.opt.x;
        pdf.context2d.posY = this.opt.y;
        options.windowHeight = options.windowHeight || 0;
        options.windowHeight = options.windowHeight == 0 ? Math.max(this.prop.container.clientHeight, this.prop.container.scrollHeight, this.prop.container.offsetHeight) : options.windowHeight;
        if (!this.isHtml2CanvasLoaded()) {
          return;
        }
        return html2canvas(this.prop.container, options);
      }).then(function toContext2d_post(canvas) {
        var onRendered = this.opt.html2canvas.onrendered || function () {};
        onRendered(canvas);
        this.prop.canvas = canvas;
        document.body.removeChild(this.prop.overlay);
      });
    };

    Worker.prototype.toImg = function toImg() {
      var prereqs = [function checkCanvas() {
        return this.prop.canvas || this.toCanvas();
      }];
      return this.thenList(prereqs).then(function toImg_main() {
        var imgData = this.prop.canvas.toDataURL('image/' + this.opt.image.type, this.opt.image.quality);
        this.prop.img = document.createElement('img');
        this.prop.img.src = imgData;
      });
    };
    Worker.prototype.toPdf = function toPdf() {
      var prereqs = [function checkContext2d() {
        return this.toContext2d();
      }
      ];
      return this.thenList(prereqs).then(function toPdf_main() {
        this.prop.pdf = this.prop.pdf || this.opt.jsPDF;
      });
    };
    Worker.prototype.output = function output(type, options, src) {
      src = src || 'pdf';
      if (src.toLowerCase() === 'img' || src.toLowerCase() === 'image') {
        return this.outputImg(type, options);
      } else {
        return this.outputPdf(type, options);
      }
    };

    Worker.prototype.outputPdf = function outputPdf(type, options) {
      var prereqs = [function checkPdf() {
        return this.prop.pdf || this.toPdf();
      }];

      return this.thenList(prereqs).then(function outputPdf_main() {
        return this.prop.pdf.output(type, options);
      });
    };
    Worker.prototype.outputImg = function outputImg(type, options) {
      var prereqs = [function checkImg() {
        return this.prop.img || this.toImg();
      }];
      return this.thenList(prereqs).then(function outputImg_main() {
        switch (type) {
          case undefined:
          case 'img':
            return this.prop.img;
          case 'datauristring':
          case 'dataurlstring':
            return this.prop.img.src;
          case 'datauri':
          case 'dataurl':
            return document.location.href = this.prop.img.src;
          default:
            throw 'Image output type "' + type + '" is not supported.';
        }
      });
    };
    Worker.prototype.isHtml2CanvasLoaded = function () {
      var result = typeof global.html2canvas !== "undefined";
      if (!result) {
        console.error("html2canvas not loaded.");
      }
      return result;
    };
    Worker.prototype.save = function save(filename) {
      var prereqs = [function checkPdf() {
        return this.prop.pdf || this.toPdf();
      }];
      if (!this.isHtml2CanvasLoaded()) {
        return;
      }
      return this.thenList(prereqs).set(filename ? {
        filename: filename
      } : null).then(function save_main() {
        this.prop.pdf.save(this.opt.filename);
      });
    };
    Worker.prototype.doCallback = function doCallback(filename) {
      var prereqs = [function checkPdf() {
        return this.prop.pdf || this.toPdf();
      }];
      if (!this.isHtml2CanvasLoaded()) {
        return;
      }
      return this.thenList(prereqs).then(function doCallback_main() {
        this.prop.callback(this.prop.pdf);
      });
    };

    Worker.prototype.set = function set(opt) {
      if (objType(opt) !== 'object') {
        return this;
      }

      var fns = Object.keys(opt || {}).map(function (key) {
        if (key in Worker.template.prop) {
          return function set_prop() {
            this.prop[key] = opt[key];
          };
        } else {
          switch (key) {
            case 'margin':
              return this.setMargin.bind(this, opt.margin);
            case 'jsPDF':
              return function set_jsPDF() {
                this.opt.jsPDF = opt.jsPDF;
                return this.setPageSize();
              };
            case 'pageSize':
              return this.setPageSize.bind(this, opt.pageSize);
            default:
              return function set_opt() {
                this.opt[key] = opt[key];
              };
          }
        }
      }, this);
      return this.then(function set_main() {
        return this.thenList(fns);
      });
    };
    Worker.prototype.get = function get(key, cbk) {
      return this.then(function get_main() {
        var val = key in Worker.template.prop ? this.prop[key] : this.opt[key];
        return cbk ? cbk(val) : val;
      });
    };
    Worker.prototype.setMargin = function setMargin(margin) {
      return this.then(function setMargin_main() {
        switch (objType(margin)) {
          case 'number':
            margin = [margin, margin, margin, margin];
          case 'array':
            if (margin.length === 2) {
              margin = [margin[0], margin[1], margin[0], margin[1]];
            }
            if (margin.length === 4) {
              break;
            }
          default:
            return this.error('Invalid margin array.');
        }
        this.opt.margin = margin;
      }).then(this.setPageSize);
    };
    Worker.prototype.setPageSize = function setPageSize(pageSize) {
      function toPx(val, k) {
        return Math.floor(val * k / 72 * 96);
      }

      return this.then(function setPageSize_main() {
        pageSize = pageSize || jsPDF.getPageSize(this.opt.jsPDF);

        if (!pageSize.hasOwnProperty('inner')) {
          pageSize.inner = {
            width: pageSize.width - this.opt.margin[1] - this.opt.margin[3],
            height: pageSize.height - this.opt.margin[0] - this.opt.margin[2]
          };
          pageSize.inner.px = {
            width: toPx(pageSize.inner.width, pageSize.k),
            height: toPx(pageSize.inner.height, pageSize.k)
          };
          pageSize.inner.ratio = pageSize.inner.height / pageSize.inner.width;
        }
        this.prop.pageSize = pageSize;
      });
    };

    Worker.prototype.setProgress = function setProgress(val, state, n, stack) {
      if (val != null) this.progress.val = val;
      if (state != null) this.progress.state = state;
      if (n != null) this.progress.n = n;
      if (stack != null) this.progress.stack = stack;
      this.progress.ratio = this.progress.val / this.progress.state;
      return this;
    };
    Worker.prototype.updateProgress = function updateProgress(val, state, n, stack) {
      return this.setProgress(val ? this.progress.val + val : null, state ? state : null, n ? this.progress.n + n : null, stack ? this.progress.stack.concat(stack) : null);
    };
    Worker.prototype.then = function then(onFulfilled, onRejected) {
      var self = this;
      return this.thenCore(onFulfilled, onRejected, function then_main(onFulfilled, onRejected) {
        self.updateProgress(null, null, 1, [onFulfilled]);
        return Promise.prototype.then.call(this, function then_pre(val) {
          self.updateProgress(null, onFulfilled);
          return val;
        }).then(onFulfilled, onRejected).then(function then_post(val) {
          self.updateProgress(1);
          return val;
        });
      });
    };

    Worker.prototype.thenCore = function thenCore(onFulfilled, onRejected, thenBase) {
      thenBase = thenBase || Promise.prototype.then;
      var self = this;
      if (onFulfilled) {
        onFulfilled = onFulfilled.bind(self);
      }
      if (onRejected) {
        onRejected = onRejected.bind(self);
      }
      var isNative = Promise.toString().indexOf('[native code]') !== -1 && Promise.name === 'Promise';
      var selfPromise = isNative ? self : Worker.convert(Object.assign({}, self), Promise.prototype);
      var returnVal = thenBase.call(selfPromise, onFulfilled, onRejected);
      return Worker.convert(returnVal, self.__proto__);
    };

    Worker.prototype.thenExternal = function thenExternal(onFulfilled, onRejected) {
      return Promise.prototype.then.call(this, onFulfilled, onRejected);
    };
    Worker.prototype.thenList = function thenList(fns) {
      var self = this;
      fns.forEach(function thenList_forEach(fn) {
        self = self.thenCore(fn);
      });
      return self;
    };
    Worker.prototype['catch'] = function (onRejected) {
      if (onRejected) {
        onRejected = onRejected.bind(this);
      }
      var returnVal = Promise.prototype['catch'].call(this, onRejected);
      return Worker.convert(returnVal, this);
    };
    Worker.prototype.catchExternal = function catchExternal(onRejected) {
      return Promise.prototype['catch'].call(this, onRejected);
    };
    Worker.prototype.error = function error(msg) {
      return this.then(function error_main() {
        throw new Error(msg);
      });
    };
    Worker.prototype.using = Worker.prototype.set;
    Worker.prototype.saveAs = Worker.prototype.save;
    Worker.prototype.export = Worker.prototype.output;
    Worker.prototype.run = Worker.prototype.then;
    jsPDF.getPageSize = function (orientation, unit, format) {
      if (_typeof(orientation) === 'object') {
        var options = orientation;
        orientation = options.orientation;
        unit = options.unit || unit;
        format = options.format || format;
      }
      unit = unit || 'mm';
      format = format || 'a4';
      orientation = ('' + (orientation || 'P')).toLowerCase();
      var format_as_string = ('' + format).toLowerCase();
      var pageFormats = {
        'a0': [2383.94, 3370.39],
        'a1': [1683.78, 2383.94],
        'a2': [1190.55, 1683.78],
        'a3': [841.89, 1190.55],
        'a4': [595.28, 841.89],
        'a5': [419.53, 595.28],
        'a6': [297.64, 419.53],
        'a7': [209.76, 297.64],
        'a8': [147.40, 209.76],
        'a9': [104.88, 147.40],
        'a10': [73.70, 104.88],
        'b0': [2834.65, 4008.19],
        'b1': [2004.09, 2834.65],
        'b2': [1417.32, 2004.09],
        'b3': [1000.63, 1417.32],
        'b4': [708.66, 1000.63],
        'b5': [498.90, 708.66],
        'b6': [354.33, 498.90],
        'b7': [249.45, 354.33],
        'b8': [175.75, 249.45],
        'b9': [124.72, 175.75],
        'b10': [87.87, 124.72],
        'c0': [2599.37, 3676.54],
        'c1': [1836.85, 2599.37],
        'c2': [1298.27, 1836.85],
        'c3': [918.43, 1298.27],
        'c4': [649.13, 918.43],
        'c5': [459.21, 649.13],
        'c6': [323.15, 459.21],
        'c7': [229.61, 323.15],
        'c8': [161.57, 229.61],
        'c9': [113.39, 161.57],
        'c10': [79.37, 113.39],
        'dl': [311.81, 623.62],
        'letter': [612, 792],
        'government-letter': [576, 756],
        'legal': [612, 1008],
        'junior-legal': [576, 360],
        'ledger': [1224, 792],
        'tabloid': [792, 1224],
        'credit-card': [153, 243]
      };
      switch (unit) {
        case 'pt':
          var k = 1;
          break;
        case 'mm':
          var k = 72 / 25.4;
          break;
        case 'cm':
          var k = 72 / 2.54;
          break;
        case 'in':
          var k = 72;
          break;
        case 'px':
          var k = 72 / 96;
          break;
        case 'pc':
          var k = 12;
          break;
        case 'em':
          var k = 12;
          break;
        case 'ex':
          var k = 6;
          break;
        default:
          throw 'Invalid unit: ' + unit;
      }
      if (pageFormats.hasOwnProperty(format_as_string)) {
        var pageHeight = pageFormats[format_as_string][1] / k;
        var pageWidth = pageFormats[format_as_string][0] / k;
      } else {
        try {
          var pageHeight = format[1];
          var pageWidth = format[0];
        } catch (err) {
          throw new Error('Invalid format: ' + format);
        }
      }

      if (orientation === 'p' || orientation === 'portrait') {
        orientation = 'p';
        if (pageWidth > pageHeight) {
          var tmp = pageWidth;
          pageWidth = pageHeight;
          pageHeight = tmp;
        }
      } else if (orientation === 'l' || orientation === 'landscape') {
        orientation = 'l';

        if (pageHeight > pageWidth) {
          var tmp = pageWidth;
          pageWidth = pageHeight;
          pageHeight = tmp;
        }
      } else {
        throw 'Invalid orientation: ' + orientation;
      }
      var info = {
        'width': pageWidth,
        'height': pageHeight,
        'unit': unit,
        'k': k
      };
      return info;
    };

    jsPDFAPI.html = function (src, options) {
      options = options || {};
      options.callback = options.callback || function () {};
      options.html2canvas = options.html2canvas || {};
      options.html2canvas.canvas = options.html2canvas.canvas || this.canvas;
      options.jsPDF = options.jsPDF || this;
      var pdf = options.jsPDF;
      var worker = new Worker(options);
      if (!options.worker) {
        return worker.from(src).doCallback();
      } else {
        return worker;
      }
      return this;
    };
  })(jsPDF.API, typeof window !== "undefined" && window || typeof global !== "undefined" && global);
  (function (jsPDFAPI) {
    var jsNamesObj, jsJsObj, text;
    jsPDFAPI.addJS = function (javascript) {
      text = javascript;
      this.internal.events.subscribe('postPutResources', function (javascript) {
        jsNamesObj = this.internal.newObject();
        this.internal.out('<<');
        this.internal.out('/Names [(EmbeddedJS) ' + (jsNamesObj + 1) + ' 0 R]');
        this.internal.out('>>');
        this.internal.out('endobj');
        jsJsObj = this.internal.newObject();
        this.internal.out('<<');
        this.internal.out('/S /JavaScript');
        this.internal.out('/JS (' + text + ')');
        this.internal.out('>>');
        this.internal.out('endobj');
      });
      this.internal.events.subscribe('putCatalog', function () {
        if (jsNamesObj !== undefined && jsJsObj !== undefined) {
          this.internal.out('/Names <</JavaScript ' + jsNamesObj + ' 0 R>>');
        }
      });
      return this;
    };
  })(jsPDF.API);
  (function (jsPDFAPI) {
    jsPDFAPI.events.push(['postPutResources', function () {
      var pdf = this;
      var rx = /^(\d+) 0 obj$/;
      if (this.outline.root.children.length > 0) {
        var lines = pdf.outline.render().split(/\r\n/);
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          var m = rx.exec(line);
          if (m != null) {
            var oid = m[1];
            pdf.internal.newObjectDeferredBegin(oid, false);
          }
          pdf.internal.write(line);
        }
      }
      if (this.outline.createNamedDestinations) {
        var totalPages = this.internal.pages.length;
        var dests = [];
        for (var i = 0; i < totalPages; i++) {
          var id = pdf.internal.newObject();
          dests.push(id);
          var info = pdf.internal.getPageInfo(i + 1);
          pdf.internal.write("<< /D[" + info.objId + " 0 R /XYZ null null null]>> endobj");
        }
        var names2Oid = pdf.internal.newObject();
        pdf.internal.write('<< /Names [ ');
        for (var i = 0; i < dests.length; i++) {
          pdf.internal.write("(page_" + (i + 1) + ")" + dests[i] + " 0 R");
        }
        pdf.internal.write(' ] >>', 'endobj');
        var namesOid = pdf.internal.newObject();
        pdf.internal.write('<< /Dests ' + names2Oid + " 0 R");
        pdf.internal.write('>>', 'endobj');
      }
    }]);
    jsPDFAPI.events.push(['putCatalog', function () {
      var pdf = this;
      if (pdf.outline.root.children.length > 0) {
        pdf.internal.write("/Outlines", this.outline.makeRef(this.outline.root));
        if (this.outline.createNamedDestinations) {
          pdf.internal.write("/Names " + namesOid + " 0 R");
        }
      }
    }]);
    jsPDFAPI.events.push(['initialized', function () {
      var pdf = this;
      pdf.outline = {
        createNamedDestinations: false,
        root: {
          children: []
        }
      };
      pdf.outline.add = function (parent, title, options) {
        var item = {
          title: title,
          options: options,
          children: []
        };
        if (parent == null) {
          parent = this.root;
        }
        parent.children.push(item);
        return item;
      };
      pdf.outline.render = function () {
        this.ctx = {};
        this.ctx.val = '';
        this.ctx.pdf = pdf;
        this.genIds_r(this.root);
        this.renderRoot(this.root);
        this.renderItems(this.root);
        return this.ctx.val;
      };
      pdf.outline.genIds_r = function (node) {
        node.id = pdf.internal.newObjectDeferred();

        for (var i = 0; i < node.children.length; i++) {
          this.genIds_r(node.children[i]);
        }
      };
      pdf.outline.renderRoot = function (node) {
        this.objStart(node);
        this.line('/Type /Outlines');
        if (node.children.length > 0) {
          this.line('/First ' + this.makeRef(node.children[0]));
          this.line('/Last ' + this.makeRef(node.children[node.children.length - 1]));
        }
        this.line('/Count ' + this.count_r({
          count: 0
        }, node));
        this.objEnd();
      };
      pdf.outline.renderItems = function (node) {
        var getHorizontalCoordinateString = this.ctx.pdf.internal.getCoordinateString;
        var getVerticalCoordinateString = this.ctx.pdf.internal.getVerticalCoordinateString;
        for (var i = 0; i < node.children.length; i++) {
          var item = node.children[i];
          this.objStart(item);
          this.line('/Title ' + this.makeString(item.title));
          this.line('/Parent ' + this.makeRef(node));
          if (i > 0) {
            this.line('/Prev ' + this.makeRef(node.children[i - 1]));
          }
          if (i < node.children.length - 1) {
            this.line('/Next ' + this.makeRef(node.children[i + 1]));
          }
          if (item.children.length > 0) {
            this.line('/First ' + this.makeRef(item.children[0]));
            this.line('/Last ' + this.makeRef(item.children[item.children.length - 1]));
          }
          var count = this.count = this.count_r({
            count: 0
          }, item);
          if (count > 0) {
            this.line('/Count ' + count);
          }
          if (item.options) {
            if (item.options.pageNumber) {
              var info = pdf.internal.getPageInfo(item.options.pageNumber);
              this.line('/Dest ' + '[' + info.objId + ' 0 R /XYZ 0 ' + getVerticalCoordinateString(0) + ' 0]');
            }
          }
          this.objEnd();
        }
        for (var i = 0; i < node.children.length; i++) {
          var item = node.children[i];
          this.renderItems(item);
        }
      };
      pdf.outline.line = function (text) {
        this.ctx.val += text + '\r\n';
      };
      pdf.outline.makeRef = function (node) {
        return node.id + ' 0 R';
      };
      pdf.outline.makeString = function (val) {
        return '(' + pdf.internal.pdfEscape(val) + ')';
      };
      pdf.outline.objStart = function (node) {
        this.ctx.val += '\r\n' + node.id + ' 0 obj' + '\r\n<<\r\n';
      };
      pdf.outline.objEnd = function (node) {
        this.ctx.val += '>> \r\n' + 'endobj' + '\r\n';
      };
      pdf.outline.count_r = function (ctx, node) {
        for (var i = 0; i < node.children.length; i++) {
          ctx.count++;
          this.count_r(ctx, node.children[i]);
        }
        return ctx.count;
      };
    }]);
    return this;
  })(jsPDF.API);
  (function (jsPDFAPI) {

    var doesNotHavePngJS = function doesNotHavePngJS() {
      return typeof PNG !== 'function' || typeof FlateStream !== 'function';
    },
        canCompress = function canCompress(value) {
      return value !== jsPDFAPI.image_compression.NONE && hasCompressionJS();
    },
        hasCompressionJS = function hasCompressionJS() {
      var inst = typeof Deflater === 'function';
      if (!inst) throw new Error("requires deflate.js for compression");
      return inst;
    },
        compressBytes = function compressBytes(bytes, lineLength, colorsPerPixel, compression) {
      var level = 5,
          filter_method = filterUp;
      switch (compression) {
        case jsPDFAPI.image_compression.FAST:
          level = 3;
          filter_method = filterSub;
          break;
        case jsPDFAPI.image_compression.MEDIUM:
          level = 6;
          filter_method = filterAverage;
          break;
        case jsPDFAPI.image_compression.SLOW:
          level = 9;
          filter_method = filterPaeth;
          break;
      }

      bytes = applyPngFilterMethod(bytes, lineLength, colorsPerPixel, filter_method);
      var header = new Uint8Array(createZlibHeader(level));
      var checksum = adler32(bytes);
      var deflate = new Deflater(level);
      var a = deflate.append(bytes);
      var cBytes = deflate.flush();
      var len = header.length + a.length + cBytes.length;
      var cmpd = new Uint8Array(len + 4);
      cmpd.set(header);
      cmpd.set(a, header.length);
      cmpd.set(cBytes, header.length + a.length);
      cmpd[len++] = checksum >>> 24 & 0xff;
      cmpd[len++] = checksum >>> 16 & 0xff;
      cmpd[len++] = checksum >>> 8 & 0xff;
      cmpd[len++] = checksum & 0xff;
      return jsPDFAPI.arrayBufferToBinaryString(cmpd);
    },
        createZlibHeader = function createZlibHeader(bytes, level) {
      var cm = 8;
      var cinfo = Math.LOG2E * Math.log(0x8000) - 8;
      var cmf = cinfo << 4 | cm;
      var hdr = cmf << 8;
      var flevel = Math.min(3, (level - 1 & 0xff) >> 1);
      hdr |= flevel << 6;
      hdr |= 0;
      hdr += 31 - hdr % 31;
      return [cmf, hdr & 0xff & 0xff];
    },
        adler32 = function adler32(array, param) {
      var adler = 1;
      var s1 = adler & 0xffff,
          s2 = adler >>> 16 & 0xffff;
      var len = array.length;
      var tlen;
      var i = 0;
      while (len > 0) {
        tlen = len > param ? param : len;
        len -= tlen;
        do {
          s1 += array[i++];
          s2 += s1;
        } while (--tlen);
        s1 %= 65521;
        s2 %= 65521;
      }
      return (s2 << 16 | s1) >>> 0;
    },
        applyPngFilterMethod = function applyPngFilterMethod(bytes, lineLength, colorsPerPixel, filter_method) {
      var lines = bytes.length / lineLength,
          result = new Uint8Array(bytes.length + lines),
          filter_methods = getFilterMethods(),
          i = 0,
          line,
          prevLine,
          offset;
      for (; i < lines; i++) {
        offset = i * lineLength;
        line = bytes.subarray(offset, offset + lineLength);
        if (filter_method) {
          result.set(filter_method(line, colorsPerPixel, prevLine), offset + i);
        } else {
          var j = 0,
              len = filter_methods.length,
              results = [];
          for (; j < len; j++) {
            results[j] = filter_methods[j](line, colorsPerPixel, prevLine);
          }
          var ind = getIndexOfSmallestSum(results.concat());
          result.set(results[ind], offset + i);
        }
        prevLine = line;
      }
      return result;
    },
        filterNone = function filterNone(line, colorsPerPixel, prevLine) {
      var result = Array.apply([], line);
      result.unshift(0);
      return result;
    },
        filterSub = function filterSub(line, colorsPerPixel, prevLine) {
      var result = [],
          i = 0,
          len = line.length,
          left;
      result[0] = 1;
      for (; i < len; i++) {
        left = line[i - colorsPerPixel] || 0;
        result[i + 1] = line[i] - left + 0x0100 & 0xff;
      }
      return result;
    },
        filterUp = function filterUp(line, colorsPerPixel, prevLine) {
      var result = [],
          i = 0,
          len = line.length,
          up;
      result[0] = 2;
      for (; i < len; i++) {
        up = prevLine && prevLine[i] || 0;
        result[i + 1] = line[i] - up + 0x0100 & 0xff;
      }
      return result;
    },
        filterAverage = function filterAverage(line, colorsPerPixel, prevLine) {
      var result = [],
          i = 0,
          len = line.length,
          left,
          up;
      result[0] = 3;
      for (; i < len; i++) {
        left = line[i - colorsPerPixel] || 0;
        up = prevLine && prevLine[i] || 0;
        result[i + 1] = line[i] + 0x0100 - (left + up >>> 1) & 0xff;
      }
      return result;
    },
        filterPaeth = function filterPaeth(line, colorsPerPixel, prevLine) {
      var result = [],
          i = 0,
          len = line.length,
          left,
          up,
          upLeft,
          paeth;
      result[0] = 4;
      for (; i < len; i++) {
        left = line[i - colorsPerPixel] || 0;
        up = prevLine && prevLine[i] || 0;
        upLeft = prevLine && prevLine[i - colorsPerPixel] || 0;
        paeth = paethPredictor(left, up, upLeft);
        result[i + 1] = line[i] - paeth + 0x0100 & 0xff;
      }
      return result;
    },
        paethPredictor = function paethPredictor(left, up, upLeft) {
      var p = left + up - upLeft,
          pLeft = Math.abs(p - left),
          pUp = Math.abs(p - up),
          pUpLeft = Math.abs(p - upLeft);
      return pLeft <= pUp && pLeft <= pUpLeft ? left : pUp <= pUpLeft ? up : upLeft;
    },
        getFilterMethods = function getFilterMethods() {
      return [filterNone, filterSub, filterUp, filterAverage, filterPaeth];
    },
        getIndexOfSmallestSum = function getIndexOfSmallestSum(arrays) {
      var i = 0,
          len = arrays.length,
          sum,
          min,
          ind;
      while (i < len) {
        sum = absSum(arrays[i].slice(1));
        if (sum < min || !min) {
          min = sum;
          ind = i;
        }
        i++;
      }
      return ind;
    },
        absSum = function absSum(array) {
      var i = 0,
          len = array.length,
          sum = 0;
      while (i < len) {
        sum += Math.abs(array[i++]);
      }
      return sum;
    },
        getPredictorFromCompression = function getPredictorFromCompression(compression) {
      var predictor;
      switch (compression) {
        case jsPDFAPI.image_compression.FAST:
          predictor = 11;
          break;
        case jsPDFAPI.image_compression.MEDIUM:
          predictor = 13;
          break;
        case jsPDFAPI.image_compression.SLOW:
          predictor = 14;
          break;
        default:
          predictor = 12;
          break;
      }
      return predictor;
    };

    jsPDFAPI.processPNG = function (imageData, imageIndex, alias, compression, dataAsBinaryString) {
      var colorSpace = this.color_spaces.DEVICE_RGB,
          decode = this.decode.FLATE_DECODE,
          bpc = 8,
          img,
          dp,
          trns,
          colors,
          pal,
          smask;
      if (this.isArrayBuffer(imageData)) imageData = new Uint8Array(imageData);
      if (this.isArrayBufferView(imageData)) {
        if (doesNotHavePngJS()) throw new Error("PNG support requires png.js and zlib.js");
        img = new PNG(imageData);
        imageData = img.imgData;
        bpc = img.bits;
        colorSpace = img.colorSpace;
        colors = img.colors;
        if ([4, 6].indexOf(img.colorType) !== -1) {
          if (img.bits === 8) {
            var pixels = img.pixelBitlength == 32 ? new Uint32Array(img.decodePixels().buffer) : img.pixelBitlength == 16 ? new Uint16Array(img.decodePixels().buffer) : new Uint8Array(img.decodePixels().buffer),
                len = pixels.length,
                imgData = new Uint8Array(len * img.colors),
                alphaData = new Uint8Array(len),
                pDiff = img.pixelBitlength - img.bits,
                i = 0,
                n = 0,
                pixel,
                pbl;
            for (; i < len; i++) {
              pixel = pixels[i];
              pbl = 0;
              while (pbl < pDiff) {
                imgData[n++] = pixel >>> pbl & 0xff;
                pbl = pbl + img.bits;
              }
              alphaData[i] = pixel >>> pbl & 0xff;
            }
          }
          if (img.bits === 16) {
            var pixels = new Uint32Array(img.decodePixels().buffer),
                len = pixels.length,
                imgData = new Uint8Array(len * (32 / img.pixelBitlength) * img.colors),
                alphaData = new Uint8Array(len * (32 / img.pixelBitlength)),
                hasColors = img.colors > 1,
                i = 0,
                n = 0,
                a = 0,
                pixel;
            while (i < len) {
              pixel = pixels[i++];
              imgData[n++] = pixel >>> 0 & 0xFF;
              if (hasColors) {
                imgData[n++] = pixel >>> 16 & 0xFF;
                pixel = pixels[i++];
                imgData[n++] = pixel >>> 0 & 0xFF;
              }
              alphaData[a++] = pixel >>> 16 & 0xFF;
            }
            bpc = 8;
          }
          if (canCompress(compression)) {
            imageData = compressBytes(imgData, img.width * img.colors, img.colors, compression);
            smask = compressBytes(alphaData, img.width, 1, compression);
          } else {
            imageData = imgData;
            smask = alphaData;
            decode = null;
          }
        }
        if (img.colorType === 3) {
          colorSpace = this.color_spaces.INDEXED;
          pal = img.palette;
          if (img.transparency.indexed) {
            var trans = img.transparency.indexed;
            var total = 0,
                i = 0,
                len = trans.length;
            for (; i < len; ++i) {
              total += trans[i];
            }
            total = total / 255;
            if (total === len - 1 && trans.indexOf(0) !== -1) {
              trns = [trans.indexOf(0)];
            } else if (total !== len) {
              var pixels = img.decodePixels(),
                  alphaData = new Uint8Array(pixels.length),
                  i = 0,
                  len = pixels.length;
              for (; i < len; i++) {
                alphaData[i] = trans[pixels[i]];
              }
              smask = compressBytes(alphaData, img.width, 1);
            }
          }
        }
        var predictor = getPredictorFromCompression(compression);
        if (decode === this.decode.FLATE_DECODE) dp = '/Predictor ' + predictor + ' /Colors ' + colors + ' /BitsPerComponent ' + bpc + ' /Columns ' + img.width;else
          dp = '/Colors ' + colors + ' /BitsPerComponent ' + bpc + ' /Columns ' + img.width;
        if (this.isArrayBuffer(imageData) || this.isArrayBufferView(imageData)) imageData = this.arrayBufferToBinaryString(imageData);
        if (smask && this.isArrayBuffer(smask) || this.isArrayBufferView(smask)) smask = this.arrayBufferToBinaryString(smask);
        return this.createImageInfo(imageData, img.width, img.height, colorSpace, bpc, decode, imageIndex, alias, dp, trns, pal, smask, predictor);
      }
      throw new Error("Unsupported PNG image data, try using JPEG instead.");
    };
  })(jsPDF.API);
  (function (jsPDFAPI) {
    jsPDFAPI.processGIF89A = function (imageData, imageIndex, alias, compression, dataAsBinaryString) {
      var reader = new GifReader(imageData);
      var width = reader.width,
          height = reader.height;
      var qu = 100;
      var pixels = [];
      reader.decodeAndBlitFrameRGBA(0, pixels);
      var rawImageData = {
        data: pixels,
        width: width,
        height: height
      };
      var encoder = new JPEGEncoder(qu);
      var data = encoder.encode(rawImageData, qu);
      return jsPDFAPI.processJPEG.call(this, data, imageIndex, alias, compression);
    };

    jsPDFAPI.processGIF87A = jsPDFAPI.processGIF89A;
  })(jsPDF.API);
  (function (jsPDFAPI) {
    jsPDFAPI.processBMP = function (imageData, imageIndex, alias, compression, dataAsBinaryString) {
      var reader = new BmpDecoder(imageData, false);
      var width = reader.width,
          height = reader.height;
      var qu = 100;
      var pixels = reader.getData();
      var rawImageData = {
        data: pixels,
        width: width,
        height: height
      };
      var encoder = new JPEGEncoder(qu);
      var data = encoder.encode(rawImageData, qu);
      return jsPDFAPI.processJPEG.call(this, data, imageIndex, alias, compression);
    };
  })(jsPDF.API);
  (function (jsPDFAPI) {
    jsPDFAPI.setLanguage = function (langCode) {
      var langCodes = {
        "af": "Afrikaans",
        "sq": "Albanian",
        "ar": "Arabic (Standard)",
        "ar-DZ": "Arabic (Algeria)",
        "ar-BH": "Arabic (Bahrain)",
        "ar-EG": "Arabic (Egypt)",
        "ar-IQ": "Arabic (Iraq)",
        "ar-JO": "Arabic (Jordan)",
        "ar-KW": "Arabic (Kuwait)",
        "ar-LB": "Arabic (Lebanon)",
        "ar-LY": "Arabic (Libya)",
        "ar-MA": "Arabic (Morocco)",
        "ar-OM": "Arabic (Oman)",
        "ar-QA": "Arabic (Qatar)",
        "ar-SA": "Arabic (Saudi Arabia)",
        "ar-SY": "Arabic (Syria)",
        "ar-TN": "Arabic (Tunisia)",
        "ar-AE": "Arabic (U.A.E.)",
        "ar-YE": "Arabic (Yemen)",
        "an": "Aragonese",
        "hy": "Armenian",
        "as": "Assamese",
        "ast": "Asturian",
        "az": "Azerbaijani",
        "eu": "Basque",
        "be": "Belarusian",
        "bn": "Bengali",
        "bs": "Bosnian",
        "br": "Breton",
        "bg": "Bulgarian",
        "my": "Burmese",
        "ca": "Catalan",
        "ch": "Chamorro",
        "ce": "Chechen",
        "zh": "Chinese",
        "zh-HK": "Chinese (Hong Kong)",
        "zh-CN": "Chinese (PRC)",
        "zh-SG": "Chinese (Singapore)",
        "zh-TW": "Chinese (Taiwan)",
        "cv": "Chuvash",
        "co": "Corsican",
        "cr": "Cree",
        "hr": "Croatian",
        "cs": "Czech",
        "da": "Danish",
        "nl": "Dutch (Standard)",
        "nl-BE": "Dutch (Belgian)",
        "en": "English",
        "en-AU": "English (Australia)",
        "en-BZ": "English (Belize)",
        "en-CA": "English (Canada)",
        "en-IE": "English (Ireland)",
        "en-JM": "English (Jamaica)",
        "en-NZ": "English (New Zealand)",
        "en-PH": "English (Philippines)",
        "en-ZA": "English (South Africa)",
        "en-TT": "English (Trinidad & Tobago)",
        "en-GB": "English (United Kingdom)",
        "en-US": "English (United States)",
        "en-ZW": "English (Zimbabwe)",
        "eo": "Esperanto",
        "et": "Estonian",
        "fo": "Faeroese",
        "fj": "Fijian",
        "fi": "Finnish",
        "fr": "French (Standard)",
        "fr-BE": "French (Belgium)",
        "fr-CA": "French (Canada)",
        "fr-FR": "French (France)",
        "fr-LU": "French (Luxembourg)",
        "fr-MC": "French (Monaco)",
        "fr-CH": "French (Switzerland)",
        "fy": "Frisian",
        "fur": "Friulian",
        "gd": "Gaelic (Scots)",
        "gd-IE": "Gaelic (Irish)",
        "gl": "Galacian",
        "ka": "Georgian",
        "de": "German (Standard)",
        "de-AT": "German (Austria)",
        "de-DE": "German (Germany)",
        "de-LI": "German (Liechtenstein)",
        "de-LU": "German (Luxembourg)",
        "de-CH": "German (Switzerland)",
        "el": "Greek",
        "gu": "Gujurati",
        "ht": "Haitian",
        "he": "Hebrew",
        "hi": "Hindi",
        "hu": "Hungarian",
        "is": "Icelandic",
        "id": "Indonesian",
        "iu": "Inuktitut",
        "ga": "Irish",
        "it": "Italian (Standard)",
        "it-CH": "Italian (Switzerland)",
        "ja": "Japanese",
        "kn": "Kannada",
        "ks": "Kashmiri",
        "kk": "Kazakh",
        "km": "Khmer",
        "ky": "Kirghiz",
        "tlh": "Klingon",
        "ko": "Korean",
        "ko-KP": "Korean (North Korea)",
        "ko-KR": "Korean (South Korea)",
        "la": "Latin",
        "lv": "Latvian",
        "lt": "Lithuanian",
        "lb": "Luxembourgish",
        "mk": "FYRO Macedonian",
        "ms": "Malay",
        "ml": "Malayalam",
        "mt": "Maltese",
        "mi": "Maori",
        "mr": "Marathi",
        "mo": "Moldavian",
        "nv": "Navajo",
        "ng": "Ndonga",
        "ne": "Nepali",
        "no": "Norwegian",
        "nb": "Norwegian (Bokmal)",
        "nn": "Norwegian (Nynorsk)",
        "oc": "Occitan",
        "or": "Oriya",
        "om": "Oromo",
        "fa": "Persian",
        "fa-IR": "Persian/Iran",
        "pl": "Polish",
        "pt": "Portuguese",
        "pt-BR": "Portuguese (Brazil)",
        "pa": "Punjabi",
        "pa-IN": "Punjabi (India)",
        "pa-PK": "Punjabi (Pakistan)",
        "qu": "Quechua",
        "rm": "Rhaeto-Romanic",
        "ro": "Romanian",
        "ro-MO": "Romanian (Moldavia)",
        "ru": "Russian",
        "ru-MO": "Russian (Moldavia)",
        "sz": "Sami (Lappish)",
        "sg": "Sango",
        "sa": "Sanskrit",
        "sc": "Sardinian",
        "sd": "Sindhi",
        "si": "Singhalese",
        "sr": "Serbian",
        "sk": "Slovak",
        "sl": "Slovenian",
        "so": "Somani",
        "sb": "Sorbian",
        "es": "Spanish",
        "es-AR": "Spanish (Argentina)",
        "es-BO": "Spanish (Bolivia)",
        "es-CL": "Spanish (Chile)",
        "es-CO": "Spanish (Colombia)",
        "es-CR": "Spanish (Costa Rica)",
        "es-DO": "Spanish (Dominican Republic)",
        "es-EC": "Spanish (Ecuador)",
        "es-SV": "Spanish (El Salvador)",
        "es-GT": "Spanish (Guatemala)",
        "es-HN": "Spanish (Honduras)",
        "es-MX": "Spanish (Mexico)",
        "es-NI": "Spanish (Nicaragua)",
        "es-PA": "Spanish (Panama)",
        "es-PY": "Spanish (Paraguay)",
        "es-PE": "Spanish (Peru)",
        "es-PR": "Spanish (Puerto Rico)",
        "es-ES": "Spanish (Spain)",
        "es-UY": "Spanish (Uruguay)",
        "es-VE": "Spanish (Venezuela)",
        "sx": "Sutu",
        "sw": "Swahili",
        "sv": "Swedish",
        "sv-FI": "Swedish (Finland)",
        "sv-SV": "Swedish (Sweden)",
        "ta": "Tamil",
        "tt": "Tatar",
        "te": "Teluga",
        "th": "Thai",
        "tig": "Tigre",
        "ts": "Tsonga",
        "tn": "Tswana",
        "tr": "Turkish",
        "tk": "Turkmen",
        "uk": "Ukrainian",
        "hsb": "Upper Sorbian",
        "ur": "Urdu",
        "ve": "Venda",
        "vi": "Vietnamese",
        "vo": "Volapuk",
        "wa": "Walloon",
        "cy": "Welsh",
        "xh": "Xhosa",
        "ji": "Yiddish",
        "zu": "Zulu"
      };

      if (this.internal.languageSettings === undefined) {
        this.internal.languageSettings = {};
        this.internal.languageSettings.isSubscribed = false;
      }
      if (langCodes[langCode] !== undefined) {
        this.internal.languageSettings.languageCode = langCode;
        if (this.internal.languageSettings.isSubscribed === false) {
          this.internal.events.subscribe("putCatalog", function () {
            this.internal.write("/Lang (" + this.internal.languageSettings.languageCode + ")");
          });
          this.internal.languageSettings.isSubscribed = true;
        }
      }
      return this;
    };
  })(jsPDF.API);
  (function (API) {
    var getCharWidthsArray = API.getCharWidthsArray = function (text, options) {
      options = options || {};
      var activeFont = options.font || this.internal.getFont();
      var fontSize = options.fontSize || this.internal.getFontSize();
      var charSpace = options.charSpace || this.internal.getCharSpace();
      var widths = options.widths ? options.widths : activeFont.metadata.Unicode.widths;
      var widthsFractionOf = widths.fof ? widths.fof : 1;
      var kerning = options.kerning ? options.kerning : activeFont.metadata.Unicode.kerning;
      var kerningFractionOf = kerning.fof ? kerning.fof : 1;
      var i;
      var l;
      var char_code;
      var prior_char_code = 0;
      var default_char_width = widths[0] || widthsFractionOf;
      var output = [];
      for (i = 0, l = text.length; i < l; i++) {
        char_code = text.charCodeAt(i);
        if (typeof activeFont.metadata.widthOfString === "function") {
          output.push((activeFont.metadata.widthOfGlyph(activeFont.metadata.characterToGlyph(char_code)) + charSpace * (1000 / fontSize) || 0) / 1000);
        } else {
          output.push((widths[char_code] || default_char_width) / widthsFractionOf + (kerning[char_code] && kerning[char_code][prior_char_code] || 0) / kerningFractionOf);
        }
        prior_char_code = char_code;
      }
      return output;
    };
    var getArraySum = API.getArraySum = function (array) {
      var i = array.length,
          output = 0;
      while (i) {
        i--;
        output += array[i];
      }
      return output;
    };
    var getStringUnitWidth = API.getStringUnitWidth = function (text, options) {
      options = options || {};
      var fontSize = options.fontSize || this.internal.getFontSize();
      var font = options.font || this.internal.getFont();
      var charSpace = options.charSpace || this.internal.getCharSpace();
      var result = 0;
      if (typeof font.metadata.widthOfString === "function") {
        result = font.metadata.widthOfString(text, fontSize, charSpace) / fontSize;
      } else {
        result = getArraySum(getCharWidthsArray.apply(this, arguments));
      }
      return result;
    };
    var splitLongWord = function splitLongWord(word, widths_array, firstLineMaxLen, maxLen) {
      var answer = [];
      var i = 0,
          l = word.length,
          workingLen = 0;
      while (i !== l && workingLen + widths_array[i] < firstLineMaxLen) {
        workingLen += widths_array[i];
        i++;
      }
      answer.push(word.slice(0, i));
      var startOfLine = i;
      workingLen = 0;
      while (i !== l) {
        if (workingLen + widths_array[i] > maxLen) {
          answer.push(word.slice(startOfLine, i));
          workingLen = 0;
          startOfLine = i;
        }
        workingLen += widths_array[i];
        i++;
      }
      if (startOfLine !== i) {
        answer.push(word.slice(startOfLine, i));
      }
      return answer;
    };
    var splitParagraphIntoLines = function splitParagraphIntoLines(text, maxlen, options) {
      if (!options) {
        options = {};
      }
      var line = [],
          lines = [line],
          line_length = options.textIndent || 0,
          separator_length = 0,
          current_word_length = 0,
          word,
          widths_array,
          words = text.split(' '),
          spaceCharWidth = getCharWidthsArray.apply(this, [' ', options])[0],
          i,
          l,
          tmp,
          lineIndent;
      if (options.lineIndent === -1) {
        lineIndent = words[0].length + 2;
      } else {
        lineIndent = options.lineIndent || 0;
      }
      if (lineIndent) {
        var pad = Array(lineIndent).join(" "),
            wrds = [];
        words.map(function (wrd) {
          wrd = wrd.split(/\s*\n/);
          if (wrd.length > 1) {
            wrds = wrds.concat(wrd.map(function (wrd, idx) {
              return (idx && wrd.length ? "\n" : "") + wrd;
            }));
          } else {
            wrds.push(wrd[0]);
          }
        });
        words = wrds;
        lineIndent = getStringUnitWidth.apply(this, [pad, options]);
      }
      for (i = 0, l = words.length; i < l; i++) {
        var force = 0;
        word = words[i];

        if (lineIndent && word[0] == "\n") {
          word = word.substr(1);
          force = 1;
        }
        widths_array = getCharWidthsArray.apply(this, [word, options]);
        current_word_length = getArraySum(widths_array);
        if (line_length + separator_length + current_word_length > maxlen || force) {
          if (current_word_length > maxlen) {
            tmp = splitLongWord.apply(this, [word, widths_array, maxlen - (line_length + separator_length), maxlen]);
            line.push(tmp.shift());
            line = [tmp.pop()];
            while (tmp.length) {
              lines.push([tmp.shift()]);
            }
            current_word_length = getArraySum(widths_array.slice(word.length - (line[0] ? line[0].length : 0)));
          } else {
            line = [word];
          }
          lines.push(line);
          line_length = current_word_length + lineIndent;
          separator_length = spaceCharWidth;
        } else {
          line.push(word);
          line_length += separator_length + current_word_length;
          separator_length = spaceCharWidth;
        }
      }
      if (lineIndent) {
        var postProcess = function postProcess(ln, idx) {
          return (idx ? pad : '') + ln.join(" ");
        };
      } else {
        var postProcess = function postProcess(ln) {
          return ln.join(" ");
        };
      }
      return lines.map(postProcess);
    };
    API.splitTextToSize = function (text, maxlen, options) {
      options = options || {};
      var fsize = options.fontSize || this.internal.getFontSize(),
          newOptions = function (options) {
        var widths = {
          0: 1
        },
            kerning = {};
        if (!options.widths || !options.kerning) {
          var f = this.internal.getFont(options.fontName, options.fontStyle),
              encoding = 'Unicode';
          if (f.metadata[encoding]) {
            return {
              widths: f.metadata[encoding].widths || widths,
              kerning: f.metadata[encoding].kerning || kerning
            };
          } else {
            return {
              font: f.metadata,
              fontSize: this.internal.getFontSize(),
              charSpace: this.internal.getCharSpace()
            };
          }
        } else {
          return {
            widths: options.widths,
            kerning: options.kerning
          };
        }
        return {
          widths: widths,
          kerning: kerning
        };
      }.call(this, options);
      var paragraphs;
      if (Array.isArray(text)) {
        paragraphs = text;
      } else {
        paragraphs = text.split(/\r?\n/);
      }
      var fontUnit_maxLen = 1.0 * this.internal.scaleFactor * maxlen / fsize;
      newOptions.textIndent = options.textIndent ? options.textIndent * 1.0 * this.internal.scaleFactor / fsize : 0;
      newOptions.lineIndent = options.lineIndent;
      var i,
          l,
          output = [];
      for (i = 0, l = paragraphs.length; i < l; i++) {
        output = output.concat(splitParagraphIntoLines.apply(this, [paragraphs[i], fontUnit_maxLen, newOptions]));
      }
      return output;
    };
  })(jsPDF.API);
  (function (API) {
    var uncompress = function uncompress(data) {
      var decoded = '0123456789abcdef',
          encoded = 'klmnopqrstuvwxyz',
          mapping = {};
      for (var i = 0; i < encoded.length; i++) {
        mapping[encoded[i]] = decoded[i];
      }
      var undef,
          output = {},
          sign = 1,
          stringparts
      ,
          activeobject = output,
          parentchain = [],
          parent_key_pair,
          keyparts = '',
          valueparts = '',
          key
      ,
          datalen = data.length - 1
      ,
          ch;
      i = 1;
      while (i != datalen) {
        ch = data[i];
        i += 1;
        if (ch == "'") {
          if (stringparts) {
            key = stringparts.join('');
            stringparts = undef;
          } else {
            stringparts = [];
          }
        } else if (stringparts) {
          stringparts.push(ch);
        } else if (ch == '{') {
          parentchain.push([activeobject, key]);
          activeobject = {};
          key = undef;
        } else if (ch == '}') {
          parent_key_pair = parentchain.pop();
          parent_key_pair[0][parent_key_pair[1]] = activeobject;
          key = undef;
          activeobject = parent_key_pair[0];
        } else if (ch == '-') {
          sign = -1;
        } else {
          if (key === undef) {
            if (mapping.hasOwnProperty(ch)) {
              keyparts += mapping[ch];
              key = parseInt(keyparts, 16) * sign;
              sign = +1;
              keyparts = '';
            } else {
              keyparts += ch;
            }
          } else {
            if (mapping.hasOwnProperty(ch)) {
              valueparts += mapping[ch];
              activeobject[key] = parseInt(valueparts, 16) * sign;
              sign = +1;
              key = undef;
              valueparts = '';
            } else {
              valueparts += ch;
            }
          }
        }
      }
      return output;
    };
    var encodingBlock = {
      'codePages': ['WinAnsiEncoding'],
      'WinAnsiEncoding': uncompress("{19m8n201n9q201o9r201s9l201t9m201u8m201w9n201x9o201y8o202k8q202l8r202m9p202q8p20aw8k203k8t203t8v203u9v2cq8s212m9t15m8w15n9w2dw9s16k8u16l9u17s9z17x8y17y9y}")
    },
        encodings = {
      'Unicode': {
        'Courier': encodingBlock,
        'Courier-Bold': encodingBlock,
        'Courier-BoldOblique': encodingBlock,
        'Courier-Oblique': encodingBlock,
        'Helvetica': encodingBlock,
        'Helvetica-Bold': encodingBlock,
        'Helvetica-BoldOblique': encodingBlock,
        'Helvetica-Oblique': encodingBlock,
        'Times-Roman': encodingBlock,
        'Times-Bold': encodingBlock,
        'Times-BoldItalic': encodingBlock,
        'Times-Italic': encodingBlock
      }
    },
        fontMetrics = {
      'Unicode': {
        'Courier-Oblique': uncompress("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
        'Times-BoldItalic': uncompress("{'widths'{k3o2q4ycx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2r202m2n2n3m2o3m2p5n202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5n4l4m4m4m4n4m4o4s4p4m4q4m4r4s4s4y4t2r4u3m4v4m4w3x4x5t4y4s4z4s5k3x5l4s5m4m5n3r5o3x5p4s5q4m5r5t5s4m5t3x5u3x5v2l5w1w5x2l5y3t5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q2l6r3m6s3r6t1w6u1w6v3m6w1w6x4y6y3r6z3m7k3m7l3m7m2r7n2r7o1w7p3r7q2w7r4m7s3m7t2w7u2r7v2n7w1q7x2n7y3t202l3mcl4mal2ram3man3mao3map3mar3mas2lat4uau1uav3maw3way4uaz2lbk2sbl3t'fof'6obo2lbp3tbq3mbr1tbs2lbu1ybv3mbz3mck4m202k3mcm4mcn4mco4mcp4mcq5ycr4mcs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz2w203k6o212m6o2dw2l2cq2l3t3m3u2l17s3x19m3m}'kerning'{cl{4qu5kt5qt5rs17ss5ts}201s{201ss}201t{cks4lscmscnscoscpscls2wu2yu201ts}201x{2wu2yu}2k{201ts}2w{4qx5kx5ou5qx5rs17su5tu}2x{17su5tu5ou}2y{4qx5kx5ou5qx5rs17ss5ts}'fof'-6ofn{17sw5tw5ou5qw5rs}7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qs}3v{17su5tu5os5qs}7p{17su5tu}ck{4qu5kt5qt5rs17ss5ts}4l{4qu5kt5qt5rs17ss5ts}cm{4qu5kt5qt5rs17ss5ts}cn{4qu5kt5qt5rs17ss5ts}co{4qu5kt5qt5rs17ss5ts}cp{4qu5kt5qt5rs17ss5ts}6l{4qu5ou5qw5rt17su5tu}5q{ckuclucmucnucoucpu4lu}5r{ckuclucmucnucoucpu4lu}7q{cksclscmscnscoscps4ls}6p{4qu5ou5qw5rt17sw5tw}ek{4qu5ou5qw5rt17su5tu}el{4qu5ou5qw5rt17su5tu}em{4qu5ou5qw5rt17su5tu}en{4qu5ou5qw5rt17su5tu}eo{4qu5ou5qw5rt17su5tu}ep{4qu5ou5qw5rt17su5tu}es{17ss5ts5qs4qu}et{4qu5ou5qw5rt17sw5tw}eu{4qu5ou5qw5rt17ss5ts}ev{17ss5ts5qs4qu}6z{17sw5tw5ou5qw5rs}fm{17sw5tw5ou5qw5rs}7n{201ts}fo{17sw5tw5ou5qw5rs}fp{17sw5tw5ou5qw5rs}fq{17sw5tw5ou5qw5rs}7r{cksclscmscnscoscps4ls}fs{17sw5tw5ou5qw5rs}ft{17su5tu}fu{17su5tu}fv{17su5tu}fw{17su5tu}fz{cksclscmscnscoscps4ls}}}"),
        'Helvetica-Bold': uncompress("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),
        'Courier': uncompress("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
        'Courier-BoldOblique': uncompress("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
        'Times-Bold': uncompress("{'widths'{k3q2q5ncx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2l202m2n2n3m2o3m2p6o202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5x4l4s4m4m4n4s4o4s4p4m4q3x4r4y4s4y4t2r4u3m4v4y4w4m4x5y4y4s4z4y5k3x5l4y5m4s5n3r5o4m5p4s5q4s5r6o5s4s5t4s5u4m5v2l5w1w5x2l5y3u5z3m6k2l6l3m6m3r6n2w6o3r6p2w6q2l6r3m6s3r6t1w6u2l6v3r6w1w6x5n6y3r6z3m7k3r7l3r7m2w7n2r7o2l7p3r7q3m7r4s7s3m7t3m7u2w7v2r7w1q7x2r7y3o202l3mcl4sal2lam3man3mao3map3mar3mas2lat4uau1yav3maw3tay4uaz2lbk2sbl3t'fof'6obo2lbp3rbr1tbs2lbu2lbv3mbz3mck4s202k3mcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3rek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3m3u2l17s4s19m3m}'kerning'{cl{4qt5ks5ot5qy5rw17sv5tv}201t{cks4lscmscnscoscpscls4wv}2k{201ts}2w{4qu5ku7mu5os5qx5ru17su5tu}2x{17su5tu5ou5qs}2y{4qv5kv7mu5ot5qz5ru17su5tu}'fof'-6o7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qu}3v{17su5tu5os5qu}fu{17su5tu5ou5qu}7p{17su5tu5ou5qu}ck{4qt5ks5ot5qy5rw17sv5tv}4l{4qt5ks5ot5qy5rw17sv5tv}cm{4qt5ks5ot5qy5rw17sv5tv}cn{4qt5ks5ot5qy5rw17sv5tv}co{4qt5ks5ot5qy5rw17sv5tv}cp{4qt5ks5ot5qy5rw17sv5tv}6l{17st5tt5ou5qu}17s{ckuclucmucnucoucpu4lu4wu}5o{ckuclucmucnucoucpu4lu4wu}5q{ckzclzcmzcnzcozcpz4lz4wu}5r{ckxclxcmxcnxcoxcpx4lx4wu}5t{ckuclucmucnucoucpu4lu4wu}7q{ckuclucmucnucoucpu4lu}6p{17sw5tw5ou5qu}ek{17st5tt5qu}el{17st5tt5ou5qu}em{17st5tt5qu}en{17st5tt5qu}eo{17st5tt5qu}ep{17st5tt5ou5qu}es{17ss5ts5qu}et{17sw5tw5ou5qu}eu{17sw5tw5ou5qu}ev{17ss5ts5qu}6z{17sw5tw5ou5qu5rs}fm{17sw5tw5ou5qu5rs}fn{17sw5tw5ou5qu5rs}fo{17sw5tw5ou5qu5rs}fp{17sw5tw5ou5qu5rs}fq{17sw5tw5ou5qu5rs}7r{cktcltcmtcntcotcpt4lt5os}fs{17sw5tw5ou5qu5rs}ft{17su5tu5ou5qu}7m{5os}fv{17su5tu5ou5qu}fw{17su5tu5ou5qu}fz{cksclscmscnscoscps4ls}}}"),
        'Symbol': uncompress("{'widths'{k3uaw4r19m3m2k1t2l2l202m2y2n3m2p5n202q6o3k3m2s2l2t2l2v3r2w1t3m3m2y1t2z1wbk2sbl3r'fof'6o3n3m3o3m3p3m3q3m3r3m3s3m3t3m3u1w3v1w3w3r3x3r3y3r3z2wbp3t3l3m5v2l5x2l5z3m2q4yfr3r7v3k7w1o7x3k}'kerning'{'fof'-6o}}"),
        'Helvetica': uncompress("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}"),
        'Helvetica-BoldOblique': uncompress("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),
        'ZapfDingbats': uncompress("{'widths'{k4u2k1w'fof'6o}'kerning'{'fof'-6o}}"),
        'Courier-Bold': uncompress("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
        'Times-Italic': uncompress("{'widths'{k3n2q4ycx2l201n3m201o5t201s2l201t2l201u2l201w3r201x3r201y3r2k1t2l2l202m2n2n3m2o3m2p5n202q5t2r1p2s2l2t2l2u3m2v4n2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w4n3x4n3y4n3z3m4k5w4l3x4m3x4n4m4o4s4p3x4q3x4r4s4s4s4t2l4u2w4v4m4w3r4x5n4y4m4z4s5k3x5l4s5m3x5n3m5o3r5p4s5q3x5r5n5s3x5t3r5u3r5v2r5w1w5x2r5y2u5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q1w6r3m6s3m6t1w6u1w6v2w6w1w6x4s6y3m6z3m7k3m7l3m7m2r7n2r7o1w7p3m7q2w7r4m7s2w7t2w7u2r7v2s7w1v7x2s7y3q202l3mcl3xal2ram3man3mao3map3mar3mas2lat4wau1vav3maw4nay4waz2lbk2sbl4n'fof'6obo2lbp3mbq3obr1tbs2lbu1zbv3mbz3mck3x202k3mcm3xcn3xco3xcp3xcq5tcr4mcs3xct3xcu3xcv3xcw2l2m2ucy2lcz2ldl4mdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr4nfs3mft3mfu3mfv3mfw3mfz2w203k6o212m6m2dw2l2cq2l3t3m3u2l17s3r19m3m}'kerning'{cl{5kt4qw}201s{201sw}201t{201tw2wy2yy6q-t}201x{2wy2yy}2k{201tw}2w{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}2x{17ss5ts5os}2y{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}'fof'-6o6t{17ss5ts5qs}7t{5os}3v{5qs}7p{17su5tu5qs}ck{5kt4qw}4l{5kt4qw}cm{5kt4qw}cn{5kt4qw}co{5kt4qw}cp{5kt4qw}6l{4qs5ks5ou5qw5ru17su5tu}17s{2ks}5q{ckvclvcmvcnvcovcpv4lv}5r{ckuclucmucnucoucpu4lu}5t{2ks}6p{4qs5ks5ou5qw5ru17su5tu}ek{4qs5ks5ou5qw5ru17su5tu}el{4qs5ks5ou5qw5ru17su5tu}em{4qs5ks5ou5qw5ru17su5tu}en{4qs5ks5ou5qw5ru17su5tu}eo{4qs5ks5ou5qw5ru17su5tu}ep{4qs5ks5ou5qw5ru17su5tu}es{5ks5qs4qs}et{4qs5ks5ou5qw5ru17su5tu}eu{4qs5ks5qw5ru17su5tu}ev{5ks5qs4qs}ex{17ss5ts5qs}6z{4qv5ks5ou5qw5ru17su5tu}fm{4qv5ks5ou5qw5ru17su5tu}fn{4qv5ks5ou5qw5ru17su5tu}fo{4qv5ks5ou5qw5ru17su5tu}fp{4qv5ks5ou5qw5ru17su5tu}fq{4qv5ks5ou5qw5ru17su5tu}7r{5os}fs{4qv5ks5ou5qw5ru17su5tu}ft{17su5tu5qs}fu{17su5tu5qs}fv{17su5tu5qs}fw{17su5tu5qs}}}"),
        'Times-Roman': uncompress("{'widths'{k3n2q4ycx2l201n3m201o6o201s2l201t2l201u2l201w2w201x2w201y2w2k1t2l2l202m2n2n3m2o3m2p5n202q6o2r1m2s2l2t2l2u3m2v3s2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v1w3w3s3x3s3y3s3z2w4k5w4l4s4m4m4n4m4o4s4p3x4q3r4r4s4s4s4t2l4u2r4v4s4w3x4x5t4y4s4z4s5k3r5l4s5m4m5n3r5o3x5p4s5q4s5r5y5s4s5t4s5u3x5v2l5w1w5x2l5y2z5z3m6k2l6l2w6m3m6n2w6o3m6p2w6q2l6r3m6s3m6t1w6u1w6v3m6w1w6x4y6y3m6z3m7k3m7l3m7m2l7n2r7o1w7p3m7q3m7r4s7s3m7t3m7u2w7v3k7w1o7x3k7y3q202l3mcl4sal2lam3man3mao3map3mar3mas2lat4wau1vav3maw3say4waz2lbk2sbl3s'fof'6obo2lbp3mbq2xbr1tbs2lbu1zbv3mbz2wck4s202k3mcm4scn4sco4scp4scq5tcr4mcs3xct3xcu3xcv3xcw2l2m2tcy2lcz2ldl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek2wel2wem2wen2weo2wep2weq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr3sfs3mft3mfu3mfv3mfw3mfz3m203k6o212m6m2dw2l2cq2l3t3m3u1w17s4s19m3m}'kerning'{cl{4qs5ku17sw5ou5qy5rw201ss5tw201ws}201s{201ss}201t{ckw4lwcmwcnwcowcpwclw4wu201ts}2k{201ts}2w{4qs5kw5os5qx5ru17sx5tx}2x{17sw5tw5ou5qu}2y{4qs5kw5os5qx5ru17sx5tx}'fof'-6o7t{ckuclucmucnucoucpu4lu5os5rs}3u{17su5tu5qs}3v{17su5tu5qs}7p{17sw5tw5qs}ck{4qs5ku17sw5ou5qy5rw201ss5tw201ws}4l{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cm{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cn{4qs5ku17sw5ou5qy5rw201ss5tw201ws}co{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cp{4qs5ku17sw5ou5qy5rw201ss5tw201ws}6l{17su5tu5os5qw5rs}17s{2ktclvcmvcnvcovcpv4lv4wuckv}5o{ckwclwcmwcnwcowcpw4lw4wu}5q{ckyclycmycnycoycpy4ly4wu5ms}5r{cktcltcmtcntcotcpt4lt4ws}5t{2ktclvcmvcnvcovcpv4lv4wuckv}7q{cksclscmscnscoscps4ls}6p{17su5tu5qw5rs}ek{5qs5rs}el{17su5tu5os5qw5rs}em{17su5tu5os5qs5rs}en{17su5qs5rs}eo{5qs5rs}ep{17su5tu5os5qw5rs}es{5qs}et{17su5tu5qw5rs}eu{17su5tu5qs5rs}ev{5qs}6z{17sv5tv5os5qx5rs}fm{5os5qt5rs}fn{17sv5tv5os5qx5rs}fo{17sv5tv5os5qx5rs}fp{5os5qt5rs}fq{5os5qt5rs}7r{ckuclucmucnucoucpu4lu5os}fs{17sv5tv5os5qx5rs}ft{17ss5ts5qs}fu{17sw5tw5qs}fv{17sw5tw5qs}fw{17ss5ts5qs}fz{ckuclucmucnucoucpu4lu5os5rs}}}"),
        'Helvetica-Oblique': uncompress("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}")
      }
    };
    API.events.push(['addFont', function (data) {
      var font = data.font;
      var metrics,
          unicode_section,
          encoding = 'Unicode',
          encodingBlock;
      metrics = fontMetrics[encoding][font.postScriptName];

      if (metrics) {
        if (font.metadata[encoding]) {
          unicode_section = font.metadata[encoding];
        } else {
          unicode_section = font.metadata[encoding] = {};
        }
        unicode_section.widths = metrics.widths;
        unicode_section.kerning = metrics.kerning;
      }
      encodingBlock = encodings[encoding][font.postScriptName];
      if (encodingBlock) {
        if (font.metadata[encoding]) {
          unicode_section = font.metadata[encoding];
        } else {
          unicode_section = font.metadata[encoding] = {};
        }
        unicode_section.encoding = encodingBlock;
        if (encodingBlock.codePages && encodingBlock.codePages.length) {
          font.encoding = encodingBlock.codePages[0];
        }
      }
    }]);
  })(jsPDF.API);
  (function (jsPDF, global) {
    jsPDF.API.events.push(['addFont', function (data) {
      var font = data.font;
      var instance = data.instance;
      if (typeof instance !== "undefined" && instance.existsFileInVFS(font.postScriptName)) {
        var file = instance.getFileFromVFS(font.postScriptName);
        if (typeof file !== "string") {
          throw new Error("Font is not stored as string-data in vFS, import fonts or remove declaration doc.addFont('" + font.postScriptName + "').");
        }
        font.metadata = jsPDF.API.TTFFont.open(font.postScriptName, font.fontName, file, font.encoding);
        font.metadata.Unicode = font.metadata.Unicode || {
          encoding: {},
          kerning: {},
          widths: []
        };
        font.metadata.glyIdsUsed = [0];
      } else if (font.isStandardFont === false) {
        throw new Error("Font does not exist in vFS, import fonts or remove declaration doc.addFont('" + font.postScriptName + "').");
      }
    }]);
  })(jsPDF, typeof self !== "undefined" && self || typeof global !== "undefined" && global || typeof window !== "undefined" && window || Function("return this")());
  (function (jsPDFAPI) {
    jsPDFAPI.addSvg = function (svgtext, x, y, w, h) {
      var undef;
      if (x === undef || y === undef) {
        throw new Error("addSVG needs values for 'x' and 'y'");
      }
      function InjectCSS(cssbody, document) {
        var styletag = document.createElement('style');
        styletag.type = 'text/css';
        if (styletag.styleSheet) {
          styletag.styleSheet.cssText = cssbody;
        } else {
          styletag.appendChild(document.createTextNode(cssbody));
        }
        document.getElementsByTagName("head")[0].appendChild(styletag);
      }
      function createWorkerNode(document) {
        var frameID = 'childframe'
        ,
            frame = document.createElement('iframe');
        InjectCSS('.jsPDF_sillysvg_iframe {display:none;position:absolute;}', document);
        frame.name = frameID;
        frame.setAttribute("width", 0);
        frame.setAttribute("height", 0);
        frame.setAttribute("frameborder", "0");
        frame.setAttribute("scrolling", "no");
        frame.setAttribute("seamless", "seamless");
        frame.setAttribute("class", "jsPDF_sillysvg_iframe");
        document.body.appendChild(frame);
        return frame;
      }
      function attachSVGToWorkerNode(svgtext, frame) {
        var framedoc = (frame.contentWindow || frame.contentDocument).document;
        framedoc.write(svgtext);
        framedoc.close();
        return framedoc.getElementsByTagName('svg')[0];
      }
      function convertPathToPDFLinesArgs(path) {
        var x = parseFloat(path[1]),
            y = parseFloat(path[2]),
            vectors = [],
            position = 3,
            len = path.length;
        while (position < len) {
          if (path[position] === 'c') {
            vectors.push([parseFloat(path[position + 1]), parseFloat(path[position + 2]), parseFloat(path[position + 3]), parseFloat(path[position + 4]), parseFloat(path[position + 5]), parseFloat(path[position + 6])]);
            position += 7;
          } else if (path[position] === 'l') {
            vectors.push([parseFloat(path[position + 1]), parseFloat(path[position + 2])]);
            position += 3;
          } else {
            position += 1;
          }
        }
        return [x, y, vectors];
      }
      var workernode = createWorkerNode(document),
          svgnode = attachSVGToWorkerNode(svgtext, workernode),
          scale = [1, 1],
          svgw = parseFloat(svgnode.getAttribute('width')),
          svgh = parseFloat(svgnode.getAttribute('height'));
      if (svgw && svgh) {
        if (w && h) {
          scale = [w / svgw, h / svgh];
        }
        else if (w) {
            scale = [w / svgw, w / svgw];
          } else if (h) {
            scale = [h / svgh, h / svgh];
          }
      }
      var i,
          l,
          tmp,
          linesargs,
          items = svgnode.childNodes;
      for (i = 0, l = items.length; i < l; i++) {
        tmp = items[i];
        if (tmp.tagName && tmp.tagName.toUpperCase() === 'PATH') {
          linesargs = convertPathToPDFLinesArgs(tmp.getAttribute("d").split(' '));
          linesargs[0] = linesargs[0] * scale[0] + x;
          linesargs[1] = linesargs[1] * scale[1] + y;
          this.lines.call(this, linesargs[2]
          , linesargs[0]
          , linesargs[1]
          , scale);
        }
      }
      return this;
    };
    jsPDFAPI.addSVG = jsPDFAPI.addSvg;
    jsPDFAPI.addSvgAsImage = function (svg, x, y, w, h, alias, compression, rotation) {
      if (isNaN(x) || isNaN(y)) {
        console.error('jsPDF.addSvgAsImage: Invalid coordinates', arguments);
        throw new Error('Invalid coordinates passed to jsPDF.addSvgAsImage');
      }
      if (isNaN(w) || isNaN(h)) {
        console.error('jsPDF.addSvgAsImage: Invalid measurements', arguments);
        throw new Error('Invalid measurements (width and/or height) passed to jsPDF.addSvgAsImage');
      }
      var canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      canvg(canvas, svg, {
        ignoreMouse: true,
        ignoreAnimation: true,
        ignoreDimensions: true,
        ignoreClear: true
      });
      this.addImage(canvas.toDataURL("image/jpeg", 1.0), x, y, w, h, compression, rotation);
      return this;
    };
  })(jsPDF.API);
  (function (jsPDFAPI) {
    jsPDFAPI.putTotalPages = function (pageExpression) {
      var replaceExpression;
      var totalNumberOfPages = 0;
      if (parseInt(this.internal.getFont().id.substr(1), 10) < 15) {
        replaceExpression = new RegExp(pageExpression, 'g');
        totalNumberOfPages = this.internal.getNumberOfPages();
      } else {
        replaceExpression = new RegExp(this.pdfEscape16(pageExpression, this.internal.getFont()), 'g');
        totalNumberOfPages = this.pdfEscape16(this.internal.getNumberOfPages() + '', this.internal.getFont());
      }
      for (var n = 1; n <= this.internal.getNumberOfPages(); n++) {
        for (var i = 0; i < this.internal.pages[n].length; i++) {
          this.internal.pages[n][i] = this.internal.pages[n][i].replace(replaceExpression, totalNumberOfPages);
        }
      }
      return this;
    };
  })(jsPDF.API);
  (function (jsPDFAPI) {
    jsPDFAPI.viewerPreferences = function (options, doReset) {
      options = options || {};
      doReset = doReset || false;
      var configuration;
      var configurationTemplate = {
        "HideToolbar": {
          defaultValue: false,
          value: false,
          type: "boolean",
          explicitSet: false,
          valueSet: [true, false],
          pdfVersion: 1.3
        },
        "HideMenubar": {
          defaultValue: false,
          value: false,
          type: "boolean",
          explicitSet: false,
          valueSet: [true, false],
          pdfVersion: 1.3
        },
        "HideWindowUI": {
          defaultValue: false,
          value: false,
          type: "boolean",
          explicitSet: false,
          valueSet: [true, false],
          pdfVersion: 1.3
        },
        "FitWindow": {
          defaultValue: false,
          value: false,
          type: "boolean",
          explicitSet: false,
          valueSet: [true, false],
          pdfVersion: 1.3
        },
        "CenterWindow": {
          defaultValue: false,
          value: false,
          type: "boolean",
          explicitSet: false,
          valueSet: [true, false],
          pdfVersion: 1.3
        },
        "DisplayDocTitle": {
          defaultValue: false,
          value: false,
          type: "boolean",
          explicitSet: false,
          valueSet: [true, false],
          pdfVersion: 1.4
        },
        "NonFullScreenPageMode": {
          defaultValue: "UseNone",
          value: "UseNone",
          type: "name",
          explicitSet: false,
          valueSet: ["UseNone", "UseOutlines", "UseThumbs", "UseOC"],
          pdfVersion: 1.3
        },
        "Direction": {
          defaultValue: "L2R",
          value: "L2R",
          type: "name",
          explicitSet: false,
          valueSet: ["L2R", "R2L"],
          pdfVersion: 1.3
        },
        "ViewArea": {
          defaultValue: "CropBox",
          value: "CropBox",
          type: "name",
          explicitSet: false,
          valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"],
          pdfVersion: 1.4
        },
        "ViewClip": {
          defaultValue: "CropBox",
          value: "CropBox",
          type: "name",
          explicitSet: false,
          valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"],
          pdfVersion: 1.4
        },
        "PrintArea": {
          defaultValue: "CropBox",
          value: "CropBox",
          type: "name",
          explicitSet: false,
          valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"],
          pdfVersion: 1.4
        },
        "PrintClip": {
          defaultValue: "CropBox",
          value: "CropBox",
          type: "name",
          explicitSet: false,
          valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"],
          pdfVersion: 1.4
        },
        "PrintScaling": {
          defaultValue: "AppDefault",
          value: "AppDefault",
          type: "name",
          explicitSet: false,
          valueSet: ["AppDefault", "None"],
          pdfVersion: 1.6
        },
        "Duplex": {
          defaultValue: "",
          value: "none",
          type: "name",
          explicitSet: false,
          valueSet: ["Simplex", "DuplexFlipShortEdge", "DuplexFlipLongEdge", "none"],
          pdfVersion: 1.7
        },
        "PickTrayByPDFSize": {
          defaultValue: false,
          value: false,
          type: "boolean",
          explicitSet: false,
          valueSet: [true, false],
          pdfVersion: 1.7
        },
        "PrintPageRange": {
          defaultValue: "",
          value: "",
          type: "array",
          explicitSet: false,
          valueSet: null,
          pdfVersion: 1.7
        },
        "NumCopies": {
          defaultValue: 1,
          value: 1,
          type: "integer",
          explicitSet: false,
          valueSet: null,
          pdfVersion: 1.7
        }
      };
      var configurationKeys = Object.keys(configurationTemplate);
      var rangeArray = [];
      var i = 0;
      var j = 0;
      var k = 0;
      var isValid = true;
      var method;
      var value;

      function arrayContainsElement(array, element) {
        var iterator;
        var result = false;
        for (iterator = 0; iterator < array.length; iterator += 1) {
          if (array[iterator] === element) {
            result = true;
          }
        }
        return result;
      }
      if (this.internal.viewerpreferences === undefined) {
        this.internal.viewerpreferences = {};
        this.internal.viewerpreferences.configuration = JSON.parse(JSON.stringify(configurationTemplate));
        this.internal.viewerpreferences.isSubscribed = false;
      }
      configuration = this.internal.viewerpreferences.configuration;
      if (options === "reset" || doReset === true) {
        var len = configurationKeys.length;
        for (k = 0; k < len; k += 1) {
          configuration[configurationKeys[k]].value = configuration[configurationKeys[k]].defaultValue;
          configuration[configurationKeys[k]].explicitSet = false;
        }
      }
      if (_typeof(options) === "object") {
        for (method in options) {
          value = options[method];
          if (arrayContainsElement(configurationKeys, method) && value !== undefined) {
            if (configuration[method].type === "boolean" && typeof value === "boolean") {
              configuration[method].value = value;
            } else if (configuration[method].type === "name" && arrayContainsElement(configuration[method].valueSet, value)) {
              configuration[method].value = value;
            } else if (configuration[method].type === "integer" && Number.isInteger(value)) {
              configuration[method].value = value;
            } else if (configuration[method].type === "array") {
              for (i = 0; i < value.length; i += 1) {
                isValid = true;
                if (value[i].length === 1 && typeof value[i][0] === "number") {
                  rangeArray.push(String(value[i] - 1));
                } else if (value[i].length > 1) {
                  for (j = 0; j < value[i].length; j += 1) {
                    if (typeof value[i][j] !== "number") {
                      isValid = false;
                    }
                  }
                  if (isValid === true) {
                    rangeArray.push([value[i][0] - 1, value[i][1] - 1].join(" "));
                  }
                }
              }
              configuration[method].value = "[" + rangeArray.join(" ") + "]";
            } else {
              configuration[method].value = configuration[method].defaultValue;
            }
            configuration[method].explicitSet = true;
          }
        }
      }
      if (this.internal.viewerpreferences.isSubscribed === false) {
        this.internal.events.subscribe("putCatalog", function () {
          var pdfDict = [];
          var vPref;
          for (vPref in configuration) {
            if (configuration[vPref].explicitSet === true) {
              if (configuration[vPref].type === "name") {
                pdfDict.push("/" + vPref + " /" + configuration[vPref].value);
              } else {
                pdfDict.push("/" + vPref + " " + configuration[vPref].value);
              }
            }
          }
          if (pdfDict.length !== 0) {
            this.internal.write("/ViewerPreferences\n<<\n" + pdfDict.join("\n") + "\n>>");
          }
        });
        this.internal.viewerpreferences.isSubscribed = true;
      }
      this.internal.viewerpreferences.configuration = configuration;
      return this;
    };
  })(jsPDF.API);
  (function (jsPDFAPI) {
    var xmpmetadata = "";
    var xmpnamespaceuri = "";
    var metadata_object_number = "";
    jsPDFAPI.addMetadata = function (metadata, namespaceuri) {
      xmpnamespaceuri = namespaceuri || "http://jspdf.default.namespaceuri/"; //The namespace URI for an XMP name shall not be empty

      xmpmetadata = metadata;
      this.internal.events.subscribe('postPutResources', function () {
        if (!xmpmetadata) {
          metadata_object_number = "";
        } else {
          var xmpmeta_beginning = '<x:xmpmeta xmlns:x="adobe:ns:meta/">';
          var rdf_beginning = '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:jspdf="' + xmpnamespaceuri + '"><jspdf:metadata>';
          var rdf_ending = '</jspdf:metadata></rdf:Description></rdf:RDF>';
          var xmpmeta_ending = '</x:xmpmeta>';
          var utf8_xmpmeta_beginning = unescape(encodeURIComponent(xmpmeta_beginning));
          var utf8_rdf_beginning = unescape(encodeURIComponent(rdf_beginning));
          var utf8_metadata = unescape(encodeURIComponent(xmpmetadata));
          var utf8_rdf_ending = unescape(encodeURIComponent(rdf_ending));
          var utf8_xmpmeta_ending = unescape(encodeURIComponent(xmpmeta_ending));
          var total_len = utf8_rdf_beginning.length + utf8_metadata.length + utf8_rdf_ending.length + utf8_xmpmeta_beginning.length + utf8_xmpmeta_ending.length;
          metadata_object_number = this.internal.newObject();
          this.internal.write('<< /Type /Metadata /Subtype /XML /Length ' + total_len + ' >>');
          this.internal.write('stream');
          this.internal.write(utf8_xmpmeta_beginning + utf8_rdf_beginning + utf8_metadata + utf8_rdf_ending + utf8_xmpmeta_ending);
          this.internal.write('endstream');
          this.internal.write('endobj');
        }
      });
      this.internal.events.subscribe('putCatalog', function () {
        if (metadata_object_number) {
          this.internal.write('/Metadata ' + metadata_object_number + ' 0 R');
        }
      });
      return this;
    };
  })(jsPDF.API);
  (function (jsPDF, global) {
    var jsPDFAPI = jsPDF.API;
    function toHex(str) {
      var hex = '';
      for (var i = 0; i < str.length; i++) {
        hex += '' + str.charCodeAt(i).toString(16);
      }
      return hex;
    }
    var pdfEscape16 = jsPDFAPI.pdfEscape16 = function (text, font) {
      var widths = font.metadata.Unicode.widths;
      var padz = ["", "0", "00", "000", "0000"];
      var ar = [""];
      for (var i = 0, l = text.length, t; i < l; ++i) {
        t = font.metadata.characterToGlyph(text.charCodeAt(i));
        font.metadata.glyIdsUsed.push(t);
        font.metadata.toUnicode[t] = text.charCodeAt(i);
        if (widths.indexOf(t) == -1) {
          widths.push(t);
          widths.push([parseInt(font.metadata.widthOfGlyph(t), 10)]);
        }
        if (t == '0') {
          return ar.join("");
        } else {
          t = t.toString(16);
          ar.push(padz[4 - t.length], t);
        }
      }
      return ar.join("");
    };
    var toUnicodeCmap = function toUnicodeCmap(map) {
      var code, codes, range, unicode, unicodeMap, _i, _len;
      unicodeMap = '/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo <<\n  /Registry (Adobe)\n  /Ordering (UCS)\n  /Supplement 0\n>> def\n/CMapName /Adobe-Identity-UCS def\n/CMapType 2 def\n1 begincodespacerange\n<0000><ffff>\nendcodespacerange';
      codes = Object.keys(map).sort(function (a, b) {
        return a - b;
      });
      range = [];
      for (_i = 0, _len = codes.length; _i < _len; _i++) {
        code = codes[_i];
        if (range.length >= 100) {
          unicodeMap += "\n" + range.length + " beginbfchar\n" + range.join('\n') + "\nendbfchar";
          range = [];
        }
        unicode = ('0000' + map[code].toString(16)).slice(-4);
        code = ('0000' + (+code).toString(16)).slice(-4);
        range.push("<" + code + "><" + unicode + ">");
      }
      if (range.length) {
        unicodeMap += "\n" + range.length + " beginbfchar\n" + range.join('\n') + "\nendbfchar\n";
      }
      unicodeMap += 'endcmap\nCMapName currentdict /CMap defineresource pop\nend\nend';
      return unicodeMap;
    };
    var identityHFunction = function identityHFunction(font, out, newObject, putStream) {
      if (font.metadata instanceof jsPDF.API.TTFFont && font.encoding === 'Identity-H') {
        var widths = font.metadata.Unicode.widths;
        var data = font.metadata.subset.encode(font.metadata.glyIdsUsed, 1);
        var pdfOutput = data;
        var pdfOutput2 = "";
        for (var i = 0; i < pdfOutput.length; i++) {
          pdfOutput2 += String.fromCharCode(pdfOutput[i]);
        }
        var fontTable = newObject();
        putStream({
          data: pdfOutput2,
          addLength1: true
        });
        out('endobj');
        var cmap = newObject();
        var cmapData = toUnicodeCmap(font.metadata.toUnicode);
        putStream({
          data: cmapData,
          addLength1: true
        });
        out('endobj');
        var fontDescriptor = newObject();
        out('<<');
        out('/Type /FontDescriptor');
        out('/FontName /' + font.fontName);
        out('/FontFile2 ' + fontTable + ' 0 R');
        out('/FontBBox ' + jsPDF.API.PDFObject.convert(font.metadata.bbox));
        out('/Flags ' + font.metadata.flags);
        out('/StemV ' + font.metadata.stemV);
        out('/ItalicAngle ' + font.metadata.italicAngle);
        out('/Ascent ' + font.metadata.ascender);
        out('/Descent ' + font.metadata.decender);
        out('/CapHeight ' + font.metadata.capHeight);
        out('>>');
        out('endobj');
        var DescendantFont = newObject();
        out('<<');
        out('/Type /Font');
        out('/BaseFont /' + font.fontName);
        out('/FontDescriptor ' + fontDescriptor + ' 0 R');
        out('/W ' + jsPDF.API.PDFObject.convert(widths));
        out('/CIDToGIDMap /Identity');
        out('/DW 1000');
        out('/Subtype /CIDFontType2');
        out('/CIDSystemInfo');
        out('<<');
        out('/Supplement 0');
        out('/Registry (Adobe)');
        out('/Ordering (' + font.encoding + ')');
        out('>>');
        out('>>');
        out('endobj');
        font.objectNumber = newObject();
        out('<<');
        out('/Type /Font');
        out('/Subtype /Type0');
        out('/ToUnicode ' + cmap + ' 0 R');
        out('/BaseFont /' + font.fontName);
        out('/Encoding /' + font.encoding);
        out('/DescendantFonts [' + DescendantFont + ' 0 R]');
        out('>>');
        out('endobj');
        font.isAlreadyPutted = true;
      }
    };
    jsPDFAPI.events.push(['putFont', function (args) {
      identityHFunction(args.font, args.out, args.newObject, args.putStream);
    }]);
    var winAnsiEncodingFunction = function winAnsiEncodingFunction(font, out, newObject, putStream) {
      if (font.metadata instanceof jsPDF.API.TTFFont && font.encoding === 'WinAnsiEncoding') {
        var widths = font.metadata.Unicode.widths;
        var data = font.metadata.rawData;
        var pdfOutput = data;
        var pdfOutput2 = "";
        for (var i = 0; i < pdfOutput.length; i++) {
          pdfOutput2 += String.fromCharCode(pdfOutput[i]);
        }
        var fontTable = newObject();
        putStream({
          data: pdfOutput2,
          addLength1: true
        });
        out('endobj');
        var cmap = newObject();
        var cmapData = toUnicodeCmap(font.metadata.toUnicode);
        putStream({
          data: cmapData,
          addLength1: true
        });
        out('endobj');
        var fontDescriptor = newObject();
        out('<<');
        out('/Descent ' + font.metadata.decender);
        out('/CapHeight ' + font.metadata.capHeight);
        out('/StemV ' + font.metadata.stemV);
        out('/Type /FontDescriptor');
        out('/FontFile2 ' + fontTable + ' 0 R');
        out('/Flags 96');
        out('/FontBBox ' + jsPDF.API.PDFObject.convert(font.metadata.bbox));
        out('/FontName /' + font.fontName);
        out('/ItalicAngle ' + font.metadata.italicAngle);
        out('/Ascent ' + font.metadata.ascender);
        out('>>');
        out('endobj');
        font.objectNumber = newObject();
        for (var i = 0; i < font.metadata.hmtx.widths.length; i++) {
          font.metadata.hmtx.widths[i] = parseInt(font.metadata.hmtx.widths[i] * (1000 / font.metadata.head.unitsPerEm));
        }
        out('<</Subtype/TrueType/Type/Font/ToUnicode ' + cmap + ' 0 R/BaseFont/' + font.fontName + '/FontDescriptor ' + fontDescriptor + ' 0 R' + '/Encoding/' + font.encoding + ' /FirstChar 29 /LastChar 255 /Widths ' + jsPDF.API.PDFObject.convert(font.metadata.hmtx.widths) + '>>');
        out('endobj');
        font.isAlreadyPutted = true;
      }
    };
    jsPDFAPI.events.push(['putFont', function (args) {
      winAnsiEncodingFunction(args.font, args.out, args.newObject, args.putStream);
    }]);
    var utf8TextFunction = function utf8TextFunction(args) {
      var text = args.text || '';
      var x = args.x;
      var y = args.y;
      var options = args.options || {};
      var mutex = args.mutex || {};
      var pdfEscape = mutex.pdfEscape;
      var activeFontKey = mutex.activeFontKey;
      var fonts = mutex.fonts;
      var key,
          fontSize = mutex.activeFontSize;
      var str = '',
          s = 0,
          cmapConfirm;
      var strText = '';
      var key = activeFontKey;
      var encoding = fonts[key].encoding;
      if (fonts[key].encoding !== 'Identity-H') {
        return {
          text: text,
          x: x,
          y: y,
          options: options,
          mutex: mutex
        };
      }
      strText = text;
      key = activeFontKey;
      if (Object.prototype.toString.call(text) === '[object Array]') {
        strText = text[0];
      }
      for (s = 0; s < strText.length; s += 1) {
        if (fonts[key].metadata.hasOwnProperty('cmap')) {
          cmapConfirm = fonts[key].metadata.cmap.unicode.codeMap[strText[s].charCodeAt(0)];
        }
        if (!cmapConfirm) {
          if (strText[s].charCodeAt(0) < 256 && fonts[key].metadata.hasOwnProperty('Unicode')) {
            str += strText[s];
          } else {
            str += '';
          }
        } else {
          str += strText[s];
        }
      }
      var result = '';
      if (parseInt(key.slice(1)) < 14 || encoding === 'WinAnsiEncoding') {
        result = toHex(pdfEscape(str, key));
      } else if (encoding === 'Identity-H') {
        result = pdfEscape16(str, fonts[key]);
      }
      mutex.isHex = true;
      return {
        text: result,
        x: x,
        y: y,
        options: options,
        mutex: mutex
      };
    };
    var utf8EscapeFunction = function utf8EscapeFunction(parms) {
      var text = parms.text || '',
          x = parms.x,
          y = parms.y,
          options = parms.options,
          mutex = parms.mutex;
      var lang = options.lang;
      var tmpText = [];
      var args = {
        text: text,
        x: x,
        y: y,
        options: options,
        mutex: mutex
      };
      if (Object.prototype.toString.call(text) === '[object Array]') {
        var i = 0;
        for (i = 0; i < text.length; i += 1) {
          if (Object.prototype.toString.call(text[i]) === '[object Array]') {
            if (text[i].length === 3) {
              tmpText.push([utf8TextFunction(Object.assign({}, args, {
                text: text[i][0]
              })).text, text[i][1], text[i][2]]);
            } else {
              tmpText.push(utf8TextFunction(Object.assign({}, args, {
                text: text[i]
              })).text);
            }
          } else {
            tmpText.push(utf8TextFunction(Object.assign({}, args, {
              text: text[i]
            })).text);
          }
        }
        parms.text = tmpText;
      } else {
        parms.text = utf8TextFunction(Object.assign({}, args, {
          text: text
        })).text;
      }
    };
    jsPDFAPI.events.push(['postProcessText', utf8EscapeFunction]);
  })(jsPDF, typeof self !== "undefined" && self || typeof global !== "undefined" && global || typeof window !== "undefined" && window || Function("return this")());
  (function (jsPDFAPI) {

    var _initializeVFS = function _initializeVFS(instance) {
      if (typeof instance === "undefined") {
        return false;
      }

      if (typeof instance.vFS === "undefined") {
        instance.vFS = {};
      }

      return true;
    };
    jsPDFAPI.existsFileInVFS = function (filename) {
      if (_initializeVFS(this.internal)) {
        return typeof this.internal.vFS[filename] !== "undefined";
      }
      return false;
    };
    jsPDFAPI.addFileToVFS = function (filename, filecontent) {
      _initializeVFS(this.internal);

      this.internal.vFS[filename] = filecontent;
      return this;
    };
    jsPDFAPI.getFileFromVFS = function (filename) {
      _initializeVFS(this.internal);

      if (typeof this.internal.vFS[filename] !== "undefined") {
        return this.internal.vFS[filename];
      }
      return null;
    };
  })(jsPDF.API);
  (function (jsPDFAPI) {
    jsPDFAPI.addHTML = function (element, x, y, options, callback) {
      if (typeof html2canvas === 'undefined' && typeof rasterizeHTML === 'undefined') throw new Error('You need either ' + 'https://github.com/niklasvh/html2canvas' + ' or https://github.com/cburgmer/rasterizeHTML.js');
      if (typeof x !== 'number') {
        options = x;
        callback = y;
      }
      if (typeof options === 'function') {
        callback = options;
        options = null;
      }
      if (typeof callback !== 'function') {
        callback = function callback() {};
      }
      var I = this.internal,
          K = I.scaleFactor,
          W = I.pageSize.getWidth(),
          H = I.pageSize.getHeight();
      options = options || {};
      options.onrendered = function (obj) {
        x = parseInt(x) || 0;
        y = parseInt(y) || 0;
        var dim = options.dim || {};
        var margin = Object.assign({
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          useFor: 'content'
        }, options.margin);
        var h = dim.h || Math.min(H, obj.height / K);
        var w = dim.w || Math.min(W, obj.width / K) - x;
        var format = options.format || 'JPEG';
        var imageCompression = options.imageCompression || 'SLOW';
        var notFittingHeight = obj.height > H - margin.top - margin.bottom;
        if (notFittingHeight && options.pagesplit) {
          var cropArea = function cropArea(parmObj, parmX, parmY, parmWidth, parmHeight) {
            var canvas = document.createElement('canvas');
            canvas.height = parmHeight;
            canvas.width = parmWidth;
            var ctx = canvas.getContext('2d');
            ctx.mozImageSmoothingEnabled = false;
            ctx.webkitImageSmoothingEnabled = false;
            ctx.msImageSmoothingEnabled = false;
            ctx.imageSmoothingEnabled = false;
            ctx.fillStyle = options.backgroundColor || '#ffffff';
            ctx.fillRect(0, 0, parmWidth, parmHeight);
            ctx.drawImage(parmObj, parmX, parmY, parmWidth, parmHeight, 0, 0, parmWidth, parmHeight);
            return canvas;
          };
          var crop = function () {
            var cy = 0;
            var cx = 0;
            var position = {};
            var isOverWide = false;
            var width;
            var height;
            while (1) {
              cx = 0;
              position.top = cy !== 0 ? margin.top : y;
              position.left = cy !== 0 ? margin.left : x;
              isOverWide = (W - margin.left - margin.right) * K < obj.width;
              if (margin.useFor === "content") {
                if (cy === 0) {
                  width = Math.min((W - margin.left) * K, obj.width);
                  height = Math.min((H - margin.top) * K, obj.height - cy);
                } else {
                  width = Math.min(W * K, obj.width);
                  height = Math.min(H * K, obj.height - cy);
                  position.top = 0;
                }
              } else {
                width = Math.min((W - margin.left - margin.right) * K, obj.width);
                height = Math.min((H - margin.bottom - margin.top) * K, obj.height - cy);
              }
              if (isOverWide) {
                while (1) {
                  if (margin.useFor === "content") {
                    if (cx === 0) {
                      width = Math.min((W - margin.left) * K, obj.width);
                    } else {
                      width = Math.min(W * K, obj.width - cx);
                      position.left = 0;
                    }
                  }
                  var canvas = cropArea(obj, cx, cy, width, height);
                  var args = [canvas, position.left, position.top, canvas.width / K, canvas.height / K, format, null, imageCompression];
                  this.addImage.apply(this, args);
                  cx += width;
                  if (cx >= obj.width) {
                    break;
                  }
                  this.addPage();
                }
              } else {
                var canvas = cropArea(obj, 0, cy, width, height);
                var args = [canvas, position.left, position.top, canvas.width / K, canvas.height / K, format, null, imageCompression];
                this.addImage.apply(this, args);
              }
              cy += height;
              if (cy >= obj.height) {
                break;
              }
              this.addPage();
            }
            callback(w, cy, null, args);
          }.bind(this);
          if (obj.nodeName === 'CANVAS') {
            var img = new Image();
            img.onload = crop;
            img.src = obj.toDataURL("image/png");
            obj = img;
          } else {
            crop();
          }
        } else {
          var alias = Math.random().toString(35);
          var args = [obj, x, y, w, h, format, alias, imageCompression];
          this.addImage.apply(this, args);
          callback(w, h, alias, args);
        }
      }.bind(this);
      if (typeof html2canvas !== 'undefined' && !options.rstz) {
        return html2canvas(element, options);
      }
      if (typeof rasterizeHTML !== 'undefined') {
        var meth = 'drawDocument';
        if (typeof element === 'string') {
          meth = /^http/.test(element) ? 'drawURL' : 'drawHTML';
        }
        options.width = options.width || W * K;
        return rasterizeHTML[meth](element, void 0, options).then(function (r) {
          options.onrendered(r.image);
        }, function (e) {
          callback(null, e);
        });
      }
      return null;
    };
  })(jsPDF.API);
  (function (jsPDFAPI) {
    var clone, _DrillForContent, FontNameDB, FontStyleMap, TextAlignMap, FontWeightMap, FloatMap, ClearMap, GetCSS, PurgeWhiteSpace, Renderer, ResolveFont, ResolveUnitedNumber, UnitedNumberMap, elementHandledElsewhere, images, loadImgs, checkForFooter, process, tableToJson;
    clone = function () {
      return function (obj) {
        Clone.prototype = obj;
        return new Clone();
      };

      function Clone() {}
    }();

    PurgeWhiteSpace = function PurgeWhiteSpace(array) {
      var fragment, i, l, lTrimmed, r, rTrimmed, trailingSpace;
      i = 0;
      l = array.length;
      fragment = void 0;
      lTrimmed = false;
      rTrimmed = false;

      while (!lTrimmed && i !== l) {
        fragment = array[i] = array[i].trimLeft();

        if (fragment) {
          lTrimmed = true;
        }

        i++;
      }

      i = l - 1;

      while (l && !rTrimmed && i !== -1) {
        fragment = array[i] = array[i].trimRight();

        if (fragment) {
          rTrimmed = true;
        }

        i--;
      }

      r = /\s+$/g;
      trailingSpace = true;
      i = 0;

      while (i !== l) {
        if (array[i] != "\u2028") {
          fragment = array[i].replace(/\s+/g, " ");

          if (trailingSpace) {
            fragment = fragment.trimLeft();
          }

          if (fragment) {
            trailingSpace = r.test(fragment);
          }

          array[i] = fragment;
        }

        i++;
      }

      return array;
    };

    Renderer = function Renderer(pdf, x, y, settings) {
      this.pdf = pdf;
      this.x = x;
      this.y = y;
      this.settings = settings;
      this.watchFunctions = [];
      this.init();
      return this;
    };

    ResolveFont = function ResolveFont(css_font_family_string) {
      var name, part, parts;
      name = void 0;
      parts = css_font_family_string.split(",");
      part = parts.shift();

      while (!name && part) {
        name = FontNameDB[part.trim().toLowerCase()];
        part = parts.shift();
      }
      return name;
    };
    ResolveUnitedNumber = function ResolveUnitedNumber(css_line_height_string) {
      css_line_height_string = css_line_height_string === "auto" ? "0px" : css_line_height_string;
      if (css_line_height_string.indexOf("em") > -1 && !isNaN(Number(css_line_height_string.replace("em", "")))) {
        css_line_height_string = Number(css_line_height_string.replace("em", "")) * 18.719 + "px";
      }
      if (css_line_height_string.indexOf("pt") > -1 && !isNaN(Number(css_line_height_string.replace("pt", "")))) {
        css_line_height_string = Number(css_line_height_string.replace("pt", "")) * 1.333 + "px";
      }
      var normal, undef, value;
      undef = void 0;
      normal = 16.00;
      value = UnitedNumberMap[css_line_height_string];
      if (value) {
        return value;
      }
      value = {
        "xx-small": 9,
        "x-small": 11,
        small: 13,
        medium: 16,
        large: 19,
        "x-large": 23,
        "xx-large": 28,
        auto: 0
      }[css_line_height_string];
      if (value !== undef) {
        return UnitedNumberMap[css_line_height_string] = value / normal;
      }
      if (value = parseFloat(css_line_height_string)) {
        return UnitedNumberMap[css_line_height_string] = value / normal;
      }
      value = css_line_height_string.match(/([\d\.]+)(px)/);
      if (Array.isArray(value) && value.length === 3) {
        return UnitedNumberMap[css_line_height_string] = parseFloat(value[1]) / normal;
      }
      return UnitedNumberMap[css_line_height_string] = 1;
    };
    GetCSS = function GetCSS(element) {
      var css, tmp, computedCSSElement;
      computedCSSElement = function (el) {
        var compCSS;
        compCSS = function (el) {
          if (document.defaultView && document.defaultView.getComputedStyle) {
            return document.defaultView.getComputedStyle(el, null);
          } else if (el.currentStyle) {
            return el.currentStyle;
          } else {
            return el.style;
          }
        }(el);
        return function (prop) {
          prop = prop.replace(/-\D/g, function (match) {
            return match.charAt(1).toUpperCase();
          });
          return compCSS[prop];
        };
      }(element);
      css = {};
      tmp = void 0;
      css["font-family"] = ResolveFont(computedCSSElement("font-family")) || "times";
      css["font-style"] = FontStyleMap[computedCSSElement("font-style")] || "normal";
      css["text-align"] = TextAlignMap[computedCSSElement("text-align")] || "left";
      tmp = FontWeightMap[computedCSSElement("font-weight")] || "normal";
      if (tmp === "bold") {
        if (css["font-style"] === "normal") {
          css["font-style"] = tmp;
        } else {
          css["font-style"] = tmp + css["font-style"];
        }
      }
      css["font-size"] = ResolveUnitedNumber(computedCSSElement("font-size")) || 1;
      css["line-height"] = ResolveUnitedNumber(computedCSSElement("line-height")) || 1;
      css["display"] = computedCSSElement("display") === "inline" ? "inline" : "block";
      tmp = css["display"] === "block";
      css["margin-top"] = tmp && ResolveUnitedNumber(computedCSSElement("margin-top")) || 0;
      css["margin-bottom"] = tmp && ResolveUnitedNumber(computedCSSElement("margin-bottom")) || 0;
      css["padding-top"] = tmp && ResolveUnitedNumber(computedCSSElement("padding-top")) || 0;
      css["padding-bottom"] = tmp && ResolveUnitedNumber(computedCSSElement("padding-bottom")) || 0;
      css["margin-left"] = tmp && ResolveUnitedNumber(computedCSSElement("margin-left")) || 0;
      css["margin-right"] = tmp && ResolveUnitedNumber(computedCSSElement("margin-right")) || 0;
      css["padding-left"] = tmp && ResolveUnitedNumber(computedCSSElement("padding-left")) || 0;
      css["padding-right"] = tmp && ResolveUnitedNumber(computedCSSElement("padding-right")) || 0;
      css["page-break-before"] = computedCSSElement("page-break-before") || "auto"; //float and clearing of floats

      css["float"] = FloatMap[computedCSSElement("cssFloat")] || "none";
      css["clear"] = ClearMap[computedCSSElement("clear")] || "none";
      css["color"] = computedCSSElement("color");
      return css;
    };
    elementHandledElsewhere = function elementHandledElsewhere(element, renderer, elementHandlers) {
      var handlers, i, isHandledElsewhere, l, classNames;
      isHandledElsewhere = false;
      i = void 0;
      l = void 0;
      handlers = elementHandlers["#" + element.id];
      if (handlers) {
        if (typeof handlers === "function") {
          isHandledElsewhere = handlers(element, renderer);
        } else {
          i = 0;
          l = handlers.length;
          while (!isHandledElsewhere && i !== l) {
            isHandledElsewhere = handlers[i](element, renderer);
            i++;
          }
        }
      }
      handlers = elementHandlers[element.nodeName];
      if (!isHandledElsewhere && handlers) {
        if (typeof handlers === "function") {
          isHandledElsewhere = handlers(element, renderer);
        } else {
          i = 0;
          l = handlers.length;
          while (!isHandledElsewhere && i !== l) {
            isHandledElsewhere = handlers[i](element, renderer);
            i++;
          }
        }
      }
      classNames = typeof element.className === 'string' ? element.className.split(' ') : [];
      for (i = 0; i < classNames.length; i++) {
        handlers = elementHandlers['.' + classNames[i]];
        if (!isHandledElsewhere && handlers) {
          if (typeof handlers === "function") {
            isHandledElsewhere = handlers(element, renderer);
          } else {
            i = 0;
            l = handlers.length;
            while (!isHandledElsewhere && i !== l) {
              isHandledElsewhere = handlers[i](element, renderer);
              i++;
            }
          }
        }
      }
      return isHandledElsewhere;
    };
    tableToJson = function tableToJson(table, renderer) {
      var data, headers, i, j, rowData, tableRow, table_obj, table_with, cell, l;
      data = [];
      headers = [];
      i = 0;
      l = table.rows[0].cells.length;
      table_with = table.clientWidth;
      while (i < l) {
        cell = table.rows[0].cells[i];
        headers[i] = {
          name: cell.textContent.toLowerCase().replace(/\s+/g, ''),
          prompt: cell.textContent.replace(/\r?\n/g, ''),
          width: cell.clientWidth / table_with * renderer.pdf.internal.pageSize.getWidth()
        };
        i++;
      }
      i = 1;
      while (i < table.rows.length) {
        tableRow = table.rows[i];
        rowData = {};
        j = 0;
        while (j < tableRow.cells.length) {
          rowData[headers[j].name] = tableRow.cells[j].textContent.replace(/\r?\n/g, '');
          j++;
        }
        data.push(rowData);
        i++;
      }
      return table_obj = {
        rows: data,
        headers: headers
      };
    };
    var SkipNode = {
      SCRIPT: 1,
      STYLE: 1,
      NOSCRIPT: 1,
      OBJECT: 1,
      EMBED: 1,
      SELECT: 1
    };
    var listCount = 1;
    _DrillForContent = function DrillForContent(element, renderer, elementHandlers) {
      var cn, cns, fragmentCSS, i, isBlock, l, table2json, cb;
      cns = element.childNodes;
      cn = void 0;
      fragmentCSS = GetCSS(element);
      isBlock = fragmentCSS.display === "block";
      if (isBlock) {
        renderer.setBlockBoundary();
        renderer.setBlockStyle(fragmentCSS);
      }
      i = 0;
      l = cns.length;
      while (i < l) {
        cn = cns[i];
        if (_typeof(cn) === "object") {
          renderer.executeWatchFunctions(cn);
          if (cn.nodeType === 1 && cn.nodeName === 'HEADER') {
            var header = cn;
            var oldMarginTop = renderer.pdf.margins_doc.top;
            renderer.pdf.internal.events.subscribe('addPage', function (pageInfo) {
              renderer.y = oldMarginTop;
              _DrillForContent(header, renderer, elementHandlers);
              renderer.pdf.margins_doc.top = renderer.y + 10;
              renderer.y += 10;
            }, false);
          }
          if (cn.nodeType === 8 && cn.nodeName === "#comment") {
            if (~cn.textContent.indexOf("ADD_PAGE")) {
              renderer.pdf.addPage();
              renderer.y = renderer.pdf.margins_doc.top;
            }
          } else if (cn.nodeType === 1 && !SkipNode[cn.nodeName]) {
            var cached_image;
            if (cn.nodeName === "IMG") {
              var url = cn.getAttribute("src");
              cached_image = images[renderer.pdf.sHashCode(url) || url];
            }
            if (cached_image) {
              if (renderer.pdf.internal.pageSize.getHeight() - renderer.pdf.margins_doc.bottom < renderer.y + cn.height && renderer.y > renderer.pdf.margins_doc.top) {
                renderer.pdf.addPage();
                renderer.y = renderer.pdf.margins_doc.top;
                renderer.executeWatchFunctions(cn);
              }
              var imagesCSS = GetCSS(cn);
              var imageX = renderer.x;
              var fontToUnitRatio = 12 / renderer.pdf.internal.scaleFactor;
              var additionalSpaceLeft = (imagesCSS["margin-left"] + imagesCSS["padding-left"]) * fontToUnitRatio;
              var additionalSpaceRight = (imagesCSS["margin-right"] + imagesCSS["padding-right"]) * fontToUnitRatio;
              var additionalSpaceTop = (imagesCSS["margin-top"] + imagesCSS["padding-top"]) * fontToUnitRatio;
              var additionalSpaceBottom = (imagesCSS["margin-bottom"] + imagesCSS["padding-bottom"]) * fontToUnitRatio;
              if (imagesCSS['float'] !== undefined && imagesCSS['float'] === 'right') {
                imageX += renderer.settings.width - cn.width - additionalSpaceRight;
              } else {
                imageX += additionalSpaceLeft;
              }
              renderer.pdf.addImage(cached_image, imageX, renderer.y + additionalSpaceTop, cn.width, cn.height);
              cached_image = undefined;
              if (imagesCSS['float'] === 'right' || imagesCSS['float'] === 'left') {
                renderer.watchFunctions.push(function (diffX, thresholdY, diffWidth, el) {
                  if (renderer.y >= thresholdY) {
                    renderer.x += diffX;
                    renderer.settings.width += diffWidth;
                    return true;
                  } else if (el && el.nodeType === 1 && !SkipNode[el.nodeName] && renderer.x + el.width > renderer.pdf.margins_doc.left + renderer.pdf.margins_doc.width) {
                    renderer.x += diffX;
                    renderer.y = thresholdY;
                    renderer.settings.width += diffWidth;
                    return true;
                  } else {
                    return false;
                  }
                }.bind(this, imagesCSS['float'] === 'left' ? -cn.width - additionalSpaceLeft - additionalSpaceRight : 0, renderer.y + cn.height + additionalSpaceTop + additionalSpaceBottom, cn.width));
                renderer.watchFunctions.push(function (yPositionAfterFloating, pages, el) {
                  if (renderer.y < yPositionAfterFloating && pages === renderer.pdf.internal.getNumberOfPages()) {
                    if (el.nodeType === 1 && GetCSS(el).clear === 'both') {
                      renderer.y = yPositionAfterFloating;
                      return true;
                    } else {
                      return false;
                    }
                  } else {
                    return true;
                  }
                }.bind(this, renderer.y + cn.height, renderer.pdf.internal.getNumberOfPages()));
                renderer.settings.width -= cn.width + additionalSpaceLeft + additionalSpaceRight;
                if (imagesCSS['float'] === 'left') {
                  renderer.x += cn.width + additionalSpaceLeft + additionalSpaceRight;
                }
              } else {
                renderer.y += cn.height + additionalSpaceTop + additionalSpaceBottom;
              }
            } else if (cn.nodeName === "TABLE") {
              table2json = tableToJson(cn, renderer);
              renderer.y += 10;
              renderer.pdf.table(renderer.x, renderer.y, table2json.rows, table2json.headers, {
                autoSize: false,
                printHeaders: elementHandlers.printHeaders,
                margins: renderer.pdf.margins_doc,
                css: GetCSS(cn)
              });
              renderer.y = renderer.pdf.lastCellPos.y + renderer.pdf.lastCellPos.h + 20;
            } else if (cn.nodeName === "OL" || cn.nodeName === "UL") {
              listCount = 1;
              if (!elementHandledElsewhere(cn, renderer, elementHandlers)) {
                _DrillForContent(cn, renderer, elementHandlers);
              }
              renderer.y += 10;
            } else if (cn.nodeName === "LI") {
              var temp = renderer.x;
              renderer.x += 20 / renderer.pdf.internal.scaleFactor;
              renderer.y += 3;
              if (!elementHandledElsewhere(cn, renderer, elementHandlers)) {
                _DrillForContent(cn, renderer, elementHandlers);
              }
              renderer.x = temp;
            } else if (cn.nodeName === "BR") {
              renderer.y += fragmentCSS["font-size"] * renderer.pdf.internal.scaleFactor;
              renderer.addText("\u2028", clone(fragmentCSS));
            } else {
              if (!elementHandledElsewhere(cn, renderer, elementHandlers)) {
                _DrillForContent(cn, renderer, elementHandlers);
              }
            }
          } else if (cn.nodeType === 3) {
            var value = cn.nodeValue;
            if (cn.nodeValue && cn.parentNode.nodeName === "LI") {
              if (cn.parentNode.parentNode.nodeName === "OL") {
                value = listCount++ + '. ' + value;
              } else {
                var fontSize = fragmentCSS["font-size"];
                var offsetX = (3 - fontSize * 0.75) * renderer.pdf.internal.scaleFactor;
                var offsetY = fontSize * 0.75 * renderer.pdf.internal.scaleFactor;
                var radius = fontSize * 1.74 / renderer.pdf.internal.scaleFactor;
                cb = function cb(x, y) {
                  this.pdf.circle(x + offsetX, y + offsetY, radius, 'FD');
                };
              }
            }
            if (!!(cn.ownerDocument.body.compareDocumentPosition(cn) & 16)) {
              renderer.addText(value, fragmentCSS);
            }
          } else if (typeof cn === "string") {
            renderer.addText(cn, fragmentCSS);
          }
        }
        i++;
      }
      elementHandlers.outY = renderer.y;
      if (isBlock) {
        return renderer.setBlockBoundary(cb);
      }
    };
    images = {};
    loadImgs = function loadImgs(element, renderer, elementHandlers, cb) {
      var imgs = element.getElementsByTagName('img'),
          l = imgs.length,
          found_images,
          x = 0;
      function done() {
        renderer.pdf.internal.events.publish('imagesLoaded');
        cb(found_images);
      }
      function loadImage(url, width, height) {
        if (!url) return;
        var img = new Image();
        found_images = ++x;
        img.crossOrigin = '';

        img.onerror = img.onload = function () {
          if (img.complete) {
            if (img.src.indexOf('data:image/') === 0) {
              img.width = width || img.width || 0;
              img.height = height || img.height || 0;
            }
            if (img.width + img.height) {
              var hash = renderer.pdf.sHashCode(url) || url;
              images[hash] = images[hash] || img;
            }
          }
          if (! --x) {
            done();
          }
        };
        img.src = url;
      }
      while (l--) {
        loadImage(imgs[l].getAttribute("src"), imgs[l].width, imgs[l].height);
      }
      return x || done();
    };
    checkForFooter = function checkForFooter(elem, renderer, elementHandlers) {
      var footer = elem.getElementsByTagName("footer");
      if (footer.length > 0) {
        footer = footer[0];
        var oldOut = renderer.pdf.internal.write;
        var oldY = renderer.y;
        renderer.pdf.internal.write = function () {};
        _DrillForContent(footer, renderer, elementHandlers);
        var footerHeight = Math.ceil(renderer.y - oldY) + 5;
        renderer.y = oldY;
        renderer.pdf.internal.write = oldOut;
        renderer.pdf.margins_doc.bottom += footerHeight;
        var renderFooter = function renderFooter(pageInfo) {
          var pageNumber = pageInfo !== undefined ? pageInfo.pageNumber : 1;
          var oldPosition = renderer.y;
          renderer.y = renderer.pdf.internal.pageSize.getHeight() - renderer.pdf.margins_doc.bottom;
          renderer.pdf.margins_doc.bottom -= footerHeight;
          var spans = footer.getElementsByTagName('span');
          for (var i = 0; i < spans.length; ++i) {
            if ((" " + spans[i].className + " ").replace(/[\n\t]/g, " ").indexOf(" pageCounter ") > -1) {
              spans[i].innerHTML = pageNumber;
            }
            if ((" " + spans[i].className + " ").replace(/[\n\t]/g, " ").indexOf(" totalPages ") > -1) {
              spans[i].innerHTML = '###jsPDFVarTotalPages###';
            }
          }
          _DrillForContent(footer, renderer, elementHandlers);
          renderer.pdf.margins_doc.bottom += footerHeight;
          renderer.y = oldPosition;
        };
        var spans = footer.getElementsByTagName('span');
        for (var i = 0; i < spans.length; ++i) {
          if ((" " + spans[i].className + " ").replace(/[\n\t]/g, " ").indexOf(" totalPages ") > -1) {
            renderer.pdf.internal.events.subscribe('htmlRenderingFinished', renderer.pdf.putTotalPages.bind(renderer.pdf, '###jsPDFVarTotalPages###'), true);
          }
        }
        renderer.pdf.internal.events.subscribe('addPage', renderFooter, false);
        renderFooter();
        SkipNode['FOOTER'] = 1;
      }
    };
    process = function process(pdf, element, x, y, settings, callback) {
      if (!element) return false;
      if (typeof element !== "string" && !element.parentNode) element = '' + element.innerHTML;
      if (typeof element === "string") {
        element = function (element) {
          var $frame, $hiddendiv, framename, visuallyhidden;
          framename = "jsPDFhtmlText" + Date.now().toString() + (Math.random() * 1000).toFixed(0);
          visuallyhidden = "position: absolute !important;" + "clip: rect(1px 1px 1px 1px); /* IE6, IE7 */" + "clip: rect(1px, 1px, 1px, 1px);" + "padding:0 !important;" + "border:0 !important;" + "height: 1px !important;" + "width: 1px !important; " + "top:auto;" + "left:-100px;" + "overflow: hidden;";
          $hiddendiv = document.createElement('div');
          $hiddendiv.style.cssText = visuallyhidden;
          $hiddendiv.innerHTML = "<iframe style=\"height:1px;width:1px\" name=\"" + framename + "\" />";
          document.body.appendChild($hiddendiv);
          $frame = window.frames[framename];
          $frame.document.open();
          $frame.document.writeln(element);
          $frame.document.close();
          return $frame.document.body;
        }(element.replace(/<\/?script[^>]*?>/gi, ''));
      }
      var r = new Renderer(pdf, x, y, settings),
          out;
      loadImgs.call(this, element, r, settings.elementHandlers, function (found_images) {
        checkForFooter(element, r, settings.elementHandlers);
        _DrillForContent(element, r, settings.elementHandlers);
        r.pdf.internal.events.publish('htmlRenderingFinished');
        out = r.dispose();
        if (typeof callback === 'function') callback(out);else if (found_images) console.error('jsPDF Warning: rendering issues? provide a callback to fromHTML!');
      });
      return out || {
        x: r.x,
        y: r.y
      };
    };
    Renderer.prototype.init = function () {
      this.paragraph = {
        text: [],
        style: []
      };
      return this.pdf.internal.write("q");
    };
    Renderer.prototype.dispose = function () {
      this.pdf.internal.write("Q");
      return {
        x: this.x,
        y: this.y,
        ready: true
      };
    };
    Renderer.prototype.executeWatchFunctions = function (el) {
      var ret = false;
      var narray = [];
      if (this.watchFunctions.length > 0) {
        for (var i = 0; i < this.watchFunctions.length; ++i) {
          if (this.watchFunctions[i](el) === true) {
            ret = true;
          } else {
            narray.push(this.watchFunctions[i]);
          }
        }
        this.watchFunctions = narray;
      }
      return ret;
    };
    Renderer.prototype.splitFragmentsIntoLines = function (fragments, styles) {
      var currentLineLength, defaultFontSize, ff, fontMetrics, fontMetricsCache, fragment, fragmentChopped, fragmentLength, fragmentSpecificMetrics, fs, k, line, lines, maxLineLength, style;
      defaultFontSize = 12;
      k = this.pdf.internal.scaleFactor;
      fontMetricsCache = {};
      ff = void 0;
      fs = void 0;
      fontMetrics = void 0;
      fragment = void 0;
      style = void 0;
      fragmentSpecificMetrics = void 0;
      fragmentLength = void 0;
      fragmentChopped = void 0;
      line = [];
      lines = [line];
      currentLineLength = 0;
      maxLineLength = this.settings.width;
      while (fragments.length) {
        fragment = fragments.shift();
        style = styles.shift();
        if (fragment) {
          ff = style["font-family"];
          fs = style["font-style"];
          fontMetrics = fontMetricsCache[ff + fs];
          if (!fontMetrics) {
            fontMetrics = this.pdf.internal.getFont(ff, fs).metadata.Unicode;
            fontMetricsCache[ff + fs] = fontMetrics;
          }
          fragmentSpecificMetrics = {
            widths: fontMetrics.widths,
            kerning: fontMetrics.kerning,
            fontSize: style["font-size"] * defaultFontSize,
            textIndent: currentLineLength
          };
          fragmentLength = this.pdf.getStringUnitWidth(fragment, fragmentSpecificMetrics) * fragmentSpecificMetrics.fontSize / k;
          if (fragment == "\u2028") {
            line = [];
            lines.push(line);
          } else if (currentLineLength + fragmentLength > maxLineLength) {
            fragmentChopped = this.pdf.splitTextToSize(fragment, maxLineLength, fragmentSpecificMetrics);
            line.push([fragmentChopped.shift(), style]);
            while (fragmentChopped.length) {
              line = [[fragmentChopped.shift(), style]];
              lines.push(line);
            }
            currentLineLength = this.pdf.getStringUnitWidth(line[0][0], fragmentSpecificMetrics) * fragmentSpecificMetrics.fontSize / k;
          } else {
            line.push([fragment, style]);
            currentLineLength += fragmentLength;
          }
        }
      }
      if (style['text-align'] !== undefined && (style['text-align'] === 'center' || style['text-align'] === 'right' || style['text-align'] === 'justify')) {
        for (var i = 0; i < lines.length; ++i) {
          var length = this.pdf.getStringUnitWidth(lines[i][0][0], fragmentSpecificMetrics) * fragmentSpecificMetrics.fontSize / k;
          if (i > 0) {
            lines[i][0][1] = clone(lines[i][0][1]);
          }
          var space = maxLineLength - length;
          if (style['text-align'] === 'right') {
            lines[i][0][1]['margin-left'] = space;
          } else if (style['text-align'] === 'center') {
            lines[i][0][1]['margin-left'] = space / 2;
          } else if (style['text-align'] === 'justify') {
            var countSpaces = lines[i][0][0].split(' ').length - 1;
            lines[i][0][1]['word-spacing'] = space / countSpaces;
            if (i === lines.length - 1) {
              lines[i][0][1]['word-spacing'] = 0;
            }
          }
        }
      }
      return lines;
    };
    Renderer.prototype.RenderTextFragment = function (text, style) {
      var defaultFontSize, font, maxLineHeight;
      maxLineHeight = 0;
      defaultFontSize = 12;
      if (this.pdf.internal.pageSize.getHeight() - this.pdf.margins_doc.bottom < this.y + this.pdf.internal.getFontSize()) {
        this.pdf.internal.write("ET", "Q");
        this.pdf.addPage();
        this.y = this.pdf.margins_doc.top;
        this.pdf.internal.write("q", "BT", this.getPdfColor(style.color), this.pdf.internal.getCoordinateString(this.x), this.pdf.internal.getVerticalCoordinateString(this.y), "Td");
        maxLineHeight = Math.max(maxLineHeight, style["line-height"], style["font-size"]);
        this.pdf.internal.write(0, (-1 * defaultFontSize * maxLineHeight).toFixed(2), "Td");
      }
      font = this.pdf.internal.getFont(style["font-family"], style["font-style"]);
      var pdfTextColor = this.getPdfColor(style["color"]);
      if (pdfTextColor !== this.lastTextColor) {
        this.pdf.internal.write(pdfTextColor);
        this.lastTextColor = pdfTextColor;
      }
      if (style['word-spacing'] !== undefined && style['word-spacing'] > 0) {
        this.pdf.internal.write(style['word-spacing'].toFixed(2), "Tw");
      }
      this.pdf.internal.write("/" + font.id, (defaultFontSize * style["font-size"]).toFixed(2), "Tf", "(" + this.pdf.internal.pdfEscape(text) + ") Tj");
      if (style['word-spacing'] !== undefined) {
        this.pdf.internal.write(0, "Tw");
      }
    };
    Renderer.prototype.getPdfColor = function (style) {
      var textColor;
      var r, g, b;
      var rx = /rgb\s*\(\s*(\d+),\s*(\d+),\s*(\d+\s*)\)/;
      var m = rx.exec(style);
      if (m != null) {
        r = parseInt(m[1]);
        g = parseInt(m[2]);
        b = parseInt(m[3]);
      } else {
        if (typeof style === "string" && style.charAt(0) != '#') {
          var rgbColor = new RGBColor(style);
          if (rgbColor.ok) {
            style = rgbColor.toHex();
          } else {
            style = '#000000';
          }
        }
        r = style.substring(1, 3);
        r = parseInt(r, 16);
        g = style.substring(3, 5);
        g = parseInt(g, 16);
        b = style.substring(5, 7);
        b = parseInt(b, 16);
      }
      if (typeof r === 'string' && /^#[0-9A-Fa-f]{6}$/.test(r)) {
        var hex = parseInt(r.substr(1), 16);
        r = hex >> 16 & 255;
        g = hex >> 8 & 255;
        b = hex & 255;
      }
      var f3 = this.f3;
      if (r === 0 && g === 0 && b === 0 || typeof g === 'undefined') {
        textColor = f3(r / 255) + ' g';
      } else {
        textColor = [f3(r / 255), f3(g / 255), f3(b / 255), 'rg'].join(' ');
      }
      return textColor;
    };
    Renderer.prototype.f3 = function (number) {
      return number.toFixed(3);
    }, Renderer.prototype.renderParagraph = function (cb) {
      var blockstyle, defaultFontSize, fontToUnitRatio, fragments, i, l, line, lines, maxLineHeight, out, paragraphspacing_after, paragraphspacing_before, priorblockstyle, styles, fontSize;
      fragments = PurgeWhiteSpace(this.paragraph.text);
      styles = this.paragraph.style;
      blockstyle = this.paragraph.blockstyle;
      priorblockstyle = this.paragraph.priorblockstyle || {};
      this.paragraph = {
        text: [],
        style: [],
        blockstyle: {},
        priorblockstyle: blockstyle
      };
      if (!fragments.join("").trim()) {
        return;
      }
      lines = this.splitFragmentsIntoLines(fragments, styles);
      line = void 0;
      maxLineHeight = void 0;
      defaultFontSize = 12;
      fontToUnitRatio = defaultFontSize / this.pdf.internal.scaleFactor;
      this.priorMarginBottom = this.priorMarginBottom || 0;
      paragraphspacing_before = (Math.max((blockstyle["margin-top"] || 0) - this.priorMarginBottom, 0) + (blockstyle["padding-top"] || 0)) * fontToUnitRatio;
      paragraphspacing_after = ((blockstyle["margin-bottom"] || 0) + (blockstyle["padding-bottom"] || 0)) * fontToUnitRatio;
      this.priorMarginBottom = blockstyle["margin-bottom"] || 0;
      if (blockstyle['page-break-before'] === 'always') {
        this.pdf.addPage();
        this.y = 0;
        paragraphspacing_before = ((blockstyle["margin-top"] || 0) + (blockstyle["padding-top"] || 0)) * fontToUnitRatio;
      }
      out = this.pdf.internal.write;
      i = void 0;
      l = void 0;
      this.y += paragraphspacing_before;
      out("q", "BT 0 g", this.pdf.internal.getCoordinateString(this.x), this.pdf.internal.getVerticalCoordinateString(this.y), "Td");
      var currentIndent = 0;
      while (lines.length) {
        line = lines.shift();
        maxLineHeight = 0;
        i = 0;
        l = line.length;
        while (i !== l) {
          if (line[i][0].trim()) {
            maxLineHeight = Math.max(maxLineHeight, line[i][1]["line-height"], line[i][1]["font-size"]);
            fontSize = line[i][1]["font-size"] * 7;
          }
          i++;
        }
        var indentMove = 0;
        var wantedIndent = 0;
        if (line[0][1]["margin-left"] !== undefined && line[0][1]["margin-left"] > 0) {
          wantedIndent = this.pdf.internal.getCoordinateString(line[0][1]["margin-left"]);
          indentMove = wantedIndent - currentIndent;
          currentIndent = wantedIndent;
        }
        var indentMore = Math.max(blockstyle["margin-left"] || 0, 0) * fontToUnitRatio;
        out(indentMove + indentMore, (-1 * defaultFontSize * maxLineHeight).toFixed(2), "Td");
        i = 0;
        l = line.length;
        while (i !== l) {
          if (line[i][0]) {
            this.RenderTextFragment(line[i][0], line[i][1]);
          }
          i++;
        }
        this.y += maxLineHeight * fontToUnitRatio;
        if (this.executeWatchFunctions(line[0][1]) && lines.length > 0) {
          var localFragments = [];
          var localStyles = [];
          lines.forEach(function (localLine) {
            var i = 0;
            var l = localLine.length;
            while (i !== l) {
              if (localLine[i][0]) {
                localFragments.push(localLine[i][0] + ' ');
                localStyles.push(localLine[i][1]);
              }
              ++i;
            }
          });
          lines = this.splitFragmentsIntoLines(PurgeWhiteSpace(localFragments), localStyles);
          out("ET", "Q");
          out("q", "BT 0 g", this.pdf.internal.getCoordinateString(this.x), this.pdf.internal.getVerticalCoordinateString(this.y), "Td");
        }
      }
      if (cb && typeof cb === "function") {
        cb.call(this, this.x - 9, this.y - fontSize / 2);
      }
      out("ET", "Q");
      return this.y += paragraphspacing_after;
    };
    Renderer.prototype.setBlockBoundary = function (cb) {
      return this.renderParagraph(cb);
    };
    Renderer.prototype.setBlockStyle = function (css) {
      return this.paragraph.blockstyle = css;
    };
    Renderer.prototype.addText = function (text, css) {
      this.paragraph.text.push(text);
      return this.paragraph.style.push(css);
    };
    FontNameDB = {
      helvetica: "helvetica",
      "sans-serif": "helvetica",
      "times new roman": "times",
      serif: "times",
      times: "times",
      monospace: "courier",
      courier: "courier"
    };
    FontWeightMap = {
      100: "normal",
      200: "normal",
      300: "normal",
      400: "normal",
      500: "bold",
      600: "bold",
      700: "bold",
      800: "bold",
      900: "bold",
      normal: "normal",
      bold: "bold",
      bolder: "bold",
      lighter: "normal"
    };
    FontStyleMap = {
      normal: "normal",
      italic: "italic",
      oblique: "italic"
    };
    TextAlignMap = {
      left: "left",
      right: "right",
      center: "center",
      justify: "justify"
    };
    FloatMap = {
      none: 'none',
      right: 'right',
      left: 'left'
    };
    ClearMap = {
      none: 'none',
      both: 'both'
    };
    UnitedNumberMap = {
      normal: 1
    };
    jsPDFAPI.fromHTML = function (HTML, x, y, settings, callback, margins) {
      this.margins_doc = margins || {
        top: 0,
        bottom: 0
      };
      if (!settings) settings = {};
      if (!settings.elementHandlers) settings.elementHandlers = {};
      return process(this, HTML, isNaN(x) ? 4 : x, isNaN(y) ? 4 : y, settings, callback);
    };
  })(jsPDF.API);
  (function (jsPDFAPI, globalObj) {
    globalObj.html2pdf = function (html, pdf, callback) {
      var canvas = pdf.canvas;
      if (!canvas) {
        alert('jsPDF canvas plugin not installed');
        return;
      }
      canvas.pdf = pdf;
      pdf.annotations = {
        _nameMap: [],
        createAnnotation: function createAnnotation(href, bounds) {
          var x = pdf.context2d._wrapX(bounds.left);
          var y = pdf.context2d._wrapY(bounds.top);
          var page = pdf.context2d._page(bounds.top);
          var options;
          var index = href.indexOf('#');
          if (index >= 0) {
            options = {
              name: href.substring(index + 1)
            };
          } else {
            options = {
              url: href
            };
          }
          pdf.link(x, y, bounds.right - bounds.left, bounds.bottom - bounds.top, options);
        },
        setName: function setName(name, bounds) {
          var x = pdf.context2d._wrapX(bounds.left);
          var y = pdf.context2d._wrapY(bounds.top);
          var page = pdf.context2d._page(bounds.top);
          this._nameMap[name] = {
            page: page,
            x: x,
            y: y
          };
        }
      };
      canvas.annotations = pdf.annotations;
      pdf.context2d._pageBreakAt = function (y) {
        this.pageBreaks.push(y);
      };
      pdf.context2d._gotoPage = function (pageOneBased) {
        while (pdf.internal.getNumberOfPages() < pageOneBased) {
          pdf.addPage();
        }
        pdf.setPage(pageOneBased);
      };
      var htmlElement;
      var height;
      if (typeof html === 'string') {
        html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        var iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        var doc;
        var body;
        doc = iframe.contentDocument;
        if (doc == undefined || doc == null) {
          doc = iframe.contentWindow.document;
        }
        doc.open();
        doc.write(html);
        doc.close();
        htmlElement = doc.body;
        body = doc.body || {}, html = doc.documentElement || {};
        height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      } else {
        htmlElement = html;
        body = html.body || {}, height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      }
      height = pdf.internal.pageSize.getHeight();
      var options = {
        async: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        canvas: canvas,
        imageTimeout: 15000,
        logging: true,
        proxy: null,
        removeContainer: true,
        foreignObjectRendering: false,
        useCORS: false,
        windowHeight: height,
        scrollY: height
      };
      pdf.context2d.pageWrapYEnabled = true;
      pdf.context2d.pageWrapY = pdf.internal.pageSize.getHeight();
      var promise = html2canvas(htmlElement, options).then(function (canvas) {
        if (callback) {
          if (iframe) {
            iframe.parentElement.removeChild(iframe);
          }
          callback(pdf);
        }
      });
    };
  })(jsPDF.API, typeof window !== "undefined" && window || typeof global !== "undefined" && global);
  window.tmp = html2pdf;
  (function (global) {
    var BlobBuilder = global.BlobBuilder || global.WebKitBlobBuilder || global.MSBlobBuilder || global.MozBlobBuilder;
    global.URL = global.URL || global.webkitURL || function (href, a) {
      a = document.createElement('a');
      a.href = href;
      return a;
    };
    var origBlob = global.Blob;
    var createObjectURL = URL.createObjectURL;
    var revokeObjectURL = URL.revokeObjectURL;
    var strTag = global.Symbol && global.Symbol.toStringTag;
    var blobSupported = false;
    var blobSupportsArrayBufferView = false;
    var arrayBufferSupported = !!global.ArrayBuffer;
    var blobBuilderSupported = BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob;
    try {
      blobSupported = new Blob(['ä']).size === 2;
      blobSupportsArrayBufferView = new Blob([new Uint8Array([1, 2])]).size === 2;
    } catch (e) {}
    function mapArrayBufferViews(ary) {
      return ary.map(function (chunk) {
        if (chunk.buffer instanceof ArrayBuffer) {
          var buf = chunk.buffer;
          if (chunk.byteLength !== buf.byteLength) {
            var copy = new Uint8Array(chunk.byteLength);
            copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
            buf = copy.buffer;
          }
          return buf;
        }
        return chunk;
      });
    }
    function BlobBuilderConstructor(ary, options) {
      options = options || {};
      var bb = new BlobBuilder();
      mapArrayBufferViews(ary).forEach(function (part) {
        bb.append(part);
      });
      return options.type ? bb.getBlob(options.type) : bb.getBlob();
    }
    function BlobConstructor(ary, options) {
      return new origBlob(mapArrayBufferViews(ary), options || {});
    }
    if (global.Blob) {
      BlobBuilderConstructor.prototype = Blob.prototype;
      BlobConstructor.prototype = Blob.prototype;
    }
    function FakeBlobBuilder() {
      function toUTF8Array(str) {
        var utf8 = [];
        for (var i = 0; i < str.length; i++) {
          var charcode = str.charCodeAt(i);
          if (charcode < 0x80) utf8.push(charcode);else if (charcode < 0x800) {
            utf8.push(0xc0 | charcode >> 6, 0x80 | charcode & 0x3f);
          } else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | charcode >> 12, 0x80 | charcode >> 6 & 0x3f, 0x80 | charcode & 0x3f);
          }
          else {
              i++;
              charcode = 0x10000 + ((charcode & 0x3ff) << 10 | str.charCodeAt(i) & 0x3ff);
              utf8.push(0xf0 | charcode >> 18, 0x80 | charcode >> 12 & 0x3f, 0x80 | charcode >> 6 & 0x3f, 0x80 | charcode & 0x3f);
            }
        }
        return utf8;
      }
      function fromUtf8Array(array) {
        var out, i, len, c;
        var char2, char3;
        out = "";
        len = array.length;
        i = 0;
        while (i < len) {
          c = array[i++];
          switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
              out += String.fromCharCode(c);
              break;
            case 12:
            case 13:
              char2 = array[i++];
              out += String.fromCharCode((c & 0x1F) << 6 | char2 & 0x3F);
              break;
            case 14:
              char2 = array[i++];
              char3 = array[i++];
              out += String.fromCharCode((c & 0x0F) << 12 | (char2 & 0x3F) << 6 | (char3 & 0x3F) << 0);
              break;
          }
        }
        return out;
      }
      function isDataView(obj) {
        return obj && DataView.prototype.isPrototypeOf(obj);

      function bufferClone(buf) {
        var view = new Array(buf.byteLength);
        var array = new Uint8Array(buf);
        var i = view.length;
        while (i--) {
          view[i] = array[i];
        }
        return view;
      }
      function encodeByteArray(input) {
        var byteToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var output = [];
        for (var i = 0; i < input.length; i += 3) {
          var byte1 = input[i];
          var haveByte2 = i + 1 < input.length;
          var byte2 = haveByte2 ? input[i + 1] : 0;
          var haveByte3 = i + 2 < input.length;
          var byte3 = haveByte3 ? input[i + 2] : 0;
          var outByte1 = byte1 >> 2;
          var outByte2 = (byte1 & 0x03) << 4 | byte2 >> 4;
          var outByte3 = (byte2 & 0x0F) << 2 | byte3 >> 6;
          var outByte4 = byte3 & 0x3F;
          if (!haveByte3) {
            outByte4 = 64;
            if (!haveByte2) {
              outByte3 = 64;
            }
          }
          output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
        }
        return output.join('');
      }
      var create = Object.create || function (a) {
        function c() {
        c.prototype = a;
        return new c();
      };
      if (arrayBufferSupported) {
        var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];
        var isArrayBufferView = ArrayBuffer.isView || function (obj) {
          return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
        };
      }
      function Blob(chunks, opts) {
        chunks = chunks || [];
        for (var i = 0, len = chunks.length; i < len; i++) {
          var chunk = chunks[i];
          if (chunk instanceof Blob) {
            chunks[i] = chunk._buffer;
          } else if (typeof chunk === 'string') {
            chunks[i] = toUTF8Array(chunk);
          } else if (arrayBufferSupported && (ArrayBuffer.prototype.isPrototypeOf(chunk) || isArrayBufferView(chunk))) {
            chunks[i] = bufferClone(chunk);
          } else if (arrayBufferSupported && isDataView(chunk)) {
            chunks[i] = bufferClone(chunk.buffer);
          } else {
            chunks[i] = toUTF8Array(String(chunk));
          }
        }
        this._buffer = [].concat.apply([], chunks);
        this.size = this._buffer.length;
        this.type = opts ? opts.type || '' : '';
      }
      Blob.prototype.slice = function (start, end, type) {
        var slice = this._buffer.slice(start || 0, end || this._buffer.length);
        return new Blob([slice], {
          type: type
        });
      };
      Blob.prototype.toString = function () {
        return '[object Blob]';
      };
      function File(chunks, name, opts) {
        opts = opts || {};
        var a = Blob.call(this, chunks, opts) || this;
        a.name = name;
        a.lastModifiedDate = opts.lastModified ? new Date(opts.lastModified) : new Date();
        a.lastModified = +a.lastModifiedDate;
        return a;
      }
      File.prototype = create(Blob.prototype);
      File.prototype.constructor = File;
      if (Object.setPrototypeOf) Object.setPrototypeOf(File, Blob);else {
        try {
          File.__proto__ = Blob;
        } catch (e) {}
      }
      File.prototype.toString = function () {
        return '[object File]';
      };
      function FileReader() {
        if (!(this instanceof FileReader)) throw new TypeError("Failed to construct 'FileReader': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
        var delegate = document.createDocumentFragment();
        this.addEventListener = delegate.addEventListener;
        this.dispatchEvent = function (evt) {
          var local = this['on' + evt.type];
          if (typeof local === 'function') local(evt);
          delegate.dispatchEvent(evt);
        };
        this.removeEventListener = delegate.removeEventListener;
      }
      function _read(fr, blob, kind) {
        if (!(blob instanceof Blob)) throw new TypeError("Failed to execute '" + kind + "' on 'FileReader': parameter 1 is not of type 'Blob'.");
        fr.result = '';
        setTimeout(function () {
          this.readyState = FileReader.LOADING;
          fr.dispatchEvent(new Event('load'));
          fr.dispatchEvent(new Event('loadend'));
        });
      }
      FileReader.EMPTY = 0;
      FileReader.LOADING = 1;
      FileReader.DONE = 2;
      FileReader.prototype.error = null;
      FileReader.prototype.onabort = null;
      FileReader.prototype.onerror = null;
      FileReader.prototype.onload = null;
      FileReader.prototype.onloadend = null;
      FileReader.prototype.onloadstart = null;
      FileReader.prototype.onprogress = null;
      FileReader.prototype.readAsDataURL = function (blob) {
        _read(this, blob, 'readAsDataURL');
        this.result = 'data:' + blob.type + ';base64,' + encodeByteArray(blob._buffer);
      };
      FileReader.prototype.readAsText = function (blob) {
        _read(this, blob, 'readAsText');
        this.result = fromUtf8Array(blob._buffer);
      };
      FileReader.prototype.readAsArrayBuffer = function (blob) {
        _read(this, blob, 'readAsText');
        this.result = blob._buffer.slice();
      };
      FileReader.prototype.abort = function () {};
      URL.createObjectURL = function (blob) {
        return blob instanceof Blob ? 'data:' + blob.type + ';base64,' + encodeByteArray(blob._buffer) : createObjectURL.call(URL, blob);
      };
      URL.revokeObjectURL = function (url) {
        revokeObjectURL && revokeObjectURL.call(URL, url);
      };
      var _send = global.XMLHttpRequest && global.XMLHttpRequest.prototype.send;
      if (_send) {
        XMLHttpRequest.prototype.send = function (data) {
          if (data instanceof Blob) {
            this.setRequestHeader('Content-Type', data.type)
            _send.call(this, fromUtf8Array(data._buffer));
          } else {
            _send.call(this, data);
          }
        };
      }
      global.FileReader = FileReader;
      global.File = File;
      global.Blob = Blob;
    }
    if (strTag) {
      try {
        File.prototype[strTag] = 'File';
        Blob.prototype[strTag] = 'Blob';
        FileReader.prototype[strTag] = 'FileReader';
      } catch (e) {}
    }
    function fixFileAndXHR() {
      var isIE = !!global.ActiveXObject || '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;
      var _send = global.XMLHttpRequest && global.XMLHttpRequest.prototype.send;
      if (isIE && _send) {
        XMLHttpRequest.prototype.send = function (data) {
          if (data instanceof Blob) {
            this.setRequestHeader('Content-Type', data.type);
            _send.call(this, data);
          } else {
            _send.call(this, data);
          }
        };
      }
      try {
        new File([], '');
      } catch (e) {
        try {
          var klass = new Function('class File extends Blob {' + 'constructor(chunks, name, opts) {' + 'opts = opts || {};' + 'super(chunks, opts || {});' + 'this.name = name;' + 'this.lastModifiedDate = opts.lastModified ? new Date(opts.lastModified) : new Date;' + 'this.lastModified = +this.lastModifiedDate;' + '}};' + 'return new File([], ""), File')();
          global.File = klass;
        } catch (e) {
          var klass = function klass(b, d, c) {
            var blob = new Blob(b, c);
            var t = c && void 0 !== c.lastModified ? new Date(c.lastModified) : new Date();
            blob.name = d;
            blob.lastModifiedDate = t;
            blob.lastModified = +t
            blob.toString = function () {
              return '[object File]';
            };
            if (strTag) blob[strTag] = 'File';
            return blob;
          };
          global.File = klass;
        }
      }
    }
    if (blobSupported) {
      fixFileAndXHR();
      global.Blob = blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
    } else if (blobBuilderSupported) {
      fixFileAndXHR();
      global.Blob = BlobBuilderConstructor;
    } else {
      FakeBlobBuilder();
    }
  })(typeof self !== "undefined" && self || typeof window !== "undefined" && window || typeof global !== "undefined" && global || Function('return typeof this === "object" && this.content')() || Function('return this')());
  var saveAs = saveAs || function (view) {
    if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
      return;
    }
    var doc = view.document
    ,
        get_URL = function () {
      return view.URL || view.webkitURL || view;
    },
        save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a"),
        can_use_save_link = "download" in save_link,
        click = function (node) {
      var event = new MouseEvent("click");
      node.dispatchEvent(event);
    },
        is_safari = /constructor/i.test(view.HTMLElement) || view.safari,
        is_chrome_ios = /CriOS\/[\d]+/.test(navigator.userAgent),
        setImmediate = view.setImmediate || view.setTimeout,
        throw_outside = function (ex) {
      setImmediate(function () {
        throw ex;
      }, 0);
    },
        force_saveable_type = "application/octet-stream"
    ,
        arbitrary_revoke_timeout = 1000 * 40 // in ms
    ,
        revoke = function (file) {
      var revoker = function () {
        if (typeof file === "string") {
          get_URL().revokeObjectURL(file);
        } else {
          file.remove();
        }
      };
      setTimeout(revoker, arbitrary_revoke_timeout);
    },
        dispatch = function (filesaver, event_types, event) {
      event_types = [].concat(event_types);
      var i = event_types.length;
      while (i--) {
        var listener = filesaver["on" + event_types[i]];
        if (typeof listener === "function") {
          try {
            listener.call(filesaver, event || filesaver);
          } catch (ex) {
            throw_outside(ex);
          }
        }
      }
    },
        auto_bom = function (blob) {
      if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
        return new Blob([String.fromCharCode(0xFEFF), blob], {
          type: blob.type
        });
      }
      return blob;
    },
        FileSaver = function (blob, name, no_auto_bom) {
      if (!no_auto_bom) {
        blob = auto_bom(blob);
      }
      var filesaver = this,
          type = blob.type,
          force = type === force_saveable_type,
          object_url,
          dispatch_all = function () {
        dispatch(filesaver, "writestart progress write writeend".split(" "));
      }
      ,
          fs_error = function () {
        if ((is_chrome_ios || force && is_safari) && view.FileReader) {
          var reader = new FileReader();
          reader.onloadend = function () {
            var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
            var popup = view.open(url, '_blank');
            if (!popup) view.location.href = url;
            url = undefined;
            filesaver.readyState = filesaver.DONE;
            dispatch_all();
          };
          reader.readAsDataURL(blob);
          filesaver.readyState = filesaver.INIT;
          return;
        }
        if (!object_url) {
          object_url = get_URL().createObjectURL(blob);
        }
        if (force) {
          view.location.href = object_url;
        } else {
          var opened = view.open(object_url, "_blank");
          if (!opened) {
            view.location.href = object_url;
          }
        }
        filesaver.readyState = filesaver.DONE;
        dispatch_all();
        revoke(object_url);
      };
      filesaver.readyState = filesaver.INIT;
      if (can_use_save_link) {
        object_url = get_URL().createObjectURL(blob);
        setImmediate(function () {
          save_link.href = object_url;
          save_link.download = name;
          click(save_link);
          dispatch_all();
          revoke(object_url);
          filesaver.readyState = filesaver.DONE;
        }, 0);
        return;
      }

      fs_error();
    },
        FS_proto = FileSaver.prototype,
        saveAs = function (blob, name, no_auto_bom) {
      return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
    };
    if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
      return function (blob, name, no_auto_bom) {
        name = name || blob.name || "download";
        if (!no_auto_bom) {
          blob = auto_bom(blob);
        }
        return navigator.msSaveOrOpenBlob(blob, name);
      };
    }
    FS_proto.abort = function () {};
    FS_proto.readyState = FS_proto.INIT = 0;
    FS_proto.WRITING = 1;
    FS_proto.DONE = 2;
    FS_proto.error = FS_proto.onwritestart = FS_proto.onprogress = FS_proto.onwrite = FS_proto.onabort = FS_proto.onerror = FS_proto.onwriteend = null;
    return saveAs;
  }(typeof self !== "undefined" && self || typeof window !== "undefined" && window || undefined);
  function GifWriter(buf, width, height, gopts) {
    var p = 0;
    var gopts = gopts === undefined ? {} : gopts;
    var loop_count = gopts.loop === undefined ? null : gopts.loop;
    var global_palette = gopts.palette === undefined ? null : gopts.palette;
    if (width <= 0 || height <= 0 || width > 65535 || height > 65535) throw "Width/Height invalid.";
    function check_palette_and_num_colors(palette) {
      var num_colors = palette.length;
      if (num_colors < 2 || num_colors > 256 || num_colors & num_colors - 1) throw "Invalid code/color length, must be power of 2 and 2 .. 256.";
      return num_colors;
    }
    buf[p++] = 0x47;
    buf[p++] = 0x49;
    buf[p++] = 0x46;
    buf[p++] = 0x38;
    buf[p++] = 0x39;
    buf[p++] = 0x61;
    var gp_num_colors_pow2 = 0;
    var background = 0;
    if (global_palette !== null) {
      var gp_num_colors = check_palette_and_num_colors(global_palette);
      while (gp_num_colors >>= 1) ++gp_num_colors_pow2;
      gp_num_colors = 1 << gp_num_colors_pow2;
      --gp_num_colors_pow2;
      if (gopts.background !== undefined) {
        background = gopts.background;
        if (background >= gp_num_colors) throw "Background index out of range.";
        if (background === 0) throw "Background index explicitly passed as 0.";
      }
    }
    buf[p++] = width & 0xff;
    buf[p++] = width >> 8 & 0xff;
    buf[p++] = height & 0xff;
    buf[p++] = height >> 8 & 0xff;
    buf[p++] = (global_palette !== null ? 0x80 : 0) |
    gp_num_colors_pow2;
    buf[p++] = background;
    buf[p++] = 0;
    if (global_palette !== null) {
      for (var i = 0, il = global_palette.length; i < il; ++i) {
        var rgb = global_palette[i];
        buf[p++] = rgb >> 16 & 0xff;
        buf[p++] = rgb >> 8 & 0xff;
        buf[p++] = rgb & 0xff;
      }
    }
    if (loop_count !== null) {
      if (loop_count < 0 || loop_count > 65535) throw "Loop count invalid.";
      buf[p++] = 0x21;
      buf[p++] = 0xff;
      buf[p++] = 0x0b;
      buf[p++] = 0x4e;
      buf[p++] = 0x45;
      buf[p++] = 0x54;
      buf[p++] = 0x53;
      buf[p++] = 0x43;
      buf[p++] = 0x41;
      buf[p++] = 0x50;
      buf[p++] = 0x45;
      buf[p++] = 0x32;
      buf[p++] = 0x2e;
      buf[p++] = 0x30;
      buf[p++] = 0x03;
      buf[p++] = 0x01;
      buf[p++] = loop_count & 0xff;
      buf[p++] = loop_count >> 8 & 0xff;
      buf[p++] = 0x00;
    }
    var ended = false;
    this.addFrame = function (x, y, w, h, indexed_pixels, opts) {
      if (ended === true) {
        --p;
        ended = false;
      }
      opts = opts === undefined ? {} : opts;
      if (x < 0 || y < 0 || x > 65535 || y > 65535) throw "x/y invalid.";
      if (w <= 0 || h <= 0 || w > 65535 || h > 65535) throw "Width/Height invalid.";
      if (indexed_pixels.length < w * h) throw "Not enough pixels for the frame size.";
      var using_local_palette = true;
      var palette = opts.palette;
      if (palette === undefined || palette === null) {
        using_local_palette = false;
        palette = global_palette;
      }
      if (palette === undefined || palette === null) throw "Must supply either a local or global palette.";
      var num_colors = check_palette_and_num_colors(palette);
      var min_code_size = 0;
      while (num_colors >>= 1) ++min_code_size;
      num_colors = 1 << min_code_size;
      var delay = opts.delay === undefined ? 0 : opts.delay;
      var disposal = opts.disposal === undefined ? 0 : opts.disposal;
      if (disposal < 0 || disposal > 3)
        throw "Disposal out of range.";
      var use_transparency = false;
      var transparent_index = 0;
      if (opts.transparent !== undefined && opts.transparent !== null) {
        use_transparency = true;
        transparent_index = opts.transparent;
        if (transparent_index < 0 || transparent_index >= num_colors) throw "Transparent color index.";
      }
      if (disposal !== 0 || use_transparency || delay !== 0) {
        buf[p++] = 0x21;
        buf[p++] = 0xf9;
        buf[p++] = 4;
        buf[p++] = disposal << 2 | (use_transparency === true ? 1 : 0);
        buf[p++] = delay & 0xff;
        buf[p++] = delay >> 8 & 0xff;
        buf[p++] = transparent_index;
        buf[p++] = 0;
      }
      buf[p++] = 0x2c;
      buf[p++] = x & 0xff;
      buf[p++] = x >> 8 & 0xff;
      buf[p++] = y & 0xff;
      buf[p++] = y >> 8 & 0xff;
      buf[p++] = w & 0xff;
      buf[p++] = w >> 8 & 0xff;
      buf[p++] = h & 0xff;
      buf[p++] = h >> 8 & 0xff;
      buf[p++] = using_local_palette === true ? 0x80 | min_code_size - 1 : 0;
      if (using_local_palette === true) {
        for (var i = 0, il = palette.length; i < il; ++i) {
          var rgb = palette[i];
          buf[p++] = rgb >> 16 & 0xff;
          buf[p++] = rgb >> 8 & 0xff;
          buf[p++] = rgb & 0xff;
        }
      }
      p = GifWriterOutputLZWCodeStream(buf, p, min_code_size < 2 ? 2 : min_code_size, indexed_pixels);
    };
    this.end = function () {
      if (ended === false) {
        buf[p++] = 0x3b;
        ended = true;
      }
      return p;
    };
  }
  function GifWriterOutputLZWCodeStream(buf, p, min_code_size, index_stream) {
    buf[p++] = min_code_size;
    var cur_subblock = p++;
    var clear_code = 1 << min_code_size;
    var code_mask = clear_code - 1;
    var eoi_code = clear_code + 1;
    var next_code = eoi_code + 1;
    var cur_code_size = min_code_size + 1;
    var cur_shift = 0;
    var cur = 0;
    function emit_bytes_to_buffer(bit_block_size) {
      while (cur_shift >= bit_block_size) {
        buf[p++] = cur & 0xff;
        cur >>= 8;
        cur_shift -= 8;
        if (p === cur_subblock + 256) {
          buf[cur_subblock] = 255;
          cur_subblock = p++;
        }
      }
    }
    function emit_code(c) {
      cur |= c << cur_shift;
      cur_shift += cur_code_size;
      emit_bytes_to_buffer(8);
    }
    var ib_code = index_stream[0] & code_mask;
    var code_table = {};
    emit_code(clear_code);
    for (var i = 1, il = index_stream.length; i < il; ++i) {
      var k = index_stream[i] & code_mask;
      var cur_key = ib_code << 8 | k;
      var cur_code = code_table[cur_key];
      if (cur_code === undefined) {
        cur |= ib_code << cur_shift;
        cur_shift += cur_code_size;
        while (cur_shift >= 8) {
          buf[p++] = cur & 0xff;
          cur >>= 8;
          cur_shift -= 8;
          if (p === cur_subblock + 256) {
            buf[cur_subblock] = 255;
            cur_subblock = p++;
          }
        }
        if (next_code === 4096) {
          emit_code(clear_code);
          next_code = eoi_code + 1;
          cur_code_size = min_code_size + 1;
          code_table = {};
        } else {
          if (next_code >= 1 << cur_code_size) ++cur_code_size;
          code_table[cur_key] = next_code++;
        }
        ib_code = k;
      } else {
        ib_code = cur_code;
      }
    }
    emit_code(ib_code);
    emit_code(eoi_code);
    emit_bytes_to_buffer(1);
    if (cur_subblock + 1 === p) {
      buf[cur_subblock] = 0;
    } else {
      buf[cur_subblock] = p - cur_subblock - 1;
      buf[p++] = 0;
    }
    return p;
  }
  function GifReader(buf) {
    var p = 0;
    if (buf[p++] !== 0x47 || buf[p++] !== 0x49 || buf[p++] !== 0x46 || buf[p++] !== 0x38 || (buf[p++] + 1 & 0xfd) !== 0x38 || buf[p++] !== 0x61) {
      throw "Invalid GIF 87a/89a header.";
    }
    var width = buf[p++] | buf[p++] << 8;
    var height = buf[p++] | buf[p++] << 8;
    var pf0 = buf[p++];
    var global_palette_flag = pf0 >> 7;
    var num_global_colors_pow2 = pf0 & 0x7;
    var num_global_colors = 1 << num_global_colors_pow2 + 1;
    var background = buf[p++];
    buf[p++];
    var global_palette_offset = null;
    if (global_palette_flag) {
      global_palette_offset = p;
      p += num_global_colors * 3;
    }
    var no_eof = true;
    var frames = [];
    var delay = 0;
    var transparent_index = null;
    var disposal = 0;
    var loop_count = null;
    this.width = width;
    this.height = height;
    while (no_eof && p < buf.length) {
      switch (buf[p++]) {
        case 0x21:
          switch (buf[p++]) {
            case 0xff:
              if (buf[p] !== 0x0b ||
              buf[p + 1] == 0x4e && buf[p + 2] == 0x45 && buf[p + 3] == 0x54 && buf[p + 4] == 0x53 && buf[p + 5] == 0x43 && buf[p + 6] == 0x41 && buf[p + 7] == 0x50 && buf[p + 8] == 0x45 && buf[p + 9] == 0x32 && buf[p + 10] == 0x2e && buf[p + 11] == 0x30 &&
              buf[p + 12] == 0x03 && buf[p + 13] == 0x01 && buf[p + 16] == 0) {
                p += 14;
                loop_count = buf[p++] | buf[p++] << 8;
                p++;
              } else {
                p += 12;
                while (true) {
                  var block_size = buf[p++];
                  if (block_size === 0) break;
                  p += block_size;
                }
              }
              break;
            case 0xf9:
              if (buf[p++] !== 0x4 || buf[p + 4] !== 0) throw "Invalid graphics extension block.";
              var pf1 = buf[p++];
              delay = buf[p++] | buf[p++] << 8;
              transparent_index = buf[p++];
              if ((pf1 & 1) === 0) transparent_index = null;
              disposal = pf1 >> 2 & 0x7;
              p++;
              break;
            case 0xfe:
              while (true) {
                var block_size = buf[p++];
                if (block_size === 0) break;
                p += block_size;
              }
              break;
            default:
              throw "Unknown graphic control label: 0x" + buf[p - 1].toString(16);
          }
          break;
        case 0x2c:
          var x = buf[p++] | buf[p++] << 8;
          var y = buf[p++] | buf[p++] << 8;
          var w = buf[p++] | buf[p++] << 8;
          var h = buf[p++] | buf[p++] << 8;
          var pf2 = buf[p++];
          var local_palette_flag = pf2 >> 7;
          var interlace_flag = pf2 >> 6 & 1;
          var num_local_colors_pow2 = pf2 & 0x7;
          var num_local_colors = 1 << num_local_colors_pow2 + 1;
          var palette_offset = global_palette_offset;
          var has_local_palette = false;
          if (local_palette_flag) {
            var has_local_palette = true;
            palette_offset = p;
            p += num_local_colors * 3;
          }
          var data_offset = p;
          p++;
          while (true) {
            var block_size = buf[p++];
            if (block_size === 0) break;
            p += block_size;
          }
          frames.push({
            x: x,
            y: y,
            width: w,
            height: h,
            has_local_palette: has_local_palette,
            palette_offset: palette_offset,
            data_offset: data_offset,
            data_length: p - data_offset,
            transparent_index: transparent_index,
            interlaced: !!interlace_flag,
            delay: delay,
            disposal: disposal
          });
          break;
        case 0x3b:
          no_eof = false;
          break;
        default:
          throw "Unknown gif block: 0x" + buf[p - 1].toString(16);
          break;
      }
    }
    this.numFrames = function () {
      return frames.length;
    };
    this.loopCount = function () {
      return loop_count;
    };
    this.frameInfo = function (frame_num) {
      if (frame_num < 0 || frame_num >= frames.length) throw "Frame index out of range.";
      return frames[frame_num];
    };
    this.decodeAndBlitFrameBGRA = function (frame_num, pixels) {
      var frame = this.frameInfo(frame_num);
      var num_pixels = frame.width * frame.height;
      var index_stream = new Uint8Array(num_pixels);
      GifReaderLZWOutputIndexStream(buf, frame.data_offset, index_stream, num_pixels);
      var palette_offset = frame.palette_offset;
      var trans = frame.transparent_index;
      if (trans === null) trans = 256;
      var framewidth = frame.width;
      var framestride = width - framewidth;
      var xleft = framewidth;
      var opbeg = (frame.y * width + frame.x) * 4;
      var opend = ((frame.y + frame.height) * width + frame.x) * 4;
      var op = opbeg;
      var scanstride = framestride * 4;
      if (frame.interlaced === true) {
        scanstride += (framewidth + framestride) * 4 * 7;
      }
      var interlaceskip = 8;
      for (var i = 0, il = index_stream.length; i < il; ++i) {
        var index = index_stream[i];
        if (xleft === 0) {
          op += scanstride;
          xleft = framewidth;
          if (op >= opend) {
            scanstride = framestride + (framewidth + framestride) * 4 * (interlaceskip - 1);
            op = opbeg + (framewidth + framestride) * (interlaceskip << 1);
            interlaceskip >>= 1;
          }
        }
        if (index === trans) {
          op += 4;
        } else {
          var r = buf[palette_offset + index * 3];
          var g = buf[palette_offset + index * 3 + 1];
          var b = buf[palette_offset + index * 3 + 2];
          pixels[op++] = b;
          pixels[op++] = g;
          pixels[op++] = r;
          pixels[op++] = 255;
        }
        --xleft;
      }
    };
    this.decodeAndBlitFrameRGBA = function (frame_num, pixels) {
      var frame = this.frameInfo(frame_num);
      var num_pixels = frame.width * frame.height;
      var index_stream = new Uint8Array(num_pixels);
      GifReaderLZWOutputIndexStream(buf, frame.data_offset, index_stream, num_pixels);
      var palette_offset = frame.palette_offset;
      var trans = frame.transparent_index;
      if (trans === null) trans = 256;
      var framewidth = frame.width;
      var framestride = width - framewidth;
      var xleft = framewidth;
      var opbeg = (frame.y * width + frame.x) * 4;
      var opend = ((frame.y + frame.height) * width + frame.x) * 4;
      var op = opbeg;
      var scanstride = framestride * 4;
      if (frame.interlaced === true) {
        scanstride += (framewidth + framestride) * 4 * 7;
      }
      var interlaceskip = 8;
      for (var i = 0, il = index_stream.length; i < il; ++i) {
        var index = index_stream[i];
        if (xleft === 0) {
          op += scanstride;
          xleft = framewidth;
          if (op >= opend) {
            scanstride = framestride + (framewidth + framestride) * 4 * (interlaceskip - 1);
            op = opbeg + (framewidth + framestride) * (interlaceskip << 1);
            interlaceskip >>= 1;
          }
        }
        if (index === trans) {
          op += 4;
        } else {
          var r = buf[palette_offset + index * 3];
          var g = buf[palette_offset + index * 3 + 1];
          var b = buf[palette_offset + index * 3 + 2];
          pixels[op++] = r;
          pixels[op++] = g;
          pixels[op++] = b;
          pixels[op++] = 255;
        }
        --xleft;
      }
    };
  }
  function GifReaderLZWOutputIndexStream(code_stream, p, output, output_length) {
    var min_code_size = code_stream[p++];
    var clear_code = 1 << min_code_size;
    var eoi_code = clear_code + 1;
    var next_code = eoi_code + 1;
    var cur_code_size = min_code_size + 1;
    var code_mask = (1 << cur_code_size) - 1;
    var cur_shift = 0;
    var cur = 0;
    var op = 0;
    var subblock_size = code_stream[p++];
    var code_table = new Int32Array(4096);
    var prev_code = null;
    while (true) {
      while (cur_shift < 16) {
        if (subblock_size === 0) break;
        cur |= code_stream[p++] << cur_shift;
        cur_shift += 8;
        if (subblock_size === 1) {
          subblock_size = code_stream[p++];
        } else {
          --subblock_size;
        }
      }
      if (cur_shift < cur_code_size) break;
      var code = cur & code_mask;
      cur >>= cur_code_size;
      cur_shift -= cur_code_size;
      if (code === clear_code) {
        next_code = eoi_code + 1;
        cur_code_size = min_code_size + 1;
        code_mask = (1 << cur_code_size) - 1;
        prev_code = null;
        continue;
      } else if (code === eoi_code) {
        break;
      }
      var chase_code = code < next_code ? code : prev_code;
      var chase_length = 0;
      var chase = chase_code;
      while (chase > clear_code) {
        chase = code_table[chase] >> 8;
        ++chase_length;
      }
      var k = chase;
      var op_end = op + chase_length + (chase_code !== code ? 1 : 0);
      if (op_end > output_length) {
        console.log("Warning, gif stream longer than expected.");
        return;
      }
      output[op++] = k;
      op += chase_length;
      var b = op;
      if (chase_code !== code)
        output[op++] = k;
      chase = chase_code;
      while (chase_length--) {
        chase = code_table[chase];
        output[--b] = chase & 0xff;
        chase >>= 8;
      }
      if (prev_code !== null && next_code < 4096) {
        code_table[next_code++] = prev_code << 8 | k;
        if (next_code >= code_mask + 1 && cur_code_size < 12) {
          ++cur_code_size;
          code_mask = code_mask << 1 | 1;
        }
      }
      prev_code = code;
    }
    if (op !== output_length) {
      console.log("Warning, gif stream shorter than expected.");
    }
    return output;
  }
  try {
    exports.GifWriter = GifWriter;
    exports.GifReader = GifReader;
  } catch (e) {}
  window.tmp = GifReader;
  (function (jsPDF, callback) {
    jsPDF.API.adler32cs = callback();
  })(jsPDF, function () {
    var _hasArrayBuffer = typeof ArrayBuffer === 'function' && typeof Uint8Array === 'function';
    var _Buffer = null,
        _isBuffer = function () {
      if (!_hasArrayBuffer) return function _isBuffer() {
        return false;
      };
      try {
        var buffer = {};
        if (typeof buffer.Buffer === 'function') _Buffer = buffer.Buffer;
      } catch (error) {}
      return function _isBuffer(value) {
        return value instanceof ArrayBuffer || _Buffer !== null && value instanceof _Buffer;
      };
    }();
    var _utf8ToBinary = function () {
      if (_Buffer !== null) {
        return function _utf8ToBinary(utf8String) {
          return new _Buffer(utf8String, 'utf8').toString('binary');
        };
      } else {
        return function _utf8ToBinary(utf8String) {
          return unescape(encodeURIComponent(utf8String));
        };
      }
    }();
    var MOD = 65521;
    var _update = function _update(checksum, binaryString) {
      var a = checksum & 0xFFFF,
          b = checksum >>> 16;
      for (var i = 0, length = binaryString.length; i < length; i++) {
        a = (a + (binaryString.charCodeAt(i) & 0xFF)) % MOD;
        b = (b + a) % MOD;
      }
      return (b << 16 | a) >>> 0;
    };
    var _updateUint8Array = function _updateUint8Array(checksum, uint8Array) {
      var a = checksum & 0xFFFF,
          b = checksum >>> 16;
      for (var i = 0, length = uint8Array.length; i < length; i++) {
        a = (a + uint8Array[i]) % MOD;
        b = (b + a) % MOD;
      }
      return (b << 16 | a) >>> 0;
    };
    var exports = {};
    var Adler32 = exports.Adler32 = function () {
      var ctor = function Adler32(checksum) {
        if (!(this instanceof ctor)) {
          throw new TypeError('Constructor cannot called be as a function.');
        }
        if (!isFinite(checksum = checksum == null ? 1 : +checksum)) {
          throw new Error('First arguments needs to be a finite number.');
        }
        this.checksum = checksum >>> 0;
      };
      var proto = ctor.prototype = {};
      proto.constructor = ctor;
      ctor.from = function (from) {
        from.prototype = proto;
        return from;
      }(function from(binaryString) {
        if (!(this instanceof ctor)) {
          throw new TypeError('Constructor cannot called be as a function.');
        }
        if (binaryString == null) throw new Error('First argument needs to be a string.');
        this.checksum = _update(1, binaryString.toString());
      });
      ctor.fromUtf8 = function (fromUtf8) {
        fromUtf8.prototype = proto;
        return fromUtf8;
      }(function fromUtf8(utf8String) {
        if (!(this instanceof ctor)) {
          throw new TypeError('Constructor cannot called be as a function.');
        }
        if (utf8String == null) throw new Error('First argument needs to be a string.');
        var binaryString = _utf8ToBinary(utf8String.toString());
        this.checksum = _update(1, binaryString);
      });
      if (_hasArrayBuffer) {
        ctor.fromBuffer = function (fromBuffer) {
          fromBuffer.prototype = proto;
          return fromBuffer;
        }(function fromBuffer(buffer) {
          if (!(this instanceof ctor)) {
            throw new TypeError('Constructor cannot called be as a function.');
          }
          if (!_isBuffer(buffer)) throw new Error('First argument needs to be ArrayBuffer.');
          var array = new Uint8Array(buffer);
          return this.checksum = _updateUint8Array(1, array);
        });
      }
      proto.update = function update(binaryString) {
        if (binaryString == null) throw new Error('First argument needs to be a string.');
        binaryString = binaryString.toString();
        return this.checksum = _update(this.checksum, binaryString);
      };
      proto.updateUtf8 = function updateUtf8(utf8String) {
        if (utf8String == null) throw new Error('First argument needs to be a string.');

        var binaryString = _utf8ToBinary(utf8String.toString());

        return this.checksum = _update(this.checksum, binaryString);
      };

      if (_hasArrayBuffer) {
        proto.updateBuffer = function updateBuffer(buffer) {
          if (!_isBuffer(buffer)) throw new Error('First argument needs to be ArrayBuffer.');
          var array = new Uint8Array(buffer);
          return this.checksum = _updateUint8Array(this.checksum, array);
        };
      }

      proto.clone = function clone() {
        return new Adler32(this.checksum);
      };

      return ctor;
    }();

    exports.from = function from(binaryString) {
      if (binaryString == null) throw new Error('First argument needs to be a string.');
      return _update(1, binaryString.toString());
    };

    exports.fromUtf8 = function fromUtf8(utf8String) {
      if (utf8String == null) throw new Error('First argument needs to be a string.');

      var binaryString = _utf8ToBinary(utf8String.toString());

      return _update(1, binaryString);
    };

    if (_hasArrayBuffer) {
      exports.fromBuffer = function fromBuffer(buffer) {
        if (!_isBuffer(buffer)) throw new Error('First argument need to be ArrayBuffer.');
        var array = new Uint8Array(buffer);
        return _updateUint8Array(1, array);
      };
    }

    return exports;
  });
  (function (jsPDF) {

    var bidiUnicodeTypes = ["BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "S", "B", "S", "WS", "B", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "B", "B", "B", "S", "WS", "N", "N", "ET", "ET", "ET", "N", "N", "N", "N", "N", "ES", "CS", "ES", "CS", "CS", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "CS", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "BN", "BN", "BN", "BN", "BN", "BN", "B", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "CS", "N", "ET", "ET", "ET", "ET", "N", "N", "N", "N", "L", "N", "N", "BN", "N", "N", "ET", "ET", "EN", "EN", "N", "L", "N", "N", "N", "EN", "L", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "N", "N", "N", "N", "N", "ET", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "R", "NSM", "R", "NSM", "NSM", "R", "NSM", "NSM", "R", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "N", "N", "N", "N", "N", "R", "R", "R", "R", "R", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "AN", "AN", "AN", "AN", "AN", "AN", "N", "N", "AL", "ET", "ET", "AL", "CS", "AL", "N", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AL", "AL", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "ET", "AN", "AN", "AL", "AL", "AL", "NSM", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AN", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AL", "AL", "NSM", "NSM", "N", "NSM", "NSM", "NSM", "NSM", "AL", "AL", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "N", "AL", "AL", "NSM", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AL", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "R", "R", "N", "N", "N", "N", "R", "N", "N", "N", "N", "N", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "BN", "BN", "BN", "L", "R", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "WS", "B", "LRE", "RLE", "PDF", "LRO", "RLO", "CS", "ET", "ET", "ET", "ET", "ET", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "CS", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "WS", "BN", "BN", "BN", "BN", "BN", "N", "LRI", "RLI", "FSI", "PDI", "BN", "BN", "BN", "BN", "BN", "BN", "EN", "L", "N", "N", "EN", "EN", "EN", "EN", "EN", "EN", "ES", "ES", "N", "N", "N", "L", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "ES", "ES", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "R", "NSM", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "ES", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "N", "R", "R", "R", "R", "R", "N", "R", "N", "R", "R", "N", "R", "R", "N", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "CS", "N", "CS", "N", "N", "CS", "N", "N", "N", "N", "N", "N", "N", "N", "N", "ET", "N", "N", "ES", "ES", "N", "N", "N", "N", "N", "ET", "ET", "N", "N", "N", "N", "N", "AL", "AL", "AL", "AL", "AL", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "N", "N", "BN", "N", "N", "N", "ET", "ET", "ET", "N", "N", "N", "N", "N", "ES", "CS", "ES", "CS", "CS", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "CS", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "N", "N", "N", "ET", "ET", "N", "N", "N", "ET", "ET", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N"];

    jsPDF.__bidiEngine__ = jsPDF.prototype.__bidiEngine__ = function (options) {
      var _UNICODE_TYPES = _bidiUnicodeTypes;
      var _STATE_TABLE_LTR = [[0, 3, 0, 1, 0, 0, 0], [0, 3, 0, 1, 2, 2, 0], [0, 3, 0, 0x11, 2, 0, 1], [0, 3, 5, 5, 4, 1, 0], [0, 3, 0x15, 0x15, 4, 0, 1], [0, 3, 5, 5, 4, 2, 0]];
      var _STATE_TABLE_RTL = [[2, 0, 1, 1, 0, 1, 0], [2, 0, 1, 1, 0, 2, 0], [2, 0, 2, 1, 3, 2, 0], [2, 0, 2, 0x21, 3, 1, 1]];
      var _TYPE_NAMES_MAP = {
        "L": 0,
        "R": 1,
        "EN": 2,
        "AN": 3,
        "N": 4,
        "B": 5,
        "S": 6
      };
      var _UNICODE_RANGES_MAP = {
        0: 0,
        5: 1,
        6: 2,
        7: 3,
        0x20: 4,
        0xFB: 5,
        0xFE: 6,
        0xFF: 7
      };
      var _SWAP_TABLE = ["(", ")", "(", "<", ">", "<", "[", "]", "[", "{", "}", "{", "\xAB", "\xBB", "\xAB", "\u2039", "\u203A", "\u2039", "\u2045", "\u2046", "\u2045", "\u207D", "\u207E", "\u207D", "\u208D", "\u208E", "\u208D", "\u2264", "\u2265", "\u2264", "\u2329", "\u232A", "\u2329", "\uFE59", "\uFE5A", "\uFE59", "\uFE5B", "\uFE5C", "\uFE5B", "\uFE5D", "\uFE5E", "\uFE5D", "\uFE64", "\uFE65", "\uFE64"];

      var _LTR_RANGES_REG_EXPR = new RegExp(/^([1-4|9]|1[0-9]|2[0-9]|3[0168]|4[04589]|5[012]|7[78]|159|16[0-9]|17[0-2]|21[569]|22[03489]|250)$/);

      var _lastArabic = false,
          _hasUbatB,
          _hasUbatS,
          DIR_LTR = 0,
          DIR_RTL = 1,
          _isInVisual,
          _isInRtl,
          _isOutVisual,
          _isOutRtl,
          _isSymmetricSwapping,
          _dir = DIR_LTR;

      this.__bidiEngine__ = {};

      var _init = function _init(text, sourceToTargetMap) {
        if (sourceToTargetMap) {
          for (var i = 0; i < text.length; i++) {
            sourceToTargetMap[i] = i;
          }
        }

        if (_isInRtl === undefined) {
          _isInRtl = _isContextualDirRtl(text);
        }

        if (_isOutRtl === undefined) {
          _isOutRtl = _isContextualDirRtl(text);
        }
      };
      var _getCharType = function _getCharType(ch) {
        var charCode = ch.charCodeAt(),
            range = charCode >> 8,
            rangeIdx = _UNICODE_RANGES_MAP[range];
        if (rangeIdx !== undefined) {
          return _UNICODE_TYPES[rangeIdx * 256 + (charCode & 0xFF)];
        } else if (range === 0xFC || range === 0xFD) {
          return "AL";
        } else if (_LTR_RANGES_REG_EXPR.test(range)) {
          return "L";
        } else if (range === 8) {
          return "R";
        }
        return "N";
      };
      var _isContextualDirRtl = function _isContextualDirRtl(text) {
        for (var i = 0, charType; i < text.length; i++) {
          charType = _getCharType(text.charAt(i));
          if (charType === "L") {
            return false;
          } else if (charType === "R") {
            return true;
          }
        }
        return false;
      };
      var _resolveCharType = function _resolveCharType(chars, types, resolvedTypes, index) {
        var cType = types[index],
            wType,
            nType,
            i,
            len;
        switch (cType) {
          case "L":
          case "R":
            _lastArabic = false;
            break;
          case "N":
          case "AN":
            break;
          case "EN":
            if (_lastArabic) {
              cType = "AN";
            }
            break;
          case "AL":
            _lastArabic = true;
            cType = "R";
            break;
          case "WS":
            cType = "N";
            break;
          case "CS":
            if (index < 1 || index + 1 >= types.length || (wType = resolvedTypes[index - 1]) !== "EN" && wType !== "AN" || (nType = types[index + 1]) !== "EN" && nType !== "AN") {
              cType = "N";
            } else if (_lastArabic) {
              nType = "AN";
            }
            cType = nType === wType ? nType : "N";
            break;
          case "ES":
            wType = index > 0 ? resolvedTypes[index - 1] : "B";
            cType = wType === "EN" && index + 1 < types.length && types[index + 1] === "EN" ? "EN" : "N";
            break;
          case "ET":
            if (index > 0 && resolvedTypes[index - 1] === "EN") {
              cType = "EN";
              break;
            } else if (_lastArabic) {
              cType = "N";
              break;
            }
            i = index + 1;
            len = types.length;
            while (i < len && types[i] === "ET") {
              i++;
            }
            if (i < len && types[i] === "EN") {
              cType = "EN";
            } else {
              cType = "N";
            }
            break;
          case "NSM":
            if (_isInVisual && !_isInRtl) {
              len = types.length;
              i = index + 1;
              while (i < len && types[i] === "NSM") {
                i++;
              }
              if (i < len) {
                var c = chars[index];
                var rtlCandidate = c >= 0x0591 && c <= 0x08FF || c === 0xFB1E;
                wType = types[i];
                if (rtlCandidate && (wType === "R" || wType === "AL")) {
                  cType = "R";
                  break;
                }
              }
            }
            if (index < 1 || (wType = types[index - 1]) === "B") {
              cType = "N";
            } else {
              cType = resolvedTypes[index - 1];
            }
            break;
          case "B":
            _lastArabic = false;
            _hasUbatB = true;
            cType = _dir;
            break;
          case "S":
            _hasUbatS = true;
            cType = "N";
            break;
          case "LRE":
          case "RLE":
          case "LRO":
          case "RLO":
          case "PDF":
            _lastArabic = false;
            break;
          case "BN":
            cType = "N";
            break;
        }
        return cType;
      };
      var _handleUbatS = function _handleUbatS(types, levels, length) {
        for (var i = 0; i < length; i++) {
          if (types[i] === "S") {
            levels[i] = _dir;
            for (var j = i - 1; j >= 0; j--) {
              if (types[j] === "WS") {
                levels[j] = _dir;
              } else {
                break;
              }
            }
          }
        }
      };

      var _invertString = function _invertString(text, sourceToTargetMap, levels) {
        var charArray = text.split("");

        if (levels) {
          _computeLevels(charArray, levels, {
            hiLevel: _dir
          });
        }

        charArray.reverse();
        sourceToTargetMap && sourceToTargetMap.reverse();
        return charArray.join("");
      };
      var _computeLevels = function _computeLevels(chars, levels, params) {
        var action,
            condition,
            i,
            index,
            newLevel,
            prevState,
            condPos = -1,
            len = chars.length,
            newState = 0,
            resolvedTypes = [],
            stateTable = _dir ? _STATE_TABLE_RTL : _STATE_TABLE_LTR,
            types = [];
        _lastArabic = false;
        _hasUbatB = false;
        _hasUbatS = false;

        for (i = 0; i < len; i++) {
          types[i] = _getCharType(chars[i]);
        }

        for (index = 0; index < len; index++) {
          prevState = newState;
          resolvedTypes[index] = _resolveCharType(chars, types, resolvedTypes, index);
          newState = stateTable[prevState][_TYPE_NAMES_MAP[resolvedTypes[index]]];
          action = newState & 0xF0;
          newState &= 0x0F;
          levels[index] = newLevel = stateTable[newState][5];

          if (action > 0) {
            if (action === 0x10) {
              for (i = condPos; i < index; i++) {
                levels[i] = 1;
              }

              condPos = -1;
            } else {
              condPos = -1;
            }
          }

          condition = stateTable[newState][6];

          if (condition) {
            if (condPos === -1) {
              condPos = index;
            }
          } else {
            if (condPos > -1) {
              for (i = condPos; i < index; i++) {
                levels[i] = newLevel;
              }

              condPos = -1;
            }
          }

          if (types[index] === "B") {
            levels[index] = 0;
          }

          params.hiLevel |= newLevel;
        }

        if (_hasUbatS) {
          _handleUbatS(types, levels, len);
        }
      };
      var _invertByLevel = function _invertByLevel(level, charArray, sourceToTargetMap, levels, params) {
        if (params.hiLevel < level) {
          return;
        }

        if (level === 1 && _dir === DIR_RTL && !_hasUbatB) {
          charArray.reverse();
          sourceToTargetMap && sourceToTargetMap.reverse();
          return;
        }

        var ch,
            high,
            end,
            low,
            len = charArray.length,
            start = 0;

        while (start < len) {
          if (levels[start] >= level) {
            end = start + 1;

            while (end < len && levels[end] >= level) {
              end++;
            }

            for (low = start, high = end - 1; low < high; low++, high--) {
              ch = charArray[low];
              charArray[low] = charArray[high];
              charArray[high] = ch;

              if (sourceToTargetMap) {
                ch = sourceToTargetMap[low];
                sourceToTargetMap[low] = sourceToTargetMap[high];
                sourceToTargetMap[high] = ch;
              }
            }

            start = end;
          }

          start++;
        }
      };
      var _symmetricSwap = function _symmetricSwap(charArray, levels, params) {
        if (params.hiLevel !== 0 && _isSymmetricSwapping) {
          for (var i = 0, index; i < charArray.length; i++) {
            if (levels[i] === 1) {
              index = _SWAP_TABLE.indexOf(charArray[i]);

              if (index >= 0) {
                charArray[i] = _SWAP_TABLE[index + 1];
              }
            }
          }
        }
      };

      var _reorder = function _reorder(text, sourceToTargetMap, levels) {
        var charArray = text.split(""),
            params = {
          hiLevel: _dir
        };

        if (!levels) {
          levels = [];
        }

        _computeLevels(charArray, levels, params);

        _symmetricSwap(charArray, levels, params);

        _invertByLevel(DIR_RTL + 1, charArray, sourceToTargetMap, levels, params);

        _invertByLevel(DIR_RTL, charArray, sourceToTargetMap, levels, params);

        return charArray.join("");
      };
      this.__bidiEngine__.doBidiReorder = function (text, sourceToTargetMap, levels) {
        _init(text, sourceToTargetMap);

        if (!_isInVisual && _isOutVisual && !_isOutRtl) {
          _dir = _isInRtl ? DIR_RTL : DIR_LTR;
          text = _reorder(text, sourceToTargetMap, levels);
        } else if (_isInVisual && _isOutVisual && _isInRtl ^ _isOutRtl) {
          _dir = _isInRtl ? DIR_RTL : DIR_LTR;
          text = _invertString(text, sourceToTargetMap, levels);
        } else if (!_isInVisual && _isOutVisual && _isOutRtl) {
          _dir = _isInRtl ? DIR_RTL : DIR_LTR;
          text = _reorder(text, sourceToTargetMap, levels);
          text = _invertString(text, sourceToTargetMap);
        } else if (_isInVisual && !_isInRtl && !_isOutVisual && !_isOutRtl) {
          _dir = DIR_LTR;
          text = _reorder(text, sourceToTargetMap, levels);
        } else if (_isInVisual && !_isOutVisual && _isInRtl ^ _isOutRtl) {
          text = _invertString(text, sourceToTargetMap);
          if (_isInRtl) {
            _dir = DIR_LTR;
            text = _reorder(text, sourceToTargetMap, levels);
          } else {
            _dir = DIR_RTL;
            text = _reorder(text, sourceToTargetMap, levels);
            text = _invertString(text, sourceToTargetMap);
          }
        } else if (_isInVisual && _isInRtl && !_isOutVisual && _isOutRtl) {
          _dir = DIR_RTL;
          text = _reorder(text, sourceToTargetMap, levels);
          text = _invertString(text, sourceToTargetMap);
        } else if (!_isInVisual && !_isOutVisual && _isInRtl ^ _isOutRtl) {
          var isSymmetricSwappingOrig = _isSymmetricSwapping;
          if (_isInRtl) {
            _dir = DIR_RTL;
            text = _reorder(text, sourceToTargetMap, levels);
            _dir = DIR_LTR;
            _isSymmetricSwapping = false;
            text = _reorder(text, sourceToTargetMap, levels);
            _isSymmetricSwapping = isSymmetricSwappingOrig;
          } else {
            _dir = DIR_LTR;
            text = _reorder(text, sourceToTargetMap, levels);
            text = _invertString(text, sourceToTargetMap);
            _dir = DIR_RTL;
            _isSymmetricSwapping = false;
            text = _reorder(text, sourceToTargetMap, levels);
            _isSymmetricSwapping = isSymmetricSwappingOrig;
            text = _invertString(text, sourceToTargetMap);
          }
        }
        return text;
      };
      this.__bidiEngine__.setOptions = function (options) {
        if (options) {
          _isInVisual = options.isInputVisual;
          _isOutVisual = options.isOutputVisual;
          _isInRtl = options.isInputRtl;
          _isOutRtl = options.isOutputRtl;
          _isSymmetricSwapping = options.isSymmetricSwapping;
        }
      };
      this.__bidiEngine__.setOptions(options);
      return this.__bidiEngine__;
    };
    var _bidiUnicodeTypes = bidiUnicodeTypes;
    var bidiEngine = new jsPDF.__bidiEngine__({
      isInputVisual: true
    });
    var bidiEngineFunction = function bidiEngineFunction(args) {
      var text = args.text;
      var x = args.x;
      var y = args.y;
      var options = args.options || {};
      var mutex = args.mutex || {};
      var lang = options.lang;
      var tmpText = [];
      if (Object.prototype.toString.call(text) === '[object Array]') {
        var i = 0;
        tmpText = [];
        for (i = 0; i < text.length; i += 1) {
          if (Object.prototype.toString.call(text[i]) === '[object Array]') {
            tmpText.push([bidiEngine.doBidiReorder(text[i][0]), text[i][1], text[i][2]]);
          } else {
            tmpText.push([bidiEngine.doBidiReorder(text[i])]);
          }
        }

        args.text = tmpText;
      } else {
        args.text = bidiEngine.doBidiReorder(text);
      }
    };

    jsPDF.API.events.push(['postProcessText', bidiEngineFunction]);
  })(jsPDF);
  function JPEGEncoder(quality) {
    var ffloor = Math.floor;
    var YTable = new Array(64);
    var UVTable = new Array(64);
    var fdtbl_Y = new Array(64);
    var fdtbl_UV = new Array(64);
    var YDC_HT;
    var UVDC_HT;
    var YAC_HT;
    var UVAC_HT;
    var bitcode = new Array(65535);
    var category = new Array(65535);
    var outputfDCTQuant = new Array(64);
    var DU = new Array(64);
    var byteout = [];
    var bytenew = 0;
    var bytepos = 7;
    var YDU = new Array(64);
    var UDU = new Array(64);
    var VDU = new Array(64);
    var clt = new Array(256);
    var RGB_YUV_TABLE = new Array(2048);
    var currentQuality;
    var ZigZag = [0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63];
    var std_dc_luminance_nrcodes = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
    var std_dc_luminance_values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    var std_ac_luminance_nrcodes = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 0x7d];
    var std_ac_luminance_values = [0x01, 0x02, 0x03, 0x00, 0x04, 0x11, 0x05, 0x12, 0x21, 0x31, 0x41, 0x06, 0x13, 0x51, 0x61, 0x07, 0x22, 0x71, 0x14, 0x32, 0x81, 0x91, 0xa1, 0x08, 0x23, 0x42, 0xb1, 0xc1, 0x15, 0x52, 0xd1, 0xf0, 0x24, 0x33, 0x62, 0x72, 0x82, 0x09, 0x0a, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2a, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3a, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x4a, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x5a, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78, 0x79, 0x7a, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89, 0x8a, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x9a, 0xa2, 0xa3, 0xa4, 0xa5, 0xa6, 0xa7, 0xa8, 0xa9, 0xaa, 0xb2, 0xb3, 0xb4, 0xb5, 0xb6, 0xb7, 0xb8, 0xb9, 0xba, 0xc2, 0xc3, 0xc4, 0xc5, 0xc6, 0xc7, 0xc8, 0xc9, 0xca, 0xd2, 0xd3, 0xd4, 0xd5, 0xd6, 0xd7, 0xd8, 0xd9, 0xda, 0xe1, 0xe2, 0xe3, 0xe4, 0xe5, 0xe6, 0xe7, 0xe8, 0xe9, 0xea, 0xf1, 0xf2, 0xf3, 0xf4, 0xf5, 0xf6, 0xf7, 0xf8, 0xf9, 0xfa];
    var std_dc_chrominance_nrcodes = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
    var std_dc_chrominance_values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    var std_ac_chrominance_nrcodes = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 0x77];
    var std_ac_chrominance_values = [0x00, 0x01, 0x02, 0x03, 0x11, 0x04, 0x05, 0x21, 0x31, 0x06, 0x12, 0x41, 0x51, 0x07, 0x61, 0x71, 0x13, 0x22, 0x32, 0x81, 0x08, 0x14, 0x42, 0x91, 0xa1, 0xb1, 0xc1, 0x09, 0x23, 0x33, 0x52, 0xf0, 0x15, 0x62, 0x72, 0xd1, 0x0a, 0x16, 0x24, 0x34, 0xe1, 0x25, 0xf1, 0x17, 0x18, 0x19, 0x1a, 0x26, 0x27, 0x28, 0x29, 0x2a, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3a, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x4a, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x5a, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78, 0x79, 0x7a, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89, 0x8a, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x9a, 0xa2, 0xa3, 0xa4, 0xa5, 0xa6, 0xa7, 0xa8, 0xa9, 0xaa, 0xb2, 0xb3, 0xb4, 0xb5, 0xb6, 0xb7, 0xb8, 0xb9, 0xba, 0xc2, 0xc3, 0xc4, 0xc5, 0xc6, 0xc7, 0xc8, 0xc9, 0xca, 0xd2, 0xd3, 0xd4, 0xd5, 0xd6, 0xd7, 0xd8, 0xd9, 0xda, 0xe2, 0xe3, 0xe4, 0xe5, 0xe6, 0xe7, 0xe8, 0xe9, 0xea, 0xf2, 0xf3, 0xf4, 0xf5, 0xf6, 0xf7, 0xf8, 0xf9, 0xfa];

    function initQuantTables(sf) {
      var YQT = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99];

      for (var i = 0; i < 64; i++) {
        var t = ffloor((YQT[i] * sf + 50) / 100);

        if (t < 1) {
          t = 1;
        } else if (t > 255) {
          t = 255;
        }

        YTable[ZigZag[i]] = t;
      }

      var UVQT = [17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99];

      for (var j = 0; j < 64; j++) {
        var u = ffloor((UVQT[j] * sf + 50) / 100);

        if (u < 1) {
          u = 1;
        } else if (u > 255) {
          u = 255;
        }

        UVTable[ZigZag[j]] = u;
      }

      var aasf = [1.0, 1.387039845, 1.306562965, 1.175875602, 1.0, 0.785694958, 0.541196100, 0.275899379];
      var k = 0;

      for (var row = 0; row < 8; row++) {
        for (var col = 0; col < 8; col++) {
          fdtbl_Y[k] = 1.0 / (YTable[ZigZag[k]] * aasf[row] * aasf[col] * 8.0);
          fdtbl_UV[k] = 1.0 / (UVTable[ZigZag[k]] * aasf[row] * aasf[col] * 8.0);
          k++;
        }
      }
    }

    function computeHuffmanTbl(nrcodes, std_table) {
      var codevalue = 0;
      var pos_in_table = 0;
      var HT = new Array();

      for (var k = 1; k <= 16; k++) {
        for (var j = 1; j <= nrcodes[k]; j++) {
          HT[std_table[pos_in_table]] = [];
          HT[std_table[pos_in_table]][0] = codevalue;
          HT[std_table[pos_in_table]][1] = k;
          pos_in_table++;
          codevalue++;
        }

        codevalue *= 2;
      }

      return HT;
    }

    function initHuffmanTbl() {
      YDC_HT = computeHuffmanTbl(std_dc_luminance_nrcodes, std_dc_luminance_values);
      UVDC_HT = computeHuffmanTbl(std_dc_chrominance_nrcodes, std_dc_chrominance_values);
      YAC_HT = computeHuffmanTbl(std_ac_luminance_nrcodes, std_ac_luminance_values);
      UVAC_HT = computeHuffmanTbl(std_ac_chrominance_nrcodes, std_ac_chrominance_values);
    }

    function initCategoryNumber() {
      var nrlower = 1;
      var nrupper = 2;

      for (var cat = 1; cat <= 15; cat++) {
        for (var nr = nrlower; nr < nrupper; nr++) {
          category[32767 + nr] = cat;
          bitcode[32767 + nr] = [];
          bitcode[32767 + nr][1] = cat;
          bitcode[32767 + nr][0] = nr;
        }
        for (var nrneg = -(nrupper - 1); nrneg <= -nrlower; nrneg++) {
          category[32767 + nrneg] = cat;
          bitcode[32767 + nrneg] = [];
          bitcode[32767 + nrneg][1] = cat;
          bitcode[32767 + nrneg][0] = nrupper - 1 + nrneg;
        }

        nrlower <<= 1;
        nrupper <<= 1;
      }
    }

    function initRGBYUVTable() {
      for (var i = 0; i < 256; i++) {
        RGB_YUV_TABLE[i] = 19595 * i;
        RGB_YUV_TABLE[i + 256 >> 0] = 38470 * i;
        RGB_YUV_TABLE[i + 512 >> 0] = 7471 * i + 0x8000;
        RGB_YUV_TABLE[i + 768 >> 0] = -11059 * i;
        RGB_YUV_TABLE[i + 1024 >> 0] = -21709 * i;
        RGB_YUV_TABLE[i + 1280 >> 0] = 32768 * i + 0x807FFF;
        RGB_YUV_TABLE[i + 1536 >> 0] = -27439 * i;
        RGB_YUV_TABLE[i + 1792 >> 0] = -5329 * i;
      }
    }

    function writeBits(bs) {
      var value = bs[0];
      var posval = bs[1] - 1;

      while (posval >= 0) {
        if (value & 1 << posval) {
          bytenew |= 1 << bytepos;
        }

        posval--;
        bytepos--;

        if (bytepos < 0) {
          if (bytenew == 0xFF) {
            writeByte(0xFF);
            writeByte(0);
          } else {
            writeByte(bytenew);
          }

          bytepos = 7;
          bytenew = 0;
        }
      }
    }

    function writeByte(value) {
      byteout.push(value);
    }

    function writeWord(value) {
      writeByte(value >> 8 & 0xFF);
      writeByte(value & 0xFF);
    }
    function fDCTQuant(data, fdtbl) {
      var d0, d1, d2, d3, d4, d5, d6, d7;
      var dataOff = 0;
      var i;
      var I8 = 8;
      var I64 = 64;

      for (i = 0; i < I8; ++i) {
        d0 = data[dataOff];
        d1 = data[dataOff + 1];
        d2 = data[dataOff + 2];
        d3 = data[dataOff + 3];
        d4 = data[dataOff + 4];
        d5 = data[dataOff + 5];
        d6 = data[dataOff + 6];
        d7 = data[dataOff + 7];
        var tmp0 = d0 + d7;
        var tmp7 = d0 - d7;
        var tmp1 = d1 + d6;
        var tmp6 = d1 - d6;
        var tmp2 = d2 + d5;
        var tmp5 = d2 - d5;
        var tmp3 = d3 + d4;
        var tmp4 = d3 - d4;
        var tmp10 = tmp0 + tmp3;
        var tmp13 = tmp0 - tmp3;
        var tmp11 = tmp1 + tmp2;
        var tmp12 = tmp1 - tmp2;
        data[dataOff] = tmp10 + tmp11;
        data[dataOff + 4] = tmp10 - tmp11;
        var z1 = (tmp12 + tmp13) * 0.707106781;
        data[dataOff + 2] = tmp13 + z1;
        data[dataOff + 6] = tmp13 - z1;
        tmp10 = tmp4 + tmp5;
        tmp11 = tmp5 + tmp6;
        tmp12 = tmp6 + tmp7;
        var z5 = (tmp10 - tmp12) * 0.382683433;
        var z2 = 0.541196100 * tmp10 + z5;
        var z4 = 1.306562965 * tmp12 + z5;
        var z3 = tmp11 * 0.707106781;
        var z11 = tmp7 + z3;
        var z13 = tmp7 - z3;
        data[dataOff + 5] = z13 + z2;
        data[dataOff + 3] = z13 - z2;
        data[dataOff + 1] = z11 + z4;
        data[dataOff + 7] = z11 - z4;
        dataOff += 8;
      }
      dataOff = 0;
      for (i = 0; i < I8; ++i) {
        d0 = data[dataOff];
        d1 = data[dataOff + 8];
        d2 = data[dataOff + 16];
        d3 = data[dataOff + 24];
        d4 = data[dataOff + 32];
        d5 = data[dataOff + 40];
        d6 = data[dataOff + 48];
        d7 = data[dataOff + 56];
        var tmp0p2 = d0 + d7;
        var tmp7p2 = d0 - d7;
        var tmp1p2 = d1 + d6;
        var tmp6p2 = d1 - d6;
        var tmp2p2 = d2 + d5;
        var tmp5p2 = d2 - d5;
        var tmp3p2 = d3 + d4;
        var tmp4p2 = d3 - d4;
        var tmp10p2 = tmp0p2 + tmp3p2;
        var tmp13p2 = tmp0p2 - tmp3p2;
        var tmp11p2 = tmp1p2 + tmp2p2;
        var tmp12p2 = tmp1p2 - tmp2p2;
        data[dataOff] = tmp10p2 + tmp11p2;
        data[dataOff + 32] = tmp10p2 - tmp11p2;
        var z1p2 = (tmp12p2 + tmp13p2) * 0.707106781;
        data[dataOff + 16] = tmp13p2 + z1p2;
        data[dataOff + 48] = tmp13p2 - z1p2;
        tmp10p2 = tmp4p2 + tmp5p2;
        tmp11p2 = tmp5p2 + tmp6p2;
        tmp12p2 = tmp6p2 + tmp7p2;
        var z5p2 = (tmp10p2 - tmp12p2) * 0.382683433;
        var z2p2 = 0.541196100 * tmp10p2 + z5p2;
        var z4p2 = 1.306562965 * tmp12p2 + z5p2;
        var z3p2 = tmp11p2 * 0.707106781;
        var z11p2 = tmp7p2 + z3p2;
        var z13p2 = tmp7p2 - z3p2;
        data[dataOff + 40] = z13p2 + z2p2;
        data[dataOff + 24] = z13p2 - z2p2;
        data[dataOff + 8] = z11p2 + z4p2;
        data[dataOff + 56] = z11p2 - z4p2;
        dataOff++;
      }
      var fDCTQuant;
      for (i = 0; i < I64; ++i) {
        fDCTQuant = data[i] * fdtbl[i];
        outputfDCTQuant[i] = fDCTQuant > 0.0 ? fDCTQuant + 0.5 | 0 : fDCTQuant - 0.5 | 0;
      }
      return outputfDCTQuant;
    }
    function writeAPP0() {
      writeWord(0xFFE0)
      writeWord(16);
      writeByte(0x4A);
      writeByte(0x46);
      writeByte(0x49);
      writeByte(0x46);
      writeByte(0);
      writeByte(1);
      writeByte(1);
      writeByte(0);
      writeWord(1);
      writeWord(1);
      writeByte(0);
      writeByte(0);
    }
    function writeSOF0(width, height) {
      writeWord(0xFFC0);
      writeWord(17);
      writeByte(8);
      writeWord(height);
      writeWord(width);
      writeByte(3);
      writeByte(1);
      writeByte(0x11);
      writeByte(0);
      writeByte(2);
      writeByte(0x11);
      writeByte(1);
      writeByte(3);
      writeByte(0x11);
      writeByte(1);
    }
    function writeDQT() {
      writeWord(0xFFDB);
      writeWord(132);
      writeByte(0);
      for (var i = 0; i < 64; i++) {
        writeByte(YTable[i]);
      }
      writeByte(1);
      for (var j = 0; j < 64; j++) {
        writeByte(UVTable[j]);
      }
    }
    function writeDHT() {
      writeWord(0xFFC4);
      writeWord(0x01A2);
      writeByte(0);
      for (var i = 0; i < 16; i++) {
        writeByte(std_dc_luminance_nrcodes[i + 1]);
      }
      for (var j = 0; j <= 11; j++) {
        writeByte(std_dc_luminance_values[j]);
      }
      writeByte(0x10);
      for (var k = 0; k < 16; k++) {
        writeByte(std_ac_luminance_nrcodes[k + 1]);
      }
      for (var l = 0; l <= 161; l++) {
        writeByte(std_ac_luminance_values[l]);
      }
      writeByte(1);
      for (var m = 0; m < 16; m++) {
        writeByte(std_dc_chrominance_nrcodes[m + 1]);
      }
      for (var n = 0; n <= 11; n++) {
        writeByte(std_dc_chrominance_values[n]);
      }
      writeByte(0x11);
      for (var o = 0; o < 16; o++) {
        writeByte(std_ac_chrominance_nrcodes[o + 1]);
      }
      for (var p = 0; p <= 161; p++) {
        writeByte(std_ac_chrominance_values[p]);
      }
    }
    function writeSOS() {
      writeWord(0xFFDA);
      writeWord(12);
      writeByte(3);
      writeByte(1);
      writeByte(0);
      writeByte(2);
      writeByte(0x11);
      writeByte(3);
      writeByte(0x11);
      writeByte(0);
      writeByte(0x3f);
      writeByte(0);
    }
    function processDU(CDU, fdtbl, DC, HTDC, HTAC) {
      var EOB = HTAC[0x00];
      var M16zeroes = HTAC[0xF0];
      var pos;
      var I16 = 16;
      var I63 = 63;
      var I64 = 64;
      var DU_DCT = fDCTQuant(CDU, fdtbl);
      for (var j = 0; j < I64; ++j) {
        DU[ZigZag[j]] = DU_DCT[j];
      }
      var Diff = DU[0] - DC;
      DC = DU[0];
      if (Diff == 0) {
        writeBits(HTDC[0]);
      } else {
        pos = 32767 + Diff;
        writeBits(HTDC[category[pos]]);
        writeBits(bitcode[pos]);
      }
      var end0pos = 63;
      for (; end0pos > 0 && DU[end0pos] == 0; end0pos--) {}
      if (end0pos == 0) {
        writeBits(EOB);
        return DC;
      }
      var i = 1;
      var lng;
      while (i <= end0pos) {
        var startpos = i;
        for (; DU[i] == 0 && i <= end0pos; ++i) {}
        var nrzeroes = i - startpos;
        if (nrzeroes >= I16) {
          lng = nrzeroes >> 4;
          for (var nrmarker = 1; nrmarker <= lng; ++nrmarker) {
            writeBits(M16zeroes);
          }
          nrzeroes = nrzeroes & 0xF;
        }
        pos = 32767 + DU[i];
        writeBits(HTAC[(nrzeroes << 4) + category[pos]]);
        writeBits(bitcode[pos]);
        i++;
      }
      if (end0pos != I63) {
        writeBits(EOB);
      }
      return DC;
    }
    function initCharLookupTable() {
      var sfcc = String.fromCharCode;
      for (var i = 0; i < 256; i++) {
        clt[i] = sfcc(i);
      }
    }
    this.encode = function (image, quality)
    {
      var time_start = new Date().getTime();
      if (quality) setQuality(quality);
      byteout = new Array();
      bytenew = 0;
      bytepos = 7;
      writeWord(0xFFD8);
      writeAPP0();
      writeDQT();
      writeSOF0(image.width, image.height);
      writeDHT();
      writeSOS();
      var DCY = 0;
      var DCU = 0;
      var DCV = 0;
      bytenew = 0;
      bytepos = 7;
      this.encode.displayName = "_encode_";
      var imageData = image.data;
      var width = image.width;
      var height = image.height;
      var quadWidth = width * 4;
      var x,
          y = 0;
      var r, g, b;
      var start, p, col, row, pos;
      while (y < height) {
        x = 0;
        while (x < quadWidth) {
          start = quadWidth * y + x;
          p = start;
          col = -1;
          row = 0;
          for (pos = 0; pos < 64; pos++) {
            row = pos >> 3;
            col = (pos & 7) * 4;
            p = start + row * quadWidth + col;
            if (y + row >= height) {
              p -= quadWidth * (y + 1 + row - height);
            }
            if (x + col >= quadWidth) {
              p -= x + col - quadWidth + 4;
            }
            r = imageData[p++];
            g = imageData[p++];
            b = imageData[p++];
            YDU[pos] = (RGB_YUV_TABLE[r] + RGB_YUV_TABLE[g + 256 >> 0] + RGB_YUV_TABLE[b + 512 >> 0] >> 16) - 128;
            UDU[pos] = (RGB_YUV_TABLE[r + 768 >> 0] + RGB_YUV_TABLE[g + 1024 >> 0] + RGB_YUV_TABLE[b + 1280 >> 0] >> 16) - 128;
            VDU[pos] = (RGB_YUV_TABLE[r + 1280 >> 0] + RGB_YUV_TABLE[g + 1536 >> 0] + RGB_YUV_TABLE[b + 1792 >> 0] >> 16) - 128;
          }
          DCY = processDU(YDU, fdtbl_Y, DCY, YDC_HT, YAC_HT);
          DCU = processDU(UDU, fdtbl_UV, DCU, UVDC_HT, UVAC_HT);
          DCV = processDU(VDU, fdtbl_UV, DCV, UVDC_HT, UVAC_HT);
          x += 32;
        }

        y += 8;
      }
      if (bytepos >= 0) {
        var fillbits = [];
        fillbits[1] = bytepos + 1;
        fillbits[0] = (1 << bytepos + 1) - 1;
        writeBits(fillbits);
      }
      writeWord(0xFFD9);
      return new Uint8Array(byteout);
    };
    function setQuality(quality) {
      if (quality <= 0) {
        quality = 1;
      }
      if (quality > 100) {
        quality = 100;
      }
      if (currentQuality == quality) return;
      var sf = 0;
      if (quality < 50) {
        sf = Math.floor(5000 / quality);
      } else {
        sf = Math.floor(200 - quality * 2);
      }
      initQuantTables(sf);
      currentQuality = quality;
    }
    function init() {
      var time_start = new Date().getTime();
      if (!quality) quality = 50;
      initCharLookupTable();
      initHuffmanTbl();
      initCategoryNumber();
      initRGBYUVTable();
      setQuality(quality);
      var duration = new Date().getTime() - time_start;
    }
    init();
  }
  window.tmp = JPEGEncoder;
  function BmpDecoder(buffer, is_with_alpha) {
    this.pos = 0;
    this.buffer = buffer;
    this.datav = new DataView(buffer.buffer);
    this.is_with_alpha = !!is_with_alpha;
    this.bottom_up = true;
    this.flag = String.fromCharCode(this.buffer[0]) + String.fromCharCode(this.buffer[1]);
    this.pos += 2;
    if (["BM", "BA", "CI", "CP", "IC", "PT"].indexOf(this.flag) === -1) throw new Error("Invalid BMP File");
    this.parseHeader();
    this.parseBGR();
  }
  BmpDecoder.prototype.parseHeader = function () {
    this.fileSize = this.datav.getUint32(this.pos, true);
    this.pos += 4;
    this.reserved = this.datav.getUint32(this.pos, true);
    this.pos += 4;
    this.offset = this.datav.getUint32(this.pos, true);
    this.pos += 4;
    this.headerSize = this.datav.getUint32(this.pos, true);
    this.pos += 4;
    this.width = this.datav.getUint32(this.pos, true);
    this.pos += 4;
    this.height = this.datav.getInt32(this.pos, true);
    this.pos += 4;
    this.planes = this.datav.getUint16(this.pos, true);
    this.pos += 2;
    this.bitPP = this.datav.getUint16(this.pos, true);
    this.pos += 2;
    this.compress = this.datav.getUint32(this.pos, true);
    this.pos += 4;
    this.rawSize = this.datav.getUint32(this.pos, true);
    this.pos += 4;
    this.hr = this.datav.getUint32(this.pos, true);
    this.pos += 4;
    this.vr = this.datav.getUint32(this.pos, true);
    this.pos += 4;
    this.colors = this.datav.getUint32(this.pos, true);
    this.pos += 4;
    this.importantColors = this.datav.getUint32(this.pos, true);
    this.pos += 4;
    if (this.bitPP === 16 && this.is_with_alpha) {
      this.bitPP = 15;
    }
    if (this.bitPP < 15) {
      var len = this.colors === 0 ? 1 << this.bitPP : this.colors;
      this.palette = new Array(len);
      for (var i = 0; i < len; i++) {
        var blue = this.datav.getUint8(this.pos++, true);
        var green = this.datav.getUint8(this.pos++, true);
        var red = this.datav.getUint8(this.pos++, true);
        var quad = this.datav.getUint8(this.pos++, true);
        this.palette[i] = {
          red: red,
          green: green,
          blue: blue,
          quad: quad
        };
      }
    }
    if (this.height < 0) {
      this.height *= -1;
      this.bottom_up = false;
    }
  };
  BmpDecoder.prototype.parseBGR = function () {
    this.pos = this.offset;
    try {
      var bitn = "bit" + this.bitPP;
      var len = this.width * this.height * 4;
      this.data = new Uint8Array(len);
      this[bitn]();
    } catch (e) {
      console.log("bit decode error:" + e);
    }
  };
  BmpDecoder.prototype.bit1 = function () {
    var xlen = Math.ceil(this.width / 8);
    var mode = xlen % 4;
    var y = this.height >= 0 ? this.height - 1 : -this.height;
    for (var y = this.height - 1; y >= 0; y--) {
      var line = this.bottom_up ? y : this.height - 1 - y;
      for (var x = 0; x < xlen; x++) {
        var b = this.datav.getUint8(this.pos++, true);
        var location = line * this.width * 4 + x * 8 * 4;
        for (var i = 0; i < 8; i++) {
          if (x * 8 + i < this.width) {
            var rgb = this.palette[b >> 7 - i & 0x1];
            this.data[location + i * 4] = rgb.blue;
            this.data[location + i * 4 + 1] = rgb.green;
            this.data[location + i * 4 + 2] = rgb.red;
            this.data[location + i * 4 + 3] = 0xFF;
          } else {
            break;
          }
        }
      }

      if (mode != 0) {
        this.pos += 4 - mode;
      }
    }
  };

  BmpDecoder.prototype.bit4 = function () {
    var xlen = Math.ceil(this.width / 2);
    var mode = xlen % 4;

    for (var y = this.height - 1; y >= 0; y--) {
      var line = this.bottom_up ? y : this.height - 1 - y;

      for (var x = 0; x < xlen; x++) {
        var b = this.datav.getUint8(this.pos++, true);
        var location = line * this.width * 4 + x * 2 * 4;
        var before = b >> 4;
        var after = b & 0x0F;
        var rgb = this.palette[before];
        this.data[location] = rgb.blue;
        this.data[location + 1] = rgb.green;
        this.data[location + 2] = rgb.red;
        this.data[location + 3] = 0xFF;
        if (x * 2 + 1 >= this.width) break;
        rgb = this.palette[after];
        this.data[location + 4] = rgb.blue;
        this.data[location + 4 + 1] = rgb.green;
        this.data[location + 4 + 2] = rgb.red;
        this.data[location + 4 + 3] = 0xFF;
      }

      if (mode != 0) {
        this.pos += 4 - mode;
      }
    }
  };

  BmpDecoder.prototype.bit8 = function () {
    var mode = this.width % 4;

    for (var y = this.height - 1; y >= 0; y--) {
      var line = this.bottom_up ? y : this.height - 1 - y;

      for (var x = 0; x < this.width; x++) {
        var b = this.datav.getUint8(this.pos++, true);
        var location = line * this.width * 4 + x * 4;

        if (b < this.palette.length) {
          var rgb = this.palette[b];
          this.data[location] = rgb.red;
          this.data[location + 1] = rgb.green;
          this.data[location + 2] = rgb.blue;
          this.data[location + 3] = 0xFF;
        } else {
          this.data[location] = 0xFF;
          this.data[location + 1] = 0xFF;
          this.data[location + 2] = 0xFF;
          this.data[location + 3] = 0xFF;
        }
      }

      if (mode != 0) {
        this.pos += 4 - mode;
      }
    }
  };

  BmpDecoder.prototype.bit15 = function () {
    var dif_w = this.width % 3;

    var _11111 = parseInt("11111", 2),
        _1_5 = _11111;

    for (var y = this.height - 1; y >= 0; y--) {
      var line = this.bottom_up ? y : this.height - 1 - y;

      for (var x = 0; x < this.width; x++) {
        var B = this.datav.getUint16(this.pos, true);
        this.pos += 2;
        var blue = (B & _1_5) / _1_5 * 255 | 0;
        var green = (B >> 5 & _1_5) / _1_5 * 255 | 0;
        var red = (B >> 10 & _1_5) / _1_5 * 255 | 0;
        var alpha = B >> 15 ? 0xFF : 0x00;
        var location = line * this.width * 4 + x * 4;
        this.data[location] = red;
        this.data[location + 1] = green;
        this.data[location + 2] = blue;
        this.data[location + 3] = alpha;
      }
      this.pos += dif_w;
    }
  };
  BmpDecoder.prototype.bit16 = function () {
    var dif_w = this.width % 3;
    var _11111 = parseInt("11111", 2),
        _1_5 = _11111;
    var _111111 = parseInt("111111", 2),
        _1_6 = _111111;
    for (var y = this.height - 1; y >= 0; y--) {
      var line = this.bottom_up ? y : this.height - 1 - y;
      for (var x = 0; x < this.width; x++) {
        var B = this.datav.getUint16(this.pos, true);
        this.pos += 2;
        var alpha = 0xFF;
        var blue = (B & _1_5) / _1_5 * 255 | 0;
        var green = (B >> 5 & _1_6) / _1_6 * 255 | 0;
        var red = (B >> 11) / _1_5 * 255 | 0;
        var location = line * this.width * 4 + x * 4;
        this.data[location] = red;
        this.data[location + 1] = green;
        this.data[location + 2] = blue;
        this.data[location + 3] = alpha;
      }
      this.pos += dif_w;
    }
  };
  BmpDecoder.prototype.bit24 = function () {
    for (var y = this.height - 1; y >= 0; y--) {
      var line = this.bottom_up ? y : this.height - 1 - y;
      for (var x = 0; x < this.width; x++) {
        var blue = this.datav.getUint8(this.pos++, true);
        var green = this.datav.getUint8(this.pos++, true);
        var red = this.datav.getUint8(this.pos++, true);
        var location = line * this.width * 4 + x * 4;
        this.data[location] = red;
        this.data[location + 1] = green;
        this.data[location + 2] = blue;
        this.data[location + 3] = 0xFF;
      }
      this.pos += this.width % 4;
    }
  };
  BmpDecoder.prototype.bit32 = function () {
    for (var y = this.height - 1; y >= 0; y--) {
      var line = this.bottom_up ? y : this.height - 1 - y;
      for (var x = 0; x < this.width; x++) {
        var blue = this.datav.getUint8(this.pos++, true);
        var green = this.datav.getUint8(this.pos++, true);
        var red = this.datav.getUint8(this.pos++, true);
        var alpha = this.datav.getUint8(this.pos++, true);
        var location = line * this.width * 4 + x * 4;
        this.data[location] = red;
        this.data[location + 1] = green;
        this.data[location + 2] = blue;
        this.data[location + 3] = alpha;
      }
    }
  };
  BmpDecoder.prototype.getData = function () {
    return this.data;
  };
  window.tmp = BmpDecoder;
  (function (global) {
    var MAX_BITS = 15;
    var D_CODES = 30;
    var BL_CODES = 19;
    var LENGTH_CODES = 29;
    var LITERALS = 256;
    var L_CODES = LITERALS + 1 + LENGTH_CODES;
    var HEAP_SIZE = 2 * L_CODES + 1;
    var END_BLOCK = 256;
    var MAX_BL_BITS = 7;
    var REP_3_6 = 16;
    var REPZ_3_10 = 17;
    var REPZ_11_138 = 18;
    var Buf_size = 8 * 2;
    var Z_DEFAULT_COMPRESSION = -1;
    var Z_FILTERED = 1;
    var Z_HUFFMAN_ONLY = 2;
    var Z_DEFAULT_STRATEGY = 0;
    var Z_NO_FLUSH = 0;
    var Z_PARTIAL_FLUSH = 1;
    var Z_FULL_FLUSH = 3;
    var Z_FINISH = 4;
    var Z_OK = 0;
    var Z_STREAM_END = 1;
    var Z_NEED_DICT = 2;
    var Z_STREAM_ERROR = -2;
    var Z_DATA_ERROR = -3;
    var Z_BUF_ERROR = -5;
    var _dist_code = [0, 1, 2, 3, 4, 4, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 0, 0, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29];
    function Tree() {
      var that = this;
      function gen_bitlen(s) {
        var tree = that.dyn_tree;
        var stree = that.stat_desc.static_tree;
        var extra = that.stat_desc.extra_bits;
        var base = that.stat_desc.extra_base;
        var max_length = that.stat_desc.max_length;
        var h;
        var n, m;
        var bits;
        var xbits;
        var f;
        var overflow = 0;
        for (bits = 0; bits <= MAX_BITS; bits++) {
          s.bl_count[bits] = 0;
        }
        tree[s.heap[s.heap_max] * 2 + 1] = 0;
        for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
          n = s.heap[h];
          bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
          if (bits > max_length) {
            bits = max_length;
            overflow++;
          }
          tree[n * 2 + 1] = bits;
          if (n > that.max_code) continue;
          s.bl_count[bits]++;
          xbits = 0;
          if (n >= base) xbits = extra[n - base];
          f = tree[n * 2];
          s.opt_len += f * (bits + xbits);
          if (stree) s.static_len += f * (stree[n * 2 + 1] + xbits);
        }

        if (overflow === 0) return
        do {
          bits = max_length - 1;
          while (s.bl_count[bits] === 0) {
            bits--;
          }
          s.bl_count[bits]--;
          s.bl_count[bits + 1] += 2;
          s.bl_count[max_length]--;
          overflow -= 2;
        } while (overflow > 0);
        for (bits = max_length; bits !== 0; bits--) {
          n = s.bl_count[bits];
          while (n !== 0) {
            m = s.heap[--h];
            if (m > that.max_code) continue;
            if (tree[m * 2 + 1] != bits) {
              s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
              tree[m * 2 + 1] = bits;
            }
            n--;
          }
        }
      }
      function bi_reverse(code,
      len
      ) {
        var res = 0;
        do {
          res |= code & 1;
          code >>>= 1;
          res <<= 1;
        } while (--len > 0);
        return res >>> 1;
      }
      function gen_codes(tree,
      max_code,
      bl_count
      ) {
        var next_code = [];
        var code = 0;
        var bits;
        var n;
        var len;
        for (bits = 1; bits <= MAX_BITS; bits++) {
          next_code[bits] = code = code + bl_count[bits - 1] << 1;
        }
        for (n = 0; n <= max_code; n++) {
          len = tree[n * 2 + 1];
          if (len === 0) continue;
          tree[n * 2] = bi_reverse(next_code[len]++, len);
        }
      }
      that.build_tree = function (s) {
        var tree = that.dyn_tree;
        var stree = that.stat_desc.static_tree;
        var elems = that.stat_desc.elems;
        var n, m;
        var max_code = -1;
        var node;
        s.heap_len = 0;
        s.heap_max = HEAP_SIZE;
        for (n = 0; n < elems; n++) {
          if (tree[n * 2] !== 0) {
            s.heap[++s.heap_len] = max_code = n;
            s.depth[n] = 0;
          } else {
            tree[n * 2 + 1] = 0;
          }
        }
        while (s.heap_len < 2) {
          node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
          tree[node * 2] = 1;
          s.depth[node] = 0;
          s.opt_len--;
          if (stree) s.static_len -= stree[node * 2 + 1];
        }
        that.max_code = max_code;
        for (n = Math.floor(s.heap_len / 2); n >= 1; n--) {
          s.pqdownheap(tree, n);
        }
        node = elems;
        do {
          n = s.heap[1];
          s.heap[1] = s.heap[s.heap_len--];
          s.pqdownheap(tree, 1);
          m = s.heap[1];
          s.heap[--s.heap_max] = n;
          s.heap[--s.heap_max] = m;
          tree[node * 2] = tree[n * 2] + tree[m * 2];
          s.depth[node] = Math.max(s.depth[n], s.depth[m]) + 1;
          tree[n * 2 + 1] = tree[m * 2 + 1] = node;
          s.heap[1] = node++;
          s.pqdownheap(tree, 1);
        } while (s.heap_len >= 2);
        s.heap[--s.heap_max] = s.heap[1];
        gen_bitlen(s);
        gen_codes(tree, that.max_code, s.bl_count);
      };
    }
    Tree._length_code = [0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28];
    Tree.base_length = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 0];
    Tree.base_dist = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 6144, 8192, 12288, 16384, 24576];

    Tree.d_code = function (dist) {
      return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
    };

    Tree.extra_lbits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
    Tree.extra_dbits = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
    Tree.extra_blbits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
    Tree.bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
    function StaticTree(static_tree, extra_bits, extra_base, elems, max_length) {
      var that = this;
      that.static_tree = static_tree;
      that.extra_bits = extra_bits;
      that.extra_base = extra_base;
      that.elems = elems;
      that.max_length = max_length;
    }

    StaticTree.static_ltree = [12, 8, 140, 8, 76, 8, 204, 8, 44, 8, 172, 8, 108, 8, 236, 8, 28, 8, 156, 8, 92, 8, 220, 8, 60, 8, 188, 8, 124, 8, 252, 8, 2, 8, 130, 8, 66, 8, 194, 8, 34, 8, 162, 8, 98, 8, 226, 8, 18, 8, 146, 8, 82, 8, 210, 8, 50, 8, 178, 8, 114, 8, 242, 8, 10, 8, 138, 8, 74, 8, 202, 8, 42, 8, 170, 8, 106, 8, 234, 8, 26, 8, 154, 8, 90, 8, 218, 8, 58, 8, 186, 8, 122, 8, 250, 8, 6, 8, 134, 8, 70, 8, 198, 8, 38, 8, 166, 8, 102, 8, 230, 8, 22, 8, 150, 8, 86, 8, 214, 8, 54, 8, 182, 8, 118, 8, 246, 8, 14, 8, 142, 8, 78, 8, 206, 8, 46, 8, 174, 8, 110, 8, 238, 8, 30, 8, 158, 8, 94, 8, 222, 8, 62, 8, 190, 8, 126, 8, 254, 8, 1, 8, 129, 8, 65, 8, 193, 8, 33, 8, 161, 8, 97, 8, 225, 8, 17, 8, 145, 8, 81, 8, 209, 8, 49, 8, 177, 8, 113, 8, 241, 8, 9, 8, 137, 8, 73, 8, 201, 8, 41, 8, 169, 8, 105, 8, 233, 8, 25, 8, 153, 8, 89, 8, 217, 8, 57, 8, 185, 8, 121, 8, 249, 8, 5, 8, 133, 8, 69, 8, 197, 8, 37, 8, 165, 8, 101, 8, 229, 8, 21, 8, 149, 8, 85, 8, 213, 8, 53, 8, 181, 8, 117, 8, 245, 8, 13, 8, 141, 8, 77, 8, 205, 8, 45, 8, 173, 8, 109, 8, 237, 8, 29, 8, 157, 8, 93, 8, 221, 8, 61, 8, 189, 8, 125, 8, 253, 8, 19, 9, 275, 9, 147, 9, 403, 9, 83, 9, 339, 9, 211, 9, 467, 9, 51, 9, 307, 9, 179, 9, 435, 9, 115, 9, 371, 9, 243, 9, 499, 9, 11, 9, 267, 9, 139, 9, 395, 9, 75, 9, 331, 9, 203, 9, 459, 9, 43, 9, 299, 9, 171, 9, 427, 9, 107, 9, 363, 9, 235, 9, 491, 9, 27, 9, 283, 9, 155, 9, 411, 9, 91, 9, 347, 9, 219, 9, 475, 9, 59, 9, 315, 9, 187, 9, 443, 9, 123, 9, 379, 9, 251, 9, 507, 9, 7, 9, 263, 9, 135, 9, 391, 9, 71, 9, 327, 9, 199, 9, 455, 9, 39, 9, 295, 9, 167, 9, 423, 9, 103, 9, 359, 9, 231, 9, 487, 9, 23, 9, 279, 9, 151, 9, 407, 9, 87, 9, 343, 9, 215, 9, 471, 9, 55, 9, 311, 9, 183, 9, 439, 9, 119, 9, 375, 9, 247, 9, 503, 9, 15, 9, 271, 9, 143, 9, 399, 9, 79, 9, 335, 9, 207, 9, 463, 9, 47, 9, 303, 9, 175, 9, 431, 9, 111, 9, 367, 9, 239, 9, 495, 9, 31, 9, 287, 9, 159, 9, 415, 9, 95, 9, 351, 9, 223, 9, 479, 9, 63, 9, 319, 9, 191, 9, 447, 9, 127, 9, 383, 9, 255, 9, 511, 9, 0, 7, 64, 7, 32, 7, 96, 7, 16, 7, 80, 7, 48, 7, 112, 7, 8, 7, 72, 7, 40, 7, 104, 7, 24, 7, 88, 7, 56, 7, 120, 7, 4, 7, 68, 7, 36, 7, 100, 7, 20, 7, 84, 7, 52, 7, 116, 7, 3, 8, 131, 8, 67, 8, 195, 8, 35, 8, 163, 8, 99, 8, 227, 8];
    StaticTree.static_dtree = [0, 5, 16, 5, 8, 5, 24, 5, 4, 5, 20, 5, 12, 5, 28, 5, 2, 5, 18, 5, 10, 5, 26, 5, 6, 5, 22, 5, 14, 5, 30, 5, 1, 5, 17, 5, 9, 5, 25, 5, 5, 5, 21, 5, 13, 5, 29, 5, 3, 5, 19, 5, 11, 5, 27, 5, 7, 5, 23, 5];
    StaticTree.static_l_desc = new StaticTree(StaticTree.static_ltree, Tree.extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
    StaticTree.static_d_desc = new StaticTree(StaticTree.static_dtree, Tree.extra_dbits, 0, D_CODES, MAX_BITS);
    StaticTree.static_bl_desc = new StaticTree(null, Tree.extra_blbits, 0, BL_CODES, MAX_BL_BITS);
    var MAX_MEM_LEVEL = 9;
    var DEF_MEM_LEVEL = 8;

    function Config(good_length, max_lazy, nice_length, max_chain, func) {
      var that = this;
      that.good_length = good_length;
      that.max_lazy = max_lazy;
      that.nice_length = nice_length;
      that.max_chain = max_chain;
      that.func = func;
    }

    var STORED = 0;
    var FAST = 1;
    var SLOW = 2;
    var config_table = [new Config(0, 0, 0, 0, STORED), new Config(4, 4, 8, 4, FAST), new Config(4, 5, 16, 8, FAST), new Config(4, 6, 32, 32, FAST), new Config(4, 4, 16, 16, SLOW), new Config(8, 16, 32, 32, SLOW), new Config(8, 16, 128, 128, SLOW), new Config(8, 32, 128, 256, SLOW), new Config(32, 128, 258, 1024, SLOW), new Config(32, 258, 258, 4096, SLOW)];
    var z_errmsg = ["need dictionary",
    "stream end",
    "",
    "",
    "stream error",
    "data error",
    "",
    "buffer error",
    "",
    ""];
    var NeedMore = 0;
    var BlockDone = 1;
    var FinishStarted = 2;
    var FinishDone = 3;
    var PRESET_DICT = 0x20;
    var INIT_STATE = 42;
    var BUSY_STATE = 113;
    var FINISH_STATE = 666;
    var Z_DEFLATED = 8;
    var STORED_BLOCK = 0;
    var STATIC_TREES = 1;
    var DYN_TREES = 2;
    var MIN_MATCH = 3;
    var MAX_MATCH = 258;
    var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
    function smaller(tree, n, m, depth) {
      var tn2 = tree[n * 2];
      var tm2 = tree[m * 2];
      return tn2 < tm2 || tn2 == tm2 && depth[n] <= depth[m];
    }
    function Deflate() {
      var that = this;
      var strm;
      var status;
      var pending_buf_size;
      var last_flush;
      var w_size;
      var w_bits;
      var w_mask;
      var window;
      var window_size;
      var prev;
      var head;
      var ins_h;
      var hash_size;
      var hash_bits;
      var hash_mask;
      var hash_shift;
      var block_start;
      var match_length;
      var prev_match;
      var match_available;
      var strstart;
      var match_start;
      var lookahead;
      var prev_length;
      var max_chain_length;
      var max_lazy_match;
      var level;
      var strategy;
      var good_match;
      var nice_match;
      var dyn_ltree;
      var dyn_dtree;
      var bl_tree;
      var l_desc = new Tree();

      var d_desc = new Tree();

      var bl_desc = new Tree();
      that.depth = [];
      var l_buf;
      var lit_bufsize;
      var last_lit;
      var d_buf;
      var matches;
      var last_eob_len;
      var bi_buf;
      var bi_valid;
      that.bl_count = [];
      that.heap = [];
      dyn_ltree = [];
      dyn_dtree = [];
      bl_tree = [];
      function lm_init() {
        var i;
        window_size = 2 * w_size;
        head[hash_size - 1] = 0;
        for (i = 0; i < hash_size - 1; i++) {
          head[i] = 0;
        }
        max_lazy_match = config_table[level].max_lazy;
        good_match = config_table[level].good_length;
        nice_match = config_table[level].nice_length;
        max_chain_length = config_table[level].max_chain;
        strstart = 0;
        block_start = 0;
        lookahead = 0;
        match_length = prev_length = MIN_MATCH - 1;
        match_available = 0;
        ins_h = 0;
      }
      function init_block() {
        var i;
        for (i = 0; i < L_CODES; i++) {
          dyn_ltree[i * 2] = 0;
        }
        for (i = 0; i < D_CODES; i++) {
          dyn_dtree[i * 2] = 0;
        }

        for (i = 0; i < BL_CODES; i++) {
          bl_tree[i * 2] = 0;
        }
        dyn_ltree[END_BLOCK * 2] = 1;
        that.opt_len = that.static_len = 0;
        last_lit = matches = 0;
      }

      function tr_init() {
        l_desc.dyn_tree = dyn_ltree;
        l_desc.stat_desc = StaticTree.static_l_desc;
        d_desc.dyn_tree = dyn_dtree;
        d_desc.stat_desc = StaticTree.static_d_desc;
        bl_desc.dyn_tree = bl_tree;
        bl_desc.stat_desc = StaticTree.static_bl_desc;
        bi_buf = 0;
        bi_valid = 0;
        last_eob_len = 8;
        init_block();
      }
      that.pqdownheap = function (tree,
      k // node to move down
      ) {
        var heap = that.heap;
        var v = heap[k];
        var j = k << 1;
        while (j <= that.heap_len) {
          if (j < that.heap_len && smaller(tree, heap[j + 1], heap[j], that.depth)) {
            j++;
          }
          if (smaller(tree, v, heap[j], that.depth)) break;
          heap[k] = heap[j];
          k = j;
          j <<= 1;
        }
        heap[k] = v;
      };
      function scan_tree(tree,
      max_code
      ) {
        var n;
        var prevlen = -1;
        var curlen;
        var nextlen = tree[0 * 2 + 1];
        var count = 0;
        var max_count = 7;
        var min_count = 4;
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        }
        tree[(max_code + 1) * 2 + 1] = 0xffff;
        for (n = 0; n <= max_code; n++) {
          curlen = nextlen;
          nextlen = tree[(n + 1) * 2 + 1];
          if (++count < max_count && curlen == nextlen) {
            continue;
          } else if (count < min_count) {
            bl_tree[curlen * 2] += count;
          } else if (curlen !== 0) {
            if (curlen != prevlen) bl_tree[curlen * 2]++;
            bl_tree[REP_3_6 * 2]++;
          } else if (count <= 10) {
            bl_tree[REPZ_3_10 * 2]++;
          } else {
            bl_tree[REPZ_11_138 * 2]++;
          }
          count = 0;
          prevlen = curlen;
          if (nextlen === 0) {
            max_count = 138;
            min_count = 3;
          } else if (curlen == nextlen) {
            max_count = 6;
            min_count = 3;
          } else {
            max_count = 7;
            min_count = 4;
          }
        }
      }
      function build_bl_tree() {
        var max_blindex;
        scan_tree(dyn_ltree, l_desc.max_code);
        scan_tree(dyn_dtree, d_desc.max_code);
        bl_desc.build_tree(that);
        for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
          if (bl_tree[Tree.bl_order[max_blindex] * 2 + 1] !== 0) break;
        }
        that.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
        return max_blindex;
      }
      function put_byte(p) {
        that.pending_buf[that.pending++] = p;
      }

      function put_short(w) {
        put_byte(w & 0xff);
        put_byte(w >>> 8 & 0xff);
      }
      function putShortMSB(b) {
        put_byte(b >> 8 & 0xff);
        put_byte(b & 0xff & 0xff);
      }
      function send_bits(value, length) {
        var val,
            len = length;
        if (bi_valid > Buf_size - len) {
          val = value;
          bi_buf |= val << bi_valid & 0xffff;
          put_short(bi_buf);
          bi_buf = val >>> Buf_size - bi_valid;
          bi_valid += len - Buf_size;
        } else {
          bi_buf |= value << bi_valid & 0xffff;
          bi_valid += len;
        }
      }
      function send_code(c, tree) {
        var c2 = c * 2;
        send_bits(tree[c2] & 0xffff, tree[c2 + 1] & 0xffff);
      }
      function send_tree(tree,
      max_code
      ) {
        var n;
        var prevlen = -1;
        var curlen;
        var nextlen = tree[0 * 2 + 1];
        var count = 0;
        var max_count = 7;
        var min_count = 4;
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        }
        for (n = 0; n <= max_code; n++) {
          curlen = nextlen;
          nextlen = tree[(n + 1) * 2 + 1];
          if (++count < max_count && curlen == nextlen) {
            continue;
          } else if (count < min_count) {
            do {
              send_code(curlen, bl_tree);
            } while (--count !== 0);
          } else if (curlen !== 0) {
            if (curlen != prevlen) {
              send_code(curlen, bl_tree);
              count--;
            }
            send_code(REP_3_6, bl_tree);
            send_bits(count - 3, 2);
          } else if (count <= 10) {
            send_code(REPZ_3_10, bl_tree);
            send_bits(count - 3, 3);
          } else {
            send_code(REPZ_11_138, bl_tree);
            send_bits(count - 11, 7);
          }
          count = 0;
          prevlen = curlen;
          if (nextlen === 0) {
            max_count = 138;
            min_count = 3;
          } else if (curlen == nextlen) {
            max_count = 6;
            min_count = 3;
          } else {
            max_count = 7;
            min_count = 4;
          }
        }
      }
      function send_all_trees(lcodes, dcodes, blcodes) {
        var rank;
        send_bits(lcodes - 257, 5);
        send_bits(dcodes - 1, 5);
        send_bits(blcodes - 4, 4);
        for (rank = 0; rank < blcodes; rank++) {
          send_bits(bl_tree[Tree.bl_order[rank] * 2 + 1], 3);
        }
        send_tree(dyn_ltree, lcodes - 1);
        send_tree(dyn_dtree, dcodes - 1);
      }
      function bi_flush() {
        if (bi_valid == 16) {
          put_short(bi_buf);
          bi_buf = 0;
          bi_valid = 0;
        } else if (bi_valid >= 8) {
          put_byte(bi_buf & 0xff);
          bi_buf >>>= 8;
          bi_valid -= 8;
        }
      }
      function _tr_align() {
        send_bits(STATIC_TREES << 1, 3);
        send_code(END_BLOCK, StaticTree.static_ltree);
        bi_flush();
        if (1 + last_eob_len + 10 - bi_valid < 9) {
          send_bits(STATIC_TREES << 1, 3);
          send_code(END_BLOCK, StaticTree.static_ltree);
          bi_flush();
        }
        last_eob_len = 7;
      }
      function _tr_tally(dist,
      lc
      ) {
        var out_length, in_length, dcode;
        that.pending_buf[d_buf + last_lit * 2] = dist >>> 8 & 0xff;
        that.pending_buf[d_buf + last_lit * 2 + 1] = dist & 0xff;
        that.pending_buf[l_buf + last_lit] = lc & 0xff;
        last_lit++;
        if (dist === 0) {
          dyn_ltree[lc * 2]++;
        } else {
          matches++;
          dist--;
          dyn_ltree[(Tree._length_code[lc] + LITERALS + 1) * 2]++;
          dyn_dtree[Tree.d_code(dist) * 2]++;
        }
        if ((last_lit & 0x1fff) === 0 && level > 2) {
          out_length = last_lit * 8;
          in_length = strstart - block_start;
          for (dcode = 0; dcode < D_CODES; dcode++) {
            out_length += dyn_dtree[dcode * 2] * (5 + Tree.extra_dbits[dcode]);
          }
          out_length >>>= 3;
          if (matches < Math.floor(last_lit / 2) && out_length < Math.floor(in_length / 2)) return true;
        }
        return last_lit == lit_bufsize - 1;
      }
      function compress_block(ltree, dtree) {
        var dist;
        var lc;
        var lx = 0;
        var code;
        var extra;
        if (last_lit !== 0) {
          do {
            dist = that.pending_buf[d_buf + lx * 2] << 8 & 0xff00 | that.pending_buf[d_buf + lx * 2 + 1] & 0xff;
            lc = that.pending_buf[l_buf + lx] & 0xff;
            lx++;
            if (dist === 0) {
              send_code(lc, ltree);
            } else {
              code = Tree._length_code[lc];
              send_code(code + LITERALS + 1, ltree);
              extra = Tree.extra_lbits[code];
              if (extra !== 0) {
                lc -= Tree.base_length[code];
                send_bits(lc, extra);
              }
              dist--;
              code = Tree.d_code(dist);
              send_code(code, dtree);
              extra = Tree.extra_dbits[code];
              if (extra !== 0) {
                dist -= Tree.base_dist[code];
                send_bits(dist, extra);
              }
            }
          } while (lx < last_lit);
        }
        send_code(END_BLOCK, ltree);
        last_eob_len = ltree[END_BLOCK * 2 + 1];
      }
      function bi_windup() {
        if (bi_valid > 8) {
          put_short(bi_buf);
        } else if (bi_valid > 0) {
          put_byte(bi_buf & 0xff);
        }
        bi_buf = 0;
        bi_valid = 0;
      }
      function copy_block(buf,
      len,
      header
      ) {
        bi_windup();
        last_eob_len = 8;
        if (header) {
          put_short(len);
          put_short(~len);
        }
        that.pending_buf.set(window.subarray(buf, buf + len), that.pending);
        that.pending += len;
      }
      function _tr_stored_block(buf,
      stored_len,
      eof
      ) {
        send_bits((STORED_BLOCK << 1) + (eof ? 1 : 0), 3);
        copy_block(buf, stored_len, true);
      }
      function _tr_flush_block(buf,
      stored_len,
      eof
      ) {
        var opt_lenb, static_lenb;
        var max_blindex = 0;
        if (level > 0) {
          l_desc.build_tree(that);
          d_desc.build_tree(that);
          max_blindex = build_bl_tree();
          opt_lenb = that.opt_len + 3 + 7 >>> 3;
          static_lenb = that.static_len + 3 + 7 >>> 3;
          if (static_lenb <= opt_lenb) opt_lenb = static_lenb;
        } else {
          opt_lenb = static_lenb = stored_len + 5;
        }
        if (stored_len + 4 <= opt_lenb && buf != -1) {
          _tr_stored_block(buf, stored_len, eof);
        } else if (static_lenb == opt_lenb) {
          send_bits((STATIC_TREES << 1) + (eof ? 1 : 0), 3);
          compress_block(StaticTree.static_ltree, StaticTree.static_dtree);
        } else {
          send_bits((DYN_TREES << 1) + (eof ? 1 : 0), 3);
          send_all_trees(l_desc.max_code + 1, d_desc.max_code + 1, max_blindex + 1);
          compress_block(dyn_ltree, dyn_dtree);
        }
        init_block();
        if (eof) {
          bi_windup();
        }
      }
      function flush_block_only(eof) {
        _tr_flush_block(block_start >= 0 ? block_start : -1, strstart - block_start, eof);

        block_start = strstart;
        strm.flush_pending();
      }
      function fill_window() {
        var n, m;
        var p;
        var more;
        do {
          more = window_size - lookahead - strstart;
          if (more === 0 && strstart === 0 && lookahead === 0) {
            more = w_size;
          } else if (more == -1) {
            more--;
          } else if (strstart >= w_size + w_size - MIN_LOOKAHEAD) {
            window.set(window.subarray(w_size, w_size + w_size), 0);
            match_start -= w_size;
            strstart -= w_size;
            block_start -= w_size;
            n = hash_size;
            p = n;
            do {
              m = head[--p] & 0xffff;
              head[p] = m >= w_size ? m - w_size : 0;
            } while (--n !== 0);
            n = w_size;
            p = n;
            do {
              m = prev[--p] & 0xffff;
              prev[p] = m >= w_size ? m - w_size : 0;
            } while (--n !== 0);
            more += w_size;
          }
          if (strm.avail_in === 0) return;
          n = strm.read_buf(window, strstart + lookahead, more);
          lookahead += n;
          if (lookahead >= MIN_MATCH) {
            ins_h = window[strstart] & 0xff;
            ins_h = (ins_h << hash_shift ^ window[strstart + 1] & 0xff) & hash_mask;
          }
        } while (lookahead < MIN_LOOKAHEAD && strm.avail_in !== 0);
      }
      function deflate_stored(flush) {
        var max_block_size = 0xffff;
        var max_start;
        if (max_block_size > pending_buf_size - 5) {
          max_block_size = pending_buf_size - 5;
        }
        while (true) {
          if (lookahead <= 1) {
            fill_window();
            if (lookahead === 0 && flush == Z_NO_FLUSH) return NeedMore;
            if (lookahead === 0) break;
          }
          strstart += lookahead;
          lookahead = 0;
          max_start = block_start + max_block_size;
          if (strstart === 0 || strstart >= max_start) {
            lookahead = strstart - max_start;
            strstart = max_start;
            flush_block_only(false);
            if (strm.avail_out === 0) return NeedMore;
          }
          if (strstart - block_start >= w_size - MIN_LOOKAHEAD) {
            flush_block_only(false);
            if (strm.avail_out === 0) return NeedMore;
          }
        }

        flush_block_only(flush == Z_FINISH);
        if (strm.avail_out === 0) return flush == Z_FINISH ? FinishStarted : NeedMore;
        return flush == Z_FINISH ? FinishDone : BlockDone;
      }

      function longest_match(cur_match) {
        var chain_length = max_chain_length;
        var scan = strstart;
        var match;
        var len;
        var best_len = prev_length;
        var limit = strstart > w_size - MIN_LOOKAHEAD ? strstart - (w_size - MIN_LOOKAHEAD) : 0;
        var _nice_match = nice_match;
        var wmask = w_mask;
        var strend = strstart + MAX_MATCH;
        var scan_end1 = window[scan + best_len - 1];
        var scan_end = window[scan + best_len];
        if (prev_length >= good_match) {
          chain_length >>= 2;
        }
        if (_nice_match > lookahead) _nice_match = lookahead;
        do {
          match = cur_match;
          if (window[match + best_len] != scan_end || window[match + best_len - 1] != scan_end1 || window[match] != window[scan] || window[++match] != window[scan + 1]) continue;
          scan += 2;
          match++;
          do {} while (window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && scan < strend);
          len = MAX_MATCH - (strend - scan);
          scan = strend - MAX_MATCH;
          if (len > best_len) {
            match_start = cur_match;
            best_len = len;
            if (len >= _nice_match) break;
            scan_end1 = window[scan + best_len - 1];
            scan_end = window[scan + best_len];
          }
        } while ((cur_match = prev[cur_match & wmask] & 0xffff) > limit && --chain_length !== 0);
        if (best_len <= lookahead) return best_len;
        return lookahead;
      }
      function deflate_fast(flush) {
        var hash_head = 0;
        var bflush;
        while (true) {
          if (lookahead < MIN_LOOKAHEAD) {
            fill_window();
            if (lookahead < MIN_LOOKAHEAD && flush == Z_NO_FLUSH) {
              return NeedMore;
            }
            if (lookahead === 0) break;
          }
          if (lookahead >= MIN_MATCH) {
            ins_h = (ins_h << hash_shift ^ window[strstart + (MIN_MATCH - 1)] & 0xff) & hash_mask;
            hash_head = head[ins_h] & 0xffff;
            prev[strstart & w_mask] = head[ins_h];
            head[ins_h] = strstart;
          }
          if (hash_head !== 0 && (strstart - hash_head & 0xffff) <= w_size - MIN_LOOKAHEAD) {
            if (strategy != Z_HUFFMAN_ONLY) {
              match_length = longest_match(hash_head);
            }
          }
          if (match_length >= MIN_MATCH) {
            bflush = _tr_tally(strstart - match_start, match_length - MIN_MATCH);
            lookahead -= match_length;
            if (match_length <= max_lazy_match && lookahead >= MIN_MATCH) {
              match_length--;
              do {
                strstart++;
                ins_h = (ins_h << hash_shift ^ window[strstart + (MIN_MATCH - 1)] & 0xff) & hash_mask;
                hash_head = head[ins_h] & 0xffff;
                prev[strstart & w_mask] = head[ins_h];
                head[ins_h] = strstart;
              } while (--match_length !== 0);
              strstart++;
            } else {
              strstart += match_length;
              match_length = 0;
              ins_h = window[strstart] & 0xff;
              ins_h = (ins_h << hash_shift ^ window[strstart + 1] & 0xff) & hash_mask;
            }
          } else {
            bflush = _tr_tally(0, window[strstart] & 0xff);
            lookahead--;
            strstart++;
          }
          if (bflush) {
            flush_block_only(false);
            if (strm.avail_out === 0) return NeedMore;
          }
        }
        flush_block_only(flush == Z_FINISH);
        if (strm.avail_out === 0) {
          if (flush == Z_FINISH) return FinishStarted;else return NeedMore;
        }
        return flush == Z_FINISH ? FinishDone : BlockDone;
      }
      function deflate_slow(flush) {
        var hash_head = 0;
        var bflush;
        var max_insert;
        while (true) {
          if (lookahead < MIN_LOOKAHEAD) {
            fill_window();
            if (lookahead < MIN_LOOKAHEAD && flush == Z_NO_FLUSH) {
              return NeedMore;
            }
            if (lookahead === 0) break;
          }
          if (lookahead >= MIN_MATCH) {
            ins_h = (ins_h << hash_shift ^ window[strstart + (MIN_MATCH - 1)] & 0xff) & hash_mask;
            hash_head = head[ins_h] & 0xffff;
            prev[strstart & w_mask] = head[ins_h];
            head[ins_h] = strstart;
          }
          prev_length = match_length;
          prev_match = match_start;
          match_length = MIN_MATCH - 1;
          if (hash_head !== 0 && prev_length < max_lazy_match && (strstart - hash_head & 0xffff) <= w_size - MIN_LOOKAHEAD) {
            if (strategy != Z_HUFFMAN_ONLY) {
              match_length = longest_match(hash_head);
            }
            if (match_length <= 5 && (strategy == Z_FILTERED || match_length == MIN_MATCH && strstart - match_start > 4096)) {
              match_length = MIN_MATCH - 1;
            }
          }
          if (prev_length >= MIN_MATCH && match_length <= prev_length) {
            max_insert = strstart + lookahead - MIN_MATCH;
            bflush = _tr_tally(strstart - 1 - prev_match, prev_length - MIN_MATCH);
            lookahead -= prev_length - 1;
            prev_length -= 2;
            do {
              if (++strstart <= max_insert) {
                ins_h = (ins_h << hash_shift ^ window[strstart + (MIN_MATCH - 1)] & 0xff) & hash_mask;
                hash_head = head[ins_h] & 0xffff;
                prev[strstart & w_mask] = head[ins_h];
                head[ins_h] = strstart;
              }
            } while (--prev_length !== 0);
            match_available = 0;
            match_length = MIN_MATCH - 1;
            strstart++;
            if (bflush) {
              flush_block_only(false);
              if (strm.avail_out === 0) return NeedMore;
            }
          } else if (match_available !== 0) {
            bflush = _tr_tally(0, window[strstart - 1] & 0xff);
            if (bflush) {
              flush_block_only(false);
            }
            strstart++;
            lookahead--;
            if (strm.avail_out === 0) return NeedMore;
          } else {
            match_available = 1;
            strstart++;
            lookahead--;
          }
        }
        if (match_available !== 0) {
          bflush = _tr_tally(0, window[strstart - 1] & 0xff);
          match_available = 0;
        }
        flush_block_only(flush == Z_FINISH);
        if (strm.avail_out === 0) {
          if (flush == Z_FINISH) return FinishStarted;else return NeedMore;
        }
        return flush == Z_FINISH ? FinishDone : BlockDone;
      }
      function deflateReset(strm) {
        strm.total_in = strm.total_out = 0;
        strm.msg = null;
        that.pending = 0;
        that.pending_out = 0;
        status = BUSY_STATE;
        last_flush = Z_NO_FLUSH;
        tr_init();
        lm_init();
        return Z_OK;
      }
      that.deflateInit = function (strm, _level, bits, _method, memLevel, _strategy) {
        if (!_method) _method = Z_DEFLATED;
        if (!memLevel) memLevel = DEF_MEM_LEVEL;
        if (!_strategy) _strategy = Z_DEFAULT_STRATEGY;
        strm.msg = null;
        if (_level == Z_DEFAULT_COMPRESSION) _level = 6;
        if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || _method != Z_DEFLATED || bits < 9 || bits > 15 || _level < 0 || _level > 9 || _strategy < 0 || _strategy > Z_HUFFMAN_ONLY) {
          return Z_STREAM_ERROR;
        }
        strm.dstate = that;
        w_bits = bits;
        w_size = 1 << w_bits;
        w_mask = w_size - 1;
        hash_bits = memLevel + 7;
        hash_size = 1 << hash_bits;
        hash_mask = hash_size - 1;
        hash_shift = Math.floor((hash_bits + MIN_MATCH - 1) / MIN_MATCH);
        window = new Uint8Array(w_size * 2);
        prev = [];
        head = [];
        lit_bufsize = 1 << memLevel + 6;
        that.pending_buf = new Uint8Array(lit_bufsize * 4);
        pending_buf_size = lit_bufsize * 4;
        d_buf = Math.floor(lit_bufsize / 2);
        l_buf = (1 + 2) * lit_bufsize;
        level = _level;
        strategy = _strategy;
        return deflateReset(strm);
      };
      that.deflateEnd = function () {
        if (status != INIT_STATE && status != BUSY_STATE && status != FINISH_STATE) {
          return Z_STREAM_ERROR;
        }
        that.pending_buf = null;
        head = null;
        prev = null;
        window = null;
        that.dstate = null;
        return status == BUSY_STATE ? Z_DATA_ERROR : Z_OK;
      };
      that.deflateParams = function (strm, _level, _strategy) {
        var err = Z_OK;
        if (_level == Z_DEFAULT_COMPRESSION) {
          _level = 6;
        }
        if (_level < 0 || _level > 9 || _strategy < 0 || _strategy > Z_HUFFMAN_ONLY) {
          return Z_STREAM_ERROR;
        }
        if (config_table[level].func != config_table[_level].func && strm.total_in !== 0) {
          err = strm.deflate(Z_PARTIAL_FLUSH);
        }

        if (level != _level) {
          level = _level;
          max_lazy_match = config_table[level].max_lazy;
          good_match = config_table[level].good_length;
          nice_match = config_table[level].nice_length;
          max_chain_length = config_table[level].max_chain;
        }

        strategy = _strategy;
        return err;
      };

      that.deflateSetDictionary = function (strm, dictionary, dictLength) {
        var length = dictLength;
        var n,
            index = 0;
        if (!dictionary || status != INIT_STATE) return Z_STREAM_ERROR;
        if (length < MIN_MATCH) return Z_OK;

        if (length > w_size - MIN_LOOKAHEAD) {
          length = w_size - MIN_LOOKAHEAD;
          index = dictLength - length;
        }

        window.set(dictionary.subarray(index, index + length), 0);
        strstart = length;
        block_start = length;
        ins_h = window[0] & 0xff;
        ins_h = (ins_h << hash_shift ^ window[1] & 0xff) & hash_mask;

        for (n = 0; n <= length - MIN_MATCH; n++) {
          ins_h = (ins_h << hash_shift ^ window[n + (MIN_MATCH - 1)] & 0xff) & hash_mask;
          prev[n & w_mask] = head[ins_h];
          head[ins_h] = n;
        }

        return Z_OK;
      };

      that.deflate = function (_strm, flush) {
        var i, header, level_flags, old_flush, bstate;

        if (flush > Z_FINISH || flush < 0) {
          return Z_STREAM_ERROR;
        }

        if (!_strm.next_out || !_strm.next_in && _strm.avail_in !== 0 || status == FINISH_STATE && flush != Z_FINISH) {
          _strm.msg = z_errmsg[Z_NEED_DICT - Z_STREAM_ERROR];
          return Z_STREAM_ERROR;
        }

        if (_strm.avail_out === 0) {
          _strm.msg = z_errmsg[Z_NEED_DICT - Z_BUF_ERROR];
          return Z_BUF_ERROR;
        }

        strm = _strm;
        old_flush = last_flush;
        last_flush = flush;
        if (status == INIT_STATE) {
          header = Z_DEFLATED + (w_bits - 8 << 4) << 8;
          level_flags = (level - 1 & 0xff) >> 1;
          if (level_flags > 3) level_flags = 3;
          header |= level_flags << 6;
          if (strstart !== 0) header |= PRESET_DICT;
          header += 31 - header % 31;
          status = BUSY_STATE;
          putShortMSB(header);
        }
        if (that.pending !== 0) {
          strm.flush_pending();
          if (strm.avail_out === 0) {
            last_flush = -1;
            return Z_OK;
          }
        } else if (strm.avail_in === 0 && flush <= old_flush && flush != Z_FINISH) {
          strm.msg = z_errmsg[Z_NEED_DICT - Z_BUF_ERROR];
          return Z_BUF_ERROR;
        }
        if (status == FINISH_STATE && strm.avail_in !== 0) {
          _strm.msg = z_errmsg[Z_NEED_DICT - Z_BUF_ERROR];
          return Z_BUF_ERROR;
        }
        if (strm.avail_in !== 0 || lookahead !== 0 || flush != Z_NO_FLUSH && status != FINISH_STATE) {
          bstate = -1;
          switch (config_table[level].func) {
            case STORED:
              bstate = deflate_stored(flush);
              break;
            case FAST:
              bstate = deflate_fast(flush);
              break;
            case SLOW:
              bstate = deflate_slow(flush);
              break;
            default:
          }
          if (bstate == FinishStarted || bstate == FinishDone) {
            status = FINISH_STATE;
          }

          if (bstate == NeedMore || bstate == FinishStarted) {
            if (strm.avail_out === 0) {
              last_flush = -1;
            }

            return Z_OK;
          }

          if (bstate == BlockDone) {
            if (flush == Z_PARTIAL_FLUSH) {
              _tr_align();
            } else {
              _tr_stored_block(0, 0, false);
              if (flush == Z_FULL_FLUSH) {
                for (i = 0; i < hash_size
                ; i++) {
                  head[i] = 0;
                }
              }
            }
            strm.flush_pending();
            if (strm.avail_out === 0) {
              last_flush = -1;
              return Z_OK;
            }
          }
        }
        if (flush != Z_FINISH) return Z_OK;
        return Z_STREAM_END;
      };
    }
    function ZStream() {
      var that = this;
      that.next_in_index = 0;
      that.next_out_index = 0;
      that.avail_in = 0;
      that.total_in = 0;
      that.avail_out = 0;
      that.total_out = 0;
    }

    ZStream.prototype = {
      deflateInit: function deflateInit(level, bits) {
        var that = this;
        that.dstate = new Deflate();
        if (!bits) bits = MAX_BITS;
        return that.dstate.deflateInit(that, level, bits);
      },
      deflate: function deflate(flush) {
        var that = this;

        if (!that.dstate) {
          return Z_STREAM_ERROR;
        }

        return that.dstate.deflate(that, flush);
      },
      deflateEnd: function deflateEnd() {
        var that = this;
        if (!that.dstate) return Z_STREAM_ERROR;
        var ret = that.dstate.deflateEnd();
        that.dstate = null;
        return ret;
      },
      deflateParams: function deflateParams(level, strategy) {
        var that = this;
        if (!that.dstate) return Z_STREAM_ERROR;
        return that.dstate.deflateParams(that, level, strategy);
      },
      deflateSetDictionary: function deflateSetDictionary(dictionary, dictLength) {
        var that = this;
        if (!that.dstate) return Z_STREAM_ERROR;
        return that.dstate.deflateSetDictionary(that, dictionary, dictLength);
      },
      read_buf: function read_buf(buf, start, size) {
        var that = this;
        var len = that.avail_in;
        if (len > size) len = size;
        if (len === 0) return 0;
        that.avail_in -= len;
        buf.set(that.next_in.subarray(that.next_in_index, that.next_in_index + len), start);
        that.next_in_index += len;
        that.total_in += len;
        return len;
      },
      flush_pending: function flush_pending() {
        var that = this;
        var len = that.dstate.pending;
        if (len > that.avail_out) len = that.avail_out;
        if (len === 0) return;
        that.next_out.set(that.dstate.pending_buf.subarray(that.dstate.pending_out, that.dstate.pending_out + len), that.next_out_index);
        that.next_out_index += len;
        that.dstate.pending_out += len;
        that.total_out += len;
        that.avail_out -= len;
        that.dstate.pending -= len;
        if (that.dstate.pending === 0) {
          that.dstate.pending_out = 0;
        }
      }
    };
    function Deflater(options) {
      var that = this;
      var z = new ZStream();
      var bufsize = 512;
      var flush = Z_NO_FLUSH;
      var buf = new Uint8Array(bufsize);
      var level = options ? options.level : Z_DEFAULT_COMPRESSION;
      if (typeof level == "undefined") level = Z_DEFAULT_COMPRESSION;
      z.deflateInit(level);
      z.next_out = buf;
      that.append = function (data, onprogress) {
        var err,
            buffers = [],
            lastIndex = 0,
            bufferIndex = 0,
            bufferSize = 0,
            array;
        if (!data.length) return;
        z.next_in_index = 0;
        z.next_in = data;
        z.avail_in = data.length;
        do {
          z.next_out_index = 0;
          z.avail_out = bufsize;
          err = z.deflate(flush);
          if (err != Z_OK) throw new Error("deflating: " + z.msg);
          if (z.next_out_index) if (z.next_out_index == bufsize) buffers.push(new Uint8Array(buf));else buffers.push(new Uint8Array(buf.subarray(0, z.next_out_index)));
          bufferSize += z.next_out_index;
          if (onprogress && z.next_in_index > 0 && z.next_in_index != lastIndex) {
            onprogress(z.next_in_index);
            lastIndex = z.next_in_index;
          }
        } while (z.avail_in > 0 || z.avail_out === 0);
        array = new Uint8Array(bufferSize);
        buffers.forEach(function (chunk) {
          array.set(chunk, bufferIndex);
          bufferIndex += chunk.length;
        });
        return array;
      };
      that.flush = function () {
        var err,
            buffers = [],
            bufferIndex = 0,
            bufferSize = 0,
            array;
        do {
          z.next_out_index = 0;
          z.avail_out = bufsize;
          err = z.deflate(Z_FINISH);
          if (err != Z_STREAM_END && err != Z_OK) throw new Error("deflating: " + z.msg);
          if (bufsize - z.avail_out > 0) buffers.push(new Uint8Array(buf.subarray(0, z.next_out_index)));
          bufferSize += z.next_out_index;
        } while (z.avail_in > 0 || z.avail_out === 0);

        z.deflateEnd();
        array = new Uint8Array(bufferSize);
        buffers.forEach(function (chunk) {
          array.set(chunk, bufferIndex);
          bufferIndex += chunk.length;
        });
        return array;
      };
    }
    var env = global.zip || global;
    env.Deflater = env._jzlib_Deflater = Deflater;
  })(typeof self !== "undefined" && self || typeof window !== "undefined" && window || typeof global !== "undefined" && global || Function('return typeof this === "object" && this.content')() || Function('return this')());

  (function (global) {
    function RGBColor(color_string) {
      color_string = color_string || '';
      this.ok = false;
      if (color_string.charAt(0) == '#') {
        color_string = color_string.substr(1, 6);
      }
      color_string = color_string.replace(/ /g, '');
      color_string = color_string.toLowerCase();
      var channels;
      var simple_colors = {
        aliceblue: 'f0f8ff',
        antiquewhite: 'faebd7',
        aqua: '00ffff',
        aquamarine: '7fffd4',
        azure: 'f0ffff',
        beige: 'f5f5dc',
        bisque: 'ffe4c4',
        black: '000000',
        blanchedalmond: 'ffebcd',
        blue: '0000ff',
        blueviolet: '8a2be2',
        brown: 'a52a2a',
        burlywood: 'deb887',
        cadetblue: '5f9ea0',
        chartreuse: '7fff00',
        chocolate: 'd2691e',
        coral: 'ff7f50',
        cornflowerblue: '6495ed',
        cornsilk: 'fff8dc',
        crimson: 'dc143c',
        cyan: '00ffff',
        darkblue: '00008b',
        darkcyan: '008b8b',
        darkgoldenrod: 'b8860b',
        darkgray: 'a9a9a9',
        darkgreen: '006400',
        darkkhaki: 'bdb76b',
        darkmagenta: '8b008b',
        darkolivegreen: '556b2f',
        darkorange: 'ff8c00',
        darkorchid: '9932cc',
        darkred: '8b0000',
        darksalmon: 'e9967a',
        darkseagreen: '8fbc8f',
        darkslateblue: '483d8b',
        darkslategray: '2f4f4f',
        darkturquoise: '00ced1',
        darkviolet: '9400d3',
        deeppink: 'ff1493',
        deepskyblue: '00bfff',
        dimgray: '696969',
        dodgerblue: '1e90ff',
        feldspar: 'd19275',
        firebrick: 'b22222',
        floralwhite: 'fffaf0',
        forestgreen: '228b22',
        fuchsia: 'ff00ff',
        gainsboro: 'dcdcdc',
        ghostwhite: 'f8f8ff',
        gold: 'ffd700',
        goldenrod: 'daa520',
        gray: '808080',
        green: '008000',
        greenyellow: 'adff2f',
        honeydew: 'f0fff0',
        hotpink: 'ff69b4',
        indianred: 'cd5c5c',
        indigo: '4b0082',
        ivory: 'fffff0',
        khaki: 'f0e68c',
        lavender: 'e6e6fa',
        lavenderblush: 'fff0f5',
        lawngreen: '7cfc00',
        lemonchiffon: 'fffacd',
        lightblue: 'add8e6',
        lightcoral: 'f08080',
        lightcyan: 'e0ffff',
        lightgoldenrodyellow: 'fafad2',
        lightgrey: 'd3d3d3',
        lightgreen: '90ee90',
        lightpink: 'ffb6c1',
        lightsalmon: 'ffa07a',
        lightseagreen: '20b2aa',
        lightskyblue: '87cefa',
        lightslateblue: '8470ff',
        lightslategray: '778899',
        lightsteelblue: 'b0c4de',
        lightyellow: 'ffffe0',
        lime: '00ff00',
        limegreen: '32cd32',
        linen: 'faf0e6',
        magenta: 'ff00ff',
        maroon: '800000',
        mediumaquamarine: '66cdaa',
        mediumblue: '0000cd',
        mediumorchid: 'ba55d3',
        mediumpurple: '9370d8',
        mediumseagreen: '3cb371',
        mediumslateblue: '7b68ee',
        mediumspringgreen: '00fa9a',
        mediumturquoise: '48d1cc',
        mediumvioletred: 'c71585',
        midnightblue: '191970',
        mintcream: 'f5fffa',
        mistyrose: 'ffe4e1',
        moccasin: 'ffe4b5',
        navajowhite: 'ffdead',
        navy: '000080',
        oldlace: 'fdf5e6',
        olive: '808000',
        olivedrab: '6b8e23',
        orange: 'ffa500',
        orangered: 'ff4500',
        orchid: 'da70d6',
        palegoldenrod: 'eee8aa',
        palegreen: '98fb98',
        paleturquoise: 'afeeee',
        palevioletred: 'd87093',
        papayawhip: 'ffefd5',
        peachpuff: 'ffdab9',
        peru: 'cd853f',
        pink: 'ffc0cb',
        plum: 'dda0dd',
        powderblue: 'b0e0e6',
        purple: '800080',
        red: 'ff0000',
        rosybrown: 'bc8f8f',
        royalblue: '4169e1',
        saddlebrown: '8b4513',
        salmon: 'fa8072',
        sandybrown: 'f4a460',
        seagreen: '2e8b57',
        seashell: 'fff5ee',
        sienna: 'a0522d',
        silver: 'c0c0c0',
        skyblue: '87ceeb',
        slateblue: '6a5acd',
        slategray: '708090',
        snow: 'fffafa',
        springgreen: '00ff7f',
        steelblue: '4682b4',
        tan: 'd2b48c',
        teal: '008080',
        thistle: 'd8bfd8',
        tomato: 'ff6347',
        turquoise: '40e0d0',
        violet: 'ee82ee',
        violetred: 'd02090',
        wheat: 'f5deb3',
        white: 'ffffff',
        whitesmoke: 'f5f5f5',
        yellow: 'ffff00',
        yellowgreen: '9acd32'
      };

      for (var key in simple_colors) {
        if (color_string == key) {
          color_string = simple_colors[key];
        }
      }
      var color_defs = [{
        re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
        example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
        process: function process(bits) {
          return [parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3])];
        }
      }, {
        re: /^(\w{2})(\w{2})(\w{2})$/,
        example: ['#00ff00', '336699'],
        process: function process(bits) {
          return [parseInt(bits[1], 16), parseInt(bits[2], 16), parseInt(bits[3], 16)];
        }
      }, {
        re: /^(\w{1})(\w{1})(\w{1})$/,
        example: ['#fb0', 'f0f'],
        process: function process(bits) {
          return [parseInt(bits[1] + bits[1], 16), parseInt(bits[2] + bits[2], 16), parseInt(bits[3] + bits[3], 16)];
        }
      }];
      for (var i = 0; i < color_defs.length; i++) {
        var re = color_defs[i].re;
        var processor = color_defs[i].process;
        var bits = re.exec(color_string);

        if (bits) {
          channels = processor(bits);
          this.r = channels[0];
          this.g = channels[1];
          this.b = channels[2];
          this.ok = true;
        }
      }
      this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r;
      this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g;
      this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b;

      this.toRGB = function () {
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
      };

      this.toHex = function () {
        var r = this.r.toString(16);
        var g = this.g.toString(16);
        var b = this.b.toString(16);
        if (r.length == 1) r = '0' + r;
        if (g.length == 1) g = '0' + g;
        if (b.length == 1) b = '0' + b;
        return '#' + r + g + b;
      };
    }

    global.RGBColor = RGBColor;
  })(typeof self !== "undefined" && self || typeof window !== "undefined" && window || typeof global !== "undefined" && global || Function('return typeof this === "object" && this.content')() || Function('return this')());
  (function (jsPDF) {

    var PLUS = '+'.charCodeAt(0);
    var SLASH = '/'.charCodeAt(0);
    var NUMBER = '0'.charCodeAt(0);
    var LOWER = 'a'.charCodeAt(0);
    var UPPER = 'A'.charCodeAt(0);
    var PLUS_URL_SAFE = '-'.charCodeAt(0);
    var SLASH_URL_SAFE = '_'.charCodeAt(0);
    var b64ToByteArray = function b64ToByteArray(b64) {
      var i, j, l, tmp, placeHolders, arr;
      if (b64.length % 4 > 0) {
        throw new Error('Invalid string. Length must be a multiple of 4');
      }
      var len = b64.length;
      placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0;
      arr = new Uint8Array(b64.length * 3 / 4 - placeHolders);
      l = placeHolders > 0 ? b64.length - 4 : b64.length;
      var L = 0;
      function push(v) {
        arr[L++] = v;
      }

      for (i = 0, j = 0; i < l; i += 4, j += 3) {
        tmp = decode(b64.charAt(i)) << 18 | decode(b64.charAt(i + 1)) << 12 | decode(b64.charAt(i + 2)) << 6 | decode(b64.charAt(i + 3));
        push((tmp & 0xFF0000) >> 16);
        push((tmp & 0xFF00) >> 8);
        push(tmp & 0xFF);
      }

      if (placeHolders === 2) {
        tmp = decode(b64.charAt(i)) << 2 | decode(b64.charAt(i + 1)) >> 4;
        push(tmp & 0xFF);
      } else if (placeHolders === 1) {
        tmp = decode(b64.charAt(i)) << 10 | decode(b64.charAt(i + 1)) << 4 | decode(b64.charAt(i + 2)) >> 2;
        push(tmp >> 8 & 0xFF);
        push(tmp & 0xFF);
      }

      return arr;
    };
    var decode = function decode(elt) {
      var code = elt.charCodeAt(0);
      if (code === PLUS || code === PLUS_URL_SAFE) return 62; // '+'

      if (code === SLASH || code === SLASH_URL_SAFE) return 63; // '/'

      if (code < NUMBER) return -1; //no match

      if (code < NUMBER + 10) return code - NUMBER + 26 + 26;
      if (code < UPPER + 26) return code - UPPER;
      if (code < LOWER + 26) return code - LOWER + 26;
    };

    jsPDF.API.TTFFont = function () {
      TTFFont.open = function (filename, name, vfs, encoding) {
        var contents;

        if (typeof vfs !== "string") {
          throw new Error('Invalid argument supplied in TTFFont.open');
        }

        contents = b64ToByteArray(vfs);
        return new TTFFont(contents, name, encoding);
      };
      function TTFFont(rawData, name, encoding) {
        var data;

        this.rawData = rawData;
        data = this.contents = new Data(rawData);
        this.contents.pos = 4;

        if (data.readString(4) === 'ttcf') {
          if (!name) {
            throw new Error("Must specify a font name for TTC files.");
          }
          throw new Error("Font " + name + " not found in TTC file.");
        } else {
          data.pos = 0;
          this.parse();
          this.subset = new Subset(this);
          this.registerTTF();
        }
      }
      TTFFont.prototype.parse = function () {
        this.directory = new Directory(this.contents);
        this.head = new HeadTable(this);
        this.name = new NameTable(this);
        this.cmap = new CmapTable(this);
        this.toUnicode = new Map();
        this.hhea = new HheaTable(this);
        this.maxp = new MaxpTable(this);
        this.hmtx = new HmtxTable(this);
        this.post = new PostTable(this);
        this.os2 = new OS2Table(this);
        this.loca = new LocaTable(this);
        this.glyf = new GlyfTable(this);
        this.ascender = this.os2.exists && this.os2.ascender || this.hhea.ascender;
        this.decender = this.os2.exists && this.os2.decender || this.hhea.decender;
        this.lineGap = this.os2.exists && this.os2.lineGap || this.hhea.lineGap;
        return this.bbox = [this.head.xMin, this.head.yMin, this.head.xMax, this.head.yMax];
      };
      TTFFont.prototype.registerTTF = function () {
        var e, hi, low, raw, _ref;

        this.scaleFactor = 1000.0 / this.head.unitsPerEm;

        this.bbox = function () {
          var _i, _len, _ref, _results;

          _ref = this.bbox;
          _results = [];

          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            e = _ref[_i];

            _results.push(Math.round(e * this.scaleFactor));
          }

          return _results;
        }.call(this);

        this.stemV = 0;

        if (this.post.exists) {
          raw = this.post.italic_angle;
          hi = raw >> 16;
          low = raw & 0xFF;

          if (hi & 0x8000 !== 0) {
            hi = -((hi ^ 0xFFFF) + 1);
          }

          this.italicAngle = +("" + hi + "." + low);
        } else {
          this.italicAngle = 0;
        }

        this.ascender = Math.round(this.ascender * this.scaleFactor);
        this.decender = Math.round(this.decender * this.scaleFactor);
        this.lineGap = Math.round(this.lineGap * this.scaleFactor);
        this.capHeight = this.os2.exists && this.os2.capHeight || this.ascender;
        this.xHeight = this.os2.exists && this.os2.xHeight || 0;
        this.familyClass = (this.os2.exists && this.os2.familyClass || 0) >> 8;
        this.isSerif = (_ref = this.familyClass) === 1 || _ref === 2 || _ref === 3 || _ref === 4 || _ref === 5 || _ref === 7;
        this.isScript = this.familyClass === 10;
        this.flags = 0;

        if (this.post.isFixedPitch) {
          this.flags |= 1 << 0;
        }

        if (this.isSerif) {
          this.flags |= 1 << 1;
        }

        if (this.isScript) {
          this.flags |= 1 << 3;
        }

        if (this.italicAngle !== 0) {
          this.flags |= 1 << 6;
        }

        this.flags |= 1 << 5;

        if (!this.cmap.unicode) {
          throw new Error('No unicode cmap for font');
        }
      };

      TTFFont.prototype.characterToGlyph = function (character) {
        var _ref;

        return ((_ref = this.cmap.unicode) != null ? _ref.codeMap[character] : void 0) || 0;
      };

      TTFFont.prototype.widthOfGlyph = function (glyph) {
        var scale;
        scale = 1000.0 / this.head.unitsPerEm;
        return this.hmtx.forGlyph(glyph).advance * scale;
      };

      TTFFont.prototype.widthOfString = function (string, size, charSpace) {
        var charCode, i, scale, width, _i, _ref, charSpace;

        string = '' + string;
        width = 0;

        for (i = _i = 0, _ref = string.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          charCode = string.charCodeAt(i);
          width += this.widthOfGlyph(this.characterToGlyph(charCode)) + charSpace * (1000 / size) || 0;
        }

        scale = size / 1000;
        return width * scale;
      };

      TTFFont.prototype.lineHeight = function (size, includeGap) {
        var gap;

        if (includeGap == null) {
          includeGap = false;
        }

        gap = includeGap ? this.lineGap : 0;
        return (this.ascender + gap - this.decender) / 1000 * size;
      };

      return TTFFont;
    }();
    var Data = function () {
      function Data(data) {
        this.data = data != null ? data : [];
        this.pos = 0;
        this.length = this.data.length;
      }

      Data.prototype.readByte = function () {
        return this.data[this.pos++];
      };

      Data.prototype.writeByte = function (byte) {
        return this.data[this.pos++] = byte;
      };

      Data.prototype.readUInt32 = function () {
        var b1, b2, b3, b4;
        b1 = this.readByte() * 0x1000000;
        b2 = this.readByte() << 16;
        b3 = this.readByte() << 8;
        b4 = this.readByte();
        return b1 + b2 + b3 + b4;
      };

      Data.prototype.writeUInt32 = function (val) {
        this.writeByte(val >>> 24 & 0xff);
        this.writeByte(val >> 16 & 0xff);
        this.writeByte(val >> 8 & 0xff);
        return this.writeByte(val & 0xff);
      };

      Data.prototype.readInt32 = function () {
        var int;
        int = this.readUInt32();

        if (int >= 0x80000000) {
          return int - 0x100000000;
        } else {
          return int;
        }
      };

      Data.prototype.writeInt32 = function (val) {
        if (val < 0) {
          val += 0x100000000;
        }

        return this.writeUInt32(val);
      };

      Data.prototype.readUInt16 = function () {
        var b1, b2;
        b1 = this.readByte() << 8;
        b2 = this.readByte();
        return b1 | b2;
      };

      Data.prototype.writeUInt16 = function (val) {
        this.writeByte(val >> 8 & 0xff);
        return this.writeByte(val & 0xff);
      };

      Data.prototype.readInt16 = function () {
        var int;
        int = this.readUInt16();

        if (int >= 0x8000) {
          return int - 0x10000;
        } else {
          return int;
        }
      };

      Data.prototype.writeInt16 = function (val) {
        if (val < 0) {
          val += 0x10000;
        }

        return this.writeUInt16(val);
      };

      Data.prototype.readString = function (length) {
        var i, ret, _i;

        ret = [];

        for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
          ret[i] = String.fromCharCode(this.readByte());
        }

        return ret.join('');
      };

      Data.prototype.writeString = function (val) {
        var i, _i, _ref, _results;

        _results = [];

        for (i = _i = 0, _ref = val.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          _results.push(this.writeByte(val.charCodeAt(i)));
        }

        return _results;
      };
      Data.prototype.readShort = function () {
        return this.readInt16();
      };

      Data.prototype.writeShort = function (val) {
        return this.writeInt16(val);
      };

      Data.prototype.readLongLong = function () {
        var b1, b2, b3, b4, b5, b6, b7, b8;
        b1 = this.readByte();
        b2 = this.readByte();
        b3 = this.readByte();
        b4 = this.readByte();
        b5 = this.readByte();
        b6 = this.readByte();
        b7 = this.readByte();
        b8 = this.readByte();

        if (b1 & 0x80) {
          return ((b1 ^ 0xff) * 0x100000000000000 + (b2 ^ 0xff) * 0x1000000000000 + (b3 ^ 0xff) * 0x10000000000 + (b4 ^ 0xff) * 0x100000000 + (b5 ^ 0xff) * 0x1000000 + (b6 ^ 0xff) * 0x10000 + (b7 ^ 0xff) * 0x100 + (b8 ^ 0xff) + 1) * -1;
        }

        return b1 * 0x100000000000000 + b2 * 0x1000000000000 + b3 * 0x10000000000 + b4 * 0x100000000 + b5 * 0x1000000 + b6 * 0x10000 + b7 * 0x100 + b8;
      };

      Data.prototype.writeLongLong = function (val) {
        var high, low;
        high = Math.floor(val / 0x100000000);
        low = val & 0xffffffff;
        this.writeByte(high >> 24 & 0xff);
        this.writeByte(high >> 16 & 0xff);
        this.writeByte(high >> 8 & 0xff);
        this.writeByte(high & 0xff);
        this.writeByte(low >> 24 & 0xff);
        this.writeByte(low >> 16 & 0xff);
        this.writeByte(low >> 8 & 0xff);
        return this.writeByte(low & 0xff);
      };

      Data.prototype.readInt = function () {
        return this.readInt32();
      };

      Data.prototype.writeInt = function (val) {
        return this.writeInt32(val);
      };
      Data.prototype.read = function (bytes) {
        var buf, i, _i;

        buf = [];

        for (i = _i = 0; 0 <= bytes ? _i < bytes : _i > bytes; i = 0 <= bytes ? ++_i : --_i) {
          buf.push(this.readByte());
        }

        return buf;
      };

      Data.prototype.write = function (bytes) {
        var byte, _i, _len, _results;

        _results = [];

        for (_i = 0, _len = bytes.length; _i < _len; _i++) {
          byte = bytes[_i];

          _results.push(this.writeByte(byte));
        }

        return _results;
      };

      return Data;
    }();

    var Directory = function () {
      var checksum;
      function Directory(data) {
        var entry, i, _i, _ref;
        this.scalarType = data.readInt();
        this.tableCount = data.readShort();
        this.searchRange = data.readShort();
        this.entrySelector = data.readShort();
        this.rangeShift = data.readShort();
        this.tables = {};
        for (i = _i = 0, _ref = this.tableCount; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          entry = {
            tag: data.readString(4),
            checksum: data.readInt(),
            offset: data.readInt(),
            length: data.readInt()
          };
          this.tables[entry.tag] = entry;
        }
      }
      Directory.prototype.encode = function (tables) {
        var adjustment, directory, directoryLength, entrySelector, headOffset, log2, offset, rangeShift, searchRange, sum, table, tableCount, tableData, tag;
        tableCount = Object.keys(tables).length;
        log2 = Math.log(2);
        searchRange = Math.floor(Math.log(tableCount) / log2) * 16;
        entrySelector = Math.floor(searchRange / log2);
        rangeShift = tableCount * 16 - searchRange;
        directory = new Data();
        directory.writeInt(this.scalarType);
        directory.writeShort(tableCount);
        directory.writeShort(searchRange);
        directory.writeShort(entrySelector);
        directory.writeShort(rangeShift);
        directoryLength = tableCount * 16;
        offset = directory.pos + directoryLength;
        headOffset = null;
        tableData = [];
        for (tag in tables) {
          table = tables[tag];
          directory.writeString(tag);
          directory.writeInt(checksum(table));
          directory.writeInt(offset);
          directory.writeInt(table.length);
          tableData = tableData.concat(table);
          if (tag === 'head') {
            headOffset = offset;
          }
          offset += table.length;
          while (offset % 4) {
            tableData.push(0);
            offset++;
          }
        }
        directory.write(tableData);
        sum = checksum(directory.data);
        adjustment = 0xB1B0AFBA - sum;
        directory.pos = headOffset + 8;
        directory.writeUInt32(adjustment);
        return directory.data;
      };
      checksum = function checksum(data) {
        var i, sum, tmp, _i, _ref;
        data = __slice.call(data);
        while (data.length % 4) {
          data.push(0);
        }
        tmp = new Data(data);
        sum = 0;
        for (i = _i = 0, _ref = data.length; _i < _ref; i = _i += 4) {
          sum += tmp.readUInt32();
        }
        return sum & 0xFFFFFFFF;
      };
      return Directory;
    }();
    var Table,
        __hasProp = {}.hasOwnProperty,
        __extends = function __extends(child, parent) {
      for (var key in parent) {
        if (__hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    };
    Table = function () {
      function Table(file) {
        var info;
        this.file = file;
        info = this.file.directory.tables[this.tag];
        this.exists = !!info;
        if (info) {
          this.offset = info.offset, this.length = info.length;
          this.parse(this.file.contents);
        }
      }
      Table.prototype.parse = function () {};
      Table.prototype.encode = function () {};
      Table.prototype.raw = function () {
        if (!this.exists) {
          return null;
        }
        this.file.contents.pos = this.offset;
        return this.file.contents.read(this.length);
      };
      return Table;
    }();
    var HeadTable = function (_super) {
      __extends(HeadTable, _super);
      function HeadTable() {
        return HeadTable.__super__.constructor.apply(this, arguments);
      }
      HeadTable.prototype.tag = 'head';
      HeadTable.prototype.parse = function (data) {
        data.pos = this.offset;
        this.version = data.readInt();
        this.revision = data.readInt();
        this.checkSumAdjustment = data.readInt();
        this.magicNumber = data.readInt();
        this.flags = data.readShort();
        this.unitsPerEm = data.readShort();
        this.created = data.readLongLong();
        this.modified = data.readLongLong();
        this.xMin = data.readShort();
        this.yMin = data.readShort();
        this.xMax = data.readShort();
        this.yMax = data.readShort();
        this.macStyle = data.readShort();
        this.lowestRecPPEM = data.readShort();
        this.fontDirectionHint = data.readShort();
        this.indexToLocFormat = data.readShort();
        return this.glyphDataFormat = data.readShort();
      };
      HeadTable.prototype.encode = function (indexToLocFormat) {
        var table;
        table = new Data();
        table.writeInt(this.version);
        table.writeInt(this.revision);
        table.writeInt(this.checkSumAdjustment);
        table.writeInt(this.magicNumber);
        table.writeShort(this.flags);
        table.writeShort(this.unitsPerEm);
        table.writeLongLong(this.created);
        table.writeLongLong(this.modified);
        table.writeShort(this.xMin);
        table.writeShort(this.yMin);
        table.writeShort(this.xMax);
        table.writeShort(this.yMax);
        table.writeShort(this.macStyle);
        table.writeShort(this.lowestRecPPEM);
        table.writeShort(this.fontDirectionHint);
        table.writeShort(indexToLocFormat);
        table.writeShort(this.glyphDataFormat);
        return table.data;
      };
      return HeadTable;
    }(Table);
    var CmapEntry = function () {
      function CmapEntry(data, offset) {
        var code, count, endCode, glyphId, glyphIds, i, idDelta, idRangeOffset, index, saveOffset, segCount, segCountX2, start, startCode, tail, _i, _j, _k, _len;
        this.platformID = data.readUInt16();
        this.encodingID = data.readShort();
        this.offset = offset + data.readInt();
        saveOffset = data.pos;
        data.pos = this.offset;
        this.format = data.readUInt16();
        this.length = data.readUInt16();
        this.language = data.readUInt16();
        this.isUnicode = this.platformID === 3 && this.encodingID === 1 && this.format === 4 || this.platformID === 0 && this.format === 4;
        this.codeMap = {};
        switch (this.format) {
          case 0:
            for (i = _i = 0; _i < 256; i = ++_i) {
              this.codeMap[i] = data.readByte();
            }
            break;
          case 4:
            segCountX2 = data.readUInt16();
            segCount = segCountX2 / 2;
            data.pos += 6;
            endCode = function () {
              var _j, _results;
              _results = [];
              for (i = _j = 0; 0 <= segCount ? _j < segCount : _j > segCount; i = 0 <= segCount ? ++_j : --_j) {
                _results.push(data.readUInt16());
              }
              return _results;
            }();
            data.pos += 2;
            startCode = function () {
              var _j, _results;
              _results = [];
              for (i = _j = 0; 0 <= segCount ? _j < segCount : _j > segCount; i = 0 <= segCount ? ++_j : --_j) {
                _results.push(data.readUInt16());
              }
              return _results;
            }();
            idDelta = function () {
              var _j, _results;
              _results = [];
              for (i = _j = 0; 0 <= segCount ? _j < segCount : _j > segCount; i = 0 <= segCount ? ++_j : --_j) {
                _results.push(data.readUInt16());
              }
              return _results;
            }();
            idRangeOffset = function () {
              var _j, _results;
              _results = [];
              for (i = _j = 0; 0 <= segCount ? _j < segCount : _j > segCount; i = 0 <= segCount ? ++_j : --_j) {
                _results.push(data.readUInt16());
              }
              return _results;
            }();
            count = (this.length - data.pos + this.offset) / 2;
            glyphIds = function () {
              var _j, _results;
              _results = [];
              for (i = _j = 0; 0 <= count ? _j < count : _j > count; i = 0 <= count ? ++_j : --_j) {
                _results.push(data.readUInt16());
              }
              return _results;
            }();
            for (i = _j = 0, _len = endCode.length; _j < _len; i = ++_j) {
              tail = endCode[i];
              start = startCode[i];
              for (code = _k = start; start <= tail ? _k <= tail : _k >= tail; code = start <= tail ? ++_k : --_k) {
                if (idRangeOffset[i] === 0) {
                  glyphId = code + idDelta[i];
                } else {
                  index = idRangeOffset[i] / 2 + (code - start) - (segCount - i);
                  glyphId = glyphIds[index] || 0;
                  if (glyphId !== 0) {
                    glyphId += idDelta[i];
                  }
                }
                this.codeMap[code] = glyphId & 0xFFFF;
              }
            }
        }
        data.pos = saveOffset;
      }
      CmapEntry.encode = function (charmap, encoding) {
        var charMap, code, codeMap, codes, delta, deltas, diff, endCode, endCodes, entrySelector, glyphIDs, i, id, indexes, last, map, nextID, offset, old, rangeOffsets, rangeShift, result, searchRange, segCount, segCountX2, startCode, startCodes, startGlyph, subtable, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _len6, _len7, _m, _n, _name, _o, _p, _q;
        subtable = new Data();
        codes = Object.keys(charmap).sort(function (a, b) {
          return a - b;
        });
        switch (encoding) {
          case 'macroman':
            id = 0;
            indexes = function () {
              var _i, _results;
              _results = [];
              for (i = _i = 0; _i < 256; i = ++_i) {
                _results.push(0);
              }
              return _results;
            }();
            map = {
              0: 0
            };
            codeMap = {};
            for (_i = 0, _len = codes.length; _i < _len; _i++) {
              code = codes[_i];
              if (map[_name = charmap[code]] == null) {
                map[_name] = ++id;
              }
              codeMap[code] = {
                old: charmap[code],
                "new": map[charmap[code]]
              };
              indexes[code] = map[charmap[code]];
            }
            subtable.writeUInt16(1);
            subtable.writeUInt16(0);
            subtable.writeUInt32(12);
            subtable.writeUInt16(0);
            subtable.writeUInt16(262);
            subtable.writeUInt16(0);
            subtable.write(indexes);
            return result = {
              charMap: codeMap,
              subtable: subtable.data,
              maxGlyphID: id + 1
            };
          case 'unicode':
            startCodes = [];
            endCodes = [];
            nextID = 0;
            map = {};
            charMap = {};
            last = diff = null;
            for (_j = 0, _len1 = codes.length; _j < _len1; _j++) {
              code = codes[_j];
              old = charmap[code];
              if (map[old] == null) {
                map[old] = ++nextID;
              }
              charMap[code] = {
                old: old,
                "new": map[old]
              };
              delta = map[old] - code;
              if (last == null || delta !== diff) {
                if (last) {
                  endCodes.push(last);
                }
                startCodes.push(code);
                diff = delta;
              }
              last = code;
            }
            if (last) {
              endCodes.push(last);
            }
            endCodes.push(0xFFFF);
            startCodes.push(0xFFFF);
            segCount = startCodes.length;
            segCountX2 = segCount * 2;
            searchRange = 2 * Math.pow(Math.log(segCount) / Math.LN2, 2);
            entrySelector = Math.log(searchRange / 2) / Math.LN2;
            rangeShift = 2 * segCount - searchRange;
            deltas = [];
            rangeOffsets = [];
            glyphIDs = [];
            for (i = _k = 0, _len2 = startCodes.length; _k < _len2; i = ++_k) {
              startCode = startCodes[i];
              endCode = endCodes[i];
              if (startCode === 0xFFFF) {
                deltas.push(0);
                rangeOffsets.push(0);
                break;
              }
              startGlyph = charMap[startCode]["new"];
              if (startCode - startGlyph >= 0x8000) {
                deltas.push(0);
                rangeOffsets.push(2 * (glyphIDs.length + segCount - i));
                for (code = _l = startCode; startCode <= endCode ? _l <= endCode : _l >= endCode; code = startCode <= endCode ? ++_l : --_l) {
                  glyphIDs.push(charMap[code]["new"]);
                }
              } else {
                deltas.push(startGlyph - startCode);
                rangeOffsets.push(0);
              }
            }
            subtable.writeUInt16(3);
            subtable.writeUInt16(1);
            subtable.writeUInt32(12);
            subtable.writeUInt16(4);
            subtable.writeUInt16(16 + segCount * 8 + glyphIDs.length * 2);
            subtable.writeUInt16(0);
            subtable.writeUInt16(segCountX2);
            subtable.writeUInt16(searchRange);
            subtable.writeUInt16(entrySelector);
            subtable.writeUInt16(rangeShift);
            for (_m = 0, _len3 = endCodes.length; _m < _len3; _m++) {
              code = endCodes[_m];
              subtable.writeUInt16(code);
            }
            subtable.writeUInt16(0);
            for (_n = 0, _len4 = startCodes.length; _n < _len4; _n++) {
              code = startCodes[_n];
              subtable.writeUInt16(code);
            }
            for (_o = 0, _len5 = deltas.length; _o < _len5; _o++) {
              delta = deltas[_o];
              subtable.writeUInt16(delta);
            }
            for (_p = 0, _len6 = rangeOffsets.length; _p < _len6; _p++) {
              offset = rangeOffsets[_p];
              subtable.writeUInt16(offset);
            }
            for (_q = 0, _len7 = glyphIDs.length; _q < _len7; _q++) {
              id = glyphIDs[_q];
              subtable.writeUInt16(id);
            }
            return result = {
              charMap: charMap,
              subtable: subtable.data,
              maxGlyphID: nextID + 1
            };
        }
      };
      return CmapEntry;
    }();
    var CmapTable = function (_super) {
      __extends(CmapTable, _super);
      function CmapTable() {
        return CmapTable.__super__.constructor.apply(this, arguments);
      }
      CmapTable.prototype.tag = 'cmap';
      CmapTable.prototype.parse = function (data) {
        var entry, i, tableCount, _i;
        data.pos = this.offset;
        this.version = data.readUInt16();
        tableCount = data.readUInt16();
        this.tables = [];
        this.unicode = null;
        for (i = _i = 0; 0 <= tableCount ? _i < tableCount : _i > tableCount; i = 0 <= tableCount ? ++_i : --_i) {
          entry = new CmapEntry(data, this.offset);
          this.tables.push(entry);
          if (entry.isUnicode) {
            if (this.unicode == null) {
              this.unicode = entry;
            }
          }
        }
        return true;
      };
      CmapTable.encode = function (charmap, encoding) {
        var result, table;
        if (encoding == null) {
          encoding = 'macroman';
        }
        result = CmapEntry.encode(charmap, encoding);
        table = new Data();
        table.writeUInt16(0);
        table.writeUInt16(1);
        result.table = table.data.concat(result.subtable);
        return result;
      };
      return CmapTable;
    }(Table);
    var HheaTable = function (_super) {
      __extends(HheaTable, _super);
      function HheaTable() {
        return HheaTable.__super__.constructor.apply(this, arguments);
      }
      HheaTable.prototype.tag = 'hhea';
      HheaTable.prototype.parse = function (data) {
        data.pos = this.offset;
        this.version = data.readInt();
        this.ascender = data.readShort();
        this.decender = data.readShort();
        this.lineGap = data.readShort();
        this.advanceWidthMax = data.readShort();
        this.minLeftSideBearing = data.readShort();
        this.minRightSideBearing = data.readShort();
        this.xMaxExtent = data.readShort();
        this.caretSlopeRise = data.readShort();
        this.caretSlopeRun = data.readShort();
        this.caretOffset = data.readShort();
        data.pos += 4 * 2;
        this.metricDataFormat = data.readShort();
        return this.numberOfMetrics = data.readUInt16();
      };
      return HheaTable;
    }(Table);
    var OS2Table = function (_super) {
      __extends(OS2Table, _super);
      function OS2Table() {
        return OS2Table.__super__.constructor.apply(this, arguments);
      }
      OS2Table.prototype.tag = 'OS/2';
      OS2Table.prototype.parse = function (data) {
        var i;
        data.pos = this.offset;
        this.version = data.readUInt16();
        this.averageCharWidth = data.readShort();
        this.weightClass = data.readUInt16();
        this.widthClass = data.readUInt16();
        this.type = data.readShort();
        this.ySubscriptXSize = data.readShort();
        this.ySubscriptYSize = data.readShort();
        this.ySubscriptXOffset = data.readShort();
        this.ySubscriptYOffset = data.readShort();
        this.ySuperscriptXSize = data.readShort();
        this.ySuperscriptYSize = data.readShort();
        this.ySuperscriptXOffset = data.readShort();
        this.ySuperscriptYOffset = data.readShort();
        this.yStrikeoutSize = data.readShort();
        this.yStrikeoutPosition = data.readShort();
        this.familyClass = data.readShort();
        this.panose = function () {
          var _i, _results;
          _results = [];
          for (i = _i = 0; _i < 10; i = ++_i) {
            _results.push(data.readByte());
          }
          return _results;
        }();
        this.charRange = function () {
          var _i, _results;
          _results = [];
          for (i = _i = 0; _i < 4; i = ++_i) {
            _results.push(data.readInt());
          }
          return _results;
        }();
        this.vendorID = data.readString(4);
        this.selection = data.readShort();
        this.firstCharIndex = data.readShort();
        this.lastCharIndex = data.readShort();
        if (this.version > 0) {
          this.ascent = data.readShort();
          this.descent = data.readShort();
          this.lineGap = data.readShort();
          this.winAscent = data.readShort();
          this.winDescent = data.readShort();
          this.codePageRange = function () {
            var _i, _results;
            _results = [];
            for (i = _i = 0; _i < 2; i = ++_i) {
              _results.push(data.readInt());
            }
            return _results;
          }();
          if (this.version > 1) {
            this.xHeight = data.readShort();
            this.capHeight = data.readShort();
            this.defaultChar = data.readShort();
            this.breakChar = data.readShort();
            return this.maxContext = data.readShort();
          }
        }
      };
      return OS2Table;
    }(Table);
    var PostTable = function (_super) {
      __extends(PostTable, _super);
      function PostTable() {
        return PostTable.__super__.constructor.apply(this, arguments);
      }
      PostTable.prototype.tag = 'post';
      PostTable.prototype.parse = function (data) {
        var i, length, numberOfGlyphs, _i, _results;
        data.pos = this.offset;
        this.format = data.readInt();
        this.italicAngle = data.readInt();
        this.underlinePosition = data.readShort();
        this.underlineThickness = data.readShort();
        this.isFixedPitch = data.readInt();
        this.minMemType42 = data.readInt();
        this.maxMemType42 = data.readInt();
        this.minMemType1 = data.readInt();
        this.maxMemType1 = data.readInt();
        switch (this.format) {
          case 0x00010000:
            break;
          case 0x00020000:
            numberOfGlyphs = data.readUInt16();
            this.glyphNameIndex = [];
            for (i = _i = 0; 0 <= numberOfGlyphs ? _i < numberOfGlyphs : _i > numberOfGlyphs; i = 0 <= numberOfGlyphs ? ++_i : --_i) {
              this.glyphNameIndex.push(data.readUInt16());
            }
            this.names = [];
            _results = [];
            while (data.pos < this.offset + this.length) {
              length = data.readByte();
              _results.push(this.names.push(data.readString(length)));
            }
            return _results;
            break;
          case 0x00025000:
            numberOfGlyphs = data.readUInt16();
            return this.offsets = data.read(numberOfGlyphs);
          case 0x00030000:
            break;
          case 0x00040000:
            return this.map = function () {
              var _j, _ref, _results1;
              _results1 = [];
              for (i = _j = 0, _ref = this.file.maxp.numGlyphs; 0 <= _ref ? _j < _ref : _j > _ref; i = 0 <= _ref ? ++_j : --_j) {
                _results1.push(data.readUInt32());
              }
              return _results1;
            }.call(this);
        }
      };
      return PostTable;
    }(Table);
    var NameEntry = function () {
      function NameEntry(raw, entry) {
        this.raw = raw;
        this.length = raw.length;
        this.platformID = entry.platformID;
        this.encodingID = entry.encodingID;
        this.languageID = entry.languageID;
      }

      return NameEntry;
    }();

    var NameTable = function (_super) {

      __extends(NameTable, _super);

      function NameTable() {
        return NameTable.__super__.constructor.apply(this, arguments);
      }

      NameTable.prototype.tag = 'name';

      NameTable.prototype.parse = function (data) {
        var count, entries, entry, format, i, name, stringOffset, strings, text, _i, _j, _len, _name;

        data.pos = this.offset;
        format = data.readShort();
        count = data.readShort();
        stringOffset = data.readShort();
        entries = [];

        for (i = _i = 0; 0 <= count ? _i < count : _i > count; i = 0 <= count ? ++_i : --_i) {
          entries.push({
            platformID: data.readShort(),
            encodingID: data.readShort(),
            languageID: data.readShort(),
            nameID: data.readShort(),
            length: data.readShort(),
            offset: this.offset + stringOffset + data.readShort()
          });
        }

        strings = {};

        for (i = _j = 0, _len = entries.length; _j < _len; i = ++_j) {
          entry = entries[i];
          data.pos = entry.offset;
          text = data.readString(entry.length);
          name = new NameEntry(text, entry);

          if (strings[_name = entry.nameID] == null) {
            strings[_name] = [];
          }

          strings[entry.nameID].push(name);
        }

        this.strings = strings;
        this.copyright = strings[0];
        this.fontFamily = strings[1];
        this.fontSubfamily = strings[2];
        this.uniqueSubfamily = strings[3];
        this.fontName = strings[4];
        this.version = strings[5];

        try {
          this.postscriptName = strings[6][0].raw.replace(/[\x00-\x19\x80-\xff]/g, "");
        } catch (e) {
          this.postscriptName = strings[4][0].raw.replace(/[\x00-\x19\x80-\xff]/g, "");
        }

        this.trademark = strings[7];
        this.manufacturer = strings[8];
        this.designer = strings[9];
        this.description = strings[10];
        this.vendorUrl = strings[11];
        this.designerUrl = strings[12];
        this.license = strings[13];
        this.licenseUrl = strings[14];
        this.preferredFamily = strings[15];
        this.preferredSubfamily = strings[17];
        this.compatibleFull = strings[18];
        return this.sampleText = strings[19];
      };
      return NameTable;
    }(Table);

    var MaxpTable = function (_super) {
      __extends(MaxpTable, _super);

      function MaxpTable() {
        return MaxpTable.__super__.constructor.apply(this, arguments);
      }

      MaxpTable.prototype.tag = 'maxp';

      MaxpTable.prototype.parse = function (data) {
        data.pos = this.offset;
        this.version = data.readInt();
        this.numGlyphs = data.readUInt16();
        this.maxPoints = data.readUInt16();
        this.maxContours = data.readUInt16();
        this.maxCompositePoints = data.readUInt16();
        this.maxComponentContours = data.readUInt16();
        this.maxZones = data.readUInt16();
        this.maxTwilightPoints = data.readUInt16();
        this.maxStorage = data.readUInt16();
        this.maxFunctionDefs = data.readUInt16();
        this.maxInstructionDefs = data.readUInt16();
        this.maxStackElements = data.readUInt16();
        this.maxSizeOfInstructions = data.readUInt16();
        this.maxComponentElements = data.readUInt16();
        return this.maxComponentDepth = data.readUInt16();
      };
      return MaxpTable;
    }(Table);

    var HmtxTable = function (_super) {
      __extends(HmtxTable, _super);

      function HmtxTable() {
        return HmtxTable.__super__.constructor.apply(this, arguments);
      }

      HmtxTable.prototype.tag = 'hmtx';

      HmtxTable.prototype.parse = function (data) {
        var i, last, lsbCount, m, _i, _j, _ref, _results;

        data.pos = this.offset;
        this.metrics = [];

        for (i = _i = 0, _ref = this.file.hhea.numberOfMetrics; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          this.metrics.push({
            advance: data.readUInt16(),
            lsb: data.readInt16()
          });
        }

        lsbCount = this.file.maxp.numGlyphs - this.file.hhea.numberOfMetrics;

        this.leftSideBearings = function () {
          var _j, _results;

          _results = [];

          for (i = _j = 0; 0 <= lsbCount ? _j < lsbCount : _j > lsbCount; i = 0 <= lsbCount ? ++_j : --_j) {
            _results.push(data.readInt16());
          }

          return _results;
        }();

        this.widths = function () {
          var _j, _len, _ref1, _results;

          _ref1 = this.metrics;
          _results = [];

          for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
            m = _ref1[_j];

            _results.push(m.advance);
          }

          return _results;
        }.call(this);

        last = this.widths[this.widths.length - 1];
        _results = [];

        for (i = _j = 0; 0 <= lsbCount ? _j < lsbCount : _j > lsbCount; i = 0 <= lsbCount ? ++_j : --_j) {
          _results.push(this.widths.push(last));
        }

        return _results;
      };
      HmtxTable.prototype.forGlyph = function (id) {
        var metrics;

        if (id in this.metrics) {
          return this.metrics[id];
        }

        return metrics = {
          advance: this.metrics[this.metrics.length - 1].advance,
          lsb: this.leftSideBearings[id - this.metrics.length]
        };
      };
      return HmtxTable;
    }(Table);

    var __slice = [].slice;

    var GlyfTable = function (_super) {
      __extends(GlyfTable, _super);

      function GlyfTable() {
        return GlyfTable.__super__.constructor.apply(this, arguments);
      }

      GlyfTable.prototype.tag = 'glyf';

      GlyfTable.prototype.parse = function (data) {
        return this.cache = {};
      };

      GlyfTable.prototype.glyphFor = function (id) {
        id = id;
        var data, index, length, loca, numberOfContours, raw, xMax, xMin, yMax, yMin;

        if (id in this.cache) {
          return this.cache[id];
        }

        loca = this.file.loca;
        data = this.file.contents;
        index = loca.indexOf(id);
        length = loca.lengthOf(id);

        if (length === 0) {
          return this.cache[id] = null;
        }

        data.pos = this.offset + index;
        raw = new Data(data.read(length));
        numberOfContours = raw.readShort();
        xMin = raw.readShort();
        yMin = raw.readShort();
        xMax = raw.readShort();
        yMax = raw.readShort();

        if (numberOfContours === -1) {
          this.cache[id] = new CompoundGlyph(raw, xMin, yMin, xMax, yMax);
        } else {
          this.cache[id] = new SimpleGlyph(raw, numberOfContours, xMin, yMin, xMax, yMax);
        }

        return this.cache[id];
      };

      GlyfTable.prototype.encode = function (glyphs, mapping, old2new) {
        var glyph, id, offsets, table, _i, _len;

        table = [];
        offsets = [];

        for (_i = 0, _len = mapping.length; _i < _len; _i++) {
          id = mapping[_i];
          glyph = glyphs[id];
          offsets.push(table.length);

          if (glyph) {
            table = table.concat(glyph.encode(old2new));
          }
        }

        offsets.push(table.length);
        return {
          table: table,
          offsets: offsets
        };
      };

      return GlyfTable;
    }(Table);

    var SimpleGlyph = function () {
      function SimpleGlyph(raw, numberOfContours, xMin, yMin, xMax, yMax) {
        this.raw = raw;
        this.numberOfContours = numberOfContours;
        this.xMin = xMin;
        this.yMin = yMin;
        this.xMax = xMax;
        this.yMax = yMax;
        this.compound = false;
      }
      SimpleGlyph.prototype.encode = function () {
        return this.raw.data;
      };
      return SimpleGlyph;
    }();

    var CompoundGlyph = function () {
      var ARG_1_AND_2_ARE_WORDS, MORE_COMPONENTS, WE_HAVE_AN_X_AND_Y_SCALE, WE_HAVE_A_SCALE, WE_HAVE_A_TWO_BY_TWO;
      ARG_1_AND_2_ARE_WORDS = 0x0001;
      WE_HAVE_A_SCALE = 0x0008;
      MORE_COMPONENTS = 0x0020;
      WE_HAVE_AN_X_AND_Y_SCALE = 0x0040;
      WE_HAVE_A_TWO_BY_TWO = 0x0080;
      function CompoundGlyph(raw, xMin, yMin, xMax, yMax) {
        var data, flags;
        this.raw = raw;
        this.xMin = xMin;
        this.yMin = yMin;
        this.xMax = xMax;
        this.yMax = yMax;
        this.compound = true;
        this.glyphIDs = [];
        this.glyphOffsets = [];
        data = this.raw;
        while (true) {
          flags = data.readShort();
          this.glyphOffsets.push(data.pos);
          this.glyphIDs.push(data.readShort());
          if (!(flags & MORE_COMPONENTS)) {
            break;
          }
          if (flags & ARG_1_AND_2_ARE_WORDS) {
            data.pos += 4;
          } else {
            data.pos += 2;
          }
          if (flags & WE_HAVE_A_TWO_BY_TWO) {
            data.pos += 8;
          } else if (flags & WE_HAVE_AN_X_AND_Y_SCALE) {
            data.pos += 4;
          } else if (flags & WE_HAVE_A_SCALE) {
            data.pos += 2;
          }
        }
      }
      CompoundGlyph.prototype.encode = function (mapping) {
        var i, id, result, _i, _len, _ref;

        result = new Data(__slice.call(this.raw.data));
        _ref = this.glyphIDs;

        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          id = _ref[i];
          result.pos = this.glyphOffsets[i];
        }

        return result.data;
      };

      return CompoundGlyph;
    }();

    var LocaTable = function (_super) {
      __extends(LocaTable, _super);

      function LocaTable() {
        return LocaTable.__super__.constructor.apply(this, arguments);
      }

      LocaTable.prototype.tag = 'loca';

      LocaTable.prototype.parse = function (data) {
        var format, i;
        data.pos = this.offset;
        format = this.file.head.indexToLocFormat;

        if (format === 0) {
          return this.offsets = function () {
            var _i, _ref, _results;

            _results = [];

            for (i = _i = 0, _ref = this.length; _i < _ref; i = _i += 2) {
              _results.push(data.readUInt16() * 2);
            }

            return _results;
          }.call(this);
        } else {
          return this.offsets = function () {
            var _i, _ref, _results;

            _results = [];

            for (i = _i = 0, _ref = this.length; _i < _ref; i = _i += 4) {
              _results.push(data.readUInt32());
            }

            return _results;
          }.call(this);
        }
      };

      LocaTable.prototype.indexOf = function (id) {
        return this.offsets[id];
      };

      LocaTable.prototype.lengthOf = function (id) {
        return this.offsets[id + 1] - this.offsets[id];
      };

      LocaTable.prototype.encode = function (offsets, activeGlyphs) {
        var LocaTable = new Uint32Array(this.offsets.length);
        var glyfPtr = 0;
        var listGlyf = 0;

        for (var k = 0; k < LocaTable.length; ++k) {
          LocaTable[k] = glyfPtr;

          if (listGlyf < activeGlyphs.length && activeGlyphs[listGlyf] == k) {
            ++listGlyf;
            LocaTable[k] = glyfPtr;
            var start = this.offsets[k];
            var len = this.offsets[k + 1] - start;

            if (len > 0) {
              glyfPtr += len;
            }
          }
        }

        var newLocaTable = new Array(LocaTable.length * 4);

        for (var j = 0; j < LocaTable.length; ++j) {
          newLocaTable[4 * j + 3] = LocaTable[j] & 0x000000ff;
          newLocaTable[4 * j + 2] = (LocaTable[j] & 0x0000ff00) >> 8;
          newLocaTable[4 * j + 1] = (LocaTable[j] & 0x00ff0000) >> 16;
          newLocaTable[4 * j] = (LocaTable[j] & 0xff000000) >> 24;
        }

        return newLocaTable;
      };

      return LocaTable;
    }(Table);
    var invert = function invert(object) {
      var key, ret, val;
      ret = {};
      for (key in object) {
        val = object[key];
        ret[val] = key;
      }
      return ret;
    };
    var Subset = function () {
      function Subset(font) {
        this.font = font;
        this.subset = {};
        this.unicodes = {};
        this.next = 33;
      }
      Subset.prototype.generateCmap = function () {
        var mapping, roman, unicode, unicodeCmap, _ref;
        unicodeCmap = this.font.cmap.tables[0].codeMap;
        mapping = {};
        _ref = this.subset;
        for (roman in _ref) {
          unicode = _ref[roman];
          mapping[roman] = unicodeCmap[unicode];
        }
        return mapping;
      };
      Subset.prototype.glyphsFor = function (glyphIDs) {
        var additionalIDs, glyph, glyphs, id, _i, _len, _ref;
        glyphs = {};
        for (_i = 0, _len = glyphIDs.length; _i < _len; _i++) {
          id = glyphIDs[_i];
          glyphs[id] = this.font.glyf.glyphFor(id);
        }
        additionalIDs = [];
        for (id in glyphs) {
          glyph = glyphs[id];
          if (glyph != null ? glyph.compound : void 0) {
            additionalIDs.push.apply(additionalIDs, glyph.glyphIDs);
          }
        }
        if (additionalIDs.length > 0) {
          _ref = this.glyphsFor(additionalIDs);
          for (id in _ref) {
            glyph = _ref[id];
            glyphs[id] = glyph;
          }
        }
        return glyphs;
      };
      Subset.prototype.encode = function (glyID, indexToLocFormat) {
        var cmap, code, glyf, glyphs, id, ids, loca, new2old, newIDs, nextGlyphID, old2new, oldID, oldIDs, tables, _ref;
        cmap = CmapTable.encode(this.generateCmap(), 'unicode');
        glyphs = this.glyphsFor(glyID);
        old2new = {
          0: 0
        };
        _ref = cmap.charMap;
        for (code in _ref) {
          ids = _ref[code];
          old2new[ids.old] = ids["new"];
        }
        nextGlyphID = cmap.maxGlyphID;
        for (oldID in glyphs) {
          if (!(oldID in old2new)) {
            old2new[oldID] = nextGlyphID++;
          }
        }
        new2old = invert(old2new);
        newIDs = Object.keys(new2old).sort(function (a, b) {
          return a - b;
        });
        oldIDs = function () {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = newIDs.length; _i < _len; _i++) {
            id = newIDs[_i];
            _results.push(new2old[id]);
          }
          return _results;
        }();
        glyf = this.font.glyf.encode(glyphs, oldIDs, old2new);
        loca = this.font.loca.encode(glyf.offsets, oldIDs);
        tables = {
          cmap: this.font.cmap.raw(),
          glyf: glyf.table,
          loca: loca,
          hmtx: this.font.hmtx.raw(),
          hhea: this.font.hhea.raw(),
          maxp: this.font.maxp.raw(),
          post: this.font.post.raw(),
          name: this.font.name.raw(),
          head: this.font.head.encode(indexToLocFormat)
        };

        if (this.font.os2.exists) {
          tables['OS/2'] = this.font.os2.raw();
        }

        return this.font.directory.encode(tables);
      };

      return Subset;
    }();

    jsPDF.API.PDFObject = function () {
      var pad;

      function PDFObject() {}

      pad = function pad(str, length) {
        return (Array(length + 1).join('0') + str).slice(-length);
      };
      PDFObject.convert = function (object) {
        var e, items, key, out, val;
        if (Array.isArray(object)) {
          items = function () {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = object.length; _i < _len; _i++) {
              e = object[_i];
              _results.push(PDFObject.convert(e));
            }
            return _results;
          }().join(' ');
          return '[' + items + ']';
        } else if (typeof object === 'string') {
          return '/' + object;
        } else if (object != null ? object.isString : void 0) {
          return '(' + object + ')';
        } else if (object instanceof Date) {
          return '(D:' + pad(object.getUTCFullYear(), 4) + pad(object.getUTCMonth(), 2) + pad(object.getUTCDate(), 2) + pad(object.getUTCHours(), 2) + pad(object.getUTCMinutes(), 2) + pad(object.getUTCSeconds(), 2) + 'Z)';
        } else if ({}.toString.call(object) === '[object Object]') {
          out = ['<<'];
          for (key in object) {
            val = object[key];
            out.push('/' + key + ' ' + PDFObject.convert(val));
          }
          out.push('>>');
          return out.join('\n');
        } else {
          return '' + object;
        }
      };
      return PDFObject;
    }();
  })(jsPDF);
  (function (global) {
    var PNG;
    PNG = function () {
      var APNG_BLEND_OP_SOURCE, APNG_DISPOSE_OP_BACKGROUND, APNG_DISPOSE_OP_PREVIOUS, makeImage, scratchCanvas, scratchCtx;
      PNG.load = function (url, canvas, callback) {
        var xhr;
        if (typeof canvas === 'function') {
          callback = canvas;
        }
        xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "arraybuffer";
        xhr.onload = function () {
          var data, png;
          data = new Uint8Array(xhr.response || xhr.mozResponseArrayBuffer);
          png = new PNG(data);
          if (typeof (canvas != null ? canvas.getContext : void 0) === 'function') {
            png.render(canvas);
          }
          return typeof callback === "function" ? callback(png) : void 0;
        };
        return xhr.send(null);
      };
      APNG_DISPOSE_OP_BACKGROUND = 1;
      APNG_DISPOSE_OP_PREVIOUS = 2;
      APNG_BLEND_OP_SOURCE = 0;
      function PNG(data) {
        var chunkSize, colors, palLen, delayDen, delayNum, frame, i, index, key, section, palShort, text, _i, _j, _ref;
        this.data = data;
        this.pos = 8;
        this.palette = [];
        this.imgData = [];
        this.transparency = {};
        this.animation = null;
        this.text = {};
        frame = null;

        while (true) {
          chunkSize = this.readUInt32();

          section = function () {
            var _i, _results;

            _results = [];

            for (i = _i = 0; _i < 4; i = ++_i) {
              _results.push(String.fromCharCode(this.data[this.pos++]));
            }

            return _results;
          }.call(this).join('');

          switch (section) {
            case 'IHDR':
              this.width = this.readUInt32();
              this.height = this.readUInt32();
              this.bits = this.data[this.pos++];
              this.colorType = this.data[this.pos++];
              this.compressionMethod = this.data[this.pos++];
              this.filterMethod = this.data[this.pos++];
              this.interlaceMethod = this.data[this.pos++];
              break;

            case 'acTL':
              this.animation = {
                numFrames: this.readUInt32(),
                numPlays: this.readUInt32() || Infinity,
                frames: []
              };
              break;

            case 'PLTE':
              this.palette = this.read(chunkSize);
              break;

            case 'fcTL':
              if (frame) {
                this.animation.frames.push(frame);
              }

              this.pos += 4;
              frame = {
                width: this.readUInt32(),
                height: this.readUInt32(),
                xOffset: this.readUInt32(),
                yOffset: this.readUInt32()
              };
              delayNum = this.readUInt16();
              delayDen = this.readUInt16() || 100;
              frame.delay = 1000 * delayNum / delayDen;
              frame.disposeOp = this.data[this.pos++];
              frame.blendOp = this.data[this.pos++];
              frame.data = [];
              break;

            case 'IDAT':
            case 'fdAT':
              if (section === 'fdAT') {
                this.pos += 4;
                chunkSize -= 4;
              }

              data = (frame != null ? frame.data : void 0) || this.imgData;

              for (i = _i = 0; 0 <= chunkSize ? _i < chunkSize : _i > chunkSize; i = 0 <= chunkSize ? ++_i : --_i) {
                data.push(this.data[this.pos++]);
              }

              break;

            case 'tRNS':
              this.transparency = {};

              switch (this.colorType) {
                case 3:
                  palLen = this.palette.length / 3;
                  this.transparency.indexed = this.read(chunkSize);
                  if (this.transparency.indexed.length > palLen) throw new Error('More transparent colors than palette size');
                  palShort = palLen - this.transparency.indexed.length;
                  if (palShort > 0) {
                    for (i = _j = 0; 0 <= palShort ? _j < palShort : _j > palShort; i = 0 <= palShort ? ++_j : --_j) {
                      this.transparency.indexed.push(255);
                    }
                  }
                  break;
                case 0:
                  this.transparency.grayscale = this.read(chunkSize)[0];
                  break;
                case 2:
                  this.transparency.rgb = this.read(chunkSize);
              }
              break;
            case 'tEXt':
              text = this.read(chunkSize);
              index = text.indexOf(0);
              key = String.fromCharCode.apply(String, text.slice(0, index));
              this.text[key] = String.fromCharCode.apply(String, text.slice(index + 1));
              break;
            case 'IEND':
              if (frame) {
                this.animation.frames.push(frame);
              }
              this.colors = function () {
                switch (this.colorType) {
                  case 0:
                  case 3:
                  case 4:
                    return 1;
                  case 2:
                  case 6:
                    return 3;
                }
              }.call(this);
              this.hasAlphaChannel = (_ref = this.colorType) === 4 || _ref === 6;
              colors = this.colors + (this.hasAlphaChannel ? 1 : 0);
              this.pixelBitlength = this.bits * colors;
              this.colorSpace = function () {
                switch (this.colors) {
                  case 1:
                    return 'DeviceGray';
                  case 3:
                    return 'DeviceRGB';
                }
              }.call(this);
              this.imgData = new Uint8Array(this.imgData);
              return;
            default:
              this.pos += chunkSize;
          }
          this.pos += 4;
          if (this.pos > this.data.length) {
            throw new Error("Incomplete or corrupt PNG file");
          }
        }
        return;
      }
      PNG.prototype.read = function (bytes) {
        var i, _i, _results;
        _results = [];
        for (i = _i = 0; 0 <= bytes ? _i < bytes : _i > bytes; i = 0 <= bytes ? ++_i : --_i) {
          _results.push(this.data[this.pos++]);
        }
        return _results;
      };
      PNG.prototype.readUInt32 = function () {
        var b1, b2, b3, b4;
        b1 = this.data[this.pos++] << 24;
        b2 = this.data[this.pos++] << 16;
        b3 = this.data[this.pos++] << 8;
        b4 = this.data[this.pos++];
        return b1 | b2 | b3 | b4;
      };

      PNG.prototype.readUInt16 = function () {
        var b1, b2;
        b1 = this.data[this.pos++] << 8;
        b2 = this.data[this.pos++];
        return b1 | b2;
      };

      PNG.prototype.decodePixels = function (data) {
        var pixelBytes = this.pixelBitlength / 8;
        var fullPixels = new Uint8Array(this.width * this.height * pixelBytes);
        var pos = 0;

        var _this = this;

        if (data == null) {
          data = this.imgData;
        }

        if (data.length === 0) {
          return new Uint8Array(0);
        }

        data = new FlateStream(data);
        data = data.getBytes();

        function pass(x0, y0, dx, dy) {
          var abyte, c, col, i, left, length, p, pa, paeth, pb, pc, pixels, row, scanlineLength, upper, upperLeft, _i, _j, _k, _l, _m;

          var w = Math.ceil((_this.width - x0) / dx),
              h = Math.ceil((_this.height - y0) / dy);
          var isFull = _this.width == w && _this.height == h;
          scanlineLength = pixelBytes * w;
          pixels = isFull ? fullPixels : new Uint8Array(scanlineLength * h);
          length = data.length;
          row = 0;
          c = 0;

          while (row < h && pos < length) {
            switch (data[pos++]) {
              case 0:
                for (i = _i = 0; _i < scanlineLength; i = _i += 1) {
                  pixels[c++] = data[pos++];
                }

                break;

              case 1:
                for (i = _j = 0; _j < scanlineLength; i = _j += 1) {
                  abyte = data[pos++];
                  left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
                  pixels[c++] = (abyte + left) % 256;
                }

                break;

              case 2:
                for (i = _k = 0; _k < scanlineLength; i = _k += 1) {
                  abyte = data[pos++];
                  col = (i - i % pixelBytes) / pixelBytes;
                  upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + i % pixelBytes];
                  pixels[c++] = (upper + abyte) % 256;
                }

                break;

              case 3:
                for (i = _l = 0; _l < scanlineLength; i = _l += 1) {
                  abyte = data[pos++];
                  col = (i - i % pixelBytes) / pixelBytes;
                  left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
                  upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + i % pixelBytes];
                  pixels[c++] = (abyte + Math.floor((left + upper) / 2)) % 256;
                }

                break;

              case 4:
                for (i = _m = 0; _m < scanlineLength; i = _m += 1) {
                  abyte = data[pos++];
                  col = (i - i % pixelBytes) / pixelBytes;
                  left = i < pixelBytes ? 0 : pixels[c - pixelBytes];

                  if (row === 0) {
                    upper = upperLeft = 0;
                  } else {
                    upper = pixels[(row - 1) * scanlineLength + col * pixelBytes + i % pixelBytes];
                    upperLeft = col && pixels[(row - 1) * scanlineLength + (col - 1) * pixelBytes + i % pixelBytes];
                  }

                  p = left + upper - upperLeft;
                  pa = Math.abs(p - left);
                  pb = Math.abs(p - upper);
                  pc = Math.abs(p - upperLeft);

                  if (pa <= pb && pa <= pc) {
                    paeth = left;
                  } else if (pb <= pc) {
                    paeth = upper;
                  } else {
                    paeth = upperLeft;
                  }

                  pixels[c++] = (abyte + paeth) % 256;
                }

                break;

              default:
                throw new Error("Invalid filter algorithm: " + data[pos - 1]);
            }

            if (!isFull) {
              var fullPos = ((y0 + row * dy) * _this.width + x0) * pixelBytes;
              var partPos = row * scanlineLength;

              for (i = 0; i < w; i += 1) {
                for (var j = 0; j < pixelBytes; j += 1) {
                  fullPixels[fullPos++] = pixels[partPos++];
                }

                fullPos += (dx - 1) * pixelBytes;
              }
            }

            row++;
          }
        }

        if (_this.interlaceMethod == 1) {
          pass(0, 0, 8, 8);
          pass(4, 0, 8, 8);
          pass(0, 4, 4, 8);
          pass(2, 0, 4, 4);
          pass(0, 2, 2, 4);
          pass(1, 0, 2, 2);
          pass(0, 1, 1, 2);
        } else {
          pass(0, 0, 1, 1);
        }
        return fullPixels;
      };

      PNG.prototype.decodePalette = function () {
        var c, i, length, palette, pos, ret, transparency, _i, _ref, _ref1;

        palette = this.palette;
        transparency = this.transparency.indexed || [];
        ret = new Uint8Array((transparency.length || 0) + palette.length);
        pos = 0;
        length = palette.length;
        c = 0;

        for (i = _i = 0, _ref = palette.length; _i < _ref; i = _i += 3) {
          ret[pos++] = palette[i];
          ret[pos++] = palette[i + 1];
          ret[pos++] = palette[i + 2];
          ret[pos++] = (_ref1 = transparency[c++]) != null ? _ref1 : 255;
        }
        return ret;
      };

      PNG.prototype.copyToImageData = function (imageData, pixels) {
        var alpha, colors, data, i, input, j, k, length, palette, v, _ref;
        colors = this.colors;
        palette = null;
        alpha = this.hasAlphaChannel;
        if (this.palette.length) {
          palette = (_ref = this._decodedPalette) != null ? _ref : this._decodedPalette = this.decodePalette();
          colors = 4;
          alpha = true;
        }
        data = imageData.data || imageData;
        length = data.length;
        input = palette || pixels;
        i = j = 0;

        if (colors === 1) {
          while (i < length) {
            k = palette ? pixels[i / 4] * 4 : j;
            v = input[k++];
            data[i++] = v;
            data[i++] = v;
            data[i++] = v;
            data[i++] = alpha ? input[k++] : 255;
            j = k;
          }
        } else {
          while (i < length) {
            k = palette ? pixels[i / 4] * 4 : j;
            data[i++] = input[k++];
            data[i++] = input[k++];
            data[i++] = input[k++];
            data[i++] = alpha ? input[k++] : 255;
            j = k;
          }
        }
      };

      PNG.prototype.decode = function () {
        var ret;
        ret = new Uint8Array(this.width * this.height * 4);
        this.copyToImageData(ret, this.decodePixels());
        return ret;
      };

      try {
        scratchCanvas = global.document.createElement('canvas');
        scratchCtx = scratchCanvas.getContext('2d');
      } catch (e) {
        return -1;
      }

      makeImage = function makeImage(imageData) {
        var img;
        scratchCtx.width = imageData.width;
        scratchCtx.height = imageData.height;
        scratchCtx.clearRect(0, 0, imageData.width, imageData.height);
        scratchCtx.putImageData(imageData, 0, 0);
        img = new Image();
        img.src = scratchCanvas.toDataURL();
        return img;
      };

      PNG.prototype.decodeFrames = function (ctx) {
        var frame, i, imageData, pixels, _i, _len, _ref, _results;

        if (!this.animation) {
          return;
        }

        _ref = this.animation.frames;
        _results = [];

        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          frame = _ref[i];
          imageData = ctx.createImageData(frame.width, frame.height);
          pixels = this.decodePixels(new Uint8Array(frame.data));
          this.copyToImageData(imageData, pixels);
          frame.imageData = imageData;

          _results.push(frame.image = makeImage(imageData));
        }

        return _results;
      };

      PNG.prototype.renderFrame = function (ctx, number) {
        var frame, frames, prev;
        frames = this.animation.frames;
        frame = frames[number];
        prev = frames[number - 1];

        if (number === 0) {
          ctx.clearRect(0, 0, this.width, this.height);
        }

        if ((prev != null ? prev.disposeOp : void 0) === APNG_DISPOSE_OP_BACKGROUND) {
          ctx.clearRect(prev.xOffset, prev.yOffset, prev.width, prev.height);
        } else if ((prev != null ? prev.disposeOp : void 0) === APNG_DISPOSE_OP_PREVIOUS) {
          ctx.putImageData(prev.imageData, prev.xOffset, prev.yOffset);
        }

        if (frame.blendOp === APNG_BLEND_OP_SOURCE) {
          ctx.clearRect(frame.xOffset, frame.yOffset, frame.width, frame.height);
        }

        return ctx.drawImage(frame.image, frame.xOffset, frame.yOffset);
      };

      PNG.prototype.animate = function (ctx) {
        var _doFrame,
            frameNumber,
            frames,
            numFrames,
            numPlays,
            _ref,
            _this = this;

        frameNumber = 0;
        _ref = this.animation, numFrames = _ref.numFrames, frames = _ref.frames, numPlays = _ref.numPlays;
        return (_doFrame = function doFrame() {
          var f, frame;
          f = frameNumber++ % numFrames;
          frame = frames[f];

          _this.renderFrame(ctx, f);

          if (numFrames > 1 && frameNumber / numFrames < numPlays) {
            return _this.animation._timeout = setTimeout(_doFrame, frame.delay);
          }
        })();
      };

      PNG.prototype.stopAnimation = function () {
        var _ref;

        return clearTimeout((_ref = this.animation) != null ? _ref._timeout : void 0);
      };

      PNG.prototype.render = function (canvas) {
        var ctx, data;

        if (canvas._png) {
          canvas._png.stopAnimation();
        }

        canvas._png = this;
        canvas.width = this.width;
        canvas.height = this.height;
        ctx = canvas.getContext("2d");

        if (this.animation) {
          this.decodeFrames(ctx);
          return this.animate(ctx);
        } else {
          data = ctx.createImageData(this.width, this.height);
          this.copyToImageData(data, this.decodePixels());
          return ctx.putImageData(data, 0, 0);
        }
      };

      return PNG;
    }();

    global.PNG = PNG;
  })(typeof self !== "undefined" && self || typeof window !== "undefined" && window || typeof global !== "undefined" && global || Function('return typeof this === "object" && this.content')() || Function('return this')());
  var DecodeStream = function () {
    function constructor() {
      this.pos = 0;
      this.bufferLength = 0;
      this.eof = false;
      this.buffer = null;
    }

    constructor.prototype = {
      ensureBuffer: function decodestream_ensureBuffer(requested) {
        var buffer = this.buffer;
        var current = buffer ? buffer.byteLength : 0;
        if (requested < current) return buffer;
        var size = 512;

        while (size < requested) {
          size <<= 1;
        }

        var buffer2 = new Uint8Array(size);

        for (var i = 0; i < current; ++i) {
          buffer2[i] = buffer[i];
        }

        return this.buffer = buffer2;
      },
      getByte: function decodestream_getByte() {
        var pos = this.pos;

        while (this.bufferLength <= pos) {
          if (this.eof) return null;
          this.readBlock();
        }

        return this.buffer[this.pos++];
      },
      getBytes: function decodestream_getBytes(length) {
        var pos = this.pos;

        if (length) {
          this.ensureBuffer(pos + length);
          var end = pos + length;

          while (!this.eof && this.bufferLength < end) {
            this.readBlock();
          }

          var bufEnd = this.bufferLength;
          if (end > bufEnd) end = bufEnd;
        } else {
          while (!this.eof) {
            this.readBlock();
          }

          var end = this.bufferLength;
        }

        this.pos = end;
        return this.buffer.subarray(pos, end);
      },
      lookChar: function decodestream_lookChar() {
        var pos = this.pos;

        while (this.bufferLength <= pos) {
          if (this.eof) return null;
          this.readBlock();
        }

        return String.fromCharCode(this.buffer[this.pos]);
      },
      getChar: function decodestream_getChar() {
        var pos = this.pos;

        while (this.bufferLength <= pos) {
          if (this.eof) return null;
          this.readBlock();
        }

        return String.fromCharCode(this.buffer[this.pos++]);
      },
      makeSubStream: function decodestream_makeSubstream(start, length, dict) {
        var end = start + length;

        while (this.bufferLength <= end && !this.eof) {
          this.readBlock();
        }

        return new Stream(this.buffer, start, length, dict);
      },
      skip: function decodestream_skip(n) {
        if (!n) n = 1;
        this.pos += n;
      },
      reset: function decodestream_reset() {
        this.pos = 0;
      }
    };
    return constructor;
  }();

  var FlateStream = function () {
    if (typeof Uint32Array === 'undefined') {
      return undefined;
    }

    var codeLenCodeMap = new Uint32Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
    var lengthDecode = new Uint32Array([0x00003, 0x00004, 0x00005, 0x00006, 0x00007, 0x00008, 0x00009, 0x0000a, 0x1000b, 0x1000d, 0x1000f, 0x10011, 0x20013, 0x20017, 0x2001b, 0x2001f, 0x30023, 0x3002b, 0x30033, 0x3003b, 0x40043, 0x40053, 0x40063, 0x40073, 0x50083, 0x500a3, 0x500c3, 0x500e3, 0x00102, 0x00102, 0x00102]);
    var distDecode = new Uint32Array([0x00001, 0x00002, 0x00003, 0x00004, 0x10005, 0x10007, 0x20009, 0x2000d, 0x30011, 0x30019, 0x40021, 0x40031, 0x50041, 0x50061, 0x60081, 0x600c1, 0x70101, 0x70181, 0x80201, 0x80301, 0x90401, 0x90601, 0xa0801, 0xa0c01, 0xb1001, 0xb1801, 0xc2001, 0xc3001, 0xd4001, 0xd6001]);
    var fixedLitCodeTab = [new Uint32Array([0x70100, 0x80050, 0x80010, 0x80118, 0x70110, 0x80070, 0x80030, 0x900c0, 0x70108, 0x80060, 0x80020, 0x900a0, 0x80000, 0x80080, 0x80040, 0x900e0, 0x70104, 0x80058, 0x80018, 0x90090, 0x70114, 0x80078, 0x80038, 0x900d0, 0x7010c, 0x80068, 0x80028, 0x900b0, 0x80008, 0x80088, 0x80048, 0x900f0, 0x70102, 0x80054, 0x80014, 0x8011c, 0x70112, 0x80074, 0x80034, 0x900c8, 0x7010a, 0x80064, 0x80024, 0x900a8, 0x80004, 0x80084, 0x80044, 0x900e8, 0x70106, 0x8005c, 0x8001c, 0x90098, 0x70116, 0x8007c, 0x8003c, 0x900d8, 0x7010e, 0x8006c, 0x8002c, 0x900b8, 0x8000c, 0x8008c, 0x8004c, 0x900f8, 0x70101, 0x80052, 0x80012, 0x8011a, 0x70111, 0x80072, 0x80032, 0x900c4, 0x70109, 0x80062, 0x80022, 0x900a4, 0x80002, 0x80082, 0x80042, 0x900e4, 0x70105, 0x8005a, 0x8001a, 0x90094, 0x70115, 0x8007a, 0x8003a, 0x900d4, 0x7010d, 0x8006a, 0x8002a, 0x900b4, 0x8000a, 0x8008a, 0x8004a, 0x900f4, 0x70103, 0x80056, 0x80016, 0x8011e, 0x70113, 0x80076, 0x80036, 0x900cc, 0x7010b, 0x80066, 0x80026, 0x900ac, 0x80006, 0x80086, 0x80046, 0x900ec, 0x70107, 0x8005e, 0x8001e, 0x9009c, 0x70117, 0x8007e, 0x8003e, 0x900dc, 0x7010f, 0x8006e, 0x8002e, 0x900bc, 0x8000e, 0x8008e, 0x8004e, 0x900fc, 0x70100, 0x80051, 0x80011, 0x80119, 0x70110, 0x80071, 0x80031, 0x900c2, 0x70108, 0x80061, 0x80021, 0x900a2, 0x80001, 0x80081, 0x80041, 0x900e2, 0x70104, 0x80059, 0x80019, 0x90092, 0x70114, 0x80079, 0x80039, 0x900d2, 0x7010c, 0x80069, 0x80029, 0x900b2, 0x80009, 0x80089, 0x80049, 0x900f2, 0x70102, 0x80055, 0x80015, 0x8011d, 0x70112, 0x80075, 0x80035, 0x900ca, 0x7010a, 0x80065, 0x80025, 0x900aa, 0x80005, 0x80085, 0x80045, 0x900ea, 0x70106, 0x8005d, 0x8001d, 0x9009a, 0x70116, 0x8007d, 0x8003d, 0x900da, 0x7010e, 0x8006d, 0x8002d, 0x900ba, 0x8000d, 0x8008d, 0x8004d, 0x900fa, 0x70101, 0x80053, 0x80013, 0x8011b, 0x70111, 0x80073, 0x80033, 0x900c6, 0x70109, 0x80063, 0x80023, 0x900a6, 0x80003, 0x80083, 0x80043, 0x900e6, 0x70105, 0x8005b, 0x8001b, 0x90096, 0x70115, 0x8007b, 0x8003b, 0x900d6, 0x7010d, 0x8006b, 0x8002b, 0x900b6, 0x8000b, 0x8008b, 0x8004b, 0x900f6, 0x70103, 0x80057, 0x80017, 0x8011f, 0x70113, 0x80077, 0x80037, 0x900ce, 0x7010b, 0x80067, 0x80027, 0x900ae, 0x80007, 0x80087, 0x80047, 0x900ee, 0x70107, 0x8005f, 0x8001f, 0x9009e, 0x70117, 0x8007f, 0x8003f, 0x900de, 0x7010f, 0x8006f, 0x8002f, 0x900be, 0x8000f, 0x8008f, 0x8004f, 0x900fe, 0x70100, 0x80050, 0x80010, 0x80118, 0x70110, 0x80070, 0x80030, 0x900c1, 0x70108, 0x80060, 0x80020, 0x900a1, 0x80000, 0x80080, 0x80040, 0x900e1, 0x70104, 0x80058, 0x80018, 0x90091, 0x70114, 0x80078, 0x80038, 0x900d1, 0x7010c, 0x80068, 0x80028, 0x900b1, 0x80008, 0x80088, 0x80048, 0x900f1, 0x70102, 0x80054, 0x80014, 0x8011c, 0x70112, 0x80074, 0x80034, 0x900c9, 0x7010a, 0x80064, 0x80024, 0x900a9, 0x80004, 0x80084, 0x80044, 0x900e9, 0x70106, 0x8005c, 0x8001c, 0x90099, 0x70116, 0x8007c, 0x8003c, 0x900d9, 0x7010e, 0x8006c, 0x8002c, 0x900b9, 0x8000c, 0x8008c, 0x8004c, 0x900f9, 0x70101, 0x80052, 0x80012, 0x8011a, 0x70111, 0x80072, 0x80032, 0x900c5, 0x70109, 0x80062, 0x80022, 0x900a5, 0x80002, 0x80082, 0x80042, 0x900e5, 0x70105, 0x8005a, 0x8001a, 0x90095, 0x70115, 0x8007a, 0x8003a, 0x900d5, 0x7010d, 0x8006a, 0x8002a, 0x900b5, 0x8000a, 0x8008a, 0x8004a, 0x900f5, 0x70103, 0x80056, 0x80016, 0x8011e, 0x70113, 0x80076, 0x80036, 0x900cd, 0x7010b, 0x80066, 0x80026, 0x900ad, 0x80006, 0x80086, 0x80046, 0x900ed, 0x70107, 0x8005e, 0x8001e, 0x9009d, 0x70117, 0x8007e, 0x8003e, 0x900dd, 0x7010f, 0x8006e, 0x8002e, 0x900bd, 0x8000e, 0x8008e, 0x8004e, 0x900fd, 0x70100, 0x80051, 0x80011, 0x80119, 0x70110, 0x80071, 0x80031, 0x900c3, 0x70108, 0x80061, 0x80021, 0x900a3, 0x80001, 0x80081, 0x80041, 0x900e3, 0x70104, 0x80059, 0x80019, 0x90093, 0x70114, 0x80079, 0x80039, 0x900d3, 0x7010c, 0x80069, 0x80029, 0x900b3, 0x80009, 0x80089, 0x80049, 0x900f3, 0x70102, 0x80055, 0x80015, 0x8011d, 0x70112, 0x80075, 0x80035, 0x900cb, 0x7010a, 0x80065, 0x80025, 0x900ab, 0x80005, 0x80085, 0x80045, 0x900eb, 0x70106, 0x8005d, 0x8001d, 0x9009b, 0x70116, 0x8007d, 0x8003d, 0x900db, 0x7010e, 0x8006d, 0x8002d, 0x900bb, 0x8000d, 0x8008d, 0x8004d, 0x900fb, 0x70101, 0x80053, 0x80013, 0x8011b, 0x70111, 0x80073, 0x80033, 0x900c7, 0x70109, 0x80063, 0x80023, 0x900a7, 0x80003, 0x80083, 0x80043, 0x900e7, 0x70105, 0x8005b, 0x8001b, 0x90097, 0x70115, 0x8007b, 0x8003b, 0x900d7, 0x7010d, 0x8006b, 0x8002b, 0x900b7, 0x8000b, 0x8008b, 0x8004b, 0x900f7, 0x70103, 0x80057, 0x80017, 0x8011f, 0x70113, 0x80077, 0x80037, 0x900cf, 0x7010b, 0x80067, 0x80027, 0x900af, 0x80007, 0x80087, 0x80047, 0x900ef, 0x70107, 0x8005f, 0x8001f, 0x9009f, 0x70117, 0x8007f, 0x8003f, 0x900df, 0x7010f, 0x8006f, 0x8002f, 0x900bf, 0x8000f, 0x8008f, 0x8004f, 0x900ff]), 9];
    var fixedDistCodeTab = [new Uint32Array([0x50000, 0x50010, 0x50008, 0x50018, 0x50004, 0x50014, 0x5000c, 0x5001c, 0x50002, 0x50012, 0x5000a, 0x5001a, 0x50006, 0x50016, 0x5000e, 0x00000, 0x50001, 0x50011, 0x50009, 0x50019, 0x50005, 0x50015, 0x5000d, 0x5001d, 0x50003, 0x50013, 0x5000b, 0x5001b, 0x50007, 0x50017, 0x5000f, 0x00000]), 5];

    function error(e) {
      throw new Error(e);
    }

    function constructor(bytes) {
      var bytesPos = 0;
      var cmf = bytes[bytesPos++];
      var flg = bytes[bytesPos++];
      if (cmf == -1 || flg == -1) error('Invalid header in flate stream');
      if ((cmf & 0x0f) != 0x08) error('Unknown compression method in flate stream');
      if (((cmf << 8) + flg) % 31 != 0) error('Bad FCHECK in flate stream');
      if (flg & 0x20) error('FDICT bit set in flate stream');
      this.bytes = bytes;
      this.bytesPos = bytesPos;
      this.codeSize = 0;
      this.codeBuf = 0;
      DecodeStream.call(this);
    }

    constructor.prototype = Object.create(DecodeStream.prototype);

    constructor.prototype.getBits = function (bits) {
      var codeSize = this.codeSize;
      var codeBuf = this.codeBuf;
      var bytes = this.bytes;
      var bytesPos = this.bytesPos;
      var b;

      while (codeSize < bits) {
        if (typeof (b = bytes[bytesPos++]) == 'undefined') error('Bad encoding in flate stream');
        codeBuf |= b << codeSize;
        codeSize += 8;
      }

      b = codeBuf & (1 << bits) - 1;
      this.codeBuf = codeBuf >> bits;
      this.codeSize = codeSize -= bits;
      this.bytesPos = bytesPos;
      return b;
    };

    constructor.prototype.getCode = function (table) {
      var codes = table[0];
      var maxLen = table[1];
      var codeSize = this.codeSize;
      var codeBuf = this.codeBuf;
      var bytes = this.bytes;
      var bytesPos = this.bytesPos;

      while (codeSize < maxLen) {
        var b;
        if (typeof (b = bytes[bytesPos++]) == 'undefined') error('Bad encoding in flate stream');
        codeBuf |= b << codeSize;
        codeSize += 8;
      }

      var code = codes[codeBuf & (1 << maxLen) - 1];
      var codeLen = code >> 16;
      var codeVal = code & 0xffff;
      if (codeSize == 0 || codeSize < codeLen || codeLen == 0) error('Bad encoding in flate stream');
      this.codeBuf = codeBuf >> codeLen;
      this.codeSize = codeSize - codeLen;
      this.bytesPos = bytesPos;
      return codeVal;
    };

    constructor.prototype.generateHuffmanTable = function (lengths) {
      var n = lengths.length;
      var maxLen = 0;
      for (var i = 0; i < n; ++i) {
        if (lengths[i] > maxLen) maxLen = lengths[i];
      }
      var size = 1 << maxLen;
      var codes = new Uint32Array(size);
      for (var len = 1, code = 0, skip = 2; len <= maxLen; ++len, code <<= 1, skip <<= 1) {
        for (var val = 0; val < n; ++val) {
          if (lengths[val] == len) {
            var code2 = 0;
            var t = code;
            for (var i = 0; i < len; ++i) {
              code2 = code2 << 1 | t & 1;
              t >>= 1;
            }
            for (var i = code2; i < size; i += skip) {
              codes[i] = len << 16 | val;
            }

            ++code;
          }
        }
      }

      return [codes, maxLen];
    };

    constructor.prototype.readBlock = function () {
      function repeat(stream, array, len, offset, what) {
        var repeat = stream.getBits(len) + offset;

        while (repeat-- > 0) {
          array[i++] = what;
        }
      }
      var hdr = this.getBits(3);
      if (hdr & 1) this.eof = true;
      hdr >>= 1;

      if (hdr == 0) {
        var bytes = this.bytes;
        var bytesPos = this.bytesPos;
        var b;
        if (typeof (b = bytes[bytesPos++]) == 'undefined') error('Bad block header in flate stream');
        var blockLen = b;
        if (typeof (b = bytes[bytesPos++]) == 'undefined') error('Bad block header in flate stream');
        blockLen |= b << 8;
        if (typeof (b = bytes[bytesPos++]) == 'undefined') error('Bad block header in flate stream');
        var check = b;
        if (typeof (b = bytes[bytesPos++]) == 'undefined') error('Bad block header in flate stream');
        check |= b << 8;
        if (check != (~blockLen & 0xffff)) error('Bad uncompressed block length in flate stream');
        this.codeBuf = 0;
        this.codeSize = 0;
        var bufferLength = this.bufferLength;
        var buffer = this.ensureBuffer(bufferLength + blockLen);
        var end = bufferLength + blockLen;
        this.bufferLength = end;

        for (var n = bufferLength; n < end; ++n) {
          if (typeof (b = bytes[bytesPos++]) == 'undefined') {
            this.eof = true;
            break;
          }

          buffer[n] = b;
        }

        this.bytesPos = bytesPos;
        return;
      }

      var litCodeTable;
      var distCodeTable;

      if (hdr == 1) {
        litCodeTable = fixedLitCodeTab;
        distCodeTable = fixedDistCodeTab;
      } else if (hdr == 2) {
        var numLitCodes = this.getBits(5) + 257;
        var numDistCodes = this.getBits(5) + 1;
        var numCodeLenCodes = this.getBits(4) + 4;
        var codeLenCodeLengths = Array(codeLenCodeMap.length);
        var i = 0;
        while (i < numCodeLenCodes) {
          codeLenCodeLengths[codeLenCodeMap[i++]] = this.getBits(3);
        }
        var codeLenCodeTab = this.generateHuffmanTable(codeLenCodeLengths);
        var len = 0;
        var i = 0;
        var codes = numLitCodes + numDistCodes;
        var codeLengths = new Array(codes);
        while (i < codes) {
          var code = this.getCode(codeLenCodeTab);

          if (code == 16) {
            repeat(this, codeLengths, 2, 3, len);
          } else if (code == 17) {
            repeat(this, codeLengths, 3, 3, len = 0);
          } else if (code == 18) {
            repeat(this, codeLengths, 7, 11, len = 0);
          } else {
            codeLengths[i++] = len = code;
          }
        }

        litCodeTable = this.generateHuffmanTable(codeLengths.slice(0, numLitCodes));
        distCodeTable = this.generateHuffmanTable(codeLengths.slice(numLitCodes, codes));
      } else {
        error('Unknown block type in flate stream');
      }

      var buffer = this.buffer;
      var limit = buffer ? buffer.length : 0;
      var pos = this.bufferLength;

      while (true) {
        var code1 = this.getCode(litCodeTable);

        if (code1 < 256) {
          if (pos + 1 >= limit) {
            buffer = this.ensureBuffer(pos + 1);
            limit = buffer.length;
          }

          buffer[pos++] = code1;
          continue;
        }

        if (code1 == 256) {
          this.bufferLength = pos;
          return;
        }

        code1 -= 257;
        code1 = lengthDecode[code1];
        var code2 = code1 >> 16;
        if (code2 > 0) code2 = this.getBits(code2);
        var len = (code1 & 0xffff) + code2;
        code1 = this.getCode(distCodeTable);
        code1 = distDecode[code1];
        code2 = code1 >> 16;
        if (code2 > 0) code2 = this.getBits(code2);
        var dist = (code1 & 0xffff) + code2;

        if (pos + len >= limit) {
          buffer = this.ensureBuffer(pos + len);
          limit = buffer.length;
        }

        for (var k = 0; k < len; ++k, ++pos) {
          buffer[pos] = buffer[pos - dist];
        }
      }
    };

    return constructor;
  }();
  window.tmp = FlateStream;
}));

try {
module.exports = jsPDF;
}
catch (e) {}