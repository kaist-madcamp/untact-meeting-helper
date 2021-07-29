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
import { jsx as _jsx } from "react/jsx-runtime";
import styled from 'styled-components';
export default function Button(_a) {
    var children = _a.children, type = _a.type, onClick = _a.onClick;
    return (_jsx(SButton, __assign({ className: type, onClick: onClick }, { children: children }), void 0));
}
var SButton = styled.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  text-align: center;\n  min-width: 150px;\n  border: none;\n  font-size: 15px;\n  font-weight: 600;\n  outline: none;\n  width: 20px;\n  height: 40px;\n  border-radius: 20px;\n  cursor: pointer;\n  margin: 20px 10px;\n  padding: 10px;\n  &.mic {\n    background-color: #333;\n    color: #fff;\n  }\n  &.remove {\n    background-color: salmon;\n    color: #fff;\n  }\n  &.chat {\n    background-color: #3f51b5;\n    color: #fff;\n  }\n"], ["\n  text-align: center;\n  min-width: 150px;\n  border: none;\n  font-size: 15px;\n  font-weight: 600;\n  outline: none;\n  width: 20px;\n  height: 40px;\n  border-radius: 20px;\n  cursor: pointer;\n  margin: 20px 10px;\n  padding: 10px;\n  &.mic {\n    background-color: #333;\n    color: #fff;\n  }\n  &.remove {\n    background-color: salmon;\n    color: #fff;\n  }\n  &.chat {\n    background-color: #3f51b5;\n    color: #fff;\n  }\n"])));
var templateObject_1;
