import Grid from "./Grid/Grid";
import Sidebar from "./Sidebar/SIdebar";
import styles from './Workspace.module.css';
import { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";

function WorkSpace() {
    const [cookies, setCookie] = useCookies(['color']);
    const [color, setColor] = useState(cookies.color ? cookies.color : 'rgb(0,0,0)');
    const [eraser, setEraser] = useState(false);

    useEffect(()=> {
        setCookie('color', color, {maxAge: 14400});
    }, [color]);

    return (
        <div className={styles.workspace} >
            <Grid color={color} eraser={eraser} />
            <Sidebar color={color} setColor={setColor} setEraser={setEraser} />
        </div>
    )
}

export default WorkSpace