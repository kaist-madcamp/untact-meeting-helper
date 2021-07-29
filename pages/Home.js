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
import { useEffect, useState } from 'react';
import { Col, Card, Row } from 'antd';
import PageLayout from '../components/PageLayout';
import Axios from '../lib/defaultClient';
import ImageSlider from '../components/meeting/ImageSlider';
import { Link } from 'react-router-dom';
var Meta = Card.Meta;
export default function Home(_a) {
    var useAuthInput = _a.useAuthInput;
    var _b = useState([]), logs = _b[0], setLogs = _b[1];
    useEffect(function () {
        Axios.get('/post/getPosts').then(function (response) {
            console.log(response);
            if (response.data.ok) {
                setLogs(response.data.meetingLogs);
            }
            else {
                alert('Failed to fectch product datas');
            }
        });
    }, []);
    var renderCards = logs === null || logs === void 0 ? void 0 : logs.map(function (post, index) {
        return (_jsx(Col, __assign({ lg: 6, md: 8, xs: 24 }, { children: _jsx(Link, __assign({ to: "/meeting-log/" + post.id }, { children: _jsx(Card, __assign({ hoverable: true, cover: _jsx(ImageSlider, { images: post.images }, void 0) }, { children: _jsx(Meta, { title: post.title, description: post.content }, void 0) }), index) }), void 0) }), index));
    });
    return (_jsx(PageLayout, __assign({ title: "Home", useAuthInput: useAuthInput }, { children: _jsx("div", __assign({ style: { width: '75%', margin: '3rem auto' } }, { children: (logs === null || logs === void 0 ? void 0 : logs.length) === 0 ? (_jsx("div", __assign({ style: {
                    display: 'flex',
                    height: '300px',
                    justifyContent: 'center',
                    alignItems: 'center',
                } }, { children: _jsx("h2", { children: "No post yet..." }, void 0) }), void 0)) : (_jsx("div", { children: _jsx(Row, __assign({ gutter: [16, 16], style: { display: 'center' } }, { children: renderCards }), void 0) }, void 0)) }), void 0) }), void 0));
}
