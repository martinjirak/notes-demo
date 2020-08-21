import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1),
            height: theme.spacing(26),
            padding: theme.spacing(1),
        },
        header: {
            marginBottom: theme.spacing(2),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        body: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '-webkit-line-clamp': 6,
            '-webkit-box-orient': 'vertical',
            display: '-webkit-box',
            height: theme.spacing(18),
            cursor: 'pointer',
        },
        title: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
        buttons: {
            width: theme.spacing(12),
            display: 'inline-flex',
        },
    })
)

interface NoteItemProps {
    header?: React.ReactElement | string
    children?: React.ReactElement | string
    id?: number
    onClick?: (id?: number) => void
    onDeleteClick?: (id?: number) => void
    onEditClick?: (id?: number) => void
}

export const NoteItem: React.FC<NoteItemProps> = ({
    header,
    children,
    id,
    onClick,
    onDeleteClick,
    onEditClick,
}) => {
    const classes = useStyles()

    return (
        <>
            <Paper elevation={3} className={classes.root}>
                <div className={classes.header}>
                    <Typography color="primary" className={classes.title}>
                        {header}
                    </Typography>
                    <div className={classes.buttons}>
                        <IconButton onClick={() => (onEditClick ? onEditClick(id) : null)}>
                            <EditIcon fontSize="small" color="primary" />
                        </IconButton>
                        <IconButton onClick={() => (onDeleteClick ? onDeleteClick(id) : null)}>
                            <DeleteIcon fontSize="small" color="secondary" />
                        </IconButton>
                    </div>
                </div>
                <Typography className={classes.body} onClick={() => (onClick ? onClick(id) : null)}>
                    {children}
                </Typography>
            </Paper>
        </>
    )
}
