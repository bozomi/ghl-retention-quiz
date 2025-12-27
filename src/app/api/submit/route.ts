import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { decision, reason } = body;

        const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/B5uf5RpsGwhItwi1pcfp/webhook-trigger/9257e232-4e0c-4766-a38d-29c75ba3a5f2';

        await fetch(GHL_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ decision, reason, timestamp: new Date().toISOString() })
        });

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
