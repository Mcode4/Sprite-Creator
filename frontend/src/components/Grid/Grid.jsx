import { useEffect } from "react"
import { useCookies } from 'react-cookie'
import styles from './Grid.module.css'

function Grid({ 
    grid, setGrid, 
    color, setColor, 
    eraser, eyeDropper, fillBucket, 
    gridHistory, setGridHistory, 
    rewriteGrid, setIndex
}) {
    const [cookies, setCookie, removeCookie] = useCookies(['grid']);
    
    useEffect(()=> {
        console.log('GRID CHANGED')
    }, [grid])

    // function to handle grid changing color
    function handleGridChange(x, y) {
        console.log("GRID", x, y, color);
        const newGrid = grid;
        console.log(`EYEDROPPER: ${eyeDropper}, ERASER: ${eraser}`)

        if(grid[y][x] === color) {
            return
        }
        
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
                    space.push([row-1, col]);
                }
                if(row < newGrid.length - 1 && newGrid[row+1][col] !== color) {
                    space.push([row+1, col]);
                }
                if(col > 0 && newGrid[row][col-1] !== color) {
                    space.push([row, col-1]);
                }
                if(col < newGrid[0].length - 1 && newGrid[row][col+1] !== color) {
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
        const gridCopy = JSON.parse(JSON.stringify(newGrid));

        if(rewriteGrid.length > 0) {
            setIndex(0);
            const solidGrid = [gridCopy, ...rewriteGrid]
            console.log("REWRITE HAPPENING GRIDCOPY:", gridCopy, "REWRITE:", rewriteGrid, "SOLID GRID", solidGrid)
            setGridHistory(solidGrid);
        } else {
            console.log("GRID HISTORY PUSH HAPPENNING GRIDCOPY:", gridCopy, "GRID HISTORY:", gridHistory)
            setGridHistory(g => [ gridCopy, ...g]);
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
                </div>
            )}
        </div>
    )
}

export default Grid