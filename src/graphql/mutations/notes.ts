import gql from 'graphql-tag'

export const CREATE_NOTE = gql`
    mutation($body: Object!) {
        note(body: $body) @rest(type: "Note", path: "notes", method: "POST", bodyKey: "body") {
            id
            title
        }
    }
`

export const UPDATE_NOTE = gql`
    mutation($id: Number!, $body: Object!) {
        note(id: $id, body: $body)
            @rest(type: "Note", path: "notes/:id", method: "PUT", bodyKey: "body") {
            id
            title
        }
    }
`

export const DELETE_NOTE = gql`
    mutation($id: Number!) {
        note(id: $id) @rest(type: "Note", path: "notes/:id", method: "DELETE") {
            id
            title
        }
    }
`
