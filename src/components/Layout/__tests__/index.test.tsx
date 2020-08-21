import * as React from 'react'
import { createMount } from '@material-ui/core/test-utils'
import { I18nextProvider } from 'react-i18next'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { RestLink } from 'apollo-link-rest'
import { Layout } from '../'
import i18n from '../../../config/tests/i18n/index'

const restLink = new RestLink({ uri: 'http://private-9aad-note10.apiary-mock.com/' })

const client = new ApolloClient({
    link: restLink,
    cache: new InMemoryCache(),
})

describe('Layout should match Snapshot', () => {
    it('without hint', () => {
        const renderedValue = createMount()(
            <ApolloProvider client={client}>
                <I18nextProvider i18n={i18n}>
                    <Layout>
                        <div>Layout children</div>
                    </Layout>
                </I18nextProvider>
            </ApolloProvider>
        )
        expect(renderedValue.html()).toMatchSnapshot()
    })
})
