import { useState, useEffect, createContext, useContext } from "react";
import { useCookies } from "react-cookie";
import styles from './TopBarMenu.module.css';

export 
// Undo/Redo not working. When grid changes, the gridHistory length doesn't increase
// index increases and seems to be correct

function TopBarMenu({ grid, setGrid, gridHistory, setGridHistory, setRewriteGrid }) {
    const [cookies, setCookie, removeCookie] = useCookies(['grid']);
    const [index, setIndex] = useState(0);
    const [active, setActive] = useState(false);

    useEffect(()=> {
        const gridCopy = JSON.parse(JSON.stringify(grid));
        setGridHistory([gridCopy]);
    }, [])

    useEffect(()=> {
        if(active) {
            setGrid(gridHistory[index]);
            if(index !== 0) {
                const rewrite = []
                for(let i=index; i < gridHistory.length; i++) {
                    rewrite.push(gridHistory[i]);
                }
                console.log('REWRITE', rewrite);
                setRewriteGrid(rewrite);
            }
            setActive(false);
        }
    }, [index, active]);
    

    console.log('GRID HISTORY', gridHistory);
    console.log('GRID', grid);

    function handleUndo() {
        setActive(true);
        console.log('Undo clicked current index:', index, 'gridHistory length:', gridHistory.length);
        if(index < gridHistory.length - 1) {
            setIndex(i => i + 1);
        }
        console.log('INDEX AFTER', index)
    }

    function handleRedo() {
        setActive(true);
        console.log('Redo clicked current index:', index, 'gridHistory length:', gridHistory.length);
        if(index > 0) {
            setIndex(i => i - 1);
        }
    }

    function handleClear() {
        const defaultGrid = Array.from({length: grid.length}, ()=> Array(grid[0].length).fill('rgba(25, 0, 255, 0)'));
        setGrid(defaultGrid);
        setCookie('grid', defaultGrid, {maxAge: 14400});
    }

    return (
        <div className={styles.topBar}>
            <h2>Sprite Creator</h2>
            <button className={styles.topBarButton} onClick={()=> handleUndo()}
                style={index < gridHistory.length - 1 ? {color : 'green'} : {color : 'red'}}
            >
                Undo
            </button>
            <button className={styles.topBarButton} onClick={()=> handleRedo()}
                style={index > 0 ? {color : 'green'} : {color : 'red'}}
            >
                Redo
            </button>
            <button className={styles.topBarButton} onClick={handleClear}>
                Clear
            </button>
        </div>
    )
}

export default TopBarMenu