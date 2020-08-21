import React, { Suspense } from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { RestLink } from 'apollo-link-rest'
import { Layout } from 'components/Layout'
import { NoteList } from 'components/NoteList'
import CircularProgress from '@material-ui/core/CircularProgress'

const restLink = new RestLink({ uri: 'http://private-9aad-note10.apiary-mock.com/' })

const client = new ApolloClient({
    link: restLink,
    cache: new InMemoryCache(),
})

export const App: React.FC = () => (
    <Suspense fallback={<CircularProgress disableShrink />}>
        <ApolloProvider client={client}>
            <Layout>
                <NoteList />
            </Layout>
        </ApolloProvider>
    </Suspense>
)
