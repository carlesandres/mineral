import React from 'react';

import {
  Body,
  Button,
  Container,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Link,
} from '@react-email/components';

interface StreakReminderProps {
  userFirstname: string;
  baseUrl: string;
}

export const StreakReminder = ({
  userFirstname,
  baseUrl,
}: StreakReminderProps) => (
  <Html>
    <Preview>Learn git in minutes. Not years.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/logo_long.png`}
          width="189"
          height="30"
          alt="Git Examples logo"
          style={logo}
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          {`We noticed you haven't visited `}
          <Link href={baseUrl}>Git Examples</Link>
          {` in the last 7 days.`}
        </Text>
        <Text style={paragraph}>
          {`With just a couple of minutes today, you can improve your git skills and help your future self.`}
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={baseUrl}>
            Get back in
          </Button>
        </Section>
        <br />
        <Text style={paragraph}>
          {`Our mission is to help developers focus on the fun parts of coding by removing the friction of managing code.`}
        </Text>
        <Text style={paragraph}>
          {`If you prefer not to receive these reminders, you can turn them off in the `}
          <Link href="${baseUrl}/account">account</Link>
          {` section of our site.`}
        </Text>
        <Text style={paragraph}>
          {`Thanks for being part of our community!`}
          <br />
          <br />
          Carles
        </Text>
        <Hr style={hr} />
      </Container>
    </Body>
  </Html>
);

StreakReminder.PreviewProps = {
  userFirstname: 'Alan',
} as StreakReminderProps;

export default StreakReminder;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const logo = {
  margin: '0 auto',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const btnContainer = {
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#9333ea',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px',
  margin: '0 auto',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};
