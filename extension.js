const hx = require("hbuilderx");
const { showView } = require('./src/main.js');

function activate(context) {
    let disposable = hx.commands.registerCommand('emojis.emojis', (param) => {
        if (param == null) {
            param = {};
        };
        showView(param);
    });
    context.subscriptions.push(disposable);
	
	let emojisAbout = hx.commands.registerCommand('emojis.about', () => {
	    hx.env.openExternal('https://ext.dcloud.net.cn/plugin?name=emojis-helper');
	});
	context.subscriptions.push(emojisAbout);
};

function deactivate() {

};

module.exports = {
    activate,
    deactivate
}
