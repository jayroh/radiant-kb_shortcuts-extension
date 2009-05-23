/**
 * @author Ryan Johnson <http://syntacticx.com/>
 * @copyright 2008 PersonalGrid Corporation <http://personalgrid.com/>
 * @package LivePipe UI
 * @license MIT
 * @url http://livepipe.net/extra/hotkey
 * @require prototype.js, livepipe.js
 */

if(typeof(Prototype) == "undefined")
	throw "HotKey requires Prototype to be loaded.";
if(typeof(Object.Event) == "undefined")
	throw "HotKey requires Object.Event to be loaded.";

var HotKey = Class.create({
	initialize: function(letter,callback,options){
		letter = letter.toUpperCase();
		HotKey.hotkeys.push(this);
		this.options = Object.extend({
			element: false,
			shiftKey: false,
			altKey: false,
			ctrlKey: true
		},options || {});
		this.letter = letter;
		this.callback = callback;
		this.element = $(this.options.element || document);
		this.handler = function(event){
			if(!event || (
				(Event['KEY_' + this.letter] || this.letter.charCodeAt(0)) == event.keyCode &&
				((!this.options.shiftKey || (this.options.shiftKey && event.shiftKey)) &&
					(!this.options.altKey || (this.options.altKey && event.altKey)) &&
					(!this.options.ctrlKey || (this.options.ctrlKey && event.ctrlKey))
				)
			)){
				if(this.notify('beforeCallback',event) === false)
					return;
				this.callback(event);
				this.notify('afterCallback',event);
			}
		}.bind(this);
		this.enable();
	},
	trigger: function(){
		this.handler();
	},
	enable: function(){
		this.element.observe('keydown',this.handler);
	},
	disable: function(){
		this.element.stopObserving('keydown',this.handler);
	},
	destroy: function(){
		this.disable();
		HotKey.hotkeys = Control.HotKey.hotkeys.without(this);
	}
});
Object.extend(HotKey,{
	hotkeys: []
});
Object.Event.extend(HotKey);

// ====================================
// = SHORTCUTS FOR RADIANT EDIT VIEWS =
// ====================================

new HotKey('s',function(event){
	button = $$('input.button[name="commit"]')[0];
	if(button){	button.click();	}
},{ shiftKey: true });

new HotKey('c',function(event){  
    button = $$('input.button[name="continue"]')[0];
	if(button){ button.click();	}
},{ shiftKey: true });

new HotKey('f',function(event){  
    load_filter_reference('body');
},{ shiftKey: true });

new HotKey('t',function(event){  
    load_tag_reference('body');
},{ shiftKey: true });


