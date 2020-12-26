/* eslint-disable global-require */
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-circular-progressbar/dist/styles.css";
import "react-image-lightbox/style.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "video.js/dist/video-js.css";
import "./assets/css/vendor/bootstrap.min.css";
import "./assets/css/vendor/bootstrap.rtl.only.min.css";
import {
  defaultColor,
  isDarkSwitchActive,
  isMultiColorActive,
} from "./constants/defaultValues";
import { getCurrentColor, setCurrentColor } from "./helpers/Utils";

const color =
  isMultiColorActive || isDarkSwitchActive ? getCurrentColor() : defaultColor;
setCurrentColor(color);

const render = () => {
  import(`./assets/css/sass/themes/gogo.${color}.scss`).then(() => {
    require("./AppRenderer");
  });
};
render();
