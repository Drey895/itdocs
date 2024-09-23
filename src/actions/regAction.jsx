'use server'

import { insertUser } from "@/quieries/insertUser";

export async function regAction(prevState, formData) {
	const user = {
		username: formData.get('username').trim(),
		password: formData.get('password').trim(),
		role: 'user',
	}

	if (user.username.indexOf(" ") !== -1 || user.password.indexOf(" ") !== -1)
		return {error: "Символы не поддерживаются"}

	try {
		const res = await insertUser(user)
		return {data: res}
	} catch (e) {
		return {error: "Ошибка регистрации"}
	}

}