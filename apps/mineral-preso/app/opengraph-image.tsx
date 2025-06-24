import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'mineral';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  const geistRegular = await readFile(
    join(process.cwd(), 'assets/GeistMono-Regular.ttf'),
  );

  const geistBold = await readFile(
    join(process.cwd(), 'assets/GeistMono-Bold.ttf'),
  );

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: 'GeistBold',

          fontSize: 64,
          background: 'black',
          color: '#F0B100',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '64px',
          flex: 1,
        }}
      >
        <div
          style={{
            hyphens: 'none',
            wordBreak: 'keep-all',
          }}
        >
          {`mineral`}
        </div>
        <div
          style={{
            fontSize: '32px',
            width: '100%',
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            lineHeight: '1.5',
            color: '#eeeeee',
            paddingTop: '32px',
          }}
        >
          {'A minimalistic editor for your quick notes'}
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            textAlign: 'center',
            padding: '32px',
            fontFamily: 'GeistBold',
          }}
        >
          <div
            style={{
              display: 'flex',
              transform: 'rotate(-25deg)',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 3h12l4 6-10 13L2 9Z"></path>
              <path d="M11 3 8 9l4 13 4-13-3-6"></path>
              <path d="M2 9h20"></path>
            </svg>
          </div>
          <div style={{ marginLeft: '16px', fontSize: 32, color: '#eeeeee' }}>
            mnral.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Geist',
          data: geistRegular,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'GeistBold',
          data: geistBold,
          style: 'normal',
          weight: 700,
        },
      ],
    },
  );
}
