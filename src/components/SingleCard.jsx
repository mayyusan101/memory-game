import React from 'react'

function SingleCard({card, handleChoice, flipped, disabledClick}) {

    const handleClick = () => {
      if(!disabledClick){
        handleChoice(card);
      }
    }
  return (
    <div className='card' >
      <div className={flipped ? 'flipped' : ''}>
      <img src={card.src} alt="card" className={'front'}/>
      <img src='./img/cover.png' alt="card" className={'back'} onClick={handleClick} />
      </div>
    </div>
  )
}

export default SingleCard
