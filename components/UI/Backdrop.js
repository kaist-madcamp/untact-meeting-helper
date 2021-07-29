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
import { PortalConsumer } from '../../providers/PortalProvider';
export default function Backdrop(_a) {
    var children = _a.children, isClose = _a.isClose, toggleCloseHandler = _a.toggleCloseHandler;
    var clickHandler = function () {
        toggleCloseHandler();
    };
    return (_jsx(PortalConsumer, { children: _jsx(BackdropContainer, __assign({ close: isClose, onClick: function () { return clickHandler(); } }, { children: children }), void 0) }, void 0));
}
var BackdropContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: rgba(249, 249, 249, 0.95);\n  opacity: ", ";\n  transition: ", ";\n  z-index: ", ";\n"], ["\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: rgba(249, 249, 249, 0.95);\n  opacity: ", ";\n  transition: ", ";\n  z-index: ", ";\n"])), function (props) { return (props.close ? 0 : 1); }, function (props) { return !props.close && 'opacity 0.3s'; }, function (props) { return (props.close ? -999 : 999); });
var templateObject_1;
