import merge from "../help/merge.js";
import {calculateEncodingAttributes, getTotalWidthOfEncodings, getMaximumHeightOfEncodings} from "./shared.js";

class CanvasRenderer{
	constructor(canvas, encodings, options){
		this.canvas = canvas;
		this.encodings = encodings;
		this.options = options;
	}

	render(){
		// Abort if the browser does not support HTML5 canvas
		// if (!this.canvas.getContext) {
		// 	throw new Error('The browser does not support canvas.');
		// }
		
		this.initSize()
		setTimeout(() => {
			this.prepareCanvas();
		   for(let i = 0; i < this.encodings.length; i++){
				var encodingOptions = merge(this.options, this.encodings[i].options);
				this.drawCanvasBarcode(encodingOptions, this.encodings[i]);
				this.drawCanvasText(encodingOptions, this.encodings[i]);
				this.moveCanvasDrawing(this.encodings[i]);
		   }
		   this.canvas.draw();
		}, 50);
		
		// this.restoreCanvas();
	}
	initSize(){
		var ctx = this.canvas;
		calculateEncodingAttributes(this.encodings, this.options, ctx);
		var totalWidth = getTotalWidthOfEncodings(this.encodings);
		var maxHeight = getMaximumHeightOfEncodings(this.encodings);
		this.options.thiz.canvasWidth = totalWidth + this.options.marginLeft + this.options.marginRight;
		this.options.thiz.canvasHeight = maxHeight;
	}
	prepareCanvas(){
		// Get the canvas context
		var ctx = this.canvas;
		// ctx.save();
		// fixEncodings(this.encodings, this.options, ctx)
		// Paint the canvas
		ctx.clearRect(0, 0, this.options.thiz.canvasWidth, this.options.thiz.canvasHeight);
		if(this.options.background){
			ctx.fillStyle = this.options.background;
			ctx.fillRect(0, 0, this.options.thiz.canvasWidth, this.options.thiz.canvasHeigh);
		}

		ctx.translate(this.options.marginLeft, 0);
	}

	drawCanvasBarcode(options, encoding){
		// Get the canvas context
		var ctx = this.canvas;
		 
		var binary = encoding.data;

		// Creates the barcode out of the encoded binary
		var yFrom;
		if(options.textPosition == "top"){
			yFrom = options.marginTop + options.fontSize + options.textMargin;
		}
		else{
			yFrom = options.marginTop;
		}

		// ctx.fillStyle = options.lineColor;
		ctx.setFillStyle(options.lineColor)
		for(var b = 0; b < binary.length; b++){
			var x = b * options.width + encoding.barcodePadding;

			if(binary[b] === "1"){
				ctx.fillRect(x, yFrom, options.width, options.height);
			}
			else if(binary[b]){
				ctx.fillRect(x, yFrom, options.width, options.height * binary[b]);
			}
		}
	}

	drawCanvasText(options, encoding){
		// Get the canvas context
		var ctx = this.canvas;
		var font = options.fontOptions + " " + options.fontSize + "px " + options.font;

		// Draw the text if displayValue is set
		if(options.displayValue){
			var x, y;

			if(options.textPosition == "top"){
				y = options.marginTop + options.fontSize - options.textMargin;
			}
			else{
				y = options.height + options.textMargin + options.marginTop + options.fontSize;
			}

			// ctx.font = font;
			if(options.fontSize){
				ctx.setFontSize(options.fontSize)
			}
			if(options.lineColor){
				ctx.setFillStyle(options.lineColor)
			}

			// Draw the text in the correct X depending on the textAlign option
			if(options.textAlign == "left" || encoding.barcodePadding > 0){
				x = 0;
				ctx.textAlign = 'left';
			}
			else if(options.textAlign == "right"){
				x = encoding.width - 1;
				ctx.textAlign = 'right';
			}
			// In all other cases, center the text
			else{
				x = encoding.width / 2;
				ctx.textAlign = 'center';
			}

			ctx.fillText(encoding.text, x, y);
		}
	}



	moveCanvasDrawing(encoding){
		var ctx = this.canvas;
		ctx.translate(encoding.width, 0);
	}

	restoreCanvas(){
		// Get the canvas context
		var ctx = this.canvas;
		ctx.restore();
	}
}

export default CanvasRenderer;
