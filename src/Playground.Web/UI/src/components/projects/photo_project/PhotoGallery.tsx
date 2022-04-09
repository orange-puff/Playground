import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Photo from './Photo';
import pic1 from './photo_gallery/pic1.jpg';
import pic2 from './photo_gallery/pic2.jpg';
import pic3 from './photo_gallery/pic3.jpg';
import pic4 from './photo_gallery/pic4.jpg';

const useStyles = makeStyles((theme) => ({
    box: {
        textAlign: "center",
        marginTop: 75,
    },
    button: {
        display: "inline",
        position: "absolute",
        marginTop: 200,
        marginLeft: 5
    }
}));

const PhotoGallery = () => {
    const styles = useStyles();
    const imagePaths = [pic1, pic2, pic3, pic4];
    const [picInd, setPicInd] = useState<number>(0);

    useEffect(() => {
        setInterval(() => {
            setPicInd((oldPicInd: number) => {
                return (oldPicInd + 1) % imagePaths.length;
            })
        }, 5000);
    }, []);

    function updateInd(inc: number) {
        let newInd: number = (picInd + inc) % imagePaths.length;
        if (newInd < 0) {
            newInd = imagePaths.length - 1;
        }
        
        setPicInd(newInd);
    }

    return (
        <div className={styles.box}>
            <Photo path={imagePaths[picInd]}></Photo>
            <div className={styles.button}>
                <ArrowBackIosIcon onClick={() => updateInd(-1)}/>
                <ArrowForwardIosIcon onClick={() => updateInd(1)}/>
            </div>
        </div>);
}

export default PhotoGallery;  