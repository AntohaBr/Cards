import React from 'react';
import {SuperInputText} from "./SuperInputText/SuperInputText";
import {SuperButton} from "./SuperButton/SuperButton";
import {SuperSelect} from "./SuperSelect/SuperSelect";
import {SuperRange} from "./SuperRange/SuperRange";
import {SuperDoubleRange} from "./SuperDoubleRange/SuperDoubleRange";
import {SuperRadio} from "./SuperRadio/SuperRadio";
import {SuperCheckbox} from "./SuperCheckbox/SuperCheckbox";
import {SuperEditableSpan} from "./SuperEditableSpan/SuperEditableSpan";

export const SuperComponents = () => {
    return (
        <div>
            <SuperInputText/>
            <SuperButton/>
            <SuperEditableSpan/>
            <SuperSelect/>
            <SuperRange/>
            <SuperRadio/>
            <SuperCheckbox/>
            <SuperDoubleRange/>
        </div>
    )
}