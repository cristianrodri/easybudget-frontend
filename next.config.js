const domains = []

domains.push('easybudget-backend.herokuapp.com')

if (process.env.NODE_ENV !== 'production') domains.push('localhost')

module.exports = {
  images: {
    domains
  }
}
