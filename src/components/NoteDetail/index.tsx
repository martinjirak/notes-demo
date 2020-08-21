import { loremIpsum } from 'constants/loremIpsum'
import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { Note } from 'types/index'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { useMutation } from '@apollo/react-hooks'
import { ApolloQueryResult } from 'apollo-client'
import { QueryData } from 'components/NoteList'
import { useTranslation } from 'react-i18next'
import { UPDATE_NOTE, CREATE_NOTE } from '../../graphql/mutations/notes'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1),
            padding: theme.spacing(1),
            width: 600,
        },
        header: {
            marginBottom: theme.spacing(2),
            display: 'flex',
            alignItems: 'center',
        },
        title: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
        body: {
            height: 300,
            width: '100%',
            overflow: 'auto',
        },
        buttons: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(1, 3, 0, 0),
            marginTop: theme.spacing(2),
            '& button': {
                marginLeft: theme.spacing(1),
            },
        },
    })
)

interface NoteDetailProps {
    note?: Note
    children?: React.ReactElement | string
    id?: number
    editable?: boolean
    isNew?: boolean
    refetch?: (variables?: Record<string, any> | undefined) => Promise<ApolloQueryResult<QueryData>>
    onClose?: () => void
}

export const NoteDetail: React.FC<NoteDetailProps> = ({
    note,
    children,
    id,
    editable,
    isNew,
    refetch,
    onClose,
}) => {
    const { t } = useTranslation()
    const classes = useStyles()
    const [updateNote] = useMutation(UPDATE_NOTE)
    const [createNote] = useMutation(CREATE_NOTE)
    const [editMode, setEditMode] = useState(false)

    const handleSubmit = async (
        values: Partial<Note>,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const { errors } = await (isNew ? createNote : updateNote)({
            variables: { id, body: { title: values.title } },
        })
        if (errors) {
            // TODO: handle error
        } else {
            refetch && refetch()
            setSubmitting(false)
            onClose && onClose()
        }
    }

    const handleEditClick = () => {
        setEditMode(true)
    }

    const readOnlyBody = (
        <>
            <div className={classes.header}>
                <Typography color="primary" className={classes.title}>
                    {note && note.title}
                </Typography>
            </div>
            <Typography className={classes.body}>{children}</Typography>
            <div className={classes.buttons}>
                <Button variant="outlined" color="primary" onClick={handleEditClick}>
                    {t('edit')}
                </Button>
                <Button variant="outlined" color="secondary" onClick={onClose}>
                    {t('close')}
                </Button>
            </div>
        </>
    )

    const formBody = (
        <Formik
            initialValues={{
                title: note ? note.title : '',
                text: loremIpsum,
            }}
            validate={(values) => {
                const errors: Partial<Note> = {}
                if (!values.title) {
                    errors.title = 'Required'
                }
                if (!values.text) {
                    errors.text = 'Required'
                }
                return errors
            }}
            onSubmit={async (values, { setSubmitting }) => {
                handleSubmit(values, setSubmitting)
            }}
        >
            {({ submitForm, isSubmitting }) => (
                <Form>
                    <div className={classes.header}>
                        <Field
                            component={TextField}
                            name="title"
                            type="text"
                            label="Title"
                            fullWidth
                        />
                    </div>
                    <Field
                        component={TextField}
                        type="text"
                        label="Note"
                        name="text"
                        multiline
                        fullWidth
                        className={classes.body}
                    />

                    <div className={classes.buttons}>
                        <Button
                            variant="outlined"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                        >
                            {t('save')}
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            disabled={isSubmitting}
                            onClick={onClose}
                        >
                            {t('close')}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )

    return <div className={classes.root}>{editable || editMode ? formBody : readOnlyBody}</div>
}
