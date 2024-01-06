import * as React from 'react'

import { sessionOptions, type SessionData } from '@/app/utils/session'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function ({ children }: { children: React.ReactNode }) {
	const session = await getIronSession<SessionData>(cookies(), sessionOptions)

	if (!session.isLoggedIn) {
		redirect('/')
	}

	return <>{children}</>
}
