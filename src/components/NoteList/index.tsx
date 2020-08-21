import { loremIpsum } from 'constants/loremIpsum'
import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Note } from 'src/types'
import Grid from '@material-ui/core/Grid'
import { Modal } from 'components/Modal'
import { AlertDialog } from 'components/AlertDialog'
import { NoteDetail } from 'components/NoteDetail'
import { NoteItem } from 'components/NoteItem'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useGetNotes } from 'hooks/useGetNotes'
import { useTranslation } from 'react-i18next'
import { DELETE_NOTE } from '../../graphql/mutations/notes'

export type QueryData = {
    notes: Note[]
}

export const NoteList: React.FC = () => {
    const { t } = useTranslation()
    const { loading, error, data, refetch } = useGetNotes()
    const [deleteNote] = useMutation(DELETE_NOTE)
    const [selectedNoteId, setSelectedNoteId] = useState<number | undefined>(undefined)
    const [editMode, setEditMode] = useState(false)
    const [alertIsVisible, setAlertIsVisible] = useState(false)
    const [detailIsVisible, setDetailIsVisible] = useState(false)
    const hadleOnNoteItemClick = (id?: number) => {
        id && setSelectedNoteId(id)
        setDetailIsVisible(true)
    }

    const handleModalClose = () => {
        setSelectedNoteId(undefined)
        setEditMode(false)
        setDetailIsVisible(false)
    }

    const handleOnEditClick = (id?: number) => {
        id && setSelectedNoteId(id)
        setDetailIsVisible(true)
        setEditMode(true)
    }

    const handleOnDeleteClick = (id?: number) => {
        id && setSelectedNoteId(id)
        setAlertIsVisible(true)
    }

    const handleDeleteNote = async () => {
        const { errors } = await deleteNote({ variables: { id: selectedNoteId } })
        if (errors) {
            setAlertIsVisible(true)
            // TODO: change alert text
        } else {
            setSelectedNoteId(undefined)
            setAlertIsVisible(false)
            refetch()
        }
    }
    const handleAlertClose = () => {
        setSelectedNoteId(undefined)
        setAlertIsVisible(false)
    }

    const getItems = () => {
        if (loading) {
            return (
                <Grid item xs={12} sm={9} md={6} lg={3}>
                    <CircularProgress disableShrink />
                </Grid>
            )
        } else if (error) {
            return (
                <Grid item xs={12} sm={9} md={6} lg={3}>
                    <NoteItem header="Error">{error.message}</NoteItem>
                </Grid>
            )
        } else if (data) {
            return data.notes.map((note: Note, key: number) => {
                return (
                    <Grid item xs={12} sm={9} md={6} lg={3} key={key}>
                        <NoteItem
                            header={note.title}
                            id={note.id}
                            onClick={hadleOnNoteItemClick}
                            onEditClick={handleOnEditClick}
                            onDeleteClick={handleOnDeleteClick}
                        >
                            {loremIpsum}
                        </NoteItem>
                    </Grid>
                )
            })
        }
    }

    const emptyNote: Note = {
        id: undefined,
        title: undefined,
    }

    const getNote = (data?: QueryData, id?: number) => {
        if (data) {
            const note = data.notes.find((note: Note) => {
                return note.id === id
            })
            return note || emptyNote
        }
        return emptyNote
    }

    return (
        <>
            <Grid container>{getItems()}</Grid>
            {detailIsVisible && (
                <Modal onClose={handleModalClose}>
                    <NoteDetail
                        note={getNote(data, selectedNoteId)}
                        editable={editMode}
                        id={selectedNoteId}
                        refetch={refetch}
                        onClose={handleModalClose}
                    >
                        {loremIpsum}
                    </NoteDetail>
                </Modal>
            )}
            {alertIsVisible && (
                <AlertDialog
                    text={t('delete-message', { title: getNote(data, selectedNoteId).title })}
                    onClose={handleAlertClose}
                    onAgree={handleDeleteNote}
                />
            )}
        </>
    )
}
