import React, { useState, useEffect } from 'react';
import {
  useParams,
  useLocation,
  Link
} from 'react-router-dom';
import axios from 'axios';
import Moment from 'moment';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const Dashboard = () => {
  Moment.locale('en');
  let { shortcut } = useParams()
  const [queryInfo, setQueryInfo] = useState({
    shortcut: shortcut,
    secret: new URLSearchParams(useLocation().search).get('twlSecret'),
    dashboardLink: window.location.href
  })
  const [link, setLink] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  function redirect() {
    axios.post(`https://localhost:5001/api/clicks`, {
      shortcut: queryInfo.shortcut
    })
    .then(function (response) {
      window.location.href = response.data.url + window.location.search
    })
    .catch(function (error) {
      setError(`This doesn't appear to be a valid tiny wee link to use.`)
      setIsLoading(false)
    });
  }

  function loadDashboard() {
    axios.get(`https://localhost:5001/api/links?shortcut=${queryInfo.shortcut}&twlSecret=${queryInfo.secret}`)
    .then(response => {
      setLink(response.data)
      setIsLoading(false)
    })
    .catch(error => {
      setError(`There was an issue getting the dashboard for the shortcut and corresponding secret used.`)
      setIsLoading(false)
    });
  }

  useEffect(() => {
    setIsLoading(true)
    if (queryInfo.secret === null) {
      redirect();
    } else {
      loadDashboard();
    }
  }, []);

  function copyUrl() {
    var copyText = document.getElementById("urlInput");
    console.log(copyText.value)

  /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
  }

  if (!isLoading) {
    if (link.shortcut === queryInfo.shortcut || link.secret === queryInfo.secret) {
      return(
        <div>
          <section className="input-group mb-3 pt-5">
            <input id="urlInput" type="text" className="form-control" disabled={true} value={`${window.location.origin}/${shortcut}`} aria-label="Original URL" aria-describedby="button-convert"/>
            <div className="input-group-append">
              <CopyToClipboard text={`${window.location.origin}/${shortcut}`}
                onCopy={() => setCopied(true)}>
                <button className="btn btn-secondary" type="button" onBlur={() => setCopied(false)}>{copied ? 'Copied' : 'Copy'}</button>
              </CopyToClipboard>
            </div>
            <p className="error-message">{error}</p>
          </section>
          <section>
            <p>Redirects to: <a href={link.url}>{link.url}</a></p>
          </section>
          <section className="p-5">
            <p className="statistic">Clicks: {link.clicks != null ? link.clicks.length : 0}</p>
            <p className="statistic">Created: {Moment(link.dateTimeCreated).format('Do MMMM YYYY')}</p>
          </section>
          <section className="p-4">
            <p>Dashboard: <a href={queryInfo.dashboardLink}>{queryInfo.dashboardLink}</a></p>
          </section>
        </div>
      )
    }
  }
  return null;
}

export default Dashboard;
