import { ICategory } from '@custom-types'
import { Model, model, models, Schema } from 'mongoose'

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30
    },
    type: {
      type: String,
      required: true,
      enum: ['expense', 'income']
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      },
      versionKey: false
    }
  }
)

categorySchema.virtual('budgets', {
  ref: 'Budget',
  localField: '_id',
  foreignField: 'category'
})

// const Category = model('Category', categorySchema)
const Category =
  (models['Category'] as Model<ICategory>) ||
  model<ICategory>('Category', categorySchema)

export default Category
