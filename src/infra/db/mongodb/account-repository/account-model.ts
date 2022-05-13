import mongoose from 'mongoose'

interface AccountModelInterface {
  id: number
  name: string
  email: string
  password: string
}

const schema = new mongoose.Schema<AccountModelInterface>({
  id: { type: Number },
  name: { type: String },
  email: { type: String },
  password: { type: String }
})

export const AccountModel = mongoose.model<AccountModelInterface>(
  'Accounts',
  schema,
  'accounts'
)
