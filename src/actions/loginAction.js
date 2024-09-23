'use server'

import { selectUser } from "@/quieries/selectUser";

export async function loginAction(prevState, formData) {
	console.log(formData)
	try {
		const res = await selectUser(formData.get('username').trim())
		if (res[0].password === formData.get('password').trim())
			return {data: res}
		return {error: "Ошибка авторизации"}
	} catch (e) {
		return {error: "Ошибка авторизации"}
	}
}