import Grid from "./Grid/Grid";
import Sidebar from "./Sidebar/SIdebar";
import styles from './Workspace.module.css';
import { useState } from "react";

function WorkSpace() {
    const [color, setColor] = useState('rgb(0,0,0)');
    return (
        <div className={styles.workspace} >
            <Grid color={color} />
            <Sidebar color={color} setColor={setColor} />
        </div>
    )
}

export default WorkSpace