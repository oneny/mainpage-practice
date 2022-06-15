import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ScrollObserver from '../utils/scroll-observer';
import SizeObserver from '../utils/size-observer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ScrollObserver>
      <SizeObserver>
        <Component {...pageProps} />
      </SizeObserver>
    </ScrollObserver>
  )
}

export default MyApp
