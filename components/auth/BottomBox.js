var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import styled from 'styled-components';
import { BaseBox } from '../shared';
export default function BottomBox(_a) {
    var title = _a.title, description = _a.description, toggleAuthTypeHandler = _a.toggleAuthTypeHandler;
    return (_jsxs(SBottomBox, { children: [_jsx("span", { children: description }, void 0),
            _jsx("span", __assign({ className: "title", onClick: toggleAuthTypeHandler }, { children: title }), void 0)] }, void 0));
}
var SBottomBox = styled(BaseBox)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 24px 0;\n  span {\n    margin-right: 5px;\n  }\n  a {\n    font-weight: 600;\n  }\n  .title {\n    font-weight: bold;\n    color: rgb(63, 81, 181);\n    cursor: pointer;\n  }\n  .title:hover {\n    text-decoration: underline;\n  }\n"], ["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 24px 0;\n  span {\n    margin-right: 5px;\n  }\n  a {\n    font-weight: 600;\n  }\n  .title {\n    font-weight: bold;\n    color: rgb(63, 81, 181);\n    cursor: pointer;\n  }\n  .title:hover {\n    text-decoration: underline;\n  }\n"])));
var templateObject_1;
