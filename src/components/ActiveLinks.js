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
      console.log('items')
      response.data.forEach(function (arrayItem) {
          console.log('item')
          console.log(arrayItem);
      });
      console.log(response.data)
      setLinks(response.data)
      setIsLoading(false)
    })
    .catch(error => {
      setError('Error loading active links')
      setIsLoading(false)
    });
  }, []);

  if (!isLoading) {
      return(
        <div>
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