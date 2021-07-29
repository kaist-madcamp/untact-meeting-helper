import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Helmet } from 'react-helmet';
export default function PageTitle(_a) {
    var title = _a.title;
    return (_jsx(Helmet, { children: _jsxs("title", { children: [" ", title, " | Meeting Assistant "] }, void 0) }, void 0));
}
