/* YUI 3.9.0 (build 5827) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/color-hsv/color-hsv.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/color-hsv/color-hsv.js",
    code: []
};
_yuitest_coverage["build/color-hsv/color-hsv.js"].code=["YUI.add('color-hsv', function (Y, NAME) {","","/**","Color provides static methods for color conversion hsv values.","","    Y.Color.toHSV('f00'); // hsv(0, 100%, 100%)","","    Y.Color.toHSVA('rgb(255, 255, 0'); // hsva(60, 100%, 100%, 1)","","","@module color","@submodule color-hsv","@class HSV","@namespace Color","@since 3.8.0","**/","Color = {","","    /**","    @static","    @property REGEX_HSV","    @type RegExp","    @default /hsva?\\(([.\\d]*), ?([.\\d]*)%, ?([.\\d]*)%,? ?([.\\d]*)?\\)/","    @since 3.8.0","    **/","    REGEX_HSV: /hsva?\\(([.\\d]*), ?([.\\d]*)%, ?([.\\d]*)%,? ?([.\\d]*)?\\)/,","","    /**","    @static","    @property STR_HSV","    @type String","    @default hsv({*}, {*}%, {*}%)","    @since 3.8.0","    **/","    STR_HSV: 'hsv({*}, {*}%, {*}%)',","","    /**","    @static","    @property STR_HSVA","    @type String","    @default hsva({*}, {*}%, {*}%, {*})","    @since 3.8.0","    **/","    STR_HSVA: 'hsva({*}, {*}%, {*}%, {*})',","","    /**","    Converts provided color value to an HSV string.","    @public","    @method toHSV","    @param {String} str","    @return {String}","    @since 3.8.0","    **/","    toHSV: function (str) {","        var clr = Y.Color._convertTo(str, 'hsv');","        return clr.toLowerCase();","    },","","    /**","    Converts provided color value to an HSVA string.","    @public","    @method toHSVA","    @param {String} str","    @return {String}","    @since 3.8.0","    **/","    toHSVA: function (str) {","        var clr = Y.Color._convertTo(str, 'hsva');","        return clr.toLowerCase();","    },","","    /**","    Parses the RGB string into h, s, v values. Will return an Array","        of values or an HSV string.","    @protected","    @method _rgbToHsv","    @param {String} str","    @param {Boolean} [toArray]","    @return {String|Array}","    @since 3.8.0","    **/","    _rgbToHsv: function (str, toArray) {","        var h, s, v,","            rgb = Y.Color.REGEX_RGB.exec(str),","            r = rgb[1] / 255,","            g = rgb[2] / 255,","            b = rgb[3] / 255,","            max = Math.max(r, g, b),","            min = Math.min(r, g, b),","            delta = max - min;","","        if (max === min) {","            h = 0;","        } else if (max === r) {","            h = 60 * (g - b) / delta;","        } else if (max === g) {","            h = (60 * (b - r) / delta) + 120;","        } else { // max === b","            h = (60 * (r - g) / delta) + 240;","        }","","        s = (max === 0) ? 0 : 1 - (min / max);","","        // ensure h is between 0 and 360","        while (h < 0) {","            h += 360;","        }","        h %= 360;","        h = Math.round(h);","","        // saturation is percentage","        s = Math.round(s * 100);","","        // value is percentage","        v = Math.round(max * 100);","","        if (toArray) {","            return [h, s, v];","        }","","        return Y.Color.fromArray([h, s, v], Y.Color.TYPES.HSV);","    },","","    /**","    Parses the HSV string into r, b, g values. Will return an Array","        of values or an RGB string.","    @protected","    @method _hsvToRgb","    @param {String} str","    @param {Boolean} [toArray]","    @return {String|Array}","    @since 3.8.0","    **/","    _hsvToRgb: function (str, toArray) {","        var hsv = Y.Color.REGEX_HSV.exec(str),","            h = parseInt(hsv[1], 10),","            s = parseInt(hsv[2], 10) / 100, // 0 - 1","            v = parseInt(hsv[3], 10) / 100, // 0 - 1","            r,","            g,","            b,","            i = Math.floor(h / 60) % 6,","            f = (h / 60) - i,","            p = v * (1 - s),","            q = v * (1 - (s * f)),","            t = v * (1 - (s * (1 - f)));","","        if (s === 0) {","            r = v;","            g = v;","            b = v;","        } else {","            switch (i) {","                case 0: r = v; g = t; b = p; break;","                case 1: r = q; g = v; b = p; break;","                case 2: r = p; g = v; b = t; break;","                case 3: r = p; g = q; b = v; break;","                case 4: r = t; g = p; b = v; break;","                case 5: r = v; g = p; b = q; break;","            }","        }","","        r = Math.min(255, Math.round(r * 256));","        g = Math.min(255, Math.round(g * 256));","        b = Math.min(255, Math.round(b * 256));","","        if (toArray) {","            return [r, g, b];","        }","","        return Y.Color.fromArray([r, g, b], Y.Color.TYPES.RGB);","    }","","};","","Y.Color = Y.mix(Color, Y.Color);","","Y.Color.TYPES = Y.mix(Y.Color.TYPES, {'HSV':'hsv', 'HSVA':'hsva'});","Y.Color.CONVERTS = Y.mix(Y.Color.CONVERTS, {'hsv': 'toHSV', 'hsva': 'toHSVA'});","","","}, '3.9.0', {\"requires\": [\"color-base\"]});"];
_yuitest_coverage["build/color-hsv/color-hsv.js"].lines = {"1":0,"17":0,"55":0,"56":0,"68":0,"69":0,"83":0,"92":0,"93":0,"94":0,"95":0,"96":0,"97":0,"99":0,"102":0,"105":0,"106":0,"108":0,"109":0,"112":0,"115":0,"117":0,"118":0,"121":0,"135":0,"148":0,"149":0,"150":0,"151":0,"153":0,"154":0,"155":0,"156":0,"157":0,"158":0,"159":0,"163":0,"164":0,"165":0,"167":0,"168":0,"171":0,"176":0,"178":0,"179":0};
_yuitest_coverage["build/color-hsv/color-hsv.js"].functions = {"toHSV:54":0,"toHSVA:67":0,"_rgbToHsv:82":0,"_hsvToRgb:134":0,"(anonymous 1):1":0};
_yuitest_coverage["build/color-hsv/color-hsv.js"].coveredLines = 45;
_yuitest_coverage["build/color-hsv/color-hsv.js"].coveredFunctions = 5;
_yuitest_coverline("build/color-hsv/color-hsv.js", 1);
YUI.add('color-hsv', function (Y, NAME) {

/**
Color provides static methods for color conversion hsv values.

    Y.Color.toHSV('f00'); // hsv(0, 100%, 100%)

    Y.Color.toHSVA('rgb(255, 255, 0'); // hsva(60, 100%, 100%, 1)


@module color
@submodule color-hsv
@class HSV
@namespace Color
@since 3.8.0
**/
_yuitest_coverfunc("build/color-hsv/color-hsv.js", "(anonymous 1)", 1);
_yuitest_coverline("build/color-hsv/color-hsv.js", 17);
Color = {

    /**
    @static
    @property REGEX_HSV
    @type RegExp
    @default /hsva?\(([.\d]*), ?([.\d]*)%, ?([.\d]*)%,? ?([.\d]*)?\)/
    @since 3.8.0
    **/
    REGEX_HSV: /hsva?\(([.\d]*), ?([.\d]*)%, ?([.\d]*)%,? ?([.\d]*)?\)/,

    /**
    @static
    @property STR_HSV
    @type String
    @default hsv({*}, {*}%, {*}%)
    @since 3.8.0
    **/
    STR_HSV: 'hsv({*}, {*}%, {*}%)',

    /**
    @static
    @property STR_HSVA
    @type String
    @default hsva({*}, {*}%, {*}%, {*})
    @since 3.8.0
    **/
    STR_HSVA: 'hsva({*}, {*}%, {*}%, {*})',

    /**
    Converts provided color value to an HSV string.
    @public
    @method toHSV
    @param {String} str
    @return {String}
    @since 3.8.0
    **/
    toHSV: function (str) {
        _yuitest_coverfunc("build/color-hsv/color-hsv.js", "toHSV", 54);
_yuitest_coverline("build/color-hsv/color-hsv.js", 55);
var clr = Y.Color._convertTo(str, 'hsv');
        _yuitest_coverline("build/color-hsv/color-hsv.js", 56);
return clr.toLowerCase();
    },

    /**
    Converts provided color value to an HSVA string.
    @public
    @method toHSVA
    @param {String} str
    @return {String}
    @since 3.8.0
    **/
    toHSVA: function (str) {
        _yuitest_coverfunc("build/color-hsv/color-hsv.js", "toHSVA", 67);
_yuitest_coverline("build/color-hsv/color-hsv.js", 68);
var clr = Y.Color._convertTo(str, 'hsva');
        _yuitest_coverline("build/color-hsv/color-hsv.js", 69);
return clr.toLowerCase();
    },

    /**
    Parses the RGB string into h, s, v values. Will return an Array
        of values or an HSV string.
    @protected
    @method _rgbToHsv
    @param {String} str
    @param {Boolean} [toArray]
    @return {String|Array}
    @since 3.8.0
    **/
    _rgbToHsv: function (str, toArray) {
        _yuitest_coverfunc("build/color-hsv/color-hsv.js", "_rgbToHsv", 82);
_yuitest_coverline("build/color-hsv/color-hsv.js", 83);
var h, s, v,
            rgb = Y.Color.REGEX_RGB.exec(str),
            r = rgb[1] / 255,
            g = rgb[2] / 255,
            b = rgb[3] / 255,
            max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            delta = max - min;

        _yuitest_coverline("build/color-hsv/color-hsv.js", 92);
if (max === min) {
            _yuitest_coverline("build/color-hsv/color-hsv.js", 93);
h = 0;
        } else {_yuitest_coverline("build/color-hsv/color-hsv.js", 94);
if (max === r) {
            _yuitest_coverline("build/color-hsv/color-hsv.js", 95);
h = 60 * (g - b) / delta;
        } else {_yuitest_coverline("build/color-hsv/color-hsv.js", 96);
if (max === g) {
            _yuitest_coverline("build/color-hsv/color-hsv.js", 97);
h = (60 * (b - r) / delta) + 120;
        } else { // max === b
            _yuitest_coverline("build/color-hsv/color-hsv.js", 99);
h = (60 * (r - g) / delta) + 240;
        }}}

        _yuitest_coverline("build/color-hsv/color-hsv.js", 102);
s = (max === 0) ? 0 : 1 - (min / max);

        // ensure h is between 0 and 360
        _yuitest_coverline("build/color-hsv/color-hsv.js", 105);
while (h < 0) {
            _yuitest_coverline("build/color-hsv/color-hsv.js", 106);
h += 360;
        }
        _yuitest_coverline("build/color-hsv/color-hsv.js", 108);
h %= 360;
        _yuitest_coverline("build/color-hsv/color-hsv.js", 109);
h = Math.round(h);

        // saturation is percentage
        _yuitest_coverline("build/color-hsv/color-hsv.js", 112);
s = Math.round(s * 100);

        // value is percentage
        _yuitest_coverline("build/color-hsv/color-hsv.js", 115);
v = Math.round(max * 100);

        _yuitest_coverline("build/color-hsv/color-hsv.js", 117);
if (toArray) {
            _yuitest_coverline("build/color-hsv/color-hsv.js", 118);
return [h, s, v];
        }

        _yuitest_coverline("build/color-hsv/color-hsv.js", 121);
return Y.Color.fromArray([h, s, v], Y.Color.TYPES.HSV);
    },

    /**
    Parses the HSV string into r, b, g values. Will return an Array
        of values or an RGB string.
    @protected
    @method _hsvToRgb
    @param {String} str
    @param {Boolean} [toArray]
    @return {String|Array}
    @since 3.8.0
    **/
    _hsvToRgb: function (str, toArray) {
        _yuitest_coverfunc("build/color-hsv/color-hsv.js", "_hsvToRgb", 134);
_yuitest_coverline("build/color-hsv/color-hsv.js", 135);
var hsv = Y.Color.REGEX_HSV.exec(str),
            h = parseInt(hsv[1], 10),
            s = parseInt(hsv[2], 10) / 100, // 0 - 1
            v = parseInt(hsv[3], 10) / 100, // 0 - 1
            r,
            g,
            b,
            i = Math.floor(h / 60) % 6,
            f = (h / 60) - i,
            p = v * (1 - s),
            q = v * (1 - (s * f)),
            t = v * (1 - (s * (1 - f)));

        _yuitest_coverline("build/color-hsv/color-hsv.js", 148);
if (s === 0) {
            _yuitest_coverline("build/color-hsv/color-hsv.js", 149);
r = v;
            _yuitest_coverline("build/color-hsv/color-hsv.js", 150);
g = v;
            _yuitest_coverline("build/color-hsv/color-hsv.js", 151);
b = v;
        } else {
            _yuitest_coverline("build/color-hsv/color-hsv.js", 153);
switch (i) {
                case 0: _yuitest_coverline("build/color-hsv/color-hsv.js", 154);
r = v; g = t; b = p; break;
                case 1: _yuitest_coverline("build/color-hsv/color-hsv.js", 155);
r = q; g = v; b = p; break;
                case 2: _yuitest_coverline("build/color-hsv/color-hsv.js", 156);
r = p; g = v; b = t; break;
                case 3: _yuitest_coverline("build/color-hsv/color-hsv.js", 157);
r = p; g = q; b = v; break;
                case 4: _yuitest_coverline("build/color-hsv/color-hsv.js", 158);
r = t; g = p; b = v; break;
                case 5: _yuitest_coverline("build/color-hsv/color-hsv.js", 159);
r = v; g = p; b = q; break;
            }
        }

        _yuitest_coverline("build/color-hsv/color-hsv.js", 163);
r = Math.min(255, Math.round(r * 256));
        _yuitest_coverline("build/color-hsv/color-hsv.js", 164);
g = Math.min(255, Math.round(g * 256));
        _yuitest_coverline("build/color-hsv/color-hsv.js", 165);
b = Math.min(255, Math.round(b * 256));

        _yuitest_coverline("build/color-hsv/color-hsv.js", 167);
if (toArray) {
            _yuitest_coverline("build/color-hsv/color-hsv.js", 168);
return [r, g, b];
        }

        _yuitest_coverline("build/color-hsv/color-hsv.js", 171);
return Y.Color.fromArray([r, g, b], Y.Color.TYPES.RGB);
    }

};

_yuitest_coverline("build/color-hsv/color-hsv.js", 176);
Y.Color = Y.mix(Color, Y.Color);

_yuitest_coverline("build/color-hsv/color-hsv.js", 178);
Y.Color.TYPES = Y.mix(Y.Color.TYPES, {'HSV':'hsv', 'HSVA':'hsva'});
_yuitest_coverline("build/color-hsv/color-hsv.js", 179);
Y.Color.CONVERTS = Y.mix(Y.Color.CONVERTS, {'hsv': 'toHSV', 'hsva': 'toHSVA'});


}, '3.9.0', {"requires": ["color-base"]});
