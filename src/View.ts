import { BrowserWindow } from "electron";

export class View {
	Window: BrowserWindow;
	constructor (Session: Electron.Session) {
		this.Window = new BrowserWindow({
			webPreferences: {
				webviewTag: true,
				session: Session,
			}
		});
		this.Window.loadFile("./www/index.html");
	}

	Restore () {
		if (this.Window.isMinimized())
			this.Window.restore();
		this.Window.focus();
	}

	Destroy () {
		this.Window.destroy();
	}

}