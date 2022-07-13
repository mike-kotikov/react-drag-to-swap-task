import { useState } from 'react'
import styled from 'styled-components'
import Actions from './actions'

const Wrapper = styled.div`
  width: 600px;
  margin: auto;
  color: #585858;
`

const PrintWrapper = styled.div``

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`

const PageLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #2778a5;
  border-radius: 8px;
  padding: 20px;
  margin: 17px 0 42px;
  justify-content: space-between;
`

const PrintPhoto = styled.div`
  width: 270px;
  height: 150px;
  background-size: cover;
  background-image: url(${props => props.bgImg});
`

const DraggableImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid white;
  visibility: ${props => (props.isDragging ? 'visible' : 'hidden')};
  user-select: none;
  position: absolute;
  object-fit: cover;
  transform: translate(-50%, -50%);
`

export default function PrintPage({ data, handleDrop }) {
  const [dragImageUrl, setDragImageUrl] = useState('')

  const onMouseMove = (elem, pageX, pageY) => {
    if (!elem) {
      return
    }
    elem.style.top = `${pageY}px`
    elem.style.left = `${pageX}px`
  }

  const handleMouseUp = event => {
    setDragImageUrl('')

    setTimeout(() => {
      const droppedToElement = document.elementFromPoint(event.clientX, event.clientY)

      if (!droppedToElement || !droppedToElement.dataset.hasOwnProperty('droppable')) {
        return
      }

      const targetImageUrl = droppedToElement.dataset.droppable
      handleDrop(event.target.src, targetImageUrl)
    }, 0)
  }

  const handleMouseMove = ({ pageX, pageY, target }) => {
    onMouseMove(target, pageX, pageY)

    target.addEventListener('mouseup', handleMouseUp)

    target.ondragstart = () => false
  }

  const handleImageClick = ({ pageX, pageY, target }) => {
    onMouseMove(target.firstChild, pageX, pageY)
    setDragImageUrl(target.dataset.droppable)
  }

  return (
    <>
      <Wrapper>
        {Object.values(data).map((entry, index) => {
          return (
            <PrintWrapper key={entry.title}>
              <Header>
                <Title>{entry.title}</Title>
                <Actions />
              </Header>
              <PageLayout data-droppable={`page-${index}`}>
                {entry.images.map(imageUrl => {
                  return (
                    <PrintPhoto
                      key={imageUrl}
                      bgImg={imageUrl}
                      data-droppable={imageUrl}
                      onMouseDown={handleImageClick}
                    >
                      <DraggableImage
                        src={imageUrl}
                        isDragging={dragImageUrl === imageUrl}
                        onMouseMove={handleMouseMove}
                      />
                    </PrintPhoto>
                  )
                })}
              </PageLayout>
            </PrintWrapper>
          )
        })}
      </Wrapper>
    </>
  )
}
