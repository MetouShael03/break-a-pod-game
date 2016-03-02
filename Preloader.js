
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {


		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar

		this.background = this.add.sprite(300, 400, 'preloaderBackground');
		this.preloadBar = this.add.sprite(305, 405, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.

		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	You can find all of these assets in the Phaser Examples repository
		this.load.image('title_image', 'assets/sprites/title_image.png');
		this.load.image('rud_event', 'assets/sprites/rud_event.png');
	    this.load.image('starfield', 'assets/skies/deep-space.jpg');

        // GUI assets
        this.load.image('progressorBackground', 'assets/GUI/track-progress.png');
        this.load.image('progressorMarker', 'assets/GUI/track-progress-marker.png');

		this.load.atlas('button', 'assets/GUI/button_texture_atlas.png', 'assets/GUI/button_texture_atlas.json');
		this.load.atlas('start_button', 'assets/GUI/start_button_atlas.png', 'assets/GUI/button_texture_atlas.json');
		this.load.atlas('menu_button', 'assets/GUI/menu_button_atlas.png', 'assets/GUI/button_texture_atlas.json');

		this.load.image('button_normal', 'assets/GUI/button_normal.png');
		this.load.image('button_pressed', 'assets/GUI/button_pressed.png');
		this.load.image('button_selected', 'assets/GUI/button_selected.png');

		// WORLD
	    this.load.image('wall', 'assets/sprites/wall.jpg');
	    this.load.image('booster', 'assets/sprites/booster.png');
	    this.load.image('end_sign', 'assets/sprites/end_sign.png');
		this.load.image('pylon', 'assets/sprites/pylon.png');
        this.load.image('pod', 'assets/sprites/pod.png');


	    //music
	    //this.load.audio('titleMusic', ['audio/main_menu.mp3']);
	    //this.load.audio('mainMusic', ['audio/main_menu.mp3']);
	    //this.load.audio('winMusic', ['audio/main_menu.mp3']);
	},

	create: function () {
		console.log("go to main menu")
		//this.state.start('MainMenu');
		this.state.start('MainMenu');

	},
	update: function () {
		// waits for music to be decoded before going to main menu
		/*if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}*/
	}

};
