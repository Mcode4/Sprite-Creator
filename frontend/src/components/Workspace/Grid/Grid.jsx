import { useState } from "react"
import { useCookies } from 'react-cookie'
import styles from './Grid.module.css'

function Grid({ color, setColor, eraser, eyeDropper, fillBucket }) {
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
        } else if(eyeDropper) {
            const pixelColor = grid[y][x];
            setColor(pixelColor);
        } 
        else if(fillBucket) {
            // console.log('Current', x, y);
            const space = [[y, x]];

            while(space.length) {
                let [row, col] = space.shift();
                
                if(newGrid[row][col] === color) continue;

                newGrid[row][col] = color;

                if(row > 0 && newGrid[row-1][col] !== color) {
                    console.log('UP RAN', [row-1, col])
                    space.push([row-1, col]);
                }
                if(row < newGrid.length - 1 && newGrid[row+1][col] !== color) {
                    console.log('DOWN RAN', [row+1, col[1]])
                    space.push([row+1, col]);
                }
                if(col > 0 && newGrid[row][col-1] !== color) {
                    console.log('LEFT RAN', [row, col-1])
                    space.push([row, col-1]);
                }
                if(col < newGrid[0].length - 1 && newGrid[row][col+1] !== color) {
                    console.log('RIGHT RAN', [row, col+1])
                    space.push([row, col+1]);
                }
            }
            setGrid(newGrid);
            setCookie('grid', grid, {maxAge: 14400});
        } 
        else {
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

export default Grid