# Grafin


## Dependencies

* [Node <= 0.8](http://nodejs.org/)
* [Grunt CLI](http://gruntjs.com/getting-started)
* [Bower](http://twitter.github.com/bower/)


## Getting started

Make sure you have node 8. Anything below fails on the NPM install due to bugs between NPM and PhantomJS.

You could use [NVM](https://github.com/creationix/nvm):

	curl https://raw.github.com/creationix/nvm/master/install.sh | sh
	source ~/.bash_profile

 or [install it from Github](http://nodejs.org/dist/v0.8.22/):

	git clone -b v0.8.22-release https://github.com/joyent/node.git
	cd node
	./configure
	make
	make install
	cd ../
	rm -rf node


You'll need Grunt CLI to:
	
	npm uninstall -g grunt
	sudo npm install -g grunt-cli


Then grab the package dependencies:

	npm install


Bower power (not sure if we should have this globally, but it's (obviously) what they recommend)

	npm install bower -g


## Tests

To run Jasmine:
	
	grunt test

This will run the Jasmine tests in your terminal as well as create the SpecRunner.html in the root directory.

You can either open the file locally, or you can just [view the file on the local server](http://127.0.0.1:9001/SpecRunner.html).