import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const token = searchParams.get('token');

    if (!token) {
        return Response.json(
            {
                error: 'Token Not Found',
            },
            {
                status: 400,
            }
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            email: string;
            code: string;
        };

        const { email, code } = decoded;

        return Response.json(
            {
                email,
            },
            {
                status: 200,
            }
        );
    } catch (error: any) {
        return Response.json(
            {
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}
