import mongoose from 'mongoose'

interface AccountModel {
    id: number,
    name: string
    email: string
    password: string
}


const schema = new mongoose.Schema<AccountModel>({
    id: {type: Number},
    name: {type: String},
    email: {type: String},
    password: {type: String},
});

export const AccountModel = mongoose.model<AccountModel>(
    'Accounts',
    schema,
    'accounts'
  );
