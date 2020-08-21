import { loremIpsum } from 'constants/loremIpsum'
import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Modal } from 'components/Modal'
import { NoteDetail } from 'components/NoteDetail'
import { useGetNotes } from 'hooks/useGetNotes'
import { useTranslation } from 'react-i18next'
import { Menu } from '../Menu'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
    })
)

export const Header: React.FC = () => {
    const { t } = useTranslation()
    const classes = useStyles()
    const { refetch } = useGetNotes()
    const [newNoteIsVisible, setNewNoteIsVisible] = useState(false)

    const handleNewClick = () => {
        setNewNoteIsVisible(true)
    }

    const handleModalClose = () => {
        setNewNoteIsVisible(false)
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Menu className={classes.menuButton} />
                    <Typography variant="h6" className={classes.title}>
                        {t('notes')}
                    </Typography>
                    <Button color="inherit" variant="outlined" onClick={handleNewClick}>
                        {t('new-note')}
                    </Button>
                </Toolbar>
            </AppBar>
            {newNoteIsVisible && (
                <Modal onClose={handleModalClose}>
                    <NoteDetail editable isNew refetch={refetch} onClose={handleModalClose}>
                        {loremIpsum}
                    </NoteDetail>
                </Modal>
            )}
        </>
    )
}
