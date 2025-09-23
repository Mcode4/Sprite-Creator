import Grid from "./Grid/Grid";
import Sidebar from "./Sidebar/SIdebar";
import TopBarMenu from "./TopBarMenu/TopBarMenu";
import styles from './Workspace.module.css';
import { useState, useEffect, useRef} from "react";
import { useCookies } from "react-cookie";

function WorkSpace() {
    const [cookies, setCookie] = useCookies(['color']);
    const [color, setColor] = useState(cookies.color ? cookies.color : 'rgb(0,0,0)');
    const [eraser, setEraser] = useState(false);
    const [eyeDropper, setEyeDropper] = useState(false);
    const [fillBucket, setFillBucket] = useState(false);
    const [grid, setGrid] = useState(cookies.grid);
    const [rewriteGrid, setRewriteGrid] = useState([]);
    const [gridHistory, setGridHistory] = useState([]);

    useEffect(()=> {
        setCookie('color', color, {maxAge: 14400});
    }, [color]);

    console.log('EYEDROPPER', eyeDropper)

    return (
        <div>
            <TopBarMenu grid={grid} setGrid={setGrid} gridHistory={gridHistory} setGridHistory={setGridHistory} setRewriteGrid={setRewriteGrid} />            
            <div className={styles.workspace} >
                <Grid grid={grid} setGrid={setGrid} color={color} setColor={setColor} eraser={eraser} eyeDropper={eyeDropper} fillBucket={fillBucket} gridHistory={gridHistory} setGridHistory={setGridHistory} rewriteGrid={rewriteGrid} />
                <Sidebar color={color} setColor={setColor} setEraser={setEraser} setEyeDropper={setEyeDropper} setFillBucket={setFillBucket} />
            </div>
        </div>
    )
}

export default WorkSpace