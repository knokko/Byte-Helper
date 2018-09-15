ByteHelper.ByteInput = function(readByte){
	this.readByte = readByte;
};

ByteHelper.createArrayByteInput = function(array, startIndex){
	const input = new this.ByteInput(function(){
		return this.array[this.index++];
	});
	input.array = array;
	if(startIndex === undefined)
		startIndex = 0;
	input.index = startIndex;
	return input;
};

ByteHelper.ByteInput.prototype.readBooleans = function(){
	return ByteHelper.byteToBooleans(this.readByte());
};

ByteHelper.ByteInput.prototype.readInt16 = function(){
	return ByteHelper.POWER_8 * this.readByte() + this.readByte();
};

ByteHelper.ByteInput.prototype.readInt24 = function(){
	return ByteHelper.POWER_16 * this.readByte() + ByteHelper.POWER_8 * this.readByte() + this.readByte();
};

ByteHelper.ByteInput.prototype.readInt32 = function(){
	return ByteHelper.POWER_24 * this.readByte() + ByteHelper.POWER_16 * this.readByte() + ByteHelper.POWER_8 * this.readByte() + this.readByte();
};

ByteHelper.ByteInput.prototype.readInt40 = function(){
	return ByteHelper.POWER_32 * this.readByte() + ByteHelper.POWER_24 * this.readByte() + ByteHelper.POWER_16 * this.readByte() + ByteHelper.POWER_8 * this.readByte() + this.readByte();
};

ByteHelper.ByteInput.prototype.readInt48 = function(){
	return ByteHelper.POWER_40 * this.readByte() + ByteHelper.POWER_32 * this.readByte() + ByteHelper.POWER_24 * this.readByte() + ByteHelper.POWER_16 * this.readByte() + ByteHelper.POWER_8 * this.readByte() + this.readByte();
};

ByteHelper.ByteInput.prototype.readString = function(){
	const length = this.readInt32();
	const array = new Uint16Array(length);
	for(let index = 0; index < length; index++){
		array[index] = this.readInt16();
	}
	return String.fromCharCode.apply(String, array);
};