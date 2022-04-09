import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    photo: {
        width: 500,
        height: 400,
        overflow: "hidden",
        display: "inline",
        borderRadius: 25
    },
    img: {
        width: 500,
        height: 400,
        objectFit: "fill",
        borderRadius: 25
    }
}));

interface IPhotoProps {
    path: string
}

const Photo= (props: React.PropsWithChildren<IPhotoProps>) => {
    const { path } = props;
    const styles = useStyles();
    console.log(path);

    return (
        <div className={styles.photo}>
            <img className={styles.img} src={path} alt="this is an image" />
        </div>);
}

export default Photo;  