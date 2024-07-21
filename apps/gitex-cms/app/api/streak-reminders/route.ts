import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/utils/supabase/create-server-supabase-client';
import { StreakReminder } from '../../../components/email-templates/StreakReminder';
import { Resend } from 'resend';
import { InactiveUser } from '@/types/InactiveUser';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase.from('inactive_users').select('*');
  const users = data as InactiveUser[];

  if (error) {
    return NextResponse.json(
      { error: 'Error getting the activity' },
      { status: 500 },
    );
  }

  if (!users.length) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }

  let withErrors = false;

  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    if (!user.email) {
      console.error(`User ${user.id} has no email`);
      continue;
    }
    if (user.email.includes('joscas')) {
      user.email = 'carles@gitexamples.com';
    } else {
      continue;
    }
    const { error } = await resend.emails.send({
      from: 'Carles <carles@gitexamples.com>',
      to: [user.email],
      subject: 'A nudge from Git Examples',
      react: StreakReminder({
        userFirstname: user.full_name || 'friend',
        baseUrl: 'gitexamples.com',
      }),
    });
    if (error) {
      console.log('error', error);
      console.error(`Error sending email to user ${user.id}`);
      withErrors = true;
    }
  }

  if (withErrors) {
    return NextResponse.json(
      { error: 'Error sending emails' },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: 'Emails sent' });
}
