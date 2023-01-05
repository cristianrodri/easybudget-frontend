import { model, Model, models, Require_id, Schema } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { CategoryTypes, IUser, IUserDocument } from '@custom-types'
import { toJSON } from '@utils/db/response'
import { avatar } from '@db/avatar/model'
import Category from '@db/category/model'
import Budget from '@db/budget/model'
import { deleteAvatar } from '@db/avatar/delete'
import { comparePassword } from '@db/utils'

interface IUserMethods {
  generateAuthToken(): string
}

interface UserModel extends Model<IUser, Record<string, never>, IUserMethods> {
  findByCredentials(email: string, password: string): Promise<Require_id<IUser>>
}

const userSchema = new Schema<IUserDocument, UserModel, IUserMethods>(
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
    avatar
  },
  {
    timestamps: true,
    toJSON: {
      ...toJSON,
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret?.password

        // If the return data has categories, add a money attribute
        if (ret?.categories) {
          ret.categories = ret.categories.map((category: CategoryTypes) => {
            category.money = category.budgets.reduce(
              (prev, cur) => prev + cur.money,
              0
            )

            return category
          })
        }
      }
    }
  }
)

userSchema.virtual('budgets', {
  ref: 'Budget',
  localField: '_id',
  foreignField: 'user'
})

userSchema.virtual('categories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'user'
})

userSchema.statics.findByCredentials = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email })

  if (!user) throw new Error('User not found')

  await comparePassword(password, user.password)

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

userSchema.post('findOneAndDelete', async function (doc: IUserDocument) {
  // Delete related categories and budgets
  await Category.deleteMany({ user: doc._id })
  await Budget.deleteMany({ user: doc._id })

  // Delete related avatar from the provider
  if (doc?.avatar) {
    await deleteAvatar(doc)
  }
})

const User =
  (models['User'] as UserModel) || model<IUser, UserModel>('User', userSchema)

export default User
