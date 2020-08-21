import React from 'react'
import MuiModal from '@material-ui/core/Modal'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export interface ModalProps {
    onClose: () => void
    children: React.ReactElement | null
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(1),
            top: '50%',
            left: '50%',
            transform: `translate(-${50}%, -${50}%)`,
            '&:focus': {
                outline: 'none',
            },
        },
    })
)

export const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    const classes = useStyles()

    return (
        <MuiModal open={true} onClose={onClose}>
            <div className={classes.paper}>{children}</div>
        </MuiModal>
    )
}
