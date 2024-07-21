import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const secret = request.headers.get('x-supabase-webhook-source');
  if (secret !== process.env.SUPABASE_WEBHOOK_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  const adminEmail = process.env.ADMIN_EMAIL_ADDRESS;

  if (!adminEmail) {
    return NextResponse.json({ error: 'Missing admin email' }, { status: 500 });
  }

  const body = await request.json();
  const { type = '', table = '', record = {} } = body;
  const userEmail = record?.email;
  const userId = userEmail || 'Unknown user';

  const recipients = [adminEmail];

  try {
    await resend.emails.send({
      from: 'Git Examples <carles@gitexamples.com>',
      to: recipients,
      subject: `New ${type} on ${table}`,
      text: `New ${type} on ${table} by ${userId}`,
    });
    return NextResponse.json({ message: 'Emails sent' });
  } catch (error) {
    return NextResponse.json(error);
  }
}
