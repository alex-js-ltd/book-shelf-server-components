'use client'

import { useFormStatus } from 'react-dom'
import { Button, type ButtonProps } from './button'

export function SubmitButton(props: ButtonProps) {
	const { pending } = useFormStatus()

	const { value } = props

	return (
		<Button
			{...props}
			value={pending ? 'Loading…' : value}
			type="submit"
			disabled={pending}
		/>
	)
}
