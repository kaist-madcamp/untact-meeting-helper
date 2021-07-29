var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import Axios from '../../lib/defaultClient';
import { API_ENDPOINT } from '../../lib/constant';
function FileUpload(_a) {
    var _this = this;
    var refreshFunction = _a.refreshFunction;
    var _b = useState([]), Images = _b[0], setImages = _b[1];
    var onDrop = function (files) { return __awaiter(_this, void 0, void 0, function () {
        var formData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formData = new FormData();
                    formData.append('file', files[0]);
                    return [4 /*yield*/, Axios.post('/post/uploadImage', formData)];
                case 1:
                    response = _a.sent();
                    console.log(response);
                    if (response.data.ok) {
                        setImages(__spreadArray(__spreadArray([], Images), [response.data.image]));
                        refreshFunction(__spreadArray(__spreadArray([], Images), [response.data.image]));
                    }
                    else {
                        alert('Failed to save the Image in Server');
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var onDelete = function (image) {
        var currentIndex = Images.indexOf(image);
        var newImages = __spreadArray([], Images);
        newImages.splice(currentIndex, 1);
        setImages(newImages);
        refreshFunction(newImages);
    };
    return (_jsxs("div", __assign({ style: { display: 'flex', justifyContent: 'space-between' } }, { children: [_jsx(Dropzone, __assign({ onDrop: onDrop, multiple: false, maxSize: 800000000 }, { children: function (_a) {
                    var getRootProps = _a.getRootProps, getInputProps = _a.getInputProps;
                    return (_jsxs("div", __assign({ style: {
                            width: '300px',
                            height: '240px',
                            border: '1px solid lightgray',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        } }, getRootProps(), { children: [_jsx("input", __assign({}, getInputProps()), void 0),
                            _jsx(PlusOutlined, { style: { fontSize: '3rem', cursor: 'pointer' }, className: "plusoutlined" }, void 0)] }), void 0));
                } }), void 0),
            _jsxs("div", __assign({ style: {
                    display: 'flex',
                    width: '350px',
                    height: '240px',
                    overflowX: 'scroll',
                } }, { children: [Images === null || Images === void 0 ? void 0 : Images.map(function (image, index) { return (_jsx("div", __assign({ onClick: function () { return onDelete(image); } }, { children: _jsx("img", { style: {
                                minWidth: '300px',
                                width: '300px',
                                height: '240px',
                                objectFit: 'contain',
                            }, src: API_ENDPOINT + "/" + image }, void 0) }), index)); }),
                    !Images && (_jsx("div", { children: _jsx("img", { style: { minWidth: '300px', width: '300px', height: '240px' }, src: "error" }, void 0) }, void 0))] }), void 0)] }), void 0));
}
export default FileUpload;
