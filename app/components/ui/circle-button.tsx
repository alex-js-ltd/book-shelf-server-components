import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/app/utils/misc'

const circleButtonVariants = cva(
	'rounded-full leading-10 flex items-center justify-center bg-base text-text border border-gray-10 cursor-pointer bg-white text-gray-400',
	{
		variants: {
			variant: {
				default: 'hover:text-gray-400',
				blue: 'hover:text-blue-400',
				red: 'hover:text-red-400',
				green: 'hover:text-green-400',

				yellow: 'hover:text-yellow-400',
			},
			size: {
				default: 'w-10 h-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof circleButtonVariants> {
	asChild?: boolean
}

const CircleButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(circleButtonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	},
)
CircleButton.displayName = 'Button'

export { CircleButton, circleButtonVariants }
