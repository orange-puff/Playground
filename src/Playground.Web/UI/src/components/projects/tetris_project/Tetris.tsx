import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    square: {
        height: "20px",
        width: "20px",
        border: "1px solid #999",
        float: "left"
    },
    row: {
        display: "table"
    }
}));

const Tetris = () => {
    const styles = useStyles();

    const rows: Array<number> = [];
    const cols: Array<number> = [];
    for (let i = 0; i < 20; i++) {
        rows.push(i);
    }
    for (let i = 0; i < 9; i++) {
        cols.push(i);
    }

    return (
        <div>
            {
                rows.map(i =>
                    <div className={styles.row} key={i}>
                        {cols.map(j =>
                            <div className={styles.square} key={j}>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    );
}

export default Tetris;