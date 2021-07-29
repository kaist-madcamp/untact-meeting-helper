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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Typography, Button, Input } from 'antd';
import PageLayout from '../components/PageLayout';
import FileUpload from '../components/meeting/FileUpload';
import Axios from '../lib/defaultClient';
var Title = Typography.Title;
var TextArea = Input.TextArea;
export default function Upload(_a) {
    var useAuthInput = _a.useAuthInput;
    var _b = useState(''), TitleValue = _b[0], setTitleValue = _b[1];
    var _c = useState(''), ContentValue = _c[0], setContentValue = _c[1];
    var _d = useState([]), Images = _d[0], setImages = _d[1];
    var onTitleChange = function (event) {
        setTitleValue(event.currentTarget.value);
    };
    var onContentChange = function (event) {
        setContentValue(event.currentTarget.value);
    };
    var updateImages = function (newImages) {
        setImages(newImages);
    };
    var onSubmit = function (event) {
        event.preventDefault();
        if (!TitleValue || !ContentValue || !Images) {
            return alert('fill all the fields first!');
        }
        var variables = {
            title: TitleValue,
            contents: ContentValue,
            images: Images,
        };
        console.log('variables : ', variables);
        Axios.post('/post/uploadPost', variables).then(function (response) {
            if (response.data.ok) {
                alert('Posts Successfully Uploaded');
            }
            else {
                alert('Failed to upload Posts');
            }
        });
    };
    return (_jsx(PageLayout, __assign({ title: "Upload", useAuthInput: useAuthInput }, { children: _jsxs("div", __assign({ style: {
                maxWidth: '700px',
                margin: '2rem auto',
                paddingBottom: '50px',
            } }, { children: [_jsx("div", __assign({ style: { textAlign: 'center', marginBottom: '2rem' } }, { children: _jsx(Title, __assign({ level: 2 }, { children: " Upload your Posts" }), void 0) }), void 0),
                _jsxs("form", __assign({ onSubmit: onSubmit }, { children: [_jsx(FileUpload, { refreshFunction: updateImages }, void 0),
                        _jsx("br", {}, void 0),
                        _jsx("br", {}, void 0),
                        _jsx("label", { children: "Title" }, void 0),
                        _jsx(Input, { onChange: onTitleChange, value: TitleValue }, void 0),
                        _jsx("br", {}, void 0),
                        _jsx("br", {}, void 0),
                        _jsx("label", { children: "Content" }, void 0),
                        _jsx(TextArea, { onChange: onContentChange, value: ContentValue }, void 0),
                        _jsx("br", {}, void 0),
                        _jsx("br", {}, void 0),
                        _jsx(Button, __assign({ onClick: onSubmit }, { children: "Submit" }), void 0)] }), void 0)] }), void 0) }), void 0));
}
