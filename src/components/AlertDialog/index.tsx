import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { useTranslation } from 'react-i18next'

export interface AlertDialogProps {
    onClose: () => void
    onAgree: () => void
    text: string
}

export const AlertDialog: React.FC<AlertDialogProps> = ({ text, onClose, onAgree }) => {
    const { t } = useTranslation()
    return (
        <Dialog open={true} onClose={onClose}>
            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onAgree} variant="outlined" color="primary">
                    {t('yes')}
                </Button>
                <Button onClick={onClose} variant="outlined" color="secondary">
                    {t('no')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
