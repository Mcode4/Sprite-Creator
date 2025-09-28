import { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import styles from './TopBarMenu.module.css';
import * as bootstrap from 'bootstrap';
import ReactDOM from 'react-dom/client'


function TopBarMenu({ grid, setGrid, gridHistory, setGridHistory, rewriteGrid, setRewriteGrid, index, setIndex }) {
    const [cookies, setCookie, removeCookie] = useCookies(['grid']);
    const active = useRef(false);
    const popoverRef = useRef(null);

    useEffect(()=> {
        console.log('GRID COPY PUSHED')
        const gridCopy = JSON.parse(JSON.stringify(grid));
        setGridHistory([gridCopy]);
        setIndex(0);

        if(popoverRef.current) {
            const pop = new bootstrap.Popover(popoverRef.current, {
                content: 'placeholder',
                html: true,
                trigger: 'focus'
            });

            const onShow = ()=> {
                const tip = pop.getTipElement();
                const body = tip && tip.querySelector('.popover-body');
                if(!body) return;
                body.innerHTML = '';
                root = ReactDOM.createRoot(body);
                root.render(
                    <div>
                        Are you sure your want to make a new grid? 
                        <a href="#" onClick={handleReturn}>Yes</a>
                    </div>
                );
            }

            const onClose = ()=> {
                if(root) {
                    root.unmount();
                    root = null;
                }
            }

            popoverRef.current.addEventListener('show.bs.popover', onShow);

            return () => {
                popoverRef.current.removeEventListener('show.bs.popover', onClose);
                pop.dispose();
            }
        }
    }, []);

    useEffect(()=> {
        if(active.current !== false) {
            console.log('ACTIVE RAN')
            setGrid(gridHistory[index]);
            setCookie('grid', gridHistory[index], {maxAge: 14400});
            if(index !== 0) {
                const rewrite = []
                console.log(`BEFORE REWRITE INDEX:${index} GRINDLENGTH:${gridHistory.length} - 1`)
                for(let i = index; i < gridHistory.length; i++) {
                    console.log('REWRITE PUSHING INDEX:', i, 'GRINDLENGTH:', gridHistory.length, 'CURRENTGRID:', gridHistory[i])
                    rewrite.push(JSON.parse(JSON.stringify(gridHistory[i])));
                }
                console.log('REWRITE', rewrite);
                setRewriteGrid(rewrite);
            }
            active.current = false;
        }
    }, [index, active]);
    

    console.log('GRID HISTORY', gridHistory);
    console.log('GRID', grid);
    console.log('ACTIVE', active.current)
    console.log("INDEX", index)

    function handleUndo() {
        active.current = true;
        console.log('Undo clicked current index:', index, 'gridHistory length:', gridHistory.length);
        if(index < gridHistory.length - 1) {
            setIndex(i => i + 1);
        }
    }

    function handleRedo() {
        active.current = true;
        console.log('Redo clicked current index:', index, 'gridHistory length:', gridHistory.length);
        if(index > 0) {
            setIndex(i => i - 1);
        }
    }

    function handleClear() {
        if(index === 0 && rewriteGrid.length === 0) return
        const defaultGrid = Array.from({length: grid.length}, ()=> Array(grid[0].length).fill('rgba(25, 0, 255, 0)'));
        setGrid(defaultGrid);
        setCookie('grid', defaultGrid, {maxAge: 14400});

        if(rewriteGrid.length > 0) {
            setIndex(0);
            active.current = true;
            setGridHistory([defaultGrid, ...rewriteGrid]);
        } else {
            setGridHistory(g => [defaultGrid, ...g]);
        }
    }

    function handleReturn() {
        removeCookie('grid');
    }

    return (
        <div className={styles.topBar}>
            <button className="btn" 
                ref={popoverRef}
                data-bs-container="body" 
                data-bs-toggle="popover" 
                data-bs-placement="right"
                data-bs-content="right div"
            >
                <h2>Sprite Creator</h2>
            </button>
            { index < gridHistory.length - 1 ? (
                    <button className={`${styles.topBarButton} btn btn-primary`} onClick={()=> handleUndo()}>
                        Undo
                    </button>
                ) : (
                    <button className={`${styles.topBarButton} btn btn-primary`} disabled>
                        Undo
                    </button>
                )
            }

            { index > 0 ? (
                <button className={`${styles.topBarButton} btn btn-primary`} onClick={()=> handleRedo()}>
                    Redo
                </button>
            ) : (
                <button className={`${styles.topBarButton} btn btn-primary`} disabled>
                    Redo
                </button>
            )}
            
            <button className={`${styles.topBarButton} btn btn-danger`} onClick={handleClear}>
                Clear
            </button>
        </div>
    )
}

export default TopBarMenu