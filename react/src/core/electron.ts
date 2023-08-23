import * as ElectronModule from "electron";
declare global {
    interface Window { 
        electronAPI: {
            minimize: () => void;
        }
    }
}