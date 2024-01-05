'use client'
import * as React from 'react'
import { Modal } from './components/ui/modal'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { FormGroup } from './components/ui/form-group'
import { login } from './utils/actions'

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center w-full h-screen">
			<div className="grid grid-cols-2 gap-3">
				<Modal>
					<Modal.OpenButton>
						<Button variant="primary">Login</Button>
					</Modal.OpenButton>
					<Modal.Contents title="Login">
						<LoginForm
							action={login}
							submitButton={<Button variant="primary">Login</Button>}
						/>
					</Modal.Contents>
				</Modal>

				<Modal>
					<Modal.OpenButton>
						<Button variant="secondary">Register</Button>
					</Modal.OpenButton>
					<Modal.Contents title="Register">
						<>div</>
					</Modal.Contents>
				</Modal>
			</div>
		</div>
	)
}

interface LoginFormProps {
	action: (formData: FormData) => Promise<void>
	submitButton: React.ReactElement
}

function LoginForm({ action, submitButton }: LoginFormProps) {
	return (
		<form
			action={action}
			className="flex flex-col items-stretch w-full max-w-xs"
		>
			<FormGroup>
				<label htmlFor="email">Email</label>
				<Input id="email" />
			</FormGroup>
			<FormGroup>
				<label htmlFor="password">Password</label>
				<Input id="password" type="password" />
			</FormGroup>
			<div>
				{React.cloneElement(submitButton, {
					type: 'submit',
				})}
			</div>
		</form>
	)
}
