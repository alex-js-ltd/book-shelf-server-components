import * as React from 'react'

import { cn } from '@/app/utils/misc'

export interface FormGroupProps
	extends React.InputHTMLAttributes<HTMLDivElement> {}

const FormGroup = React.forwardRef<HTMLInputElement, FormGroupProps>(
	({ className, ...props }, ref) => {
		return (
			<div
				className={cn('flex flex-col w-full my-2', className)}
				ref={ref}
				{...props}
			/>
		)
	},
)
FormGroup.displayName = 'FormGroup'

export { FormGroup }
