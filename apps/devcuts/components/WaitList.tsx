import React from 'react';
import { createServerSupabaseClient } from 'utils/create-server-supabase-client';
import { Button } from 'components/ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';

const WaitList = () => {
  async function submitEmail(formData: FormData) {
    'use server';

    // TO-DO: Add email validation
    const email = formData.get('email') as string;
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.from('waitlist').insert({ email });
    if (error) {
      console.error('error inserting email', error);
      return;
    }
  }

  return (
    <Card className="pt-6 mt-6 max-w-sm mx-auto bg-gray-50">
      <CardContent>
        <form action={submitEmail} className="flex flex-col gap-2">
          <Input name="email" type="text" placeholder="Enter your email" />
          <Button type="submit">Join the waitlist</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WaitList;
