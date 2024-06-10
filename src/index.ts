import * as _ from 'lodash';
import { icdt } from "../../src/_ICDT/prototype/icdt";
import { icdt_Run } from "../../src/_ICDT/script/run";
import { icdt_IDataSlide } from '../../src/_ICDT/interface/IDataSource';

window.addEventListener('load', () => {
    icdt.container = '#mainContainer';
    icdt.svg = '#mainSvg';

    //-----------------------------------------action setting

    let mainActionList = document.getElementById('mainActionList');
    let slideIdx = 0, slideTotal = 1;

    if (_board_setting?.buttons.paging !== false) {
        (() => {
            let button = document.createElement('button');
            let img = new Image();
            img.height = 40;
            img.title = 'Fullscreen';
            img.src = 'public/icon/Back.png';
            button.append(img);
            mainActionList.append(button);

            //
            button.onclick = () => {
                if (slideIdx > 0) {
                    slideIdx--;
                    icdt_Run.runSlide(slideIdx);
                }
            }
        })();

        (() => {
            let div = document.createElement('div');
            div.className = 'page-info';
            div.textContent = `${slideIdx + 1}/${slideTotal}`;
            mainActionList.append(div);

            icdt_Run.onChangeSlide = (slides: Array<icdt_IDataSlide>, id: number, idx: number, total: number, slide?: icdt_IDataSlide) => {
                slideIdx = idx;
                slideTotal = total;

                //
                div.textContent = `${slideIdx + 1}/${slideTotal}`;
            };
        })();

        (() => {
            let button = document.createElement('button');
            let img = new Image();
            img.height = 40;
            img.title = 'Fullscreen';
            img.src = 'public/icon/Next.png';
            button.append(img);
            mainActionList.append(button);

            //
            button.onclick = () => {
                if (slideIdx < slideTotal - 1) {
                    slideIdx++;
                    icdt_Run.runSlide(slideIdx);
                }
            }
        })();
    }

    if (_board_setting?.buttons.refresh !== false) {
        (() => {
            let button = document.createElement('button');
            let img = new Image();
            img.height = 40;
            img.title = 'Fullscreen';
            img.src = 'public/icon/Refresh.png';
            button.append(img);
            mainActionList.append(button);

            //
            button.onclick = () => {
                icdt_Run.runSlide(slideIdx);
            }
        })();
    }

    if (_board_setting?.buttons?.fullscreen !== false) {
        (() => {
            let isFullscreen = () => {
                return ((element: any) => { return element.fullscreen || element.fullscreenElement || element.webkitFullscreenElement || element.mozFullScreenElement || element.msFullscreenElement ? true : false })(document)
            };
            let onFullScreen = () => {
                ((element: any) => {
                    if (element.requestFullscreen)
                        element.requestFullscreen();
                    else if (element.mozRequestFullScreen)
                        element.mozRequestFullScreen();
                    else if (element.webkitRequestFullscreen)
                        element.webkitRequestFullscreen();
                    else if (element.msRequestFullscreen)
                        element.msRequestFullscreen();
                })(document.body)
            };
            let offFullScreen = () => {
                ((element: any) => {
                    if (element.exitFullscreen)
                        element.exitFullscreen();
                    else if (element.mozCancelFullScreen)
                        element.mozCancelFullScreen();
                    else if (element.webkitExitFullscreen)
                        element.webkitExitFullscreen();
                    else if (element.msExitFullscreen)
                        element.msExitFullscreen();
                })(document)
            };
            let toggleFullscreen = () => {
                isFullscreen() ? offFullScreen() : onFullScreen();
            }

            let button = document.createElement('button');
            let img = new Image();
            img.height = 40;
            img.title = 'Fullscreen';
            img.src = isFullscreen() ? 'public/icon/Fullscreen_on.png' : 'public/icon/Fullscreen_off.png';
            button.append(img);
            mainActionList.append(button);

            //
            button.onclick = () => {
                //
                toggleFullscreen();

                //
                setTimeout(() => {
                    img.src = isFullscreen() ? 'public/icon/Fullscreen_on.png' : 'public/icon/Fullscreen_off.png';
                }, 600);
            }
        })();
    }

    //------------------------------------------

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
    icdt_Run.runSlide();

})