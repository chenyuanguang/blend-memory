/**
 * The entry of blend-memory.
 * This file will create collector for collecting info of this process.
 * and run dashboard on new process which has its own memory and v8 instance. 
 * The dashboard will recive data from collector and dispaly on a local website.
 */

const path = require('path');
const child_process = require('child_process');
const Collector = require('./lib/Collector.js');
const blendApp = require('./dashboard/app.js');
const blendServer = require('./dashboard/server.js');
// const modulePath = path.join(__dirname, './dashboard');
const logger = require('./lib/Logger.js');

module.exports ={
    BMConfig:function (app,{ port = 23333, log, frequency } = {}) {
        if (log) logger.setLevel(log);
    

        blendApp(app)

        
        logger.info('blend-memory seting up...... ');
    
    
        logger.info('Initializing Collector...... ');
    
        let collector = new Collector(process, { frequency });
    
        collector.start();
    
        // // Handle child process's error
        process.once('error', (err) => {
    
            // Kill child process once it occur error.
            logger.error(`process occur an error: ${err.toString()}`);
            logger.error(`process should be stopping......`);
            process.kill();
        }).once('exit', (code, signal) => {
    
            // Stop collector while child process exit.
            logger.error(`process exited by code: ${code}`);
            logger.error(`Collector has been stopped.`);
            collector.stop();
        });
    },
    BMServer:function(server){
       return blendServer(server)
    }

} 