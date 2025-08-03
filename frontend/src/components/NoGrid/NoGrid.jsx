import { useContext, useState, useRef} from "react"
import { sizeContext } from "../../App"

function NoGrid() {
    const { setHeight, setWidth} = useContext(sizeContext);
    const [err, setErr] = useState({});
    const height = useRef();
    const width = useRef();

    function handleSubmit() {
        const heightValue = Number(height.current.value || 0);
        const widthValue = Number(width.current.value || 0);

        if(heightValue > 1 && widthValue > 1) {
            setHeight(heightValue);
            setWidth(widthValue);
        } else {
            setErr({});
            if(!widthValue || widthValue < 1) {
                setErr(e => ({...e, width: "Width must be a number greater than 1"}));
                width.current.focus();
            }
            if(!heightValue || heightValue < 1) {
                setErr(e => ({...e, height: "Height must be a number greater than 1"}));
                height.current.focus();
            }
        }


        
        console.log("height: ", Number(height.current.value), "width: ", width.value)
    }

    return (
        <div className="no-grid-container">
            <label>Height: <input ref={height} type="number" id="height-input" /></label>
            <br />
            {err.height && (
                <>
                    <p>{err.height}</p>
                    <br />
                </>
            )}
            <label>Width: <input ref={width} type="number" id="width-input" /></label>
            {err.width && (
                <>
                    <p>{err.width}</p>
                    <br />
                </>
            )}
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default NoGrid