
BasicGame.MainMenu = function (game) {

	this.bg;
	this.title_image;

	this.cameraSpeed = 10;
	this.pos = 0;

	// environment
    this.environment;
    this.background;
    this.midground;
    this.foreground;

	this.music = null;
	this.playButton = null;

	this.cursors;
};

BasicGame.MainMenu.prototype = {
	init: function(){
		var envs = this.game['GameData'].environments,
            totalEnvs = envs.length;
        var levelSelect = Math.floor(Math.random() * totalEnvs);
        //levelSelect=1
        this.environment = envs[levelSelect];
        this.levelLength = this.game['GameData'].baseLevelLength * (Math.random() + 1);

        // Non real time controls
        // ESC pause game
        var escapeKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        escapeKey.onDown.add(this.startGame, this); 

	},
	create: function () {

        //Audio
        this.sound_music = this.add.sound('titleMusic');
        this.sound_music.play();   

        // set world settings and player start position
        this.startPos = { "x": 150, "y": (this.world.height / 2) + 47 };
        this.stage.backgroundColor = "#0c9fc7";
        this.world.setBounds(0, 0, this.levelLength + this.flatStartLength + this.flatEndLength, 500);


		this.addBackground();
        this.addMidground();
        var graphics = this.add.graphics(0, 0);
        //this.drawTube(graphics, this.tunnelPhysicsData);
        this.addForeground();

	    var title_image = this.add.sprite(this.game.width/2, this.game.height/2, 'title_image');
	    title_image.anchor.set(0.5, 0.5);
        title_image.alpha = 0.1;
        this.add.tween(title_image).to( { alpha: 1 }, 500, "Linear", true );
	    //this.title_image.scale.setTo(1, 1);

        var playButton = this.add.bitmapText(this.game.width/2, (this.game.height/2) + 200, "basic_font_white", "START", 40);
        playButton.hitArea = new PIXI.Rectangle(-playButton.width/2, -playButton.height/2, playButton.width, playButton.height);
        playButton.inputEnabled = true;
        playButton.events.onInputDown.add(this.startGame, this);
        playButton.events.onInputOver.add(buttonHighlightOn, this);
        playButton.events.onInputOut.add(buttonHighlightOut, this);
        playButton.anchor.set(0.5, 0.5);
        playButton.alpha = 0.1;
        this.add.tween(playButton).to( { alpha: 1 }, 500, "Linear", true );

        function buttonHighlightOn(a) {
            a.tint = 0x003399;
        }
        function buttonHighlightOut(a) {
            a.tint = 0xFFFFFF;
        }
	},

	update: function () {

        this.pos += this.cameraSpeed;
       	var pos = this.pos;
        this.midground.forEach(function (item) {
            if (item.type === 5) { // tileable sprite
                item.tilePosition.x = -(pos * item.parallax) + item.offset.x;
                item.tilePosition.y = item.offset.y;
            }
        })

	},


	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.sound_music.stop();

		//	And start the actual game
		this.game.state.start('Game');

	},

	addBackground: function () {
        var environmentBackground = this.environment['background'];
        var backgroundGroup = this.background = this.add.group();
        for (var key in environmentBackground) {
            if (environmentBackground.hasOwnProperty(key)) {
                if (environmentBackground[key].type === "unique") {

                    var unique = backgroundGroup.create(environmentBackground[key].position.x, environmentBackground[key].position.y, environmentBackground[key].texture);
                    unique.fixedToCamera = environmentBackground[key].fixedToCamera;

                } else if (environmentBackground[key].type === "unique_randomized") {

                    var textures = environmentBackground[key].textures;
                    var texture_index = Math.floor(textures.length*Math.random());
                    var texture_name = textures[texture_index];
                    var unique = backgroundGroup.create(environmentBackground[key].position.x, environmentBackground[key].position.y, texture_name);
                    unique.fixedToCamera = environmentBackground[key].fixedToCamera;
                
                }
            }
        }
    },

    addMidground: function () {
        
        var environmentMidground = this.environment['midground'];
        var midgroundGroup = this.midground = this.add.group();
        for (var key in environmentMidground) {
            if (environmentMidground.hasOwnProperty(key)) {

                if (environmentMidground[key].type === "unique") {

                    midgroundGroup.create(environmentMidground[key].position.x, environmentMidground[key].position.y, environmentMidground[key].texture);

                } else if (environmentMidground[key].type === "repeat") {

                    var tileable = this.add.tileSprite(environmentMidground[key].position.x, environmentMidground[key].position.y, this.camera.width, this.cache.getImage(environmentMidground[key].texture).height, environmentMidground[key].texture);
                    tileable.fixedToCamera = true;
                    tileable.tileScale = { "x": environmentMidground[key].tileScale.x, "y": environmentMidground[key].tileScale.y };
                    tileable.tilePosition = { "x": environmentMidground[key].tilePosition.x, "y": environmentMidground[key].tilePosition.y };

                    // need to pass some data to the update function so store it on the object
                    tileable['parallax'] = environmentMidground[key].parallax;
                    tileable['offset'] = environmentMidground[key].tilePosition;
                    midgroundGroup.add(tileable);

                }
            }
        }
    },
    addForeground: function () {
        this.foreground = this.add.group();

    }
};
