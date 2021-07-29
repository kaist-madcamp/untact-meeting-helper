var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { jsx as _jsx } from "react/jsx-runtime";
import styled from 'styled-components';
export var SFormError = styled.span(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  color: #ed4956;\n  font-size: 12px;\n  font-weight: 600;\n  margin: 3px;\n"], ["\n  color: #ed4956;\n  font-size: 12px;\n  font-weight: 600;\n  margin: 3px;\n"])));
export default function FormError(_a) {
    var message = _a.message;
    if (!message)
        return null;
    return _jsx(SFormError, { children: message }, void 0);
}
var templateObject_1;
