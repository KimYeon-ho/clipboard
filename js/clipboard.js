/**
 * @param selector
 * @param options
 * @constructor
 */
function Clipboard(selector, options) {
    this.button = typeof document.querySelector === 'function' ? document.querySelector(selector) : window.$ ? $(selector)[0] : document.getElementById(selector.split('').slice(1).join(''));
    this._options = null;
    this._txtBox = null;
    this._success = true;
    this._isPrompt = false;
    this._copyEvent = null;
    this.initOption(options);
    this._initEvent();
}
/**
 * @type {{text: string, promptMsg: string, callback: Clipboard._defaultOptions.callback}}
 * @private
 */
Clipboard._defaultOptions = {
    text: '복사할 키워드를 입력해주세요.',
    promptMsg: '해당 문구를 복사해주세요.',
    callback: function () {
        alert('클립보드에 해당 문구가 복사되었습니다.');
    }
};
/**
 * @type {{reset: Clipboard.reset, _removeEvent: Clipboard._removeEvent, initOption: Clipboard.initOption, _initEvent: Clipboard._initEvent, copy: Clipboard.copy, _setClipboardData: Clipboard._setClipboardData, _createTxtBox: Clipboard._createTxtBox, _setExecCommand: Clipboard._setExecCommand, _complete: Clipboard._complete}}
 */
Clipboard.prototype = {
    reset: function () {
        if ( !this.button ) return false;
        this._removeEvent();
        this.button = null;
        this._options = null;
        this._txtBox = null;
        this._success = null;
        this._isPrompt = null;
        this._copyEvent = null;
    },
    _removeEvent: function () {
        var that = this;
        if (window.removeEventListener) {
            this.button.removeEventListener('click', that._copyEvent);
        } else {
            this.button.detachEvent('onclick', that._copyEvent);
        }
    },
    initOption: function (options) {
        options = options || {text: undefined, promptMsg: undefined, callback: undefined};
        this._options = {
            text: options.text !== undefined ? options.text : Clipboard._defaultOptions.text,
            promptMsg: options.promptMsg !== undefined ? options.promptMsg : Clipboard._defaultOptions.promptMsg,
            callback: options.callback !== undefined ? options.callback : Clipboard._defaultOptions.callback
        };
    },
    _initEvent: function () {
        var that = this;
        this._copyEvent = this.copy.bind(this);
        if (window.addEventListener) {
            this.button.addEventListener('click', that._copyEvent);
        } else {
            this.button.attachEvent('onclick', that._copyEvent);
        }
    },
    copy: function () {
        if ( !this.button ) return false;
        if (window.clipboardData) {
            this._setClipboardData();
        } else {
            this._createTxtBox();
            this._setExecCommand();
        }
        this._complete();
    },
    _setClipboardData: function () {
        window.clipboardData.setData('Text', this._options.text);
    },
    _createTxtBox: function () {
        var txtBox = document.createElement('textarea');
        txtBox.style.cssText = 'overflow:hidden;position:fixed;top:-1px;left:-1px;width:1px;height:1px;';
        this._txtBox = this.button.parentNode.appendChild(txtBox);
        this._txtBox.innerHTML = this._options.text;
        this._txtBox.select();
    },
    _setExecCommand: function () {
        try {
            this._success = document.execCommand('copy', false, null);
        }
        catch (e) {
            this._isPrompt = true;
            if (!window.prompt(this._options.promptMsg, this._options.text)) {
                this._success = false;
            }
        }
        finally {
            this._txtBox.remove();
        }
    },
    _complete: function () {
        if (this._success) {
            this._options.callback();
        } else {
            if (!this._isPrompt) {
                if (window.prompt(this._options.promptMsg, this._options.text)) {
                    this._options.callback();
                }
            }
        }
    }
};

/* Polyfill */
if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if (typeof this !== 'function') {
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }
        var aArgs   = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP    = function() {},
            fBound  = function() {
                return fToBind.apply(this instanceof fNOP
                    ? this
                    : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };
        if (this.prototype) {
            fNOP.prototype = this.prototype;
        }
        fBound.prototype = new fNOP();
        return fBound;
    };
}