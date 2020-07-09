import { app, BrowserWindow, session } from "electron";
import { View } from "./View";

export class App {
	static InstanceLock = app.requestSingleInstanceLock();
	static Instance = new App();

	View: View | null = null;
	private _Session: Electron.Session | null = null;

	get Session () {
		if (this._Session)
			return this._Session;
		this._Session = session.fromPartition("persist:wapps-main");
		return this._Session;
	}

	constructor () {
		if (!App.InstanceLock)
			app.quit();
		app.on("ready", this.Ready.bind(this));
		app.on("activate", this.Activate.bind(this));
		app.on("second-instance", this.LoadWindow.bind(this));
	}

	Ready () {
		this.LoadWindow();
	}

	LoadWindow () {
		if (this.View)
			return this.View.Restore();

		this.View = new View(this.Session);
		this.View.Window.once("closed", () => {
			this.View = null;
		});
	}

	Activate () {
		if (BrowserWindow.getAllWindows().length === 0)
			this.LoadWindow();
	}
}
