import mongoose from 'mongoose';
import { PasswordHasher } from '../services/password-hasher';

interface UserAttrs {
    username: string;
    email?: string;
    password: string;
};

interface UserDocument extends mongoose.Document {
    username: string;
    email?: string;
    password: string;
};

interface UserModel extends mongoose.Model<UserDocument> {
    build(attrs: UserAttrs): UserDocument;
};

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
        }
    }
});

schema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const plain = this.get('password');
        const hash = await PasswordHasher.toHash(plain);
        this.set('password', hash);
    }
});

schema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = mongoose.model<UserDocument, UserModel>('User', schema);

export { User };