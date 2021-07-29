var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { jsx as _jsx } from "react/jsx-runtime";
import styled from 'styled-components';
import { BaseBox } from '../shared';
var SFormBox = styled(BaseBox)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 35px 40px 25px 40px;\n  margin: 0 0 10px;\n  background-color: ", ";\n  form {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    margin: 22px 0px 12px;\n    width: 100%;\n  }\n  h1 {\n    font-size: 42px;\n    font-weight: 800;\n    font-family: cursive;\n    margin: 10px 0px 30px;\n  }\n  h2 {\n    color: #8e8e8e;\n    font-weight: 600;\n    font-size: 17px;\n    text-align: center;\n    margin-bottom: 10px;\n  }\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 35px 40px 25px 40px;\n  margin: 0 0 10px;\n  background-color: ", ";\n  form {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    margin: 22px 0px 12px;\n    width: 100%;\n  }\n  h1 {\n    font-size: 42px;\n    font-weight: 800;\n    font-family: cursive;\n    margin: 10px 0px 30px;\n  }\n  h2 {\n    color: #8e8e8e;\n    font-weight: 600;\n    font-size: 17px;\n    text-align: center;\n    margin-bottom: 10px;\n  }\n"])), function (props) { return props.theme.bgColor; });
export default function FormBox(_a) {
    var children = _a.children;
    return _jsx(SFormBox, { children: children }, void 0);
}
var templateObject_1;
