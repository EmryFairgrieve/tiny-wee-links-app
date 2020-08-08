import React, { useState, useEffect } from 'react';
import {
  useParams,
  useLocation,
  Link
} from 'react-router-dom';
import axios from 'axios';
import Moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Bar, defaults } from 'react-chartjs-2';

const Dashboard = () => {
  Moment.locale('en');
  defaults.global.defaultFontFamily = 'Roboto Mono'
  defaults.global.defaultFontColor = '#fff'
  defaults.global.defaultFontSize = 14
  let { shortcut } = useParams()
  const [queryInfo, setQueryInfo] = useState({
    shortcut: shortcut,
    twlSecret: new URLSearchParams(useLocation().search).get('twlSecret'),
    dashboardLink: window.location.href
  })
  const [link, setLink] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  function redirect() {
    axios.post(`https://localhost:5001/api/clicks`, {
      shortcut: queryInfo.shortcut
    })
    .then(function (response) {
      window.location.href = `${response.data.url}${window.location.search}`
    })
    .catch(function (error) {
      window.location.href = '/'
      setIsLoading(false)
    });
  }

  function loadDashboard() {
    axios.get(`https://localhost:5001/api/links?shortcut=${queryInfo.shortcut}&twlSecret=${queryInfo.twlSecret}`)
    .then(response => {
      setLink(response.data)
      setIsLoading(false)
    })
    .catch(error => {
      window.location.href = '/'
      setIsLoading(false)
    });
  }

  useEffect(() => {
    setIsLoading(true)
    if (queryInfo.twlSecret === null) {
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

  function getDaysArrayByWeek() {
    var arrDays = [];
    var daysInWeek = 7
    while(daysInWeek) {
      var current = moment().date(daysInWeek);
      arrDays.push(current.format('ddd Do'));
      daysInWeek--;
    }
    return arrDays;
  }



  if (!isLoading) {
    if (link.shortcut === queryInfo.shortcut || link.twlSecret === queryInfo.twlSecret) {

      const myData = {
      labels: link.chart.labels,
      datasets: [
        {
          label: 'clicks per day',
          backgroundColor: '#FFF',
          borderColor: '#FFF',
          borderWidth: 1,
          hoverBackgroundColor: '#CFCFCF',
          hoverBorderColor: '#CFCFCF',
          data: link.chart.values
        }
      ]
    };

      return(
        <div>
          <section className="input-group mb-3">
            <input id="urlInput" type="text" className="form-control" disabled={true} value={`${window.location.origin}/${shortcut}`} aria-label="Original URL" aria-describedby="button-convert"/>
            <div className="input-group-append">
              <CopyToClipboard text={`${window.location.origin}/${shortcut}`} onCopy={() => setCopied(true)}>
                <button className="btn btn-secondary" type="button" onBlur={() => setCopied(false)}>{copied ? 'copied' : 'copy'}</button>
              </CopyToClipboard>
            </div>
          </section>
          <section>
            <p>redirects to: <a href={link.url}>{link.url}</a></p>
          </section>
          <section className="p-5">
            <p className="statistic">clicks: {link.clicks != null ? link.clicks.length : 0}</p>
            <p className="statistic">created: {Moment(link.dateTimeCreated).format('MMMM Do YYYY').toLowerCase()}</p>
          </section>
          <section>
            <Bar
              data={myData}
              height={200}
              options={{ maintainAspectRatio: false, scales: { yAxes: [{ ticks: { stepSize: 1} }] } }}
            />
          </section>
          <section className="p-4">
            <p>dashboard: <a href={queryInfo.dashboardLink}>{queryInfo.dashboardLink}</a></p>
          </section>
        </div>
      )
    }
  }
  return null;
}

export default Dashboard;
