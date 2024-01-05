'use server'

import { SessionData } from './auth'
import { defaultSession, sessionOptions, sleep } from './auth'
import { getIronSession, IronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getSession(shouldSleep = true) {
	const session = await getIronSession<SessionData>(cookies(), sessionOptions)

	if (!session.isLoggedIn) {
		session.isLoggedIn = defaultSession.isLoggedIn
		session.username = defaultSession.username
	}

	if (shouldSleep) {
		// simulate looking up the user in db
		await sleep(250)
	}

	return session
}

export async function logout() {
	'use server'

	// false => no db call for logout
	const session = await getSession(false)
	session.destroy()
	revalidatePath('/app-router-server-component-and-action')
}

export async function login(formData: FormData) {
	'use server'

	const session = await getSession()

	session.username = (formData.get('email') as string) ?? 'No username'
	session.isLoggedIn = true
	await session.save()
	revalidatePath('/')
	redirect('/home/discover')
}
