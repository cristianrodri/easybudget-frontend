import { IBudget } from '@custom-types'
import { model, Schema } from 'mongoose'

const budgetSchema = new Schema<IBudget>({
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  money: {
    type: Number,
    required: true,
    min: 1
  },
  date: { type: Date, required: true, default: Date.now() },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category'
  }
})

const Budget = model('Budget', budgetSchema)

export default Budget
