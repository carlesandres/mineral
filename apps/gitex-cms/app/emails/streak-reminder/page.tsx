import StreakReminder from '@/components/email-templates/StreakReminder';
import React from 'react';

const StreakReminderTestPage = () => {
  return (
      <StreakReminder userFirstname="friend" baseUrl="https://gitexamples.com" />
  );
};

export default StreakReminderTestPage;
