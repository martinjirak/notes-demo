import gql from 'graphql-tag'

export const GET_NOTES = gql`
    query {
        notes @rest(type: "[Note]", path: "notes") {
            id
            title
        }
    }
`

export const GET_NOTE = gql`
    query($id: Number!) {
        note(id: $id) @rest(type: "Note", path: "notes/:id") {
            id
            title
        }
    }
`
