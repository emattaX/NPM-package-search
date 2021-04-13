import axios from 'axios'
//Type definition for the dispatch function
import { Dispatch } from 'redux'
import { ActionType } from "../action-types"
import { Action } from "../actions"

// Start creating our action creators
export const searchRepositories = (term: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SEARCH_REPOSITORIES
        })

        try {
            //Add request
            const { data } = await axios.get('https://registry.npmjs.org/-/v1/search',
                                            {params: {
                                                text: term}
                                            })
            //Get something out of those { data }
            const names = data.objects.map((result: any) => {
                            return result.package.name
                        }) 
                        
            dispatch({
                type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
                payload: names
            })

        } catch (error) {
            dispatch({
                type: ActionType.SEARCH_REPOSITORIES_ERROR,
                payload: error.message
            })
        }
    }
}
