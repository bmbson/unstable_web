import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TopNavigationBar from '@/components/top_navigation_bar/TopNavigationBar'
import BottomAudioControlBar from '@/components/bottom_audio_control_bar/BottomAudioControlBar'
import { fetchTest, MixTyping } from './ts/mix_panel/data'
import { RowList } from 'postgres'
import { useMixHelperStore } from '@/mixStore'
import useSWR, { SWRConfig } from 'swr'
import { ctx } from './audioContextBackendClass'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Unstable',
	description: 'Unstable.',
}

export default function RootLayout({ children, }: {
	children: React.ReactNode
}) {
	// var data = fetchTest();


	return (
		<html lang="en">
			<SWRConfig
				value={{
					fallback: {
						'/api/mixes': fetchTest(),
					}
				}}
			>
				<body className={inter.className}>
					<TopNavigationBar></TopNavigationBar>
					{children}
					<BottomAudioControlBar></BottomAudioControlBar>
				</body>
			</SWRConfig>
		</html>
	)
}
