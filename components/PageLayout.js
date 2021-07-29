import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import PageTitle from './PageTitle';
import Header from './UI/Header';
export default function PageLayout(_a) {
    var children = _a.children, title = _a.title, useAuthInput = _a.useAuthInput;
    return (_jsxs(_Fragment, { children: [_jsx(PageTitle, { title: title }, void 0),
            _jsx(Header, { useAuthInput: useAuthInput }, void 0), children] }, void 0));
}
