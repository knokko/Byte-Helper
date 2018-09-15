const ByteHelper = {
	POWER_8 : Math.pow(2, 8),
	POWER_16 : Math.pow(2, 16),
	POWER_24 : Math.pow(2, 24),
	POWER_32 : Math.pow(2, 32),
	POWER_40 : Math.pow(2, 40),
	MAX_STRING_LENGTH : 100000,
	byteConvertArray : [],
	byteToBooleans : function(byte){
		return this.byteConvertArray[byte];
	}
};

for(let byte = 0; byte < ByteHelper.POWER_8; byte++){
	let copy = byte;
	const result = [false, false, false, false, false, false, false, false];
	if(copy >= 128){
		result[0] = true;
		copy -= 128;
	}
	if(copy >= 64){
		result[1] = true;
		copy -= 64;
	}
	if(copy >= 32){
		result[2] = true;
		copy -= 32;
	}
	if(copy >= 16){
		result[3] = true;
		copy -= 16;
	}
	if(copy >= 8){
		result[4] = true;
		copy -= 8;
	}
	if(copy >= 4){
		result[5] = true;
		copy -= 4;
	}
	if(copy >= 2){
		result[6] = true;
		copy -= 2;
	}
	result[7] = copy == 1;
	ByteHelper.byteConvertArray[byte] = result;
}