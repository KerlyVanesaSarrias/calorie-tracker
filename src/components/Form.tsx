import { FormEvent, useEffect, useState } from "react"
import {v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categories"
import { Activity } from "../types"
import { useActivity } from "../hooks/useActivity"



const initialState: Activity = {
    id: uuidv4(),
    name: "",
    category: 1,
    calories: 0
}
const Form = () => {



    const [activity, setActivity] = useState<Activity>(initialState)

    const {state, dispatch} = useActivity()

    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectedActivity)
        }
    }, [state.activeId])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        setActivity({
            ...activity,
            [e.target.id]: e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'save-activity', payload: { newActivity: activity } })
        setActivity({ ...initialState, id: uuidv4() })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5 bg-white shadow p-10 rounded-lg">
            <div className="grid grid-cols-1 gap-3">
                <label className="font-bold" htmlFor="category">Categoria:</label>
                <select className="border border-slate-300 p-2 rounded-lg w-full bg-white" name="" id="category" value={activity.category} onChange={handleChange}>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label className="font-bold" htmlFor="name">Actividad:</label>
                <input id="name" type="text" placeholder="Ej. comida, jugo de naranja, ensalada, ejercicio, pesas, bicicleta" value={activity.name} onChange={handleChange} className="border border-slate-300 p-2 rounded-lg w-full bg-white">
                </input>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label className="font-bold" htmlFor="calories">Calorias:</label>
                <input id="calories" type="number" placeholder="Calorias. ej. 300 o 500" value={activity.calories} onChange={handleChange} className="border border-slate-300 p-2 rounded-lg w-full bg-white">
                </input>
            </div>

            <input type="submit" value={activity.category === 1 ? 'Guardar comida' : 'Guardar Ejercicio'} disabled={!isValidActivity()} className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10" />


        </form>
    )
}

export default Form