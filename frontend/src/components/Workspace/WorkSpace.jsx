import Grid from "./Grid/Grid";
import Sidebar from "./Sidebar/SIdebar";
import styles from './Workspace.module.css';
import { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";

function WorkSpace() {
    const [cookies, setCookie] = useCookies(['color']);
    const [color, setColor] = useState(cookies.color ? cookies.color : 'rgb(0,0,0)');
    const [eraser, setEraser] = useState(false);
    const [eyeDropper, setEyeDropper] = useState(false);
    const [fillBucket, setFillBucket] = useState(false);

    useEffect(()=> {
        setCookie('color', color, {maxAge: 14400});
    }, [color]);

    console.log('EYEDROPPER', eyeDropper)

    return (
        <div className={styles.workspace} >
            <Grid color={color} setColor={setColor} eraser={eraser} eyeDropper={eyeDropper} fillBucket={fillBucket} />
            <Sidebar color={color} setColor={setColor} setEraser={setEraser} setEyeDropper={setEyeDropper} setFillBucket={setFillBucket} />
        </div>
    )
}

export default WorkSpace