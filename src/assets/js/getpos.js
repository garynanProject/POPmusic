export const _GetPos = ( ev ) => {
	var oEvent = ev || event;
	var pos = {
		x: oEvent.touches[0].pageX,
		y: oEvent.touches[0].pageY,
	}

	return pos;
}