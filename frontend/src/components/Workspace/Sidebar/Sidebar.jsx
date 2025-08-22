import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Sidebar.module.css';
import paintBrushIcon from '../../../assets/paintbrush-solid-full.svg';
import eraserIcon from '../../../assets/eraser-solid-full.svg';

function Sidebar({ color, setColor }) {
    const [active, setActive] = useState('pixelbrush');
    // pixelBrush (color)
    // eraser

    function handleColorChange(e) {
        setColor(e.target.value);
    }

    function handleActiveChange(name) {
        const activeElements = document.querySelectorAll(`.active`);
        activeElements.forEach(el => {
            el.classList.remove('active');
            el.style.border = '';
        });

        const element = document.getElementById(name);
        element.classList.add('active');
        element.style.border = '1px solid red';
        setActive(name);
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.iconContainer} id='pixelbrush' onClick={()=> handleActiveChange('pixelbrush')}>
                <img src={paintBrushIcon} alt="Paintbrush" className={styles.icon} />
                <input type="color" id="pixelBrush" onChange={(e)=> handleColorChange(e)} />
            </div>
            <div className={styles.iconContainer} id='eraser' onClick={()=> handleActiveChange('eraser')}>
                <img src={eraserIcon} alt="Eraser" className={styles.icon} />
            </div>
        </div>
    )



}

export default Sidebar