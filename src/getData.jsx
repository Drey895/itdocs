'use server'

import { redirect } from "next/navigation"
import { sql } from "./database"

export async function getData(formdata) {

    const user = {
        name: formdata.get('name'),
        password: formdata.get('password')
    }
    console.log(user)
    const query = await sql`
    insert into users ${
        sql(user, 'name', 'password')
    }`
    console.log(query)
}