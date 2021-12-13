import './headerButton.css'

export const HeaderButton = ({ title, onclick}) => {
  return (
      <button className={'headerButton'} onClick={onclick}>
        <span className={'headerButton__title'}>{title}</span>
        <i className={'headerButton__arrow'}>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.00072 5.17168L11.9507 0.22168L13.3647 1.63568L7.00072 7.99968L0.636719 1.63568L2.05072 0.22168L7.00072 5.17168Z"
              fill="white"
            />
          </svg>
        </i>
      </button>
  )
}