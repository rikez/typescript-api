import { randomBytes, createHmac } from 'crypto';

export interface ICryptoObject {
    salt?: string;
    passwordHash: string;
}

export class CryptographHelper {

    static salt(length: number = 10): string {
        return randomBytes(Math.ceil(length/2))
                .toString('hex')
                .slice(0,length); 
    }

    static sha(content: string, salt: string): ICryptoObject  {
        const hash = createHmac('sha512', salt).update(content).digest('hex')
        return {
            salt: salt,
            passwordHash: hash
        };
    }
}