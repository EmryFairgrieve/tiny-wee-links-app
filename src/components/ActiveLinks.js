import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActiveLinks = () => {
  const [links, setLinks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios.get(`https://localhost:5001/api/links`)
    .then(response => {
      setLinks(response.data)
      setIsLoading(false)
    })
    .catch(error => {
      if (error.response) {
        setError(error.response.data.toLowerCase())
      } else if (error.request) {
        setError(error.request.toLowerCase())
      } else {
        setError(error.message.toLowerCase())
      }
      setIsLoading(false)
    });
  }, []);

  if (!isLoading) {
      return(
        <div>
          <h2>{error}</h2>
          <section>
            {
                links.map(l => (
                <p key={l.shortcut}><a href={`${window.location.origin}/${l.shortcut}`}>{`${window.location.origin}/${l.shortcut}`}</a> -> <a href={l.url}>{l.url}</a></p>
                ))
            }
          </section>
        </div>
      )
  }
  return null;
}

export default ActiveLinks;
