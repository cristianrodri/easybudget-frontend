import { ICategory } from '@custom-types'
import { model, Schema } from 'mongoose'

const categorySchema = new Schema<ICategory>({
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
})

categorySchema.virtual('budgets', {
  ref: 'Budget',
  localField: '_id',
  foreignField: 'category'
})

const Category = model('Category', categorySchema)

export default Category
