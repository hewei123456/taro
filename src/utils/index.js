export getOpenId from './getOpenId'

export const return2Br = str => {
  return str.replace(/\\n/g, '<br />')
}

export const subStrByDigits = (str, digits) => {
  var strNew = str
  if (strNew.length > digits) {
    strNew = strNew.substring(0, digits) + '...'
  }
  return strNew
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export const formatTime = timestamp => {
  var date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const getQuery = (url, params) => {
  if (!url) return ''
  if (params) {
    let paramsArr = []
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        paramsArr.push(`${key}=${params[key]}`)
      }
    }
    if (url.indexOf('?') !== -1) {
      url = `${url}&${paramsArr.join('&')}`
    } else {
      url = `${url}?${paramsArr.join('&')}`
    }
  }
  return url
}

