import { Model, model, models, Schema } from 'mongoose'
import { ICategory } from '@custom-types'
import { toJSON } from '@db/utils'

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
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    toJSON
  }
)

categorySchema.virtual('budgets', {
  ref: 'Budget',
  localField: '_id',
  foreignField: 'category'
})

const Category =
  (models['Category'] as Model<ICategory>) ||
  model<ICategory>('Category', categorySchema)

export default Category
