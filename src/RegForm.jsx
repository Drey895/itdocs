'use client'

import { useRef } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { Input } from './components/Input';
import { regAction } from '@/actions/regAction';

const RegForm = ({sw}) => {
	const [state, action] = useFormState(regAction, null)
	const {
		register,
	} = useForm();

	const pwdRef = useRef(null)
	const {ref, ...rest} = register("password")

	if (state?.data) {
		localStorage.setItem('user', JSON.stringify(state.data))
		window.location.reload()
	}

	return (
		<div>
			<h2 className="text-2xl text-center">{'Система регистрации'}</h2>
			<form action={action} className={"w-[300px]"}>
				{(
					<div className="flex flex-col gap-2.5 py-5">
						<label htmlFor="username">Логин:</label>
						<Input s={register("username", {required: true})}/>
						<label htmlFor="password">Пароль:</label>
						<Input s={{...rest, ref: pwdRef, type: "password", required: true}}/>
						{state?.error !== null &&
							<div className="text-red-500">
								{state?.error}
							</div>}
					</div>
				)}
				<div className="flex flex-col gap-2 items-center">
					<button type="submit"
					        className=" py-2 px-5 bg-green-200 rounded hover:bg-green-300 transition ease-in-out">{'Регистрация'}</button>
					<button type="button"
					        className="py-2 px-5 bg-red-200 rounded hover:bg-red-300 transition ease-in-out"
					        onClick={sw}>{'Назад'}</button>
				</div>
			</form>
		</div>
	);
};

export default RegForm;