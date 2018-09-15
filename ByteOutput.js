ByteHelper.ByteOutput = function(addBytes){
	this.addBytes = addBytes;
};

ByteHelper.createArrayByteOutput = function(array, startIndex){
	const output = new this.ByteOutput(function(){
		for(let index in arguments){
			this.array[this.index++] = arguments[index];
		}
	});
	if(array === undefined)
		array = new Uint8Array(100);
	if(startIndex === undefined)
		startIndex = 0;
	output.array = array;
	output.index = startIndex;
	return output;
};

ByteHelper.ByteOutput.prototype.addBooleans = function(b1, b2, b3, b4, b5, b6, b7, b8){
	this.addBytes(128 * b1 + 64 * b2 + 32 * b3 + 16 * b4 + 8 * b5 + 4 * b6 + 2 * b7 + b8);
};

ByteHelper.ByteOutput.prototype.addInt16 = function(value){
	const byte1 = Math.floor(value / ByteHelper.POWER_8);
	this.addBytes(byte1, value - byte1 * ByteHelper.POWER_8);
};

ByteHelper.ByteOutput.prototype.addInt24 = function(value){
	const byte1 = Math.floor(value / ByteHelper.POWER_16);
	value -= byte1 * ByteHelper.POWER_16;
	const byte2 = Math.floor(value / ByteHelper.POWER_8);
	this.addBytes(byte1, byte2, value - byte2 * ByteHelper.POWER_8);
};

ByteHelper.ByteOutput.prototype.addInt32 = function(value){
	const byte1 = Math.floor(value / ByteHelper.POWER_24);
	value -= byte1 * ByteHelper.POWER_24;
	const byte2 = Math.floor(value / ByteHelper.POWER_16);
	value -= byte2 * ByteHelper.POWER_16;
	const byte3 = Math.floor(value / ByteHelper.POWER_8);
	this.addBytes(byte1, byte2, byte3, value - byte3 * ByteHelper.POWER_8);
};

ByteHelper.ByteOutput.prototype.addInt40 = function(value){
	const byte1 = Math.floor(value / ByteHelper.POWER_32);
	value -= byte1 * ByteHelper.POWER_32;
	const byte2 = Math.floor(value / ByteHelper.POWER_24);
	value -= byte2 * ByteHelper.POWER_24;
	const byte3 = Math.floor(value / ByteHelper.POWER_16);
	value -= byte3 * ByteHelper.POWER_16;
	const byte4 = Math.floor(value / ByteHelper.POWER_8);
	this.addBytes(byte1, byte2, byte3, byte4, value - byte4 * ByteHelper.POWER_8);
};

ByteHelper.ByteOutput.prototype.addInt48 = function(value){
	const byte1 = Math.floor(value / ByteHelper.POWER_40);
	value -= byte1 * ByteHelper.POWER_40;
	const byte2 = Math.floor(value / ByteHelper.POWER_32);
	value -= byte2 * ByteHelper.POWER_32;
	const byte3 = Math.floor(value / ByteHelper.POWER_24);
	value -= byte3 * ByteHelper.POWER_24;
	const byte4 = Math.floor(value / ByteHelper.POWER_16);
	value -= byte4 * ByteHelper.POWER_16;
	const byte5 = Math.floor(value / ByteHelper.POWER_8);
	this.addBytes(byte1, byte2, byte3, byte4, byte5, value - byte5 * ByteHelper.POWER_8);
};

ByteHelper.ByteOutput.prototype.addString = function(string){
	if(string.length > ByteHelper.MAX_STRING_LENGTH){
		throw "string length (" + string.length + ") exceeds the maximum length of " + ByteHelper.MAX_STRING_LENGTH;
	}
	this.addInt32(string.length);
	for(let index = 0; index < string.length; index++){
		this.addInt16(string.charCodeAt(index));
	}
};