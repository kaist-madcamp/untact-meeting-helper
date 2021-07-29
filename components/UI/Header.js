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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styled from 'styled-components';
import { routes } from '../../routes/index';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faUpload, faHouseUser, } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Backdrop from './Backdrop';
import Login from '../../pages/Login';
import SignUp from '../../pages/SignUp';
export default function Header(_a) {
    var useAuthInput = _a.useAuthInput;
    var _b = useState(false), showLoginModal = _b[0], setShowLoginModal = _b[1];
    var _c = useState('login'), authPageType = _c[0], setAuthPageType = _c[1];
    var toggleCloseHandler = function () {
        setShowLoginModal(!showLoginModal);
    };
    var toggleAuthTypeHandler = function () {
        if (authPageType === 'login') {
            setAuthPageType('signup');
        }
        else if (authPageType === 'signup') {
            setAuthPageType('login');
        }
    };
    return (_jsx(SHeader, { children: _jsxs(Navigation, { children: [_jsx(Link, __assign({ to: routes.root }, { children: _jsx(Title, { children: "Untact meeting helper" }, void 0) }), void 0),
                useAuthInput[0] ? (_jsxs("div", { children: [_jsx(Link, __assign({ to: routes.home }, { children: _jsx(FontAwesomeIcon, { icon: faHouseUser }, void 0) }), void 0),
                        _jsx(Link, __assign({ to: routes.meetingRoom }, { children: _jsx(FontAwesomeIcon, { icon: faHandshake }, void 0) }), void 0),
                        _jsx(Link, __assign({ to: routes.upload }, { children: _jsx(FontAwesomeIcon, { icon: faUpload }, void 0) }), void 0),
                        _jsx(SButton, __assign({ onClick: function () { return useAuthInput[1](); } }, { children: "Log out" }), void 0)] }, void 0)) : (_jsxs(_Fragment, { children: [_jsx("a", { children: _jsx(FontAwesomeIcon, { onClick: function () { return setShowLoginModal(true); }, icon: faHouseUser }, void 0) }, void 0),
                        _jsx("a", { children: _jsx(FontAwesomeIcon, { onClick: function () { return setShowLoginModal(true); }, icon: faHandshake }, void 0) }, void 0),
                        _jsx("a", { children: _jsx(FontAwesomeIcon, { onClick: function () { return setShowLoginModal(true); }, icon: faUpload }, void 0) }, void 0)] }, void 0)),
                _jsx(Backdrop, __assign({ isClose: !showLoginModal, toggleCloseHandler: toggleCloseHandler }, { children: authPageType === 'login' ? (_jsx(Login, { toggleAuthTypeHandler: toggleAuthTypeHandler, useAuthInput: useAuthInput }, void 0)) : (_jsx(SignUp, { toggleAuthTypeHandler: toggleAuthTypeHandler }, void 0)) }), void 0)] }, void 0) }, void 0));
}
var SHeader = styled.header(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  padding: 10px 0;\n  border-bottom: 2px solid black;\n  border-top: 2px solid black;\n  border-left: 3px solid black;\n  border-right: 3px solid black;\n  background-color: aliceblue;\n"], ["\n  display: flex;\n  padding: 10px 0;\n  border-bottom: 2px solid black;\n  border-top: 2px solid black;\n  border-left: 3px solid black;\n  border-right: 3px solid black;\n  background-color: aliceblue;\n"])));
var Navigation = styled.nav(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  svg {\n    margin: 0 20px;\n    color: blurry;\n  }\n  a {\n    cursor: pointer;\n  }\n"], ["\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  svg {\n    margin: 0 20px;\n    color: blurry;\n  }\n  a {\n    cursor: pointer;\n  }\n"])));
var Title = styled.h1(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  color: black;\n  &:hover {\n    text-decoration: underline;\n  }\n  cursor: pointer;\n  font-size: 32px;\n  text-align: justify;\n  padding: 0.25em 1em;\n  font-weight: bold;\n  font-family: Times, cursive;\n"], ["\n  color: black;\n  &:hover {\n    text-decoration: underline;\n  }\n  cursor: pointer;\n  font-size: 32px;\n  text-align: justify;\n  padding: 0.25em 1em;\n  font-weight: bold;\n  font-family: Times, cursive;\n"])));
var SButton = styled.button(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background-color: #3f51b5;\n  color: #fff;\n  padding: 10px;\n  border: 10;\n  height: 100%;\n  cursor: pointer;\n"], ["\n  background-color: #3f51b5;\n  color: #fff;\n  padding: 10px;\n  border: 10;\n  height: 100%;\n  cursor: pointer;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
