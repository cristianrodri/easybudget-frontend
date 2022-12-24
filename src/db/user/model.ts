import { model, Model, models, Require_id, Schema } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { IUser, IUserDocument } from '@custom-types'
import { UploadApiResponse } from 'cloudinary'
import { toJSON } from '@utils/db/response'

interface UserModel extends Model<IUser, Record<string, never>> {
  findByCredentials(email: string, password: string): Promise<Require_id<IUser>>
}

const userSchema = new Schema<IUserDocument, UserModel>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      maxLength: 50,
      minlength: 2,
      unique: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      maxLength: 70,
      minlength: 2,
      validate(value: string) {
        if (!validator.isEmail(value)) throw new Error('Email is invalid')
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      maxLength: 100,
      validate(value: string) {
        if (value.toLowerCase().includes('password'))
          throw new Error('Password cannot contain "password"')
      }
    },
    confirmed: {
      type: Boolean,
      required: true,
      default: true
    },
    blocked: {
      type: Boolean,
      required: true,
      default: false
    },
    provider: {
      type: String,
      required: true,
      default: 'local',
      enum: ['local']
    },
    avatar: new Schema<UploadApiResponse>({
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
    })
  },
  {
    timestamps: true,
    toJSON
  }
)

userSchema.virtual('budgets', {
  ref: 'Budget',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.virtual('categories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.statics.findByCredentials = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email })

  if (!user) throw new Error('User not found')

  const matchedPassword = await bcrypt.compare(password, user.password)

  if (!matchedPassword) {
    throw new Error('Wrong password!')
  }

  return user
}

userSchema.methods.generateAuthToken = function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEY, {
    expiresIn: '6h'
  })

  return token
}

// Hash plain password before saving
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10)
  }

  next()
})

const User =
  (models['User'] as UserModel) || model<IUser, UserModel>('User', userSchema)

export default User
