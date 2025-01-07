var Network = pc.createScript('network');

//var root=null;

var connectButton = null;
var inputField = null;
var waitText = null;
// static variables
var clientID = null;
var _socket = null;
Network.players = [];
Network.inputText = null;
Network.playerName = null;
Network.modelName = null;

var playerAsset = null;
var player = null;
var isLoaded = false;
var otherplayerAsset = null;
var newPlayer = null;
var chatTextTemplate = null;
var chatBoxContent = null;
var chatInputBox = null;
var chatSendButton = null;
var chatEntity = null;
var chatScroll = null;

// initialize code called once per entity
Network.prototype.initialize = function () {
    this._clientID = null;

    this.temp = null;
    this.playerName = null;


    root = this.app.root;


    connectButton = this.app.root.findByName('connectButton');
    option1Button = this.app.root.findByName('option1Button');
    option2Button = this.app.root.findByName('option2Button');
    option3Button = this.app.root.findByName('option3Button');
    option4Button = this.app.root.findByName('option4Button');
    option5Button = this.app.root.findByName('option5Button');
    select = this.app.root.findByName('Select')
    
    inputField = this.app.root.findByName('Input');
    waitText = this.app.root.findByName('waitText');

    playerAsset = this.app.assets.find('Player', 'template').resource;


    otherplayerAsset = this.app.assets.find('Other', 'template').resource;
    Network.inputText = this.app.root.findByName('Input');
    chatTextTemplate = this.app.assets.find('chatText', 'template').resource;
    chatBoxContent = this.app.root.findByName('chatBoxContent');
    chatSendButton = this.app.root.findByName('chatSendButton');
    chatEntity = this.app.root.findByName('chatEntity');
    chatScroll = this.app.root.findByName('VerticalScrollbar');

    //Use your hosted server
    //Here is the server code https://glitch.com/edit/#!/player-server

    var socket = io.connect('https://3d-web-gaming.glitch.me'); //live hosted server
    //  var socket = io.connect('http://localhost:3000');// local hosted server
    _socket = socket;
    var self = this;

    initializeEvents();

    InitializeUI();
};

function InitializeUI(){

    //name input
    connectButton.element.on('click', function () {
        if (Network.inputText.script.input.element.value === '') {
            Network.playerName = "###"; 
        } else {
            Network.playerName = Network.inputText.script.input.element.value; 
        }

        connectButton.enabled = false;
        inputField.enabled = false;

        option1Button.enabled = true;
        option2Button.enabled = true;
        option3Button.enabled = true;
        option4Button.enabled = true;
        option5Button.enabled = true;
        select.enabled = true;

        console.log("Name entered:", Network.playerName);
    });

    // character selection
    option1Button.element.on('click', function (){
        Network.modelName = 'Frieren';
        option1Button.enabled = false;
        option2Button.enabled = false;
        option3Button.enabled = false;
        option4Button.enabled = false;
        option5Button.enabled = false;
        select.enabled = false;

        console.log("Character selected:", Network.modelName);

        connect();
        waitText.enabled = true;
    });

    option2Button.element.on('click', function (){
        Network.modelName = 'Garou';
        option1Button.enabled = false;
        option2Button.enabled = false;
        option3Button.enabled = false;
        option4Button.enabled = false;
        option5Button.enabled = false;
        select.enabled = false;

        console.log("Character selected:", Network.modelName);

        connect();
        waitText.enabled = true;
    });

        option3Button.element.on('click', function (){
        Network.modelName = 'Goku';
        option1Button.enabled = false;
        option2Button.enabled = false;
        option3Button.enabled = false;
        option4Button.enabled = false;
        option5Button.enabled = false;
        select.enabled = false;

        console.log("Character selected:", Network.modelName);

        connect();
        waitText.enabled = true;
    });

        option4Button.element.on('click', function (){
        Network.modelName = 'Inosuke';
        option1Button.enabled = false;
        option2Button.enabled = false;
        option3Button.enabled = false;
        option4Button.enabled = false;
        option5Button.enabled = false;
        select.enabled = false;

        console.log("Character selected:", Network.modelName);

        connect();
        waitText.enabled = true;
    });

        option5Button.element.on('click', function (){
        Network.modelName = 'Marcille';
        option1Button.enabled = false;
        option2Button.enabled = false;
        option3Button.enabled = false;
        option4Button.enabled = false;
        option5Button.enabled = false;
        select.enabled = false;

        console.log("Character selected:", Network.modelName);

        connect();
        waitText.enabled = true;
    });
}


function connect() {

    _socket.emit('create');

}

