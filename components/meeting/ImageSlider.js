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
import { jsx as _jsx } from "react/jsx-runtime";
import { Carousel } from 'antd';
import { API_ENDPOINT } from '../../lib/constant';
var ImageSlider = function (_a) {
    var images = _a.images;
    return (_jsx("div", { children: _jsx(Carousel, __assign({ autoplay: true }, { children: images.map(function (image) { return (_jsx("div", { children: _jsx("img", { style: {
                        width: '100%',
                        maxHeight: '400px',
                        objectFit: 'contain',
                    }, src: API_ENDPOINT + "/" + image, alt: "postImage" }, void 0) }, image)); }) }), void 0) }, void 0));
};
export default ImageSlider;
