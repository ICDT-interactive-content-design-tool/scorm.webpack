import * as _ from 'lodash';
import { icdt } from "../../src/_ICDT/prototype/icdt";
import { icdt_Run } from "../../src/_ICDT/script/run";

window.addEventListener('load', () => {
    icdt.container = '#mainContainer';
    icdt.svg = '#mainSvg';

    icdt.config = ((config) => {
        let { fileuploadurl, readfileuploadurl } = config;
        return { fileuploadurl, readfileuploadurl }
    })({
        "madonvi": "scorm",
        "tendv": "[SCORM]",
        "weburl": "https://tabca.vn/",
        "fileuploadurl": "/",
        "readfileuploadurl": "files/",
    });

    icdt_Run.data = _board_content;

    //
    icdt_Run.runSlide(1);
})