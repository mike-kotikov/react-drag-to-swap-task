import Head from 'next/head'
import PrintPage from '../components/printPage'
import styled from 'styled-components'
import { useCallback, useState } from 'react'

const PageHeader = styled.div`
  width: 600px;
  margin: auto;
  border-bottom: 1px solid #e4e4e4;
  margin-bottom: 42px;
  padding-bottom: 24px;

  h1 {
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0.36px;
    color: #585858;
    margin-bottom: 8px;
  }

  p {
    color: #797979;
    margin: 0;
  }
`

const DEFAULT_DATA = [
  {
    title: 'Front Print',
    images: [
      'https://videodelivery.net/775b1b7196b2c126b8dc343416211fdb/thumbnails/thumbnail.jpg?height=1080'
    ]
  },
  {
    title: 'Page 2',
    images: [
      'https://videodelivery.net/9ad2bb839e4e3cc1074e5d73b0a0379b/thumbnails/thumbnail.jpg?height=1080',
      'https://imagedelivery.net/66_qOEcY2UwnECf5ON9PhQ/bde5b129-52ba-4f43-b3f4-97591952ea00/large'
    ]
  },
  {
    title: 'Page 3',
    images: [
      'https://videodelivery.net/91097538e177847ebeb934a492e146e9/thumbnails/thumbnail.jpg?height=1080',
      'https://imagedelivery.net/66_qOEcY2UwnECf5ON9PhQ/b73c2865-7a02-408b-654d-89ce2512ae00/large'
    ]
  }
]

export default function Testpage() {
  const [data, setData] = useState(DEFAULT_DATA)

  const handleDrop = useCallback((draggedImageUrl, targetImageUrl) => {
    if (!draggedImageUrl || !targetImageUrl || draggedImageUrl === targetImageUrl) {
      return
    }

    const targetPageIndex =
      targetImageUrl.includes('page') &&
      Number(targetImageUrl.slice(targetImageUrl.indexOf('-') + 1))

    setData(
      data.map((page, index) => {
        if (targetPageIndex === index && page.images.some(img => img === draggedImageUrl)) {
          return page
        }

        let images = []
        if (typeof targetPageIndex === 'number' && targetPageIndex !== index) {
          images = page.images.filter(img => img !== draggedImageUrl)
        } else if (targetPageIndex === index) {
          images = [...page.images, draggedImageUrl]
        } else {
          images = page.images.map(img => {
            if (img === draggedImageUrl) {
              return targetImageUrl
            }
            if (img === targetImageUrl) {
              return draggedImageUrl
            }
            return img
          })
        }

        return {
          ...page,
          images
        }
      })
    )
  }, [data])

  return (
    <div>
      <Head>
        <title>Test Page | Popsa.com</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader>
        <h1>Trip to the Beach</h1>
        <p>Hardback Photobook last edited on Thursday 13 April 2022 at 16:28</p>
      </PageHeader>
      <PrintPage handleDrop={handleDrop} data={data} />
    </div>
  )
}
