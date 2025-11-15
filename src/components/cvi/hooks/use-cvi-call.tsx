import { useCallback } from 'react';
import { useDaily } from '@daily-co/daily-react';

export const useCVICall = (): {
	joinCall: (props: { url: string; token?: string }) => void;
	leaveCall: () => void;
} => {
	const daily = useDaily();

	const joinCall = useCallback(
		({ url, token }: { url: string; token?: string }) => {
			console.log('useCVICall.joinCall called with:', { url, token, hasDaily: !!daily });
			
			if (!daily) {
				console.error('Daily instance not available!');
				return;
			}
			
			const joinOptions: any = {
				url: url,
				inputSettings: {
					audio: {
						processor: {
							type: "noise-cancellation",
						},
					},
				},
			};
			
			// Only add token if it's actually provided and not undefined
			if (token) {
				joinOptions.token = token;
			}
			
			console.log('Calling daily.join with options:', joinOptions);
			daily.join(joinOptions)
				.then(() => console.log('daily.join() succeeded'))
				.catch((err) => console.error('daily.join() failed:', err));
		},
		[daily]
	);

	const leaveCall = useCallback(() => {
		daily?.leave();
	}, [daily]);

	return { joinCall, leaveCall };
};
