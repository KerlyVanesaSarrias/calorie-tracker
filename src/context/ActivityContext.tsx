import { createContext, ReactNode, useMemo, useReducer } from "react";
import { acticityReducer, ActivityActions, ActivityState, initialState } from "../reducers/activity-reducer";
import { Activity } from "../types";
import { categories } from "../data/categories";



type ActivityProviderProps = {
    children:ReactNode
}

type ActivityContextProps = {
    state: ActivityState
    dispatch:  React.Dispatch<ActivityActions>
    caloriesConsumed: number
    caloriesBurned: number
    netCalories: number
    categoryName: (category: number) => string[]
    isEmtyActivities: boolean
}
export const ActivityContext = createContext<ActivityContextProps>(null!)



export const ActivityProvider = ({children}: ActivityProviderProps ) => {

    const [state, dispatch] = useReducer(acticityReducer, initialState)
        const caloriesConsumed = useMemo(() => state.activities.reduce((total, activity) => +activity.category === 1 ? total + +activity.calories : total, 0), [state.activities])
        const caloriesBurned = useMemo(() => state.activities.reduce((total, activity) => +activity.category === 2 ? total + +activity.calories : total, 0), [state.activities])
        const netCalories = useMemo(()=> caloriesConsumed - caloriesBurned, [state.activities])


            const categoryName = useMemo(() => (category: Activity['category']) => categories.map(categ => categ.id === category ? categ.name : ''), [state.activities])

            const isEmtyActivities = useMemo(() => state.activities.length === 0, [state.activities])

    return (
        <ActivityContext.Provider value={{
            state,
            dispatch,
            caloriesConsumed,
            caloriesBurned,
            netCalories,
            categoryName,
            isEmtyActivities


        }}>
            {children}
        </ActivityContext.Provider>
    )
}