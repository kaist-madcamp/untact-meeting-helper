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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import PageTitle from '../components/PageTitle';
import { useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';
import { loginUserAPI } from '../lib/api/auth';
import FormBox from '../components/auth/FormBox';
import Input from '../components/auth/Input';
import Button from '../components/auth/Button';
import FormError from '../components/auth/FormError';
import BottomBox from '../components/auth/BottomBox';
import { SFormError } from '../components/auth/FormError';
import { withRouter } from 'react-router-dom';
function Login(_a) {
    var _this = this;
    var _b, _c, _d, _e, _f, _g;
    var history = _a.history, useAuthInput = _a.useAuthInput, toggleAuthTypeHandler = _a.toggleAuthTypeHandler;
    var location = useLocation();
    var _h = useState(''), reqErrorMessage = _h[0], setReqErrorMessage = _h[1];
    var _j = useMutation(loginUserAPI), mutateAsync = _j.mutateAsync, isLoading = _j.isLoading;
    var _k = useForm({
        mode: 'onChange',
        defaultValues: {
            email: ((_b = location === null || location === void 0 ? void 0 : location.state) === null || _b === void 0 ? void 0 : _b.email) || '',
            password: ((_c = location === null || location === void 0 ? void 0 : location.state) === null || _c === void 0 ? void 0 : _c.password) || '',
        },
    }), register = _k.register, handleSubmit = _k.handleSubmit, _l = _k.formState, errors = _l.errors, isValid = _l.isValid;
    var onSubmitValid = function (data) { return __awaiter(_this, void 0, void 0, function () {
        var email, password, res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isLoading)
                        return [2 /*return*/, null];
                    email = data.email, password = data.password;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, mutateAsync({
                            email: email,
                            password: password,
                        })];
                case 2:
                    res = _a.sent();
                    console.log(res);
                    if (res.data.ok) {
                        useAuthInput[1](res.data.token);
                        // localStorage.setItem('USER_NAME', )
                        history.push('/home');
                    }
                    else {
                        setReqErrorMessage(res.data.error);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    alert(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs(Container, __assign({ onClick: function (e) { return e.stopPropagation(); } }, { children: [_jsx(PageTitle, { title: "Login" }, void 0),
            _jsxs(FormBox, { children: [_jsx(Title, { children: "Meeting Assistant" }, void 0),
                    _jsx(Notification, { children: (_d = location === null || location === void 0 ? void 0 : location.state) === null || _d === void 0 ? void 0 : _d.message }, void 0),
                    _jsxs("form", __assign({ onSubmit: handleSubmit(onSubmitValid) }, { children: [_jsx(Input, __assign({}, register('email', {
                                required: {
                                    value: true,
                                    message: '이메일은 필수입니다.',
                                },
                            }), { type: "text", placeholder: "\uC774\uBA54\uC77C", hasError: Boolean(errors === null || errors === void 0 ? void 0 : errors.email) }), void 0),
                            _jsx(FormError, { message: (_e = errors === null || errors === void 0 ? void 0 : errors.email) === null || _e === void 0 ? void 0 : _e.message }, void 0),
                            _jsx(Input, __assign({}, register('password', {
                                required: {
                                    value: true,
                                    message: '비밀번호는 필수입니다.',
                                },
                                minLength: {
                                    value: 5,
                                    message: '비밀번호는 5자리 이상으로 설정해주세요.',
                                },
                            }), { type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638", hasError: Boolean(errors === null || errors === void 0 ? void 0 : errors.password) }), void 0),
                            _jsx(FormError, { message: (_f = errors === null || errors === void 0 ? void 0 : errors.password) === null || _f === void 0 ? void 0 : _f.message }, void 0),
                            _jsx(Button, __assign({ disabled: !isValid && !Boolean((_g = errors.result) === null || _g === void 0 ? void 0 : _g.message), type: "submit" }, { children: isLoading ? '로그인 중 ...' : '로그인' }), void 0)] }), void 0),
                    _jsx(ErrorMessage, { children: reqErrorMessage }, void 0)] }, void 0),
            _jsx(BottomBox, { title: "\uAC00\uC785\uD558\uAE30", description: "\uACC4\uC815\uC774 \uC5C6\uC73C\uC2E0\uAC00\uC694?", toggleAuthTypeHandler: toggleAuthTypeHandler }, void 0)] }), void 0));
}
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
var Notification = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  color: #2ecc71;\n"], ["\n  color: #2ecc71;\n"])));
export var ErrorMessage = styled(SFormError)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-size: 15px;\n  margin: 0px 0px 20px;\n"], ["\n  font-size: 15px;\n  margin: 0px 0px 20px;\n"])));
export var Title = styled.h1(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  color: ", ";\n"], ["\n  color: ", ";\n"])), function (props) { return props.theme.color; });
export default withRouter(Login);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
