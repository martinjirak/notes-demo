/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useQuery } from '@apollo/react-hooks'
import { QueryData } from 'components/NoteList'
import { GET_NOTES } from '../graphql/queries/notes'

export const useGetNotes = () => {
    const { loading, error, data, refetch } = useQuery<QueryData>(GET_NOTES)

    return { loading, error, data, refetch }
}
