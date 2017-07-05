import { trigger, state, animate, transition, style } from '@angular/animations';
 
export const WidthToggle =
	trigger('WidthToggle',[
		state('open', style({
		})),
		state('close', style({
			width: '0px',
			display: 'none'
		})),
		transition('open => close', animate('300ms ease-in')),
		transition('close => open', animate('300ms ease-out'))
	]);