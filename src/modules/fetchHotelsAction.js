import {fetchHotelBegin,fetchHotelSuccess, fetchHotelFailure } from "./action";

export function fetchHotels() {
    return dispatch => {
      dispatch(fetchHotelBegin());
      return fetch(`https://us-central1-mmt-interview.cloudfunctions.net/helloWorld`)
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          dispatch(fetchHotelSuccess(json));
          return json;
        })
        .catch(error => dispatch(fetchHotelFailure(error)));
    };
  }
  
  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }