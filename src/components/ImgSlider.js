import React,
{
  useEffect,
  useState
} from 'react';
import { images as mockImages } from './sliderData.js';
import CategoriesPanel from './CategoriesPanel.js';
import { KEY } from '../key.js';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CircularProgress } from '@mui/material';

const ImgSlider = () => {
  let API_KEY = process.env.REACT_APP_API_KEY || KEY;
  /*
    State:
      1) Images currently held
      2) Index of the image currently displayed
      3) Category currently selected
      4) Page requested from API
  */
  const [images, setImages] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [nice, setNice] = useState('');
  const [page, setPage] = useState(1);
  const [isErr, setIsErr] = useState(false);

  // On-load: sets mock images in state
  useEffect(() => {
    setImages(mockImages);
  }, [])

  // API fetcher
  const getImages = async (pageQuery = page, query = nice) => {
    let aux = [];

    try {
      let rawData = await fetch(
        // `https://api.unsplash.com/search/photos?page=${pageQuery}&QUERY=${query}&client_id=${KEY}`
        `https://api.unsplash.com/search/photos?page=${pageQuery}&query=${query}&orientation=landscape&client_id=${API_KEY}`
      );
      let data = await rawData.json();
      if (isErr) setIsErr(false);

      aux = data.results.map(d => {
        console.log(d.description, d.height + ' X ' + d.width)
        return { image: d.urls.regular, description: d.description || d.alt_description || '' }
      })
    } catch (e) {
      aux = mockImages;
      setIsErr(true)
    } finally {
      setImages(aux);
      if (pageQuery !== page) setPage(pageQuery);
      setNice(query);
    }
  }

  // Controls navigation among current state's images
  const browsePrev = (e) => { setCurrentIdx(((currentIdx - 1) + 10) % images.length) }
  const browseNext = (e) => { setCurrentIdx((currentIdx + 1) % images.length) }

  // Shows a loader is API call takes time
  if (!Array.isArray(images) || images.length <= 0) {
    return (
      <CircularProgress className="progress" color="secondary" thickness={3.6} size={100} />
    )
  }


  return (
    <section className="slider" >
      <CategoriesPanel getImages={getImages} page={page} err={isErr} nice={nice} />
      <div className="stage">
        <ArrowBackIosNewIcon className="arrow prev" onClick={browsePrev} fontSize="large" />
        {images.map((slide, idx) => {
          return (
            <div
              className={idx === currentIdx ? 'slide active' : 'slide'}
              key={`img-${idx}`}>
              {idx === currentIdx && <img className="image" src={slide.image} alt={slide.description ? slide.description : ''} />}
            </div>
          )
        })}
        <ArrowForwardIosIcon className="arrow next" onClick={browseNext} fontSize="large" />
      </div>
    </section>
  )
}

export default ImgSlider