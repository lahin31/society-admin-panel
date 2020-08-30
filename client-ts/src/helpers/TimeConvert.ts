export const tConvert = (time: string): string => {
	let timer = time.split(':');
	return parseInt(timer[0]) >= 12 && (parseInt(timer[0])-12 || 12) + ':' + timer[1] + ' PM' || (Number(timer[0]) || 12) + ':' + timer[1] + ' AM';
}