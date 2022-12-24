import { IBudget } from '@custom-types'
import { Model, model, models, Schema } from 'mongoose'
import { toJSON } from '@utils/db/response'

const budgetSchema = new Schema<IBudget>(
  {
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
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category'
    }
  },
  { toJSON }
)

const Budget =
  (models['Budget'] as Model<IBudget>) || model<IBudget>('Budget', budgetSchema)

export default Budget
