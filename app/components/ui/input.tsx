import * as React from 'react'

import { cn } from '@/app/utils/misc'

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'border border-gray-300 bg-gray-100 p-2 rounded-md w-full text-gray-600 focus:outline-none focus:ring-0 focus:border-blue-400',
					className,
				)}
				ref={ref}
				{...props}
			/>
		)
	},
)
Input.displayName = 'Input'

export { Input }
