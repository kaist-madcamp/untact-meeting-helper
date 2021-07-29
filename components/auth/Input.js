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
import { forwardRef } from 'react';
import styled from 'styled-components';
var SInput = styled.input(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: ", ";\n  padding: 7px 10px;\n  border-radius: 3px;\n  border: 0.5px solid\n    ", ";\n  width: 100%;\n  box-sizing: border-box;\n  margin: 5px 0;\n  &::placeholder {\n    font-size: 12px;\n  }\n  &:focus {\n    border-color: rgb(38, 38, 38);\n  } \n"], ["\n  background-color: ", ";\n  padding: 7px 10px;\n  border-radius: 3px;\n  border: 0.5px solid\n    ", ";\n  width: 100%;\n  box-sizing: border-box;\n  margin: 5px 0;\n  &::placeholder {\n    font-size: 12px;\n  }\n  &:focus {\n    border-color: rgb(38, 38, 38);\n  } \n"])), function (props) { return props.theme.bgColor; }, function (props) { return (props.hasError ? props.theme.errorMsgColor : props.theme.borderColor); });
var Input = forwardRef(function (props, ref) {
    return _jsx(SInput, __assign({ ref: ref }, props), void 0);
});
export default Input;
var templateObject_1;
