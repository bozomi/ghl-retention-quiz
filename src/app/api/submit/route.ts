import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { decision, reason } = body;

        // TODO: Connect to GoHighLevel Webhook here
        // const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL;
        // await fetch(GHL_WEBHOOK_URL, { ... });

        console.log('Received submission:', { decision, reason });

        // Simulate delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return NextResponse.json({ success: true, message: 'Submission received' });
    } catch (error) {
        console.error('Error processing submission:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
