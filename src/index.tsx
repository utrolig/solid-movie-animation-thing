/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import { Movies } from "./Movies";

const root = document.getElementById("root");

render(() => <Movies />, root!);
