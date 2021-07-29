var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { API_ENDPOINT } from '../../lib/constant';
import styled from 'styled-components';
function PostImage(_a) {
    var log = _a.log;
    var _b = useState([]), Images = _b[0], setImages = _b[1];
    useEffect(function () {
        var _a, _b;
        if (((_a = log === null || log === void 0 ? void 0 : log.images) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            var images_1 = [];
            (_b = log === null || log === void 0 ? void 0 : log.images) === null || _b === void 0 ? void 0 : _b.map(function (img) {
                images_1.push({
                    original: API_ENDPOINT + "/" + img,
                });
            });
            setImages(images_1);
        }
    }, [log]);
    return (_jsx("div", { children: _jsx(ImageGallery, { items: Images }, void 0) }, void 0));
}
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
export default PostImage;
var templateObject_1;
