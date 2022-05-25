const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_API_URL

const domains = []

domains.push(SERVER_URL.slice(SERVER_URL.lastIndexOf('/') + 1))

if (process.env.NODE_ENV !== 'production') domains.push('localhost')

module.exports = {
  images: {
    domains
  }
}
