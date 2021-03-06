import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class PasswordHasher {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString("hex");
        const buffer = (await scryptAsync(password, salt, 64)) as Buffer;
        return `${buffer.toString("hex")}.${salt}`;        
    }

    static async compare(password: string, hash: string) {
        const [hashedPassword, salt] = hash.split(".");
        const comparator = (await scryptAsync(password, salt, 64)) as Buffer;
        
        return hashedPassword === comparator.toString("hex");
    }
}