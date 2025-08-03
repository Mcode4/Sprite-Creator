import { useState, useRef } from "react"
import styles from './Grid.module.css'

function Grid({ height, width }) {
    const gridRef = useRef(Array.from({length: height}, ()=> Array(width).fill('rgba(25, 0, 255, 0)')));
    console.log(gridRef.current)

    return (
        <div className={styles.gridContainer}>
            {gridRef.current.map((row, x)=> 
                <div className={styles.row}>
                {row.map((colColor, x)=> (
                    <div 
                        className={styles.pixel}
                        style={{backgroundColor: `${colColor}`}}
                    >{colColor}</div>
                ))}
                <br />
                </div>
            )}
        </div>
    )
}

export default Grid