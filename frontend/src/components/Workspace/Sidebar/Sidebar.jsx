import { useState, useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Sidebar.module.css';
import paintBrushIcon from '../../../assets/paintbrush-solid-full.svg';
import eraserIcon from '../../../assets/eraser-solid-full.svg';
import eyeDropperIcon from '../../../assets/eye-dropper-solid-full.svg';
import fillBucketIcon from '../../../assets/fill-drip-solid-full.svg';

function Sidebar({ color, setColor, setEraser, setEyeDropper, setFillBucket }) {
    const [active, setActive] = useState('pixelbrush');
    // pixelBrush (color)
    // eraser
    useEffect(()=> {
        handleActiveChange(active);
    }, []);

    useEffect(()=> {
        console.log('ACTIVE CHANGE:', active)
        setEraser(false);
        setEyeDropper(false);
        setFillBucket(false);

        if(active === 'eraser') {
            setEraser(true);
        } 
        if(active === 'eyedropper') {
            setEyeDropper(true);
        }
        if(active === 'fillbucket') {
            setFillBucket(true);
        }
    }, [active])

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
                <img src={paintBrushIcon} alt="Paint Brush" className={styles.icon} />
                <input type="color" id="pixelBrush" onChange={(e)=> handleColorChange(e)} value={color} />
            </div>
            <div className={styles.iconContainer} id='eraser' onClick={()=> handleActiveChange('eraser')}>
                <img src={eraserIcon} alt="Eraser" className={styles.icon} />
            </div>
            <div className={styles.iconContainer} id='eyedropper' onClick={()=> handleActiveChange('eyedropper')}>
                <img src={eyeDropperIcon} alt="Eye Dropper" className={styles.icon} />
            </div>
            <div className={styles.iconContainer} id='fillbucket' onClick={()=> handleActiveChange('fillbucket')}>
                <img src={fillBucketIcon} alt="Fill Bucket" className={styles.icon} />
            </div>
        </div>
    )



}

export default Sidebar