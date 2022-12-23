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
