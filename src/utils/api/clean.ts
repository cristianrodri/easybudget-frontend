import { Document } from 'mongoose'
import { NextApiRequest } from 'next'

export const cleanRequestBody = (req: NextApiRequest) => {
  // Below properties should not be provided by the user client, because it is managed by the database
  delete req?.body?.__v
  delete req?.body?._id
  delete req?.body?.createdAt
  delete req?.body?.updatedAt
  delete req?.body?.blocked
  delete req?.body?.confirmed

  // Trimmed request body string data
  Object.entries(req?.body).forEach(entry => {
    if (typeof entry[1] === 'string' && req.body?.[entry[0]]) {
      req.body[entry[0]] = req.body[entry[0]].trim()
    }
  })
}

export const updateAllowedProperties = (
  properties: string[],
  req: NextApiRequest,
  document: Document
) => {
  properties.forEach(property => {
    if (req.body?.[property]) document[property] = req.body[property]
  })
}
