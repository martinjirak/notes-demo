import * as React from 'react'
import { createMount } from '@material-ui/core/test-utils'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../config/tests/i18n/index'
import { NoteItem } from '../'

describe('NoteItem should match Snapshot', () => {
    it('without hint', () => {
        const renderedValue = createMount()(
            <I18nextProvider i18n={i18n}>
                <NoteItem />
            </I18nextProvider>
        )
        expect(renderedValue.html()).toMatchSnapshot()
    })
})
