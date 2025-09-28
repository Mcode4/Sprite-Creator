import { useState, useRef} from "react";
import { useCookies } from "react-cookie";
import styles from './NoGrid.module.css'

function NoGrid() {
    const [cookies, setCookie, removeCookie] = useCookies(['grid']);
    const [err, setErr] = useState({});
    const height = useRef();
    const width = useRef();

    function handleSubmit() {
        const heightValue = Number(height.current.value || 0);
        const widthValue = Number(width.current.value || 0);

        if(10 >= heightValue && heightValue > 1 && 10 >= widthValue && widthValue > 1) {
            const grid = Array.from({length: heightValue}, ()=> Array(widthValue).fill('rgba(25, 0, 255, 0)'))
            setCookie('grid', grid, {maxAge: 14400});
        } else {
            setErr({});
            if(!widthValue || widthValue <= 1) {
                setErr(e => ({...e, width: "Width must be a number greater than 1"}));
                width.current.focus();
            }
            else if(widthValue > 10){
                setErr(e => ({...e, width: "Width must be a number less than 10"}));
                width.current.focus();
            }
            if(!heightValue || heightValue <= 1) {
                setErr(e => ({...e, height: "Height must be a number greater than 1"}));
                height.current.focus();
            }
            else if(heightValue > 10){
                setErr(e => ({...e, height: "Height must be a number less than 10"}));
                height.current.focus();
            }
        }
    }

    return (
        <div id={styles.noGridBackground}>
            
            <div id={styles.noGridContainer}>
                <h3>Choose your grid size</h3>
                <label>Height: <input ref={height} type="number" id="height-input" /></label>
                {err.height ? (
                    <>
                        <p>{err.height}</p>
                        <br />
                    </>
                ) : <br />}
                <label>Width: <input ref={width} type="number" id="width-input" /></label>
                {err.width ? (
                    <>
                        <p>{err.width}</p>
                        <br />
                    </>
                ) : <br />}
                <button className="btn btn-outline-primary" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default NoGrid