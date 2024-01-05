import { logout } from '@/app/utils/actions'
import { SubmitButton } from '@/app/components/ui/submit-button'
export default function DiscoverBooksScreen() {
	return (
		<>
			discover
			<LogoutButton />
		</>
	)
}

function LogoutButton() {
	return (
		<form action={logout}>
			<div>
				<SubmitButton value="Logout" />
			</div>
		</form>
	)
}
