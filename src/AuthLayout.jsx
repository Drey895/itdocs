'use client'

import { useEffect, useState } from "react"
import AuthForm from "./AuthForm"
import RegForm from "./RegForm"

export function AuthLayout({children}) {
	const [current, setCurrent] = useState(true)
	const s = () => {
		setCurrent((c) => !c)
	}

	const [isRendered, setIsRendered] = useState(false);
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		if (localStorage.getItem('user'))
			setIsAuth(true)
		setIsRendered(true)
	}, []);

	if (!isRendered)
		return <></>
	if (isAuth)
		return children
	return current ? <AuthForm sw={s}/> : <RegForm sw={s}/>
}