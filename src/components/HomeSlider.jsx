import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  orderBy,
  deleteDoc,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import Spinner from './Spinner'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const HomeSlider = () => {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  const navigate = useNavigate()
  const auth = getAuth()
  const user = auth.currentUser

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(
        listingsRef,
        where('userRef', '==', user.uid),
        orderBy('timestamp', 'desc')
      )
      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings(listings)
      setLoading(false)
    }

    fetchListings()
  }, [user.uid])

  if (loading) {
    return <Spinner />
  }

  if (listings.length === 0) {
    return <></>
  }

  const onDelete = () => {
    const docRef = doc(db, 'listings', 'id')
    console.log(docRef)
  }

  const onEdit = (params) => {}

  return (
    listings && (
      <>
        <p className='exploreHeading'>My Listings</p>

        <Swiper slidesPerView={1} pagination={{ clickable: true }}>
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='swiperSlideDiv'
              >
                <p className='swiperSlideText'>{data.name}</p>
                <p className='swiperSlidePrice'>
                  ${data.discountedPrice ?? data.regularPrice}{' '}
                  {data.type === 'rent' && '/ month'}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className='profileHeader'>
          <button className='delete' type='button' onClick={onDelete}>
            Delete
          </button>
          <button className='edit' type='button' onClick={onEdit}>
            Edit
          </button>
        </div>
      </>
    )
  )
}
export default HomeSlider
