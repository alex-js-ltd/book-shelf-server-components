'use client'

import {
	createContext,
	cloneElement,
	useContext,
	useState,
	ReactElement,
	ReactNode,
} from 'react'
import { callAll } from '@/app/utils/misc'
import { Dialog } from '@headlessui/react'
import { CircleButton } from './circle-button'

const ModalContext = createContext<
	{ isOpen: boolean; setIsOpen: Function } | undefined
>(undefined)

function Modal({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false)

	const value = { isOpen, setIsOpen }

	return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

function useModal() {
	const context = useContext(ModalContext)
	if (context === undefined) {
		throw new Error(`useModal must be used within a ModalContext provider`)
	}
	return context
}

function ModalDismissButton({ children: child }: { children: ReactElement }) {
	const { setIsOpen } = useModal()

	return cloneElement(child, {
		onClick: callAll(() => setIsOpen(false), child.props.onClick),
	})
}

function ModalOpenButton({ children: child }: { children: ReactElement }) {
	const { setIsOpen } = useModal()

	return cloneElement(child, {
		onClick: callAll(() => setIsOpen(true), child.props.onClick),
	})
}

function ModalContentsBase({ children }: { children: ReactNode }) {
	const { isOpen, setIsOpen } = useModal()

	const onClose = () => setIsOpen(false)

	return (
		<Dialog open={isOpen} onClose={onClose}>
			<div className="fixed inset-0 bg-black/30" aria-hidden="true" />

			{/* Full-screen container to center the panel */}
			<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
				{/* The actual dialog panel  */}
				<Dialog.Panel className="w-full max-w-[450px] bg-white rounded flex flex-col items-center p-4">
					{children}
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}

function ModalContents({
	title,
	children,
}: {
	title: string
	children: ReactElement
}) {
	return (
		<ModalContentsBase>
			<div className="flex justify-end w-full">
				<ModalDismissButton>
					<CircleButton>
						<span aria-hidden>×</span>
					</CircleButton>
				</ModalDismissButton>
			</div>
			<h3 className="text-center text-2xl">{title}</h3>
			{children}
		</ModalContentsBase>
	)
}

Modal.DismissButton = ModalDismissButton
Modal.OpenButton = ModalOpenButton
Modal.Contents = ModalContents

export { Modal }
