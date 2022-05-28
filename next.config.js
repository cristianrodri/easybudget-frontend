const domains = []

domains.push('res.cloudinary.com')

if (process.env.NODE_ENV !== 'production') domains.push('localhost')

module.exports = {
  images: {
    domains
  }
}
