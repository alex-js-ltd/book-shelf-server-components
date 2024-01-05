import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, type SessionData } from '@/app/utils/auth'

export async function middleware(req: NextRequest) {
	const res = NextResponse.next()
	const session: SessionData = await getIronSession(req, res, sessionOptions)

	// do anything with session here:
	const { isLoggedIn, username } = session

	console.log('from middleware', { username })

	if (!isLoggedIn) {
		return NextResponse.redirect(new URL('/', req.url))
	}

	return res
}

export const config = {
	matcher: [
		'/home/discover:path*',
		'/home/book:path*',
		'/home/reading-list:path*',
		'/home/finished:path*',
	],
}
