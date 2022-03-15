import React, { useContext, useState} from 'react';
import API from '../../API';
import PropTypes from 'prop-types';
import axios from 'axios'
// Components
import Thumb from '../Thumb';
import Rate from '../Rate';
// Config
import { API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from '../../config';
// Image
import NoImage from '../../images/no_image.jpg';
// Styles
import { Wrapper, Content, Text } from './MovieInfo.styles';
// Context
import { Context } from '../../context';
import Video from '../Video';



const MovieInfo = ({ movie }) => {
  const [user] = useContext(Context);

  const handleRating = async value => {
    const rate = await API.rateMovie(user.sessionId, movie.id, value);
    console.log(rate);
  };
  return (
    <Wrapper backdrop={movie.backdrop_path}>
      <Content>
        <Thumb
          image={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
              : NoImage
          }
          clickable={false}
          alt="image.poster"
        />
        <Text>
          <h1>{movie.title}</h1>
          <h3>synopsis</h3>
          <p>{movie.overview}</p>

          <div className='rating-directors'>
            <div>
              <h3>Note</h3>
              <div className='score'>{movie.vote_average}</div>
            </div>
            <div className='director'>
              <h3>Réalisateur{movie.directors.length > 1 ? 'S' : ''}</h3>
              {movie.directors.map(director => (
                <p key={director.credit_id}>{director.name}</p>
              ))}
            </div>
          </div>
          {user && (
            <div>
              <p>Rate Movie</p>
              <Rate callback={handleRating} />
            </div>
          )}
            <Video/>
        </Text>
      </Content>
    </Wrapper>
  );
};

MovieInfo.propTypes = {
  movie: PropTypes.object
};

export default MovieInfo;
