import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [converting, setConverting] = useState(false)

  function createLink() {
    setIsLoading(true)
    setConverting(true)
    setError('')
      axios.post('https://localhost:5001/api/links', {
        url: url
      })
      .then(function (response) {
        var link = response.data
        if (response.status !== 200) {
          setError('Unable to create link. Please check the URL supplied.');
          setConverting(false);
          setIsLoading(false);
        } else {
          window.location.href = `${window.location.origin}/${link.shortcut}?twlSecret=${link.twlSecret}`
        }
      })
      .catch(function (error) {
        setError('Unable to create link. Please check the URL supplied.');
        setConverting(false);
        setIsLoading(false);
      });
  }

  function keyDown(e) {
    if (e.key === 'Enter') { createLink() }
  }

  function checkURL() {
    var errorMessage = ''
    var expression = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    var regex = new RegExp(expression);
    if(url.match(regex) == null) {
       errorMessage = 'Please use a valid URL';
    }
    setError(errorMessage);
  }

  return(
    <div>
      <section className="input-group mb-3">
        <input type="text" className="form-control" placeholder="https://example.com" value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => keyDown(e)} onBlur={checkURL} aria-label="Original URL" aria-describedby="button-convert"/>
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
        <p className="pt-4">query parameters added to the link will be passed on to the redirected URL. perfect for UTM tracking and deep linking to mobile apps.</p>
      </section>
    </div>
  )
}

export default Home;
