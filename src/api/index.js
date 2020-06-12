// import axios from 'axios'
import config from '../config'

export default {
  request (method, uri, data = null) {
    if (!method) {
      console.error('API function call requires method argument')
      return
    }

    if (!uri) {
      console.error('API function call requires uri argument')
      return
    }

    var url = config.serverURI + uri
    if (method === 'post') {
      return fetch(url,
        {
          method: 'POST',
          body: JSON.stringify({
            data
          })
        })
        .then(response => response.json())
    }

    if (method === 'post_file') {
      return fetch(url,
        {
          method: 'POST',
          body: data
        })
        .then(response => response.json())
    }

    if (method === 'get') {
      var setUrl = data == null ? fetch(url) : fetch(`${url}?${data}`)
      return setUrl
      .then(response => response.json())
    }
  }
}
