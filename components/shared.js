var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled from 'styled-components';
export var BaseBox = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: ", ";\n  border: 1px solid ", ";\n"], ["\n  background-color: ", ";\n  border: 1px solid ", ";\n"])), function (props) { return props.theme.bgColor; }, function (props) { return props.theme.borderColor; });
export var FatText = styled.span(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  font-weight: 600;\n"], ["\n  font-weight: 600;\n"])));
var templateObject_1, templateObject_2;
