'use server';

type addToMailListProps = {
  firstName: string;
  email: string;
};

export async function addToMailingList({
  firstName,
  email,
}: addToMailListProps) {
  const res = await fetch(
    `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        first_name: firstName,
        email,
      }),
    },
  );

  return res.json();
}
