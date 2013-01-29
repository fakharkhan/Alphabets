//View Component Constructor
function PlaySlideView(winIndex, alphabet) {
	
	var win = Titanium.UI.createWindow({
        title: 'Learn Aplhabet - ' + alphabet,
        backgroundColor: '#fff',
        neverBeenOpened: true
    });
	//create object instance, a parasitic subclass of Observable
	var view = Ti.UI.createView({
		height : '90%',
		width : '90%',
	});

	//A local image
	var imageView01 = Titanium.UI.createImageView({
		image : 'img/' + alphabet + '.png', //notice that we created an 'media' folder
		top : '25%'
	});

	view.add(imageView01);

	imageView01.addEventListener('click', function(e) {
		var audio = Titanium.Media.createSound({
			url : 'audio/' + alphabet + '.wav'
		});
		audio.play();
	});
	var label=Ti.UI.createLabel({
		text: 'Learning Alphabet - '+ alphabet,
		height : '10%',
		width : '100%',
		bottom:'5dpi',
		font : {
			fontSize : 24,
			fontWeight : 'bold',
			fontFamily : 'Helvetica Neue'
		},
		color:'#045FB4'
	});
	win.add(view);
	win.add(label);
	return win;
}

module.exports = PlaySlideView;
