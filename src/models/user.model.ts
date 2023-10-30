import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    entitize: () => { id: Schema.Types.ObjectId; username: string; email: string; };
}

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
}, {timestamps: true})

UserSchema.methods.entitize = function() {
    return {
        id: this._id,
        username: this.username,
        email: this.email
    }
}

const User = mongoose.model<IUser>('users', UserSchema);
export default User;