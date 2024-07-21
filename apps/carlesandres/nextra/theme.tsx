import type { NextraThemeLayoutProps } from 'nextra'
import '../src/styles/main.css';
import Layout from '../src/components/Layout';
 
export default function NextraLayout({ children }: NextraThemeLayoutProps) {
  return <Layout>{children}</Layout>
}
