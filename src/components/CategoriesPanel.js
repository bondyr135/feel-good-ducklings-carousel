import React from 'react';
import './CategoriesPanel.css';
import {
  RadioGroup,
  Button,
  FormControl,
  Alert
} from '@mui/material';
import Category from './Category.js'



function CategoriesPanel({ getImages, page, err, nice }) {

  // Hard-coded categories I think are great
  const CATEGORIES = ['Puppies', 'Ducklings', 'Cake', 'Giraffes'];

  // On choosing a category, fires a fetch request with the newly chosen category
  const chooseCategory = ({ target }) => {
    getImages(page, target.name)
  }

  // On button clicking, fires a fetch request for the current chosen category
  const loadMore = ({ target }) => {
    let newPage = Math.floor(Math.random() * 13);
    // Making sure the page actually changes
    newPage = newPage === page ? (page + 1) : newPage;
    getImages(newPage);
  }

  return (
    <div className="panel">
      <FormControl >
        <RadioGroup className="radio-group" row onChange={chooseCategory} sx={{
          '& .MuiFormControlLabel-label': { fontSize: '20px', fontWeight: '600', color: "#301934" }
        }}>
          {
            CATEGORIES.map(cat => {
              return <Category name={cat} key={cat} />
            })
          }
          <Button
            variant='contained'
            onClick={loadMore}
            sx={{
              fontSize: '20px',
              fontWeight: 800,
              backgroundColor: '#cd67eb',
              '&:hover': { backgroundColor: '#c933f5' }
            }}
            disabled={nice === '' || err}>
            More!
          </Button>
        </RadioGroup>
      </FormControl>

      {/* Renders an error if there is one */}
      {err && <Alert className="err-msg" severity='error' sx={{ 'position': "absolute", "margin": "auto" }}>Something went wrong fetching the photos. Just go have cake...</Alert>}
    </div>
  )
}

export default CategoriesPanel