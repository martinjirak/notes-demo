import * as React from 'react'
import { createMount } from '@material-ui/core/test-utils'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../config/tests/i18n/index'
import { AlertDialog, AlertDialogProps } from '../'

describe('AlertDialog should match Snapshot', () => {
    it('without hint', () => {
        const props: AlertDialogProps = {
            onAgree: jest.fn(),
            onClose: jest.fn(),
            text: 'Alert text',
        }

        const renderedValue = createMount()(
            <I18nextProvider i18n={i18n}>
                <AlertDialog {...props} />
            </I18nextProvider>
        )
        expect(renderedValue.html()).toMatchSnapshot()
    })
})
