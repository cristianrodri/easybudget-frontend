import { UploadApiResponse } from 'cloudinary'
import { Schema } from 'mongoose'

export const avatar = new Schema<UploadApiResponse>(
  {
    asset_id: {
      type: String
    },
    public_id: {
      type: String
    },
    version: {
      type: Number
    },
    version_id: {
      type: String
    },
    signature: {
      type: String
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    format: {
      type: String
    },
    resource_type: {
      type: String,
      enum: ['image', 'video', 'raw', 'auto']
    },
    created_at: {
      type: String
    },
    tags: {
      type: [String]
    },
    bytes: {
      type: Number
    },
    type: {
      type: String
    },
    etag: {
      type: String
    },
    placeholder: {
      type: Boolean
    },
    url: {
      type: String
    },
    secure_url: {
      type: String
    },
    folder: {
      type: String
    },
    original_filename: {
      type: String
    },
    api_key: {
      type: String
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret._id
      }
    }
  }
)
