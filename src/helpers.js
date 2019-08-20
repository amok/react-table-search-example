export const noop = () => {}

export const upperFirst = s => {
  return typeof s !== 'string' ? s : (s[0].toUpperCase() + s.slice(1))
}

export const formatDate = date => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return year + '-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0')
}

export const randElem = list => {
  return list[Math.floor(Math.random() * list.length)]
}

export const randDate = () => {
  return new Date(+(new Date()) - Math.floor(Math.random() * 10000000000))
}