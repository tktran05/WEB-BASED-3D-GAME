let Text = pc.createScript('text');

Text.attributes.add('textEntity', { type: 'entity', default: 'Hello World'});

Text.attributes.add('playerManager', { type: 'entity' });
Text.playerName=null;
Text.prototype.initialize = function () {
    // Create a canvas to do the text rendering
   
    
    // this.on('attr', function (name, value, prev) {
    //     this.updateText();
    // });
    
    this.initialize=false;
};


Text.prototype.update= function(dt){
    if(!this.initialize)
        {
        
    if(this.playerManager.script.playerManager.isControlling  )
        {
            
            
            this.textEntity.element.text = this.playerManager.script.playerManager.playerName;
            
        }
    else{
        
         this.textEntity.element.text = this.playerManager.script.playerManager.playerName;
        
    }
            this.initialize=true;
        }
};