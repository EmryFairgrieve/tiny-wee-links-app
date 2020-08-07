import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  function createLink() {
    setIsLoading(true)
    setError('')
      axios.post('https://localhost:5001/api/links', {
        url: url
      })
      .then(function (response) {
        var link = response.data
        window.location.href = `${window.location.origin}/${link.shortcut}?twlSecret=${link.secret}`
      })
      .catch(function (error) {
        setError('Unable to create link. Please check the URL supplied.');
        setIsLoading(false);
      });
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
      <section className="input-group mb-3 pt-5">
        <input type="text" className="form-control" placeholder="https://example.com" value={url} onChange={e => setUrl(e.target.value)} onBlur={checkURL} aria-label="Original URL" aria-describedby="button-convert"/>
        <div className="input-group-append">
          <button className="btn btn-secondary" type="button" onClick={createLink} id="button-convert">Convert</button>
        </div>
        <p className="error-message">{error}</p>
      </section>
      <section className="p-4">
        <p>This tool generates shortened links and corresponding dashboards. Just add your link, click convert, and you’ll get a tiny wee link to use right away!</p>
      </section>
      <section className="p-4">
        <h2>Click tracking</h2>
        <p className="pt-4">Links are tracked per click, so you’ll get a history of which days your link was most popular.</p>
      </section>
      <section className="p-4">
        <h2>Parameter Forwarding</h2>
        <p className="pt-4">Query parameters added to the link will be passed on to the redirected URL. Perfect for UTM tracking and deep linking to mobile apps.</p>
      </section>
    </div>
  )
}

export default Home;
