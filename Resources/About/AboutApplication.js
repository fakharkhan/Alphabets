//View Component Constructor
function AboutApplication() {
	var self =new Titanium.UI.createWindow({
        title: 'Aplhabets - About',
        backgroundColor: '#fff'
    });

	var webView = Titanium.UI.createWebView({
		top:'5dpi',
		left :'5dpi',
		url: 'about.html'
	}); 
	
    self.add(webView);
	return self;
}

module.exports = AboutApplication;
