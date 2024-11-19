import { useState } from 'react'
import styles from './app.module.css'
import data from './data.json'

export const App = () => {
	const [steps] = useState(data)
	const [activeIndex, setActiveIndex] = useState(0)

	const onClickBack = () => {
		if (activeIndex > 0) {
			setActiveIndex((a) => a - 1)
		}
	}
	const onClickForward = () => {
		setActiveIndex((a) => a + 1)
	}
	const onClickTryAgain = () => {
		setActiveIndex(0)
	}

	const isLastStep = activeIndex === steps.length - 1
	const isFirstStep = activeIndex == 0

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map(({ id, title }, index) => (
							<li
								className={
									styles['steps-item'] +
									(index === activeIndex ? `${styles.active}` : '') +
									(index > activeIndex ? `${styles.done}` : '')
								}
								key={id}
							>
								<button
									className={styles['steps-item-button']}
									onClick={() => {
										setActiveIndex(index)
									}}
								>
									{index + 1}
								</button>{' '}
								{title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={onClickBack}
							disabled={isFirstStep}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={() =>
								isLastStep ? onClickTryAgain() : onClickForward()
							}
						>
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
