import crypto from 'crypto';
import { getVericationTokenByEmail } from '@/data/verification-token';
import { v4 as uuidv4} from 'uuid'
import { db } from './db';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';
import {getTwoFactorTokenByEmail, getTwoFactorTokenByToken} from '@/data/two-factor-token';

export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getTwoFactorTokenByEmail(email);

    if(existingToken){
        await db.twoFactorToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            token,
            expires,
            email
        }
    })

    return twoFactorToken;

}

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
        const expires = new Date(new Date().getTime() + 3600 * 1000);
        const existingToken = await getPasswordResetTokenByEmail(email);

        if(existingToken){
            await db.passwordResetToken.delete({
                where: {
                    id: existingToken.id
                }
            })
        }

        const passwordResetToken = await db.passwordResetToken.create({
            data: {
                token,
                expires,
                email
            }
        })

        return passwordResetToken;
}

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getVericationTokenByEmail(email);

    if(existingToken){
        await db.vericantionToken.delete({
            where : {
                id: existingToken.id
            }
        })
    }

    const verficationToken = await db.vericantionToken.create({
        data: {
            token,
            expires,
            email
        }
    })

    return verficationToken;
};