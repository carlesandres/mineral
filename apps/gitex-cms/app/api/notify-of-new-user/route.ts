import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const secret = request.headers.get('x-supabase-webhook-source');
  if (secret !== process.env.SUPABASE_WEBHOOK_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await request.json();
  const userEmail = body?.record?.email;
  const userId = userEmail || 'Unknown user';
  const adminEmail = process.env.ADMIN_EMAIL_ADDRESS;

  if (!adminEmail) {
    return NextResponse.json({ error: 'Missing admin email' }, { status: 500 });
  }

  const recipients = [adminEmail];

  try {
    await resend.emails.send({
      from: 'Git Examples <carles@gitexamples.com>',
      to: recipients,
      subject: 'New user sign-up',
      text: `A New user has signed up: ${userId}`,
    });

    if (userEmail) {
      await resend.emails.send({
        from: 'Git Examples <carles@gitexamples.com>',
        to: [userEmail],
        subject: 'Welcome to Git Examples!',
        text: `Hi there,

Welcome to Git Examples!

I hope you enjoy learning about git and its powerful capabilities from our examples.

As a small favour, if you can spare a minute, I'd like to know your opinion and suggestions so that we can improve. A one-field feedback form is available at https://gitexamples.com/feedback.

Happy gitting!

Carles`,
      });
    }
    return NextResponse.json({ message: 'Emails sent' });
  } catch (error) {
    return NextResponse.json(error);
  }
}
