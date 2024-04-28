const hx = require("hbuilderx");
const { showView } = require('./src/main.js');

function activate(context) {
    let disposable = hx.commands.registerCommand('colorhelper.colorhelper', (param) => {
        if (param == null) {
            param = {};
        };
        showView(param);
    });
    context.subscriptions.push(disposable);
	
	let colorHelperAbout = hx.commands.registerCommand('colorhelper.about', () => {
	    hx.env.openExternal('https://ext.dcloud.net.cn/plugin?name=color-helper');
	});
	context.subscriptions.push(colorHelperAbout);
};

function deactivate() {

};

module.exports = {
    activate,
    deactivate
}
