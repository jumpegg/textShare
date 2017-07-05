import { trigger, state, animate, transition, style } from '@angular/animations';
 
export const HeightToggle =
	trigger('HeightToggle',[
		state('open', style({
		})),
		state('close', style({
			height: '0px',
			display: 'none'
		})),
		transition('open => close', animate('300ms ease-in')),
		transition('close => open', animate('300ms ease-out'))
	]);