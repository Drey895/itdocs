'use client'

import { useState } from "react"
import AuthForm from "./AuthForm"
import RegForm from "./RegForm"

export function AuthSwitch(){
    const [current, setCurrent] = useState(true)
    const s = () => {
        setCurrent((c) => !c)
    }
    return current? <AuthForm sw={s} /> : <RegForm sw={s}/>
}