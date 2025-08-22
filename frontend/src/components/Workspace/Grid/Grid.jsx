import { useState } from "react"
import { useCookies } from 'react-cookie'
import styles from './Grid.module.css'

function Grid({ color, setColor, eraser, eyeDropper }) {
    const [cookies, setCookie, removeCookie] = useCookies(['grid']);
    const [grid, setGrid] = useState(cookies.grid); 

    // function to handle grid changing color
    function handleGridChange(x, y) {
        console.log("GRID", x, y, color);
        const newGrid = grid;
        console.log(`EYEDROPPER: ${eyeDropper}, ERASER: ${eraser}`)
        
        if(eraser) {
            newGrid[y][x] = 'rgba(25, 0, 255, 0)';
            setGrid(newGrid);
            setCookie('grid', grid, {maxAge: 14400});
            console.log('COOKIES', cookies.grid);
        } else if(eyeDropper) {
            const pixelColor = grid[y][x];
            setColor(pixelColor);
            console.log('RAN, PIXEL COLOR: ', pixelColor)
        } else {
            newGrid[y][x] = color;
            setGrid(newGrid);
            setCookie('grid', grid, {maxAge: 14400});
            console.log('COOKIES', cookies.grid);
        }
    }

    return (
        <div className={styles.gridContainer}>
            {grid.map((row, y)=> 
                <div className={styles.row} key={y}>
                {row.map((colColor, x)=> (
                    <div 
                        className={styles.pixel}
                        key={x}
                        style={{ backgroundColor: colColor }}
                        onClick={()=> handleGridChange(x, y)}
                    >{colColor}</div>
                ))}
                <br />
                </div>
            )}
        </div>
    )
}

// const gridRef = useRef(Array.from({length: height}, ()=> Array(width).fill('rgba(25, 0, 255, 0)')));
//     console.log(gridRef.current)

//     return (
        // <div className={styles.gridContainer}>
        //     {grid.current.map((row, y)=> 
        //         <div className={styles.row} key={y}>
        //         {row.map((colColor, x)=> (
        //             <div 
        //                 className={styles.pixel}
        //                 key={x}
        //                 style={{ backgroundColor: colColor }}
        //             >{colColor}</div>
        //         ))}
        //         <br />
        //         </div>
        //     )}
        // </div>
//     )

export default Grid