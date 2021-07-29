var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { jsx as _jsx } from "react/jsx-runtime";
import styled from 'styled-components';
import { PortalConsumer } from '../../providers/PortalProvider';
export default function Modal(_a) {
    var children = _a.children;
    return (_jsx(PortalConsumer, { children: _jsx(ModalContainer, { children: _jsx(ModalWrapper, { children: children }, void 0) }, void 0) }, void 0));
}
var ModalContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 999;\n"], ["\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 999;\n"])));
var ModalWrapper = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 300px;\n  height: 400px;\n"], ["\n  width: 300px;\n  height: 400px;\n"])));
var templateObject_1, templateObject_2;
