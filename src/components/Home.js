import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [converting, setConverting] = useState(false)

  const createLink = () => {
    setIsLoading(true)
    setConverting(true)
      axios.post('https://localhost:5001/api/links', {
        url: url
      })
      .then(response =>  {
        var link = response.data
        window.location.href = `${window.location.origin}/${link.shortcut}?twlSecret=${link.twlSecret}`
      })
      .catch(error => {
        if (error.response) {
          setError(error.response.data.toLowerCase())
        } else if (error.request) {
          setError(error.request.toLowerCase())
        } else {
          setError(error.message.toLowerCase())
        }
        setConverting(false);
        setIsLoading(false);
      });
  }

  const keyDown = (e) => {
    if (e.key === 'Enter') { createLink() }
  }

  const checkUrl = () => {
    var errorMessage = ''
    var expression = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    var regex = new RegExp(expression);
    if (url == '') {
      errorMessage = 'no url was supplied';
    }
    else if(url.match(regex) == null) {
       errorMessage = 'please supply a valid url';
    }
    setError(errorMessage);
  }

  return(
    <div>
      <section className="input-group mb-3">
        <input type="text" className="form-control" placeholder="https://example.com" value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => keyDown(e)} onBlur={checkUrl} aria-label="Original URL" aria-describedby="button-convert"/>
        <div className="input-group-append">
          <button className="btn btn-secondary" type="button" onClick={createLink} id="button-convert">{converting ? `converting` : `convert`}</button>
        </div>
        <p className="error-message">{error}</p>
      </section>
      <section className="p-4">
        <p>this app generates a shortened link and corresponding dashboard. just add your link, click convert, and you’ll get a tiny wee link to use right away!</p>
      </section>
      <section className="p-4">
        <h2>click tracking</h2>
        <p className="pt-4">links are tracked per click, so you’ll get a history of which days your link was most popular</p>
      </section>
      <section className="p-4">
        <h2>parameter forwarding</h2>
        <p className="pt-4">query parameters added to the link will be passed on to the redirected URL. perfect for UTM tracking and deep linking to mobile apps</p>
      </section>
    </div>
  )
}

export default Home;