function initializeEvents() {
    _socket.on('open', function () {
        console.log("Connected to Server");
        _socket.emit('spawnOther');
    });

    _socket.on('register', function (data) {
        register(data);
        waitText.enabled = false;
    });

    _socket.on('spawn', function (data) {
        spawn(data);
    });
    _socket.on('transform', function (data) {
        transform(data);
    });
    _socket.on('disconnected', function (data) {
        disconnected(data);
    });
    _socket.on('anim', function (data) {

        animTransform(data);
    });
    _socket.on('recmsg', function (data) {
        console.log(data);
        onRecMessage(data);
    });
}


function onRecMessage(data) {
    console.log(data);
    let _chatData = chatTextTemplate.instantiate();
    _chatData.element.text = data.username + " said : " + data.text;
    _chatData.reparent(chatBoxContent);

    chatBoxContent.fire('contentchanged');
    chatScroll.scrollbar.value = 1;
    chatInputBox.enabled = true;
    //this.onMouseDisable();
}
Network.prototype.onMouseDisable = function () {
    var app = this.app;
    app.mouse.disablePointerLock();
}

function OnSendMsg() {
    if (chatInputBox.script.input.element.value !== '') {
        _socket.emit('onsendmsg', {
            username: Network.playerName,
            chatText: chatInputBox.script.input.element.value
        });
        chatInputBox.script.input.element.value = '';
        chatInputBox.enabled = false;
    }


}


function register(data) {

    clientID = data.id;
    this._clientID = clientID;
    //  console.log("ClientID ",clientID);
    // player.enabled=true;
    // console.log( player.script);


    // 
    _socket.emit('spawn', { id: clientID, name: Network.playerName, modelName: Network.modelName });
}

function spawn(data) {
    // console.log(data);

    if (this._clientID != data.id) {

        // console.log("OtherPlayer");   
        var playerID = data.id;
        var playerName = data.username;
        var modelName = data.modelName;
        //  console.log(playerName);
        newPlayer = otherplayerAsset.instantiate();
        newPlayer.findByName(modelName).enabled = true;
        root.addChild(newPlayer);
        newPlayer.rigidbody.teleport(0, 1, 0);

        Network.players[playerID] = data;
        Network.players[playerID].entity = newPlayer;
        // newPlayer.enabled = true;  
        Network.players[playerID].entity.script.playerManager.clientID = playerID;
        Network.players[playerID].entity.script.playerManager.playerName = playerName;
        //  console.log(  Network. players[playerID].entity.script.playerManager.playerName);
        //  otherplayer.getParent().addChild(newPlayer);


        // isLoaded=true;
    }
    else {
        // console.log(Network.playerName);
        player = playerAsset.instantiate();
        player.findByName(Network.modelName).enabled = true;
        root.addChild(player);
        player.rigidbody.teleport(0, 1, 0);
        clientID = data.id;
        this._clientID = clientID;

        Network.players[clientID] = data;
        Network.players[clientID].entity = player;
        Network.players[clientID].entity.script.playerManager.clientID = clientID;
        Network.players[clientID].entity.script.playerManager.playerName = Network.playerName;
        //   console.log(Network.players[clientID].entity.script.playerManager.playerName);

        isLoaded = true;



    }
}

function transform(data) {
    if (isLoaded) {
        //  console.log(data);
        var id = data.id;
        var position = data.pos;
        var rotation = data.rot;
        Network.players[id].entity.setLocalEulerAngles(rotation.x, rotation.y, rotation.z);
        Network.players[id].entity.rigidbody.teleport(position.x, position.y, position.z);


    }
}

function animTransform(data) {
    if (isLoaded) {
        var id = data.id;
        var direction = data.direction;
        //  console.log(direction);
        Network.players[id].entity.script.playerManager.Otherdirection = direction;
        // console.log(players[id].entity.script.playerManager.direction);
    }
}

function disconnected(data) {
    if (Network.players[data.id].entity) {
        Network.players[data.id].entity.enabled = false;
        Network.players[data.id].deleted = true;
    }


}

// update code called every frame
Network.prototype.update = function (dt) {
    if (clientID !== null && isLoaded) {
        this._clientID = clientID;

        var pos = Network.players[clientID].entity.getPosition();
        var rot = Network.players[clientID].entity.getLocalEulerAngles();

        _socket.emit('transform', { id: clientID, pos: pos, rot: rot });

        if (this.temp != Network.players[clientID].entity.script.playerManager.direction) {

            this.temp = Network.players[clientID].entity.script.playerManager.direction;

            _socket.emit('anim', {
                id: clientID,
                direction: Network.players[clientID].entity.script.playerManager.direction

            });
        }

    }

    //  if (this.app.keyboard.wasReleased(pc.KEY_ENTER)) {
    //    OnSendMsg();
    // }

};

