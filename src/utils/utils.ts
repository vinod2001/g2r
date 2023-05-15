import { keys, compact } from 'lodash'
export const filterHeader = (data: any) => {
  const allKeys = keys(data[0])
  let headerLists = allKeys.map((items) => {
    if (items !== 'id') {
      return {
        field: items,
        filter: 'agTextColumnFilter',
      }
    }
  })
  headerLists = compact(headerLists)
  console.log(headerLists)
  return headerLists
}

export const checkDomain = (count: number) => {
  let urls: string | undefined = ''
  let numbers = 0
  let addData = {}
  if (process.env.NODE_ENV === 'test') {
    urls = process.env.REACT_APP_DEV_URL
    numbers = 8618
    addData = {
      id: count,
      athlete: 'Vinod',
      age: 38,
      country: 'Kazakhstan',
      year: 2012,
      date: '12/08/2012',
      sport: 'Cycling',
      gold: 1,
      silver: 0,
      bronze: 0,
      total: 1,
    }
  } else if (process.env.NODE_ENV === 'development') {
    urls = process.env.REACT_APP_PRODUCTION_URL
    numbers = 500
    addData = {
      postId: 1,
      id: count,
      name: 'id labore ex et quam laborum',
      email: 'Eliseo@gardner.biz',
      body:
        'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
    }
  } else if(process.env.NODE_ENV.trim() === 'production'){
    urls = process.env.REACT_APP_PRODUCTION_URL
  }

  return { urls, numbers, addData }
}
